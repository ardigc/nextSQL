import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const unhasedPass = body.pass;
  const query =
    'SELECT password, id, name, role FROM users_info where email=$1';
  const parameters = [body.email];
  const result = await pool.query(query, parameters);

  if (result.rows.length === 0) {
    return new Response(null, { status: 401 });
  }

  const pass = result.rows[0].password;
  const id = result.rows[0].id;
  const name = result.rows[0].name;
  const isOk = await compare(unhasedPass, pass);
  const role = result.rows[0].role;

  if (!isOk) return new Response(null, { status: 401 });
  const token = sign(
    { id: id, name: name, role: role },
    process.env.JWT_SECRET || ''
  );
  return new Response(JSON.stringify({ token }), { status: 200 });
}
