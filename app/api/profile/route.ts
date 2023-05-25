import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const mode = body.mode;
  const set = body.set;
  const id = body.id;
  if (set === 'name') {
    const query = 'UPDATE users_info SET name=$1 WHERE id=$2';
    const parameters = [
      // set,
      mode,
      id,
    ];
    console.log(parameters);
    const result = await pool.query(query, parameters);
  }
  return new Response('Se ha subido bien', { status: 200 });
}
