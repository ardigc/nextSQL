'use client';
import { CartIcon, TrashIcon, UserIcon } from '@/components/Icons/Icons';
import { MouseEventHandler, useContext, useState } from 'react';
import { CartInterface, GlobalContext } from '../context/ContextProvider';
import ProfileButton from '../profile/profile';
import Link from 'next/link';
import {
  Alert,
  Button,
  IconButton,
  Paper,
  Popover,
  SnackBar,
  XIcon,
} from 'gordo-ui';
import Image from 'next/image';
import { Spiner } from '../UI/Spiner';

export default function Cart({
  user,
}: {
  user: { id: number; name: string; role: string };
}) {
  const [deleteSnackbar, setDeleteSnackbar] = useState<
    'deleting' | 'deleted' | undefined
  >(undefined);
  const { setCart } = useContext(GlobalContext);
  const { cart } = useContext(GlobalContext);
  const cartfin = cart;
  const [showCart, setShowCart] = useState(false);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    setShowCart(!showCart);
  };
  const clickDeleteHandler = async (product: CartInterface) => {
    setDeleteSnackbar('deleting');
    const id = product.product_id;
    const response = await fetch('/api/cart', {
      method: 'PUT',
      body: JSON.stringify({ id }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      setDeleteSnackbar('deleted');
    }
    setCart(data);
  };

  function totalPrice(products: Array<CartInterface>) {
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
        className="top-7 bottom-0 md:bottom-7 left-0 right-0 md:left-7 md:right-7 p-5 bg-white flex flex-col gap-5 overflow-auto"
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
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="flex-1 flex-col gap-2 flex">
            {cartfin.length > 0 &&
              cartfin.map((item) => (
                <div key={item.product_id} className="flex">
                  <div className="border rounded-md flex p-2 flex-1">
                    <div className="min-h-[75px] min-w-[75px] flex justify-center items-center">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={75}
                        height={75}
                      ></Image>
                    </div>
                    <div className="flex flex-col  ml-2 justify-between">
                      <div className="text-lg font-semibold">{item.name}</div>
                      <div className="text-lg">Precio: {item.price}€</div>
                      <div>Unidades: {item.qt}</div>
                    </div>
                  </div>
                  <IconButton
                    disableRipple
                    onClick={() => clickDeleteHandler(item)}
                    className="[div>&]:hover:bg-transparent"
                  >
                    <TrashIcon />
                  </IconButton>
                </div>
              ))}
            {cartfin.length === 0 && (
              <div className=" flex-col gap-5 flex items-center justify-center h-full border rounded-md pt-2 pb-4">
                <div>No tienes nada en el carrito</div>
                <div> Aprovecha nuestras ofertas</div>
                <Link href={'/products'} onClick={() => setShowCart(false)}>
                  <Button variant="contained" color="success">
                    Continuar comprando
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex-1 h-fit text-lg rounded-lg flex flex-col p-5 gap-5 bg-neutral-100">
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
        <SnackBar
          className="[div>&]:max-[768px]:w-full [div>&]:max-[768px]:left-0 [div>&]:sticky"
          open={Boolean(deleteSnackbar)}
          autoHideDuration={deleteSnackbar === 'deleting' ? undefined : 2000}
          onClose={() => setDeleteSnackbar(undefined)}
        >
          <Alert
            className="[div>&]:bg-blue-200 [div>&]:text-black"
            icon={deleteSnackbar === 'deleting' ? <Spiner /> : undefined}
          >
            {deleteSnackbar === 'deleting'
              ? 'Eliminando'
              : 'Eliminado correctamente'}
          </Alert>
        </SnackBar>
      </Popover>
    </div>
  );
}
