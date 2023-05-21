'use client';

import Link from 'next/link';
import { MouseEventHandler } from 'react';

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
  const enlace = '/products/' + id;
  const clickHandler: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    const response = await fetch('/api/auth/cart', {
      method: 'POST',
      body: JSON.stringify({ id }),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    });
  };
  return (
    <Link href={enlace} className="border border-blue-400">
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
  );
}
