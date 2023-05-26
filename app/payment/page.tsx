'use client';
import { FormEventHandler } from 'react';
// import {useRouter} from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';

export default async function SignIn() {
  const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC}`);
  const cardStyle = {
    style: {
      base: {
        color: 'white',
        fontSize: '16px',
        fontSmoothing: 'abtuakuased',
        '::placeholder': {
          color: '#c4cld0',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  return (
    <Elements stripe={stripe}>
      <div className="relative top-12 bg-blue-100 h-screen w-full">
        <div className="absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg w-2/4 flex justify-center bg-blue-300 shadow-black shadow-2xl">
          <form className="px-3 grid grid-cols-1 w-full">
            <CardElement id="card-element" />
          </form>
        </div>
      </div>
    </Elements>
  );
}
