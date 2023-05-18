import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await pool.query(
    `INSERT INTO users_info(name,email, subname) VALUES ('${body.name}', '${body.email}','${body.subname}')`
  );
  console.log(result);
  return new Response('Se ha subido bien', { status: 200 });
}
