import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';
import { sign } from 'jsonwebtoken';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const mode = body.mode;
  const set = body.set;
  const id = body.id;
  if (set === 'name') {
    const query = 'UPDATE users_info SET name=$1 WHERE id=$2';
    const parameters = [mode, id];
    const result = await pool.query(query, parameters);

    const token = sign({ id: id, name: mode }, process.env.JWT_SECRET || '');
    return new Response(JSON.stringify({ token }), { status: 200 });
  } else if (set === 'subname') {
    const query = 'UPDATE users_info SET subname=$1 WHERE id=$2';
    const parameters = [mode, id];
    const result = await pool.query(query, parameters);
    return new Response('Se ha subido bien', { status: 200 });
  } else if (set === 'email') {
    const query = 'UPDATE users_info SET email=$1 WHERE id=$2';
    const parameters = [
      // set,
      mode,
      id,
    ];
    const result = await pool.query(query, parameters);
    return new Response('Se ha subido bien', { status: 200 });
  } else if (set === 'phone') {
    const query = 'UPDATE users_info SET phone=$1 WHERE id=$2';
    const parameters = [
      // set,
      mode,
      id,
    ];
    const result = await pool.query(query, parameters);
    return new Response('Se ha subido bien', { status: 200 });
  }
}
