import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';
import { hash } from 'bcrypt';
import { stripeClient } from '@/lib/server/stripe';
import { sign } from 'jsonwebtoken';
const stripe = stripeClient;
export async function POST(req: NextRequest) {
  const body = await req.json();
  const unhasedPass = body.pass;
  const hashedPass = await hash(unhasedPass, 10);
  const query =
    'INSERT INTO users_info(name,email, subname, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const parameters = [
    body.name,
    body.email,
    body.subname,
    body.phone,
    hashedPass,
    body.role,
  ];
  const result = await pool.query(query, parameters);
  const customer = await stripe.customers.create({ email: body.email });
  // console.log(result);
  const token = sign(
    { id: result.rows[0].id, name: result.rows[0].name },
    process.env.JWT_SECRET || ''
  );
  return new Response(JSON.stringify({ token }), { status: 200 });
}
