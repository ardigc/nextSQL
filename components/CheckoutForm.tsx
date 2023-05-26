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
      <form
        className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl "
        onSubmit={submitHandler}
      >
        <PaymentElement />
        <div className="flex justify-end">
          <button
            className="px-2 py-1 mt-2 border bg-blue-400 rounded-3xl"
            type="submit"
          >
            Pagar
          </button>
        </div>
      </form>
    </div>
  );
}
