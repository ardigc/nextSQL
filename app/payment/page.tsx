'use client';
import { FormEventHandler, MouseEventHandler, useContext } from 'react';
// import {useRouter} from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { GlobalContext } from '@/components/ContextProvider';

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

export default async function SignIn() {
  const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC}`);
  const { cart } = useContext(GlobalContext);

  function totalPrice(products: Array<Cart>) {
    let total = 0;
    products.map((product) => {
      const price = product.price * product.qt;
      total = total + price;
    });
    return total;
  }
  const price = totalPrice(cart);
  console.log(price);
  const createPayment: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    ev.preventDefault();
    const response = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({
        amount: price * 100,
        description: 'Pago en app',
      }),
    });
    const data = await response.json();
    console.log(data.client_secret);
  };
  const usingStripe = useStripe();
  const elements = useElements();
  const confirmPayment = async (paySecret: string) => {
    if (usingStripe) {
      const { token } = await usingStripe?.createToken(
        elements?.getElement(CardElement)!
      );
      usingStripe?.confirmCardPayment(paySecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
          billing_details: {
            name: 'el nombre',
            email: 'elcorreo',
            phone: 'el telefono',
            address: {
              line1: 'direccion',
              city: 'ciudad',
              country: 'pais',
              postal_code: 'codigo postal',
            },
          },
        },
      });
    }
  };
  return (
    <Elements stripe={stripe}>
      <div className="relative top-12 bg-blue-100 h-screen w-full">
        <div className="absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg w-2/4 flex justify-center bg-blue-300 shadow-black shadow-2xl">
          <form className="px-3 grid grid-cols-1 w-full">
            <CardElement id="card-element" />
            <button type="submit" onClick={createPayment}>
              Pagar
            </button>
          </form>
        </div>
      </div>
    </Elements>
  );
}
