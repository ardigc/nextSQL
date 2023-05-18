'use client';

import Link from 'next/link';

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
  return (
    <Link href={enlace} className="border border-blue-400">
      <div className="flex justify-center">{name}</div>
      <div className="flex justify-center items-center">{description}</div>
      <div className="flex justify-end items-center">
        <button className="px-1 border bg-blue-400 rounded-3xl mx-5">
          Añadir al carrito
        </button>
        <div className="w-16 flex justify-end me-2">{price} €</div>
      </div>
    </Link>
  );
}
