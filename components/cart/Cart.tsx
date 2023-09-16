'use client';
import { CartIcon, TrashIcon, UserIcon } from '@/components/Icons/Icons';
import { MouseEventHandler, useContext, useState } from 'react';
import { GlobalContext } from '../context/ContextProvider';
import ProfileButton from '../profile/profile';
import Link from 'next/link';
import { Button, IconButton, Paper, Popover, XIcon } from 'gordo-ui';
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

export default function Cart({
  user,
}: {
  user: { id: number; name: string; role: string };
}) {
  // const { number } = useContext(GlobalContext);
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
  }
  const totalProducts = () => {
    const product = cart.reduce((total, product) => {
      return total + product.qt;
    }, 0);
    return product;
  };
  return (
    <div className="relative">
      <div className="flex gap-3 justify-between items-center">
        <ProfileButton user={user} />
        <button onClick={clickHandler}>
          <CartIcon />
        </button>
      </div>

      <Popover
        open={showCart}
        className="top-7 bottom-0 md:bottom-7 left-0 right-0 md:left-7 md:right-7 p-5 bg-white flex flex-col"
        onClose={() => setShowCart(false)}
      >
        <div className="flex justify-between">
          <div>
            <div className="text-lg">Mi carrito</div>
            <div className="text-xs">
              {totalProducts() > 1
                ? `${totalProducts()} productos`
                : `${totalProducts()} producto`}
            </div>
          </div>
          <div>
            <IconButton disableRipple onClick={() => setShowCart(false)}>
              <XIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <div className="flex-1">d</div>
          <div className="flex-1 text-lg rounded-lg flex flex-col p-5 gap-5 bg-neutral-100">
            <div className="font-semibold">Resumen</div>
            <div className="py-3 border-t border-b flex flex-col gap-2">
              <div className="flex justify-between text-base">
                <p>Subtotal</p>
                <div>{totalPrice(cartfin)}€</div>
              </div>
              <div className="flex justify-between text-base">
                <p>Coste del envio</p>
                <div>Gratis</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <div>{totalPrice(cartfin)}€</div>
              </div>
              <div className="text-xs">IVA incluido</div>
            </div>
            <div className="flex justify-center">
              <Link href="/checkout" onClick={() => setShowCart(false)}>
                <Button variant="contained" disableRipple color="success">
                  Comprar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Popover>
      {/* 
      {showCart && (
        <div className="fixed left-0 top-12 bottom-0 bg-blue-300 w-52 border border-blue-600 overflow-auto">
          <div className="bg-blue-400 flex justify-center">Carrito</div>
          {cartfin.map((product) => (
            <div key={product.id} className="border px-3">
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
          <div className="text-right mx-3">
            Precio total: {totalPrice(cartfin)} €{' '}
            <Link
              className="px-1 border bg-blue-400 rounded-3xl"
              href="/checkout"
            >
              CHECKOUT
            </Link>
          </div>
        </div>
      )} */}
    </div>
  );
}
