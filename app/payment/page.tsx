import { FormEventHandler, MouseEventHandler, useContext } from 'react';
// import {useRouter} from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { GlobalContext } from '@/components/ContextProvider';
import { stripeClient } from '@/lib/server/stripe';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { pool } from '@/lib/server/pg';
import CheckOutForm from '@/components/paymentComponent';
import CheckOutPage from '@/components/paymentComponent';

interface Cart {
  cart_id: number;
  description: string;
  id: number;
  name: string;
  price: number;
  product_id: number;
  qt: number;
  user_id: number;
}

export default async function Payment() {
  function totalPrice(products: Array<Cart>) {
    let total = 0;
    products.map((product) => {
      const price = product.price * product.qt;
      total = total + price;
    });
    return total;
  }
  const cookiesValue = cookies();
  let user = null;
  let cart = null;
  let name = 'und';
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    // console.log(user);
    name = user.name;
    const cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + user.id
    );
    cart = await pool.query(
      'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
        cartId.rows[0].id
    );
  } catch (error) {
    throw new Error('no tienes iniciada sesion');
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: totalPrice(cart.rows) * 100,
    currency: 'eur',
    payment_method_types: ['card'],
    metadata: { 'order_id:': cart.rows[0].cart_id },
  });

  const clientSecret = paymentIntent.client_secret;

  console.log(paymentIntent);
  console.log(clientSecret);
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full">
      {clientSecret && <CheckOutPage clientSecret={clientSecret} />}
    </div>
  );
}
