import { pool } from '@/lib/server/pg';
import { stripeClient } from '@/lib/server/stripe';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
const stripe = stripeClient;
export default async function PaymentConfig() {
  const cookiesValue = cookies();
  let user = null;

  try {
    const userId = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof userId === 'string') return;
    user = await pool.query(
      'SELECT id, name, subname, email, phone FROM users_info WHERE id=' +
        userId.id
    );
    // console.log(user.rows[0].email)
    // console.log(`email:\'${user.rows[0].email}\'`)
    const customer = await stripe.customers.search({
      query: `email:\'${user.rows[0].email}\'`,
    });
    const customerId = customer.data[0].id;
    console.log(customerId);
  } catch (error: any) {
    throw 'No tienes iniciada sesion';
  }
  return <div></div>;
}
