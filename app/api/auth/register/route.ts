import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';
import { hash } from 'bcrypt';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const unhasedPass = body.pass;
  const hashedPass = await hash(unhasedPass, 10);
  const query =
    'INSERT INTO users_info(name,email, subname, phone, password) VALUES ($1, $2, $3, $4, $5)';
  const parameters = [
    body.name,
    body.email,
    body.subname,
    body.phone,
    hashedPass,
  ];
  const result = await pool.query(query, parameters);
  // console.log(result);
  return new Response('Se ha subido bien', { status: 200 });
}
