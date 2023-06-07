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
  console.log(shipment);
  return <div></div>;
}
