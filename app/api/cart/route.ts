import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';

// export async function GET() {
//     return new Response("Hello, world!", {status: 200})
// }

// Handler para fetch con method POST a esta ruta /api/cart
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
    if (typeof userId === 'string') {
      return;
    }
    const cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + userId.id
    );
    const query =
      'INSERT INTO cart_items(cart_id, product_id, qt) VALUES ($1, $2, 1)';

    const parameters = [cartId.rows[0].id, productId];
    const result = await pool.query(query, parameters);
    return new Response('Se ha subido bien', { status: 200 });
  } catch (error: any) {
    throw 'No tienes iniciada sesion';
    // redireccionar a iniciar
    // return new Response('Se ha subido bien', { status: 200 });
  }
  pool.query('query para insertar en db');
}
