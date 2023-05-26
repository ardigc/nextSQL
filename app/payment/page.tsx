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
  });

  const clientSecret = paymentIntent.client_secret;

  console.log(clientSecret);
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full">
      {clientSecret && <CheckOutPage clientSecret={clientSecret} />}
    </div>
  );
}

// export default async function SignIn() {
//   const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC}`);
//   const { cart } = useContext(GlobalContext);

//   function totalPrice(products: Array<Cart>) {
//     let total = 0;
//     products.map((product) => {
//       const price = product.price * product.qt;
//       total = total + price;
//     });
//     return total;
//   }
// const price = totalPrice(cart)
// console.log(price)
// const createPayment: MouseEventHandler<HTMLButtonElement> = async(ev)=>{
//     ev.preventDefault()
// const response = await fetch("/api/payment",{
//     method: 'POST',
//     body: JSON.stringify({
//         amount: price*100,
//         description: 'Pago en app'
//     })
// })
// const data = await response.json()
// }
// const usingStripe = useStripe()
// const elements= useElements()
// const confirmPayment = async (paySecret: string) =>{
//     if(usingStripe){
//   const {token} = await  usingStripe?.createToken(elements?.getElement(CardElement)!)
// usingStripe?.confirmCardPayment(paySecret, {
//     payment_method: {
//         card: elements?.getElement(CardElement)!,
//         billing_details:{
//             name: 'el nombre',
//             email: 'elcorreo',
//             phone: 'el telefono',
//             address: {line1: 'direccion', city: 'ciudad', country: 'pais', postal_code:'codigo postal'}
//         },
//     }
// })
// }
// }
//   return (
//     <Elements stripe={stripe}>
//       <div className="relative top-12 bg-blue-100 h-screen w-full">
//         <div className="absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg w-2/4 flex justify-center bg-blue-300 shadow-black shadow-2xl">
//           <form className="px-3 grid grid-cols-1 w-full">
//             <CardElement id="card-element" />
//             <button type='submit' onClick={createPayment}>Pagar</button>
//           </form>
//         </div>
//       </div>
//     </Elements>
//   );
// }
