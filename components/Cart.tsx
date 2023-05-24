'use client';
import { CartIcon, TrashIcon, UserIcon } from '@/Icons/Icons';
import { MouseEventHandler, useContext, useState } from 'react';
import { GlobalContext } from './ContextProvider';
import Link from 'next/link';
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

export default function Cart() {
  // const { number } = useContext(GlobalContext);
  // console.log(cart)
  // const cartfin = cart.cart;
  const { setCart } = useContext(GlobalContext);
  const { cart } = useContext(GlobalContext);
  const cartfin = cart;
  const [showCart, setShowCart] = useState(false);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    setShowCart(!showCart);
  };
  const clickHandler2 = async (product: Cart) => {
    const id = product.product_id;
    const response = await fetch('/api/cart', {
      method: 'PATCH',
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
  return (
    <div className="relative">
      <div className="flex">
        <button onClick={clickHandler}>
          <CartIcon />
        </button>
        <Link href="/profile">
          <UserIcon />
        </Link>
      </div>

      {showCart && (
        <div className="fixed left-0 top-12 bottom-0 bg-slate-400 w-52">
          <div className="bg-slate-500 flex justify-center">Carrito</div>
          {cartfin.map((product) => (
            <div className="border px-3">
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
                  <div>Unidades: {product.qt}</div>
                </div>
              </div>
            </div>
          ))}
          <div>Precio total: {totalPrice(cartfin)} €</div>
        </div>
      )}
    </div>
  );
}
