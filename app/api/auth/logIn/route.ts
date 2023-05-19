import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';
import { compare } from 'bcrypt';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const unhasedPass = body.pass;
  const query = 'SELECT password FROM users_info where email=$1';
  const parameters = [body.email];
  const result = await pool.query(query, parameters);

  if (result.rows.length === 0) {
    return new Response(null, { status: 401 });
  }

  const pass = result.rows[0].password;
  const isOk = await compare(unhasedPass, pass);
  if (!isOk) return new Response(null, { status: 401 });

  return new Response(null, { status: 200 });
}
