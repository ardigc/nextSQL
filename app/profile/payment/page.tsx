import CheckOutPage from '@/components/payment/paymentComponent';
import PaymentChange from '@/components/profile/PaymentAdd';
import { pool } from '@/lib/server/pg';
import { stripeClient } from '@/lib/server/stripe';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
const stripe = stripeClient;
export default async function PaymentConfig() {
  const cookiesValue = cookies();
  let user = null;
  let customerId = null;
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

    const customer = await stripe.customers.search({
      query: `email:\'${user.rows[0].email}\'`,
    });
    customerId = customer.data[0].id;
    // Ahora tendria que hacer un retrieve o la lista de setup intents con
    // const lista= await stripe.setupIntents.list
  } catch (error: any) {
    throw 'No tienes iniciada sesion';
  }
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
  });
  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card'],
    customer: customerId,
  });
  const clientSecret = setupIntent.client_secret;
  const setUp = true;
  return (
    <div>
      <div className="relative bg-blue-100 min-h-screen w-full">
        {clientSecret && (
          <PaymentChange
            setUp={setUp}
            paymentMethod={paymentMethods.data}
            clientSecret={clientSecret}
          />
        )}
      </div>
    </div>
  );
}
