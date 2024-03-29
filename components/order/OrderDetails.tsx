'use client';
import { MinusIcon } from '@/components/Icons/Icons';
import Link from 'next/link';
import OrderShipmentDetails from './OrderShipmentDetails';
import { CartInterface } from '../context/ContextProvider';

interface Order {
  id: number;
  order_id: number;
  user_id: number;
  cart_id: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
  created_at: Date;
}

export default function OrderDetails({
  order,
  cart,
  shipment,
}: {
  order: Order;
  cart: Array<CartInterface>;
  shipment: {
    shipment_status: string;
    id: number;
    order_id: number;
    name: string;
    seller_id: number;
  }[];
}) {
  function extractObjectsBySellerId(
    cart: Array<CartInterface>,
    sellerId: number
  ) {
    return cart.filter((obj) => obj.seller_id === sellerId);
  }
  function totalPrice(products: Array<CartInterface>) {
    return products.reduce((total, products) => {
      const price = products.price * products.qt;
      return total + price;
    }, 0);
  }
  const options = { timeZone: 'Europe/Madrid' };
  const enlace = '/products/';
  return (
    <div className="flex justify-center">
      <div className="border my-1 rounded-lg w-11/12 border-blue-900 bg-blue-400">
        <div className="flex justify-end"></div>
        <div>
          Pedido nº {order.order_id} realizado el{' '}
          {order.created_at.toLocaleDateString('en-Us', options)} a las{' '}
          {order.created_at.toLocaleTimeString('en-Us', options)}
        </div>
        <div>
          A la direccion {order.line} con CP {order.postal_code}{' '}
        </div>
        <div>
          {order.city}, {order.country}
        </div>
        <div className="mt-3">Envios</div>
        <div className="grid grid-cols-1">
          {/* {cart.map((product) => (
            <Link
              href={enlace + product.product_id}
              className="border border-blue-900 hover:bg-blue-500 m-2 p-2 rounded-md"
            >
              <div>{product.name}</div>
              <div className="flex justify-between">
                <div>Cantidad: {product.qt}</div>
                <div>Precio: {product.price}€</div>
              </div>
            </Link>
          ))} */}
          {shipment.map((shipment) => (
            <OrderShipmentDetails
              key={shipment.id}
              shipment={shipment}
              cart={extractObjectsBySellerId(cart, shipment.seller_id)}
            />
          ))}
        </div>
        <div className="mt-3">Total del pedido: {totalPrice(cart)} €</div>
      </div>
    </div>
  );
}
