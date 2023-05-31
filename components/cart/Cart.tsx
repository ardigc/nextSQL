'use client';
import { CartIcon, TrashIcon, UserIcon } from '@/components/Icons/Icons';
import { MouseEventHandler, useContext, useState } from 'react';
import { GlobalContext } from '../context/ContextProvider';
import ProfileButton from '../profile/profile';
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

export default function Cart({ user }: { user: string }) {
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
    return products.reduce((total, products) => {
      const price = products.price * products.qt;
      return total + price;
    }, 0);
    // let total = 0;
    // products.map((product) => {
    //   const price = product.price * product.qt;
    //   total = total + price;
    // });
    // return total;
  }
  return (
    <div className="relative">
      <div className="flex w-48 justify-between items-center">
        <ProfileButton user={user} />
        <button onClick={clickHandler}>
          <CartIcon />
        </button>
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
          <div>
            Precio total: {totalPrice(cartfin)} €{' '}
            <Link href="/checkout">CHECKOUT</Link>
          </div>
        </div>
      )}
    </div>
  );
}
