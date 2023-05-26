'use client';
import { FormEventHandler } from 'react';
// import {useRouter} from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

export default async function SignIn() {
  const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC}`);
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full">
      <div className="absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg min-w-fit flex justify-center bg-blue-300 shadow-black shadow-2xl">
        <Elements stripe={stripe}></Elements>
        {/* <form className="px-3 grid grid-cols-1">
         
        </form> */}
      </div>
    </div>
  );
}
