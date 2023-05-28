import { OrderIcon } from '@/Icons/Icons';
import { pool } from '@/lib/server/pg';
import { stripeClient } from '@/lib/server/stripe';
import Link from 'next/link';

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
  // console.log(paymentIntent.metadata.cartId);

  const userId = await pool.query(
    "UPDATE carts SET state='pay' WHERE id=" +
      paymentIntent.metadata.cartId +
      ' returning *'
  );
  // console.log(userId.rows[0]);
  try {
    const order = await pool.query(
      `INSERT INTO orders (user_id, cart_id, adress) VALUES (${userId.rows[0].user_id}, ${userId.rows[0].id}, ${paymentIntent.metadata.adressId})`
    );
  } catch {}
  // console.log(userId)
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full ">
      <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center text-center bg-blue-300 shadow-black shadow-2xl  ">
        <div>Pedido realizado correctamente!</div>
        <div className="flex justify-center my-4">
          <OrderIcon />
        </div>
        <Link
          className="border rounded-3xl bg-blue-400 px-2 mx-10"
          href="/orders"
        >
          Ir a mis pedidos
        </Link>
      </div>
    </div>
  );
}
// intentar retrive
