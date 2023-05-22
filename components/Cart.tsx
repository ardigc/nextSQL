'use client';
import { CartIcon, TrashIcon } from '@/Icons/Icons';
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
  const [showCart, setShowCart] = useState(false);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    setShowCart(!showCart);
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
      <button onClick={clickHandler}>
        <CartIcon />
      </button>
      {showCart && (
        <div className="fixed left-0 top-12 bottom-0 bg-slate-400 w-52">
          <div className="bg-slate-500 flex justify-center">Carrito</div>
          {cartfin.map((product) => (
            <div className="border px-3">
              <div className="flex justify-center">{product.name}</div>
              <div className="flex">
                <TrashIcon />
                <div>
                  <div className="flex justify-end">
                    Precio: {product.price}€
                  </div>
                  <div className="flex justify-end">Unidades: {product.qt}</div>
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
