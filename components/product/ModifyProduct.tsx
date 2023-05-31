'use client';

import { MouseEvent, MouseEventHandler, useState } from 'react';
import {
  PenIcon,
  PenIconBig,
  TrashIcon,
  TrashIconLittle,
  TrashIconMedium,
} from '../Icons/Icons';
import { headers } from 'next/headers';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  seller_id: number;
}
export default function ModifyProduct({
  products,
}: {
  products: Array<Product>;
}) {
  // const [edit, setEdit] = useState(-1);
  const clickDeleteHandle = async (ev: MouseEvent, id: number) => {
    const response = await fetch('/api/upload_product', {
      method: 'PUT',
      body: JSON.stringify({ id }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (response.ok) {
      window.location.reload();
    }
  };
  return (
    <div>
      <h1>Tus productos</h1>
      <div className="grid grid-cols-[3fr_3fr_3fr_1fr] items-center my-5">
        <div className="flex justify-center my-3">Nombre</div>
        <div className="flex justify-center">Descripción</div>
        <div className="flex justify-center">Precio</div>
        <div></div>
      </div>

      {products.map((product) => (
        <>
          {/* {edit !== product.id && ( */}
          <div className="grid grid-cols-[3fr_3fr_3fr_1fr] items-center my-5">
            <div className="flex my-2 items-center justify-center">
              {product.name}
            </div>
            <div className="flex items-center justify-center text-center">
              {product.description}
            </div>
            <div className="flex items-center justify-center">
              {product.price}€
            </div>
            <div className="content-center flex justify-center">
              <button onClick={(ev) => clickDeleteHandle(ev, product.id)}>
                <TrashIconMedium />
              </button>
              <Link href="/profile/products/updateProduct">
                <PenIconBig />
              </Link>
            </div>
          </div>
          {/* )} */}
        </>
      ))}
    </div>
  );
}
