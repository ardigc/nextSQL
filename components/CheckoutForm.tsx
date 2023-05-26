'use client';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FormEventHandler } from 'react';
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: new URL('/confirmation', window.location.origin).toString(),
      },
    });
  };
  return (
    <div>
      <form className="w-11/12 max-w-2xl mx-auto" onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
}
