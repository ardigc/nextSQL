import Link from 'next/link';

interface Shipment {
  id: number;
  order_id: number;
  seller_id: number;
  shipment_status: string;
  cart_id: number;
  created_at: Date;
  adress: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
}
export default function SellersOrders({ shipment }: { shipment: Shipment }) {
  const options = { timeZone: 'Europe/Madrid' };
  console.log(shipment);
  const enlace = '/profile/sellers/orders/' + shipment.id;

  return (
    <Link
      href={enlace}
      className="border my-1 rounded-lg border-blue-900 hover:bg-blue-500 bg-blue-400 "
    >
      <div>
        Envio nº:{shipment.id} perteneciente a la orden nº:{shipment.order_id}{' '}
        realizado el {shipment.created_at.toLocaleDateString('en-Us', options)}{' '}
        a las {shipment.created_at.toLocaleTimeString('en-Us', options)}
      </div>
      <div>
        A la direccion {shipment.line} con CP {shipment.postal_code}{' '}
      </div>
      <div>
        {shipment.city}, {shipment.country}
      </div>
    </Link>
  );
}
