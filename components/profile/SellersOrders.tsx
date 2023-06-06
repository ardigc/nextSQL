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
  return (
    <div className="border my-1 rounded-lg border-blue-900 hover:bg-blue-500 bg-blue-400 ">
      <div>
        Envio nº:{shipment.id} de orden nº:{shipment.order_id} realizado el{' '}
        {shipment.created_at.toLocaleDateString('en-Us', options)} a las{' '}
        {shipment.created_at.toLocaleTimeString('en-Us', options)}
      </div>
      <div>A la direccion </div>
    </div>
  );
}
