'use client';

import { MouseEventHandler } from 'react';

export default function SingleProduct({
  name,
  description,
  price,
  id,
}: {
  name: string;
  description: string;
  price: number;
  id: number;
}) {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    ev.preventDefault();
    const response = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ id }),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    });
    window.location.reload();
  };
  return (
    <div className="grid grid-cols-1 border border-blue-400 bg-blue-200">
      <div className="flex justify-center">{name}</div>
      <div className="flex justify-center items-center">{description}</div>
      <div className="flex justify-end items-center">
        <button
          onClick={clickHandler}
          className="px-1 border bg-blue-400 rounded-3xl mx-5"
        >
          Añadir al carrito
        </button>
        <div className="w-16 flex justify-end me-2">{price} €</div>
      </div>
    </div>
  );
}
