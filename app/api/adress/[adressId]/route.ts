import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { adressId: string } }
) {
  const body = await req.json();
  const id = params.adressId;

  const query =
    'UPDATE users_adress SET line=$1, postal_code=$2, city=$3, country=$4 WHERE id=$5';
  const parameters = [body.line, body.postalCode, body.city, body.country, id];
  const result = await pool.query(query, parameters);
  console.log(result);
  return new Response('Se ha subido bien', { status: 200 });
}
