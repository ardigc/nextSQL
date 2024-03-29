import { FormEventHandler, MouseEventHandler, useContext } from 'react';
// import {useRouter} from 'next/navigation';

import { stripeClient } from '@/lib/server/stripe';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { pool } from '@/lib/server/pg';
import CheckOutPage from '@/components/payment/paymentComponent';
import PaymentSelect from '@/components/payment/PaymentSelect';
import { CartInterface } from '@/components/context/ContextProvider';
const stripe = stripeClient;

export default async function Payment() {
  function totalPrice(products: Array<CartInterface>) {
    return products.reduce((total, products) => {
      const price = products.price * products.qt;
      return total + price;
    }, 0);
  }
  const cookiesValue = cookies();
  let user = null;
  let cart = null;
  let adress = null;
  let name = 'und';
  let customerId = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    name = user.name;
    const cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + user.id + " AND state='unpay'"
    );
    const email = await pool.query(
      'SELECT email FROM users_info WHERE id=' + user.id
    );
    // intentar unir estps selects
    const customer = await stripe.customers.search({
      query: `email:\'${email.rows[0].email}\'`,
    });
    customerId = customer.data[0].id;
    cart = await pool.query(
      'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
        cartId.rows[0].id
    );
    adress = await pool.query(
      `SELECT * FROM users_adress WHERE user_id=${user.id} ORDER BY marked_as_default DESC LIMIT 1`
    );
  } catch (error: any) {
    throw error;
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
  });

  return (
    <div className="relative w-full flex">
      <PaymentSelect
        cart={cart.rows}
        adressId={adress.rows[0].id}
        customerId={customerId}
        paymentMethod={paymentMethods.data}
      />
    </div>
  );
}
