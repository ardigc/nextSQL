import { OrderIcon } from '@/components/Icons/Icons';
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
      `INSERT INTO orders (user_id, cart_id, adress) VALUES (${userId.rows[0].user_id}, ${userId.rows[0].id}, ${paymentIntent.metadata.adressId}) RETURNING id`
    );
    const sellers = await pool.query(
      `SELECT DISTINCT orders.id, products.seller_id FROM orders INNER JOIN carts ON orders.cart_id = carts.id INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id INNER JOIN users_adress ON orders.adress = users_adress.id AND orders.id = ${order.rows[0].id}`
    );
    console.log('sellers:', sellers.rows);
    let selletString = '';
    sellers.rows.map((seller, index) => {
      if (sellers.rows.length > index + 1) {
        selletString = selletString + `(${seller.id}, ${seller.seller_id}), `;
      } else {
        selletString = selletString + `(${seller.id}, ${seller.seller_id})`;
      }
    });
    console.log('string', selletString);
    const shipment = await pool.query(
      `INSERT INTO shipment(order_id, seller_id) VALUES ${selletString}`
    );
    console.log('shipment', shipment);
  } catch (error) {
    console.log(error);
  }
  // console.log(userId)
  return (
    <div className="relative top-12 bg-blue-100 min-h-screen w-full ">
      <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center text-center bg-blue-300 shadow-black shadow-2xl  ">
        <div>Pedido realizado correctamente!</div>
        <div className="flex justify-center my-4">
          <OrderIcon />
        </div>
        <Link
          className="border rounded-3xl bg-blue-400 px-2 mx-10"
          href="/profile/orders"
        >
          Ir a mis pedidos
        </Link>
      </div>
    </div>
  );
}
// intentar retrive
