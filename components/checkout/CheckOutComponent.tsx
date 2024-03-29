'use client';

import { MouseEvent, MouseEventHandler, useContext, useState } from 'react';
import { CartInterface, GlobalContext } from '../context/ContextProvider';
import { MinusIcon, PlusIcon, TrashIcon } from '@/components/Icons/Icons';
import { Spiner } from '../UI/Spiner';
import Link from 'next/link';
import { Alert, Button, IconButton, Paper, SnackBar } from 'gordo-ui';
import Image from 'next/image';

type SellerCart = {
  cart_id: number;
  description: string;
  name: string;
  price: number;
  product_id: number;
  qt: number;
  seller_id: number;
  seller_name: string;
  user_id: number;
  image_url: string;
}[];

export default function CheckOutComponent() {
  const { cart } = useContext(GlobalContext);
  const { setCart } = useContext(GlobalContext);
  const [deleteSnackbar, setDeleteSnackbar] = useState<
    'deleting' | 'deleted' | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(-1);
  const getSellers = (cart: CartInterface[]) => {
    const sellersId: number[] = [];
    cart.map((item) => {
      if (sellersId.findIndex((seller) => seller === item.seller_id) === -1) {
        sellersId.push(item.seller_id);
      }
    });
    let sellersCart = {};

    sellersId.forEach((seller) => {
      const products = cart.filter((item) => item.seller_id === seller);
      sellersCart = { ...sellersCart, [seller]: products };
    });

    return sellersCart;
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

  const qtOnClick = async (
    mode: number,
    product: CartInterface,
    ev: MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault();
    setIsLoading(product.product_id);
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
  const cartArrayBySellers: Array<[string, SellerCart]> = Object.entries(
    getSellers(cart)
  );

  return (
    <Paper className=" mx-auto mt-7 border rounded-lg min-w-fit flex flex-col md:flex-row p-5 gap-5 justify-center bg-white max-w-5xl ">
      <div className="flex-1 flex flex-col gap-3">
        {cartArrayBySellers.map((sellerItems) => (
          <div key={sellerItems[0]} className="flex flex-col gap-1">
            Vendido y enviado por {sellerItems[1][0].seller_name}
            {sellerItems[1].map((item) => (
              <div key={item.product_id} className="flex">
                <Link
                  href={`/products/${item.product_id}`}
                  className="border rounded-md flex p-2 flex-1"
                >
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
                    <div className="flex  items-center">
                      Unidades:{' '}
                      <IconButton
                        disableRipple
                        onClick={(ev) => qtOnClick(1, item, ev)}
                      >
                        <PlusIcon />
                      </IconButton>
                      {isLoading === item.product_id ? <Spiner /> : item.qt}
                      <IconButton
                        disableRipple
                        onClick={(ev) => qtOnClick(2, item, ev)}
                      >
                        <MinusIcon />
                      </IconButton>
                    </div>
                  </div>
                </Link>
                <IconButton
                  disableRipple
                  onClick={() => clickDeleteHandler(item)}
                  className="[div>&]:hover:bg-transparent"
                >
                  <TrashIcon />
                </IconButton>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex-1 h-fit text-lg rounded-lg flex flex-col p-5 gap-5 bg-neutral-100">
        <div className="font-semibold">Resumen</div>
        <div className="py-3 border-t border-b flex flex-col gap-2">
          <div className="flex justify-between text-base">
            <p>Subtotal</p>
            <div>{totalPrice(cart)}€</div>
          </div>
          <div className="flex justify-between text-base">
            <p>Coste del envio</p>
            <div>Gratis</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <div>{totalPrice(cart)}€</div>
          </div>
          <div className="text-xs">IVA incluido</div>
        </div>
        <div className="flex justify-center">
          <Link href="/adressConfiguration">
            <Button variant="contained" disableRipple color="success">
              Direccion de envio
            </Button>
          </Link>
        </div>
      </div>
      <SnackBar
        className="[div>&]:max-[768px]:w-full [div>&]:max-[768px]:left-0 "
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
    </Paper>
  );
}
