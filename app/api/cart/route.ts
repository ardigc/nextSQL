import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';

// export async function GET() {
//     return new Response("Hello, world!", {status: 200})
// }

// Handler para fetch con method POST a esta ruta /api/cart
export async function POST(req: NextRequest) {
  // Body del fetch en el front
  const body = await req.json();
  const productId = body.id;
  const cookiesValue = req.cookies;
  pool.query('query para insertar en db');

  // Cuando terminas retornas response
  return new Response(JSON.stringify({ lo: 'que quieras' }), { status: 200 });
}
