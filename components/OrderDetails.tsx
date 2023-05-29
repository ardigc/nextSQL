'use client';
import { MinusIcon } from '@/Icons/Icons';

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
export default function OrderDetails({
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
  return (
    <div>
      <button className="border my-1 rounded-lg border-blue-900 hover:bg-blue-500 bg-blue-400">
        <div className="flex justify-end"></div>
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
        <div className="mt-3">Productos</div>
        <div className="grid grid-cols-2">
          {cart.map((product) => (
            <div className="border border-blue-900 m-2 p-2 rounded-md">
              <div>{product.name}</div>
              <div className="flex justify-between">
                <div>Cantidad: {product.qt}</div>
                <div>Precio: {product.price}€</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">Total del pedido: {totalPrice(cart)} €</div>
      </button>
    </div>
  );
}
