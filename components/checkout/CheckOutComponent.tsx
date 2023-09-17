'use client';

import { useContext, useState } from 'react';
import { CartInterface, GlobalContext } from '../context/ContextProvider';
import { MinusIcon, PlusIcon, TrashIcon } from '@/components/Icons/Icons';
import { Spiner } from '../UI/Spiner';
import Link from 'next/link';
import { Button, IconButton, Paper } from 'gordo-ui';
import Image from 'next/image';

type SellerCart = {
  [sellerId: string]: {
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
};

export default function CheckOutComponent({ cart }: { cart: SellerCart }) {
  const { cart: normalCart } = useContext(GlobalContext);
  const { setCart } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(-1);
  const clickDeleteHandler = async (product: CartInterface) => {
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
    if (response.ok) window.location.reload();
  };
  function totalPrice(products: Array<CartInterface>) {
    return products.reduce((total, products) => {
      const price = products.price * products.qt;
      return total + price;
    }, 0);
  }

  const qtOnClick = async (mode: number, product: CartInterface) => {
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
  const cartArrayBySellers = Object.entries(cart);

  return (
    <Paper className=" mx-auto mt-7 border rounded-lg min-w-fit flex p-5 gap-5 justify-center bg-white max-w-5xl ">
      <div className="flex-1 flex flex-col gap-3">
        {cartArrayBySellers.map((sellerItems) => (
          <div key={sellerItems[0]} className="flex flex-col gap-1">
            Vendido y enviado por {sellerItems[1][0].seller_name}
            {sellerItems[1].map((item) => (
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
          </div>
        ))}
      </div>
      <div className="flex-1 h-fit text-lg rounded-lg flex flex-col p-5 gap-5 bg-neutral-100">
        <div className="font-semibold">Resumen</div>
        <div className="py-3 border-t border-b flex flex-col gap-2">
          <div className="flex justify-between text-base">
            <p>Subtotal</p>
            <div>{totalPrice(normalCart)}€</div>
          </div>
          <div className="flex justify-between text-base">
            <p>Coste del envio</p>
            <div>Gratis</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <div>{totalPrice(normalCart)}€</div>
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
    </Paper>
    // <div className="absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg w-2/4 flex justify-center bg-blue-300 shadow-black shadow-2xl">
    //   <div className="m-5 grid grid-cols-1 w-full">
    //     <p className="justify-center items-center flex">Tu carrito</p>
    //     {cart.map((product) => (
    //       <div key={product.id} className="m-5">
    //         <div className="flex justify-center">{product.name}</div>
    //         <div className="flex justify-between">
    //           <button
    //             onClick={() => clickHandler2(product)}
    //             className="order-first"
    //           >
    //             <TrashIcon />
    //           </button>
    //           <div className="text-right">
    //             <div>Precio: {product.price}€</div>
    //             <div className="flex justify-center items-center">
    //               Unidades:{' '}
    //               <button
    //                 className="bg-blue-400 border  border-blue-500 m-1 ml-2"
    //                 onClick={(ev) => qtOnClick(1, product)}
    //               >
    //                 <PlusIcon />
    //               </button>
    //               {isLoading !== product.id && product.qt}
    //               {isLoading === product.id && <Spiner />}
    //               <button
    //                 className="bg-blue-400 border border-blue-500 m-1 mr-2"
    //                 onClick={(ev) => qtOnClick(2, product)}
    //               >
    //                 <MinusIcon />
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //     <div>Precio total: {totalPrice(cart)} €</div>
    //     <div className="flex justify-end">
    //       <Link
    //         className="border rounded-3xl bg-blue-400 px-2 mx-10"
    //         href="/adressConfiguration"
    //       >
    //         Direccion de envio
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}
