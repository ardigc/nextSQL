import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
interface Shipment {
  id: number;
  order_id: number;
  seller_id: number;
  shipment_status: string;
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
      `SELECT * FROM shipment WHERE seller_id=${user.id}`
    );
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
        <div className="grid grid-cols-4">
          <div className="flex flex-col">
            Pendientes de recepcion
            {requested && requested.map((ship) => <div> {ship.order_id}</div>)}
          </div>
          <div className="flex flex-col">
            Pendientes de envio
            {confirmed && confirmed.map((ship) => <div> {ship.order_id}</div>)}
          </div>
          <div className="flex flex-col">
            Enviados
            {shipped && shipped.map((ship) => <div> {ship.order_id}</div>)}
          </div>
          <div className="flex flex-col">
            Finalizados
            {received && received.map((ship) => <div> {ship.order_id}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
