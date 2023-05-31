import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { Pool } from 'pg';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookiesValue = req.cookies;
  let userId = null;
  try {
    userId = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof userId === 'string') return;
    const query =
      'INSERT INTO products (name, description, price, seller_id) VALUES($1, $2, $3, $4) RETURNING *';
    const parameters = [body.name, body.description, body.price, userId.id];
    const result = await pool.query(query, parameters);
    console.log(result);
    return new Response('Se ha subido bien', { status: 200 });
  } catch (error) {
    throw 'No se subio bien ' + error;
  }
}