'use client';
import { pool } from '@/lib/server/pg';
import { useEffect, useState } from 'react';

interface Order {
  id: number;
  user_id: number;
  cart_id: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
  marked_as_default: Date;
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
export default function OrdersPrev({ order }: { order: Order }) {
  //   const [cart, setCart] = useState<Array<Cart>>([]);
  const cartId = order.cart_id;

  //   async function getCart() {

  // setCart(data);
  //   }
  //   getCart();
  useEffect(() => {
    async function totalPrice() {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify({ cartId }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      const products = data;
      console.log('hola');
      return 'hola';

      // const cart = await pool.query('SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
      // cart_id +
      // ' ORDER BY product_id DESC')
      // return products.reduce((total: number, products: { price: number; qt: number; }) => {
      //   const price = products.price * products.qt;
      //   return total + price;
      // }, 0);
    }
    const price = totalPrice();
  });
  return (
    <button className="border my-1 rounded-lg border-blue-900 hover:bg-blue-500 bg-blue-400">
      <div>
        Pedido nº {order.id} realizado el{' '}
        {order.marked_as_default.toLocaleDateString()} a las{' '}
        {order.marked_as_default.toLocaleTimeString()}
      </div>
      <div>
        A la direccion {order.line} con CP {order.postal_code}{' '}
      </div>
      <div>
        {order.city}, {order.country}
      </div>
      <div>Precio: {} €</div>
    </button>
  );
}
