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
    console.log(body);
    if (typeof userId === 'string') return;
    const query =
      'INSERT INTO products (name, description, price, seller_id, product_page, image_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const parameters = [
      body.name,
      body.description,
      body.price,
      userId.id,
      body.productPage,
      body.imageURL,
    ];
    const result = await pool.query(query, parameters);
    return new Response('Se ha subido bien', { status: 200 });
  } catch (error) {
    throw 'No se subio bien ' + error;
  }
}
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const cookiesValue = req.cookies;
  let userId = null;
  // if (!body.name) {
  //   const result = await pool.query(`UPDATE products SET delete_at=NOW() WHERE id=${body.id}`);
  //   return new Response('Se ha borrado bien', { status: 200 });
  // }
  try {
    userId = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof userId === 'string') return;
    const query =
      'UPDATE products SET name=$1, description=$2, price=$3, product_page=$4, image_url=$5 WHERE id=$6 RETURNING *';
    const parameters = [
      body.name,
      body.description,
      body.price,
      body.productPage,
      body.imageURL,
      body.id,
    ];
    const result = await pool.query(query, parameters);
    return new Response('Se ha subido bien', { status: 200 });
  } catch (error) {
    throw 'No se subio bien ' + error;
  }
}
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const result = await pool.query(
    `UPDATE products SET delete_at=NOW() WHERE id=${body.id}`
  );
  return new Response('Se ha borrado bien', { status: 200 });
}
