import DragAndDropShipment from '@/components/profile/DragAndDropShipment';
import SellersOrders from '@/components/profile/SellersOrders';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
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
export default async function OrderSellers() {
  const cookiesValue = cookies();
  let user = null;
  let shipment = null;
  function extractObjectsByStatus(array: Array<Shipment>, state: string) {
    return array.filter((obj) => obj.shipment_status === state);
  }

  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    shipment = await pool.query(
      `SELECT shipment.id, shipment.order_id, shipment.seller_id,shipment.shipment_status, orders.cart_id, orders.created_at, orders.adress, users_adress.line, users_adress.postal_code, users_adress.city, users_adress.country FROM shipment INNER JOIN orders ON shipment.order_id=orders.id INNER JOIN users_adress ON orders.adress=users_adress.id WHERE seller_id=${user.id}`
    );
    // console.log(shipment.rows)
  } catch (error) {
    console.log(error);
  }
  if (!shipment) {
    return;
  }
  const requested = extractObjectsByStatus(shipment.rows, 'requested');
  const confirmed = extractObjectsByStatus(shipment.rows, 'confirmed');
  const shipped = extractObjectsByStatus(shipment.rows, 'shipped');
  const received = extractObjectsByStatus(shipment.rows, 'received');
  return (
    <div className="relative bg-blue-100 min-h-screen w-full">
      <div className="w-11/12 max-w-4xl mx-auto border rounded-lg grid grid-cols-1 p-3 relative top-7 justify-center text-center bg-blue-300 shadow-black shadow-2xl  ">
        <div className="flex justify-center">
          Listado de pedidos que te han realizado
        </div>
        <DragAndDropShipment shipment={shipment.rows} />
        {/* <div className="grid grid-cols-4">
          <div className="flex flex-col">
            Pendientes de recepcion
            {requested &&
              requested.map((ship) => <SellersOrders shipment={ship} />)
            
            // <DragAndDropShipment shipment={requested}/>
            }
          </div>
          <div className="flex flex-col">
            Pendientes de envio
            {confirmed &&
              confirmed.map((ship) => <SellersOrders shipment={ship} />)}
          </div>
          <div className="flex flex-col">
            Enviados
            {shipped &&
              shipped.map((ship) => <SellersOrders shipment={ship} />)}
          </div>
          <div className="flex flex-col">
            Finalizados
            {received &&
              received.map((ship) => <SellersOrders shipment={ship} />)}
          </div>
        </div> */}
      </div>
    </div>
  );
}
