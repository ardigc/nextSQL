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
export default function OrdersPrev({
  order,
  cart,
}: {
  order: Order;
  cart: Array<Cart>;
}) {
  const [showOrder, setShowOrder] = useState(false);
  const cartId = order.cart_id;

  function totalPrice(products: Array<Cart>) {
    return products.reduce((total, products) => {
      const price = products.price * products.qt;
      return total + price;
    }, 0);
  }

  return (
    <div className="border my-1 rounded-lg border-blue-900 hover:bg-blue-500 bg-blue-400">
      {!showOrder && (
        <button onClick={() => setShowOrder(true)}>
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
      )}
    </div>
  );
}
