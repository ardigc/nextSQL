'use client';

import Link from 'next/link';
import { MouseEventHandler, useContext } from 'react';
import { GlobalContext } from '../context/ContextProvider';

export function Product({
  name,
  description,
  price,
  id,
}: {
  name: string;
  id: number;
  description: string;
  price: number;
}) {
  const { setCart } = useContext(GlobalContext);
  const enlace = '/products/' + id;
  const clickHandler: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    ev.preventDefault();
    const response = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setCart(data);

    // window.location.reload();
  };
  return (
    // hacer que no se vaya al enlace al hacer click sobre button
    <div
      key={id}
      className="w-11/12  border text-center mx-auto  rounded-lg p-3 my-2 relative top-7 flex justify-center bg-blue-300 shadow-black shadow-md "
    >
      <Link href={enlace} className="flex-grow">
        <div className="flex justify-center">{name}</div>
        <div className="flex justify-center items-center">{description}</div>
        <div className="flex justify-end items-center">
          <button
            className="px-1 border bg-blue-400 rounded-3xl mx-5"
            onClick={clickHandler}
          >
            Añadir al carrito
          </button>
          <div className="w-16 flex justify-end me-2">{price} €</div>
        </div>
      </Link>
    </div>
  );
}
