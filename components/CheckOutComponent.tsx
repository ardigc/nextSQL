'use client';

import { useContext, useState } from 'react';
import { GlobalContext } from './ContextProvider';
import { MinusIcon, PlusIcon, TrashIcon } from '@/Icons/Icons';
import { Spiner } from './Spiner';

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

export default function CheckOutComponent() {
  const { cart } = useContext(GlobalContext);
  const { setCart } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(-1);

  console.log(cart);
  const clickHandler2 = async (product: Cart) => {
    const id = product.product_id;
    const response = await fetch('/api/cart', {
      method: 'PUT',
      body: JSON.stringify({ id }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setCart(data);
  };
  function totalPrice(products: Array<Cart>) {
    let total = 0;
    products.map((product) => {
      const price = product.price * product.qt;
      total = total + price;
    });
    return total;
  }

  const qtOnClick = async (mode: number, product: Cart) => {
    setIsLoading(product.id);
    const id = product.product_id;
    if (mode === 1) {
      product.qt++;
    } else if (mode === 2) {
      product.qt--;
    }
    const qt = product.qt;
    const response = await fetch('/api/cart', {
      method: 'PATCH',
      body: JSON.stringify({ id, qt }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setCart(data);
    setIsLoading(-1);
  };
  return (
    <div className="absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg w-2/4 flex justify-center bg-blue-300 shadow-black shadow-2xl">
      <div className="m-5 grid grid-cols-1 w-full">
        <p className="justify-center items-center flex">Tu carrito</p>
        {cart.map((product) => (
          <div className="m-5">
            <div className="flex justify-center">{product.name}</div>
            <div className="flex justify-between">
              <button
                onClick={() => clickHandler2(product)}
                className="order-first"
              >
                <TrashIcon />
              </button>
              <div className="text-right">
                <div>Precio: {product.price}€</div>
                <div className="flex justify-center items-center">
                  Unidades:{' '}
                  <button
                    className="bg-blue-400 border  border-blue-500 m-1 ml-2"
                    onClick={(ev) => qtOnClick(1, product)}
                  >
                    <PlusIcon />
                  </button>
                  {isLoading !== product.id && product.qt}
                  {isLoading === product.id && <Spiner />}
                  <button
                    className="bg-blue-400 border border-blue-500 m-1 mr-2"
                    onClick={(ev) => qtOnClick(2, product)}
                  >
                    <MinusIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div>Precio total: {totalPrice(cart)} €</div>
      </div>
    </div>
  );
}
