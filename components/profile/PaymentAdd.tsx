'use client';
import { useState } from 'react';
import CheckOutPage from '../payment/paymentComponent';

export default function PaymentChange({
  clientSecret,
  setUp,
}: {
  clientSecret: string;
  setUp?: boolean;
}) {
  const [addPayment, setAddPayment] = useState(false);
  return (
    <div>
      {!addPayment && (
        <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl ">
          <button onClick={() => setAddPayment(true)}>
            Añadir medio de pago
          </button>
        </div>
      )}
      {addPayment && <CheckOutPage setUp={setUp} clientSecret={clientSecret} />}
    </div>
  );
}
