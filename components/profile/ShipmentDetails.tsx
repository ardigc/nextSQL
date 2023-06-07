import Link from 'next/link';
import ShipmenModify from './ShipmentModify';

interface Shipment {
  id: number;
  order_id: number;
  seller_id: number;
  shipment_status: string;
  user_id: number;
  cart_id: number;
  adress: number;
  created_at: Date;
  state: string;
  product_id: number;
  qt: number;
  name: string;
  description: string;
  price: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
}
export default function ShipmentDetails({
  shipment,
}: {
  shipment: Array<Shipment>;
}) {
  const options = { timeZone: 'Europe/Madrid' };
  const enlace = '/products/';

  console.log(shipment);
  return (
    <div className="border my-1 rounded-lg mx-auto w-11/12 border-blue-900 bg-blue-400">
      <div>
        Envio nº {shipment[0].id} perteneciente al pedido nº{' '}
        {shipment[0].order_id} realizado el{' '}
        {shipment[0].created_at.toLocaleDateString('en-Us', options)} a las{' '}
        {shipment[0].created_at.toLocaleTimeString('en-Us', options)}
      </div>
      <div>
        A la direccion {shipment[0].line} con CP {shipment[0].postal_code}{' '}
      </div>
      <div>
        {shipment[0].city}, {shipment[0].country}
      </div>
      Productos
      <div className="grid grid-cols-2">
        {shipment.map((product) => (
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
        ))}
        <div>
          Estado del envio: {shipment[0].shipment_status}
          <ShipmenModify shipment={shipment[0]} />
        </div>
      </div>
    </div>
  );
}
