import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const query =
    'INSERT INTO users_adress (user_id, line, postal_code, city, country) VALUES ($1, $2, $3, $4, $5)';
  const parameters = [
    body.userId,
    body.line,
    body.postalCode,
    body.city,
    body.country,
  ];
  const result = await pool.query(query, parameters);
  console.log(result);
  return new Response('Se ha subido bien', { status: 200 });
}
