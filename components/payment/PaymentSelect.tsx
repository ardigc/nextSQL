'use client';

import { MouseEvent, useState } from 'react';
import CheckOutPage from './paymentComponent';
import { CartInterface } from '../context/ContextProvider';
import { Paper } from 'gordo-ui';
import Image from 'next/image';
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

export default function PaymentSelect({
  paymentMethod,
  cart,
  adressId,
  customerId,
}: {
  paymentMethod: Array<PaymentMethod>;
  cart: Array<CartInterface>;
  adressId: number;
  customerId: string;
}) {
  const [paymentId, setPaymentId] = useState(paymentMethod[0].id);
  const [newCard, setNewCard] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  function totalPrice(products: Array<CartInterface>) {
    return products.reduce((total, products) => {
      const price = products.price * products.qt;
      return total + price;
    }, 0);
  }
  const clickHandler = async (ev: MouseEvent, id: string) => {
    const price = totalPrice(cart);
    const cartId = cart[0].cart_id;
    const response = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({ id, price, cartId, adressId, customerId }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      window.location.assign('/confirmation?payment_intent=' + data.id);
    }
  };
  const clickIntentHandler = async () => {
    setNewCard(true);
    const price = totalPrice(cart);
    const cartId = cart[0].cart_id;
    const response = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({ price, cartId, adressId, customerId }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setClientSecret(data.client_secret);
    setPaymentId(data.id);
  };
  const getPaymentIcon = (brand: string) => {
    if (brand === 'visa') {
      return 'https://ardigc.blob.core.windows.net/images/visa.png';
    } else if (brand === 'amex') {
      return 'https://ardigc.blob.core.windows.net/images/amex.png';
    } else if (brand === 'mastercard') {
      return 'https://ardigc.blob.core.windows.net/images/mastercard.png';
    } else {
      return 'https://ardigc.blob.core.windows.net/images/visa.png';
    }
  };
  console.log(paymentMethod);
  return (
    <>
      {!newCard && (
        <Paper className=" mx-auto mt-7 border rounded-lg min-w-fit flex flex-col md:flex-row p-5 gap-5 justify-center bg-white max-w-5xl ">
          <>
            {paymentMethod.length === 0 && (
              <>
                <div>No tienes ningun metodo de pago configurado</div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => clickIntentHandler()}
                    className="px-1 border bg-blue-400 rounded-3xl mx-5"
                  >
                    Pagar con otra tarjeta
                  </button>
                </div>
              </>
            )}
            {paymentMethod.length > 0 && (
              <div className="flex flex-col w-full gap-2">
                <div className="text-lg font-semibold">Tus medios de pago:</div>
                <div>Selecciona un metodo de pago</div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                  {paymentMethod.map((payment) => (
                    <div
                      style={{
                        borderWidth: paymentId === payment.id ? '2px' : '1px',
                      }}
                      key={payment.id}
                      onClick={() => setPaymentId(payment.id)}
                      className=" flex flex-col gap-2 p-2 border-black cursor-pointer rounded-md"
                    >
                      {payment.card && (
                        <div className="flex justify-center">
                          <Image
                            alt={payment.card.brand}
                            width={50}
                            height={31.25}
                            src={getPaymentIcon(payment.card.brand)}
                          />
                        </div>
                      )}
                      <div className="flex "> {payment.card?.funding}</div>
                      <div className="flex flex-col ">
                        <div className="text-xs">Fecha de caducidad</div>
                        {payment.card?.exp_month}/{payment.card?.exp_year}
                      </div>

                      <div className="flex "> **** {payment.card?.last4}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => clickIntentHandler()}
                    className="px-1 border bg-blue-400 rounded-3xl mx-5"
                  >
                    Pagar con otra tarjeta
                  </button>
                  <button
                    className="px-1 border bg-blue-400 rounded-3xl mx-5"
                    onClick={(ev) => clickHandler(ev, paymentId)}
                  >
                    Pagar
                  </button>
                </div>
              </div>
            )}
          </>
        </Paper>
      )}
      {newCard && (
        <>
          {clientSecret && (
            <CheckOutPage paymentId={paymentId} clientSecret={clientSecret} />
          )}
        </>
      )}
    </>
  );
}
