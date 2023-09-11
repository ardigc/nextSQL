import { pool } from '@/lib/server/pg';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cartId = body.cartId;
  const result = await pool.query(
    `SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=${cartId} ORDER BY product_id DESC`
  );
  return new Response(JSON.stringify(result.rows), { status: 200 });
}
