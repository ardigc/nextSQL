'use client';

import Link from 'next/link';
import { MouseEventHandler, useContext } from 'react';
import { GlobalContext } from '../context/ContextProvider';
import { toast } from 'react-hot-toast';
import { Button, IconButton, Paper } from 'gordo-ui';

import Color from '@tiptap/extension-color';
import { AddCartIcon } from '../Icons/Icons';
import Image from 'next/image';

export function Product({
  name,
  description,
  price,
  id,
  seller_name,
  image_url,
}: {
  name: string;
  id: number;
  description: string;
  price: number;
  seller_name: string;
  image_url: string;
}) {
  const { setCart } = useContext(GlobalContext);
  const enlace = '/products/' + id;
  const clickHandler: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    ev.preventDefault();
    try {
      const notify = toast.loading('Añadiendo al carrito...', {
        style: {
          backgroundColor: '#bfdbfe',
          // color:'white',
        },
      });
      const response = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Añadido correctamente', { id: notify });
      }
      setCart(data);
    } catch (error) {
      window.location.assign('/login');
    }
  };
  return (
    <Link className="[div>&]:md:min-h-[300px] [div>&]:min-h-48" href={enlace}>
      <Paper className="h-full flex justify-between flex-col  p-3 bg-white">
        {image_url && (
          <div className="flex justify-center">
            <Image
              src={image_url}
              className="rounded-3xl lg:max-w-[180px] lg:max-h-[180px] max-w-[140px] max-h-[140px] object-contain object-center"
              alt={name}
              width={180}
              height={180}
            ></Image>
          </div>
        )}{' '}
        <div className="flex justify-center [div>&]:text-sm [div>&]:md:text-base font-medium">
          {name}
        </div>
        <div className="flex items-start text-xs">
          Vendido por: {seller_name}
        </div>
        <div className="flex justify-between items-center">
          <IconButton disableRipple onClick={clickHandler}>
            <AddCartIcon />
          </IconButton>
          <div className="w-16 flex justify-end me-2">{price} €</div>
        </div>
      </Paper>
      {/* </div> */}
    </Link>
  );
}
