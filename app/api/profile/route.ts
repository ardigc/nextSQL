import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';

export async function UPDATE(req: NextRequest) {
  const body = await req.json();
  const mode = body.mode;
  const set = body.set;
  const id = body.id;
  const query = 'UPDATE users_info SET $1 = $2 WHERE id=$3';
  const parameters = [set, mode, id];
  const result = await pool.query(query, parameters);
  console.log(result);
  return new Response('Se ha subido bien', { status: 200 });
}
