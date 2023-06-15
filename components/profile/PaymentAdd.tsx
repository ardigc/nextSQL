'use client';
import { MouseEvent, MouseEventHandler, useState } from 'react';
import CheckOutPage from '../payment/paymentComponent';
import { TrashIconLittle } from '../Icons/Icons';
interface PaymentMethod {
  id: string;
  card?: {
    brand: string;
    exp_month: number;
    exp_year: number;
    last4: string;
    funding: string;
  };
}
export default function PaymentChange({
  clientSecret,
  setUp,
  paymentMethod,
}: {
  clientSecret: string;
  setUp?: boolean;
  paymentMethod: Array<PaymentMethod>;
}) {
  const [paymentId, setPaymentId] = useState('');

  const [addPayment, setAddPayment] = useState(false);
  const clickHandler = async (ev: MouseEvent, id: string) => {
    const response = await fetch('/api/payment', {
      method: 'PUT',
      body: JSON.stringify({ id }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setPaymentId(data.id);
  };
  return (
    <div>
      {!addPayment && (
        <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl ">
          {paymentMethod.length === 0 && (
            <div>No tienes ningun metodo de pago configurado</div>
          )}
          {paymentMethod.length > 0 && (
            <>
              Tus medios de pago:
              <div className="my-5 grid grid-cols-[3fr_3fr_4fr_4fr_4fr_1fr] ">
                <div className="flex justify-center">Marca</div>
                <div className="flex justify-center">Tipo</div>
                <div className="flex justify-center">Mes caducidad</div>
                <div className="flex justify-center">Año caducidad</div>
                <div className="flex justify-center">Ultimos digitos</div>
                <div></div>
              </div>
              {paymentMethod.map((payment) => (
                // <div className="mb-5 grid grid-cols-[3fr_3fr_4fr_4fr_4fr_1fr]">
                <div
                  className="my-5 grid grid-cols-[3fr_3fr_4fr_4fr_4fr_1fr] "
                  key={payment.id}
                >
                  <div className="flex justify-center">
                    {' '}
                    {payment.card?.brand}
                  </div>
                  <div className="flex justify-center">
                    {' '}
                    {payment.card?.funding}
                  </div>
                  <div className="flex justify-center">
                    {' '}
                    {payment.card?.exp_month}
                  </div>
                  <div className="flex justify-center">
                    {' '}
                    {payment.card?.exp_year}
                  </div>
                  <div className="flex justify-center">
                    {' '}
                    {payment.card?.last4}
                  </div>
                  <button onClick={(ev) => clickHandler(ev, payment.id)}>
                    {' '}
                    <TrashIconLittle />
                  </button>
                </div>
              ))}
            </>
          )}
          <div className="flex justify-end">
            <button
              className="px-1 border bg-blue-400 rounded-3xl mx-5"
              onClick={() => setAddPayment(true)}
            >
              Añadir medio de pago
            </button>
          </div>
        </div>
      )}
      {addPayment && (
        <CheckOutPage
          paymentId={paymentId}
          setUp={setUp}
          clientSecret={clientSecret}
        />
      )}
    </div>
  );
}
