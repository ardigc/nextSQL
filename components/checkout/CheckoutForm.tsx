'use client';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from 'gordo-ui';
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
    <form onSubmit={submitHandler} className="p-2">
      <PaymentElement />
      <div className="flex justify-between mt-2">
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
        <Button variant="contained" disableRipple color="success">
          Pagar
        </Button>
      </div>
      <div className="text-xs font-light">*Pago seguro a traves de Stripe</div>
    </form>
  );
}
