'use client';
import { CartIcon } from '@/Icons/Icons';
import { MouseEventHandler, useState } from 'react';
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

export default function Cart(cart: { cart: Array<Cart> }) {
  const cartfin = cart.cart;
  console.log(cartfin[0].name);
  const [showCart, setShowCart] = useState(false);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    setShowCart(!showCart);
  };
  return (
    <div className="relative">
      <button onClick={clickHandler}>
        <CartIcon />
      </button>
      {showCart && (
        <div className="fixed left-0 top-12 bottom-0 bg-slate-400 w-36"></div>
      )}
    </div>
  );
}
