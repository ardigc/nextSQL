'use client';

import Link from 'next/link';
import { CartInterface } from '../context/ContextProvider';

export default function OrderShipmentDetails({
  shipment,
  cart,
}: {
  shipment: {
    shipment_status: string;
    id: number;
    order_id: number;
    name: string;
    seller_id: number;
  };
  cart: Array<CartInterface>;
}) {
  const enlace = '/products/';

  return (
    <div className="my-3">
      <div className="grid grid-cols-2">
        {cart.map((product) => (
          <>
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
          </>
        ))}
      </div>
      <div>Estado del pedido: {shipment.shipment_status}</div>
      Vendido por {shipment.name}
    </div>
  );
}
