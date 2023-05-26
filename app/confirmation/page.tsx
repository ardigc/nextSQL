import { pool } from '@/lib/server/pg';
import { stripeClient } from '@/lib/server/stripe';

interface SearchParams {
  payment_intent: string;
  payment_intent_client_secret: string;
  redirect_status: string;
}
export default async function confirmation({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const stripe = stripeClient;

  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );
  console.log(paymentIntent.metadata.cartId);
  const userId = await pool.query(
    "UPDATE carts SET state='pay' WHERE id=" +
      paymentIntent.metadata.cartId +
      ' returning *'
  );
  console.log(userId.rows[0]);
  const order = await pool.query(
    `INSERT INTO orders (user_id, cart_id) VALUES (${userId.rows[0].user_id}, ${userId.rows[0].id})`
  );
  // console.log(userId)
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full ">
      <div className="border rounded-lg min-w-fit flex justify-center bg-blue-300 shadow-black shadow-2xl ">
        {' '}
      </div>
    </div>
  );
}
// intentar retrive
