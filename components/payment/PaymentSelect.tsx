'use client';

import { MouseEvent, useState } from 'react';
import CheckOutPage from './paymentComponent';
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
export default function PaymentSelect({
  paymentMethod,
  cart,
  adressId,
  customerId,
}: {
  paymentMethod: Array<PaymentMethod>;
  cart: Array<Cart>;
  adressId: number;
  customerId: string;
}) {
  const [paymentId, setPaymentId] = useState('');
  const [newCard, setNewCard] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  function totalPrice(products: Array<Cart>) {
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
      //   console.log(data);
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
    // console.log(data.id)
    setClientSecret(data.client_secret);
    setPaymentId(data.id);
  };

  //   console.log(paymentId);
  return (
    <div>
      {!newCard && (
        <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl ">
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
                  {/* <button
                className="px-1 border bg-blue-400 rounded-3xl mx-5"
                onClick={(ev) => clickHandler(ev, paymentId)}
              >
                Pagar
              </button> */}
                </div>
              </>
            )}
            {paymentMethod.length > 0 && (
              <>
                Tus medios de pago:
                <div className="my-5 grid grid-cols-[3fr_3fr_4fr_4fr_4fr_2fr] ">
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
                    key={payment.id}
                    className="my-5 grid grid-cols-[3fr_3fr_4fr_4fr_4fr_2fr] "
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
                    <div className="flex items-center justify-center">
                      <input
                        name="card"
                        className="w-3 h-3"
                        onChange={() => setPaymentId(payment.id)}
                        type="radio"
                      ></input>
                    </div>
                  </div>
                ))}
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
              </>
            )}
          </>
        </div>
      )}
      {newCard && (
        <>
          {clientSecret && (
            <CheckOutPage paymentId={paymentId} clientSecret={clientSecret} />
          )}
        </>
      )}
    </div>
  );
}
