import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  // Body del fetch en el front
  const body = await req.json();
  const productId = body.id;
  const cookiesValue = req.cookies;
  let userId = null;

  try {
    userId = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof userId === 'string') return;

    const query = 'DELETE FROM cart_items WHERE product_id=$1';

    const parameters = [productId];
    const result = await pool.query(query, parameters);
    return new Response('Se ha subido bien', { status: 200 });
  } catch (error: any) {
    throw 'No tienes iniciada sesion';
    // redireccionar a iniciar
    // return new Response('Se ha subido bien', { status: 200 });
  }
}
