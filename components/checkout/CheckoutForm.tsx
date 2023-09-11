'use client';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
export default function CheckoutForm({
  setUp,
  clientSecret,
  paymentId,
}: {
  setUp?: boolean;
  paymentId: string;
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (setUp) {
      const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: new URL(
            '/profile/payment',
            window.location.origin
          ).toString(),
        },
      });
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: new URL('/confirmation', window.location.origin).toString(),
      },
    });
  };

  const changeHandler: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const check = e.target.checked;
    const respone = await fetch('/api/payment', {
      method: 'PATCH',
      body: JSON.stringify({ check, paymentId }),
      headers: {
        'Content-type': 'application/json',
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
        <div className="flex justify-between">
          {!setUp && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="check"
                  onChange={changeHandler}
                ></input>
                <label htmlFor="check" className="ml-2">
                  Guardar para futuras compras
                </label>
              </div>
            </>
          )}
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
