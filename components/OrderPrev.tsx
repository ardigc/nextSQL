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
export default function OrdersPrev({
  order,
  cart,
}: {
  order: Order;
  cart: Array<Cart>;
}) {
  const cartId = order.cart_id;

  function totalPrice(products: Array<Cart>) {
    return products.reduce((total, products) => {
      const price = products.price * products.qt;
      return total + price;
    }, 0);
  }
  // async function getCart() {
  //   const cart = await pool.query(
  //     'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
  //       order.cart_id +
  //       ' ORDER BY product_id DESC'
  //   );
  // }

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
      <div>Precio: {totalPrice(cart)} €</div>
    </button>
  );
}
