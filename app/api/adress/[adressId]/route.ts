import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { adressId: string } }
) {
  const body = await req.json();
  const mod = body.mod;
  const set = body.set;
  const id = params.adressId;

  const query = `UPDATE users_adress SET line=$1 WHERE id=$2`;
  const parameters = [
    // set,
    mod,
    id,
  ];
  const result = await pool.query(query, parameters);
  console.log(result);
  return new Response('Se ha subido bien', { status: 200 });
}
