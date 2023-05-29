'use client';
import { MinusIcon } from '@/Icons/Icons';
import { pool } from '@/lib/server/pg';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Order {
  id: number;
  user_id: number;
  cart_id: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
  created_at: Date;
}
interface Cart {
  cart_id: number;
  description: string;
  id: number;
  name: string;
  price: number;
  product_id: number;
  qt: number;
  user_id: number;
}
export default function OrdersPrev({
  order,
  cart,
}: {
  order: Order;
  cart: Array<Cart>;
}) {
  function totalPrice(products: Array<Cart>) {
    return products.reduce((total, products) => {
      const price = products.price * products.qt;
      return total + price;
    }, 0);
  }
  const options = { timeZone: 'Europe/Madrid' };
  // console.log(cart)
  const enlace = '/profile/orders/' + order.id;
  return (
    <div className="border my-1 rounded-lg border-blue-900 hover:bg-blue-500 bg-blue-400">
      <Link href={enlace}>
        <div>
          Pedido nº {order.id} realizado el{' '}
          {order.created_at.toLocaleDateString('en-Us', options)} a las{' '}
          {order.created_at.toLocaleTimeString('en-Us', options)}
        </div>
        <div>
          A la direccion {order.line} con CP {order.postal_code}{' '}
        </div>
        <div>
          {order.city}, {order.country}
        </div>
        <div>Total del pedido: {totalPrice(cart)} €</div>
      </Link>
    </div>
  );
}
