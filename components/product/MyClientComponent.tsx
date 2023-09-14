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

    // window.location.reload();
  };
  return (
    // <div className="w-11/12  border text-center mx-auto  rounded-lg p-3 my-2 relative top-7 flex justify-center bg-blue-300 shadow-black shadow-md ">
    <Link className="[div>&]:md:min-h-[300px] [div>&]:min-h-48" href={enlace}>
      {/* <div className="h-full flex justify-between flex-col  p-3"> */}
      <Paper className="h-full flex justify-between flex-col  p-3 bg-white">
        {/* <div className="flex justify-center font-medium">{name}</div> */}
        {image_url && (
          <div className="flex justify-center">
            <Image
              src={image_url}
              className="rounded-full lg:max-w-[180px] lg:max-h-[180px] max-w-[140px] max-h-[140px] object-cover object-center"
              alt={name}
              width={180}
              height={180}
            ></Image>
          </div>
        )}{' '}
        <div className="flex justify-center font-medium">{name}</div>
        {/* <div className="flex justify-center max-h-20 overflow-hidden md:max-h-28 [div>&]:text-xs [div>&]:md:text-sm flex-grow  items-start">
          {description}
        </div> */}
        <div className="flex items-start text-xs">
          Vendido por: {seller_name}
        </div>
        <div className="flex justify-between items-center">
          {/* <Button variant="contained" disableRipple onClick={clickHandler}>
            Añadir al carrito
          </Button> */}
          <IconButton onClick={clickHandler}>
            <AddCartIcon />
          </IconButton>
          <div className="w-16 flex justify-end me-2">{price} €</div>
        </div>
      </Paper>
      {/* </div> */}
    </Link>
    // </div>
  );
}
