import ShipmentDetails from '@/components/profile/ShipmentDetails';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function OrderDetail({
  params,
}: {
  params: { shipmentId: number };
}) {
  const cookiesValue = cookies();
  let user = null;
  let shipment = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    shipment = await pool.query(
      `SELECT shipment.id, shipment.order_id, shipment.seller_id, shipment.shipment_status, orders.user_id, orders.cart_id, orders.adress, orders.created_at, cart_items.product_id, cart_items.qt, users_info.name AS user_name, users_info.subname, users_info.email, users_info.phone, products.name, products.description, products.price, users_adress.line, users_adress.postal_code, users_adress.city, users_adress.country FROM shipment  INNER JOIN orders ON shipment.order_id=orders.id INNER JOIN carts ON orders.cart_id=carts.id INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN users_info ON orders.user_id=users_info.id INNER JOIN products ON products.id = cart_items.product_id INNER JOIN users_adress ON orders.adress=users_adress.id WHERE shipment.id=${params.shipmentId} AND products.seller_id=${user.id}`
    );
    console.log(shipment.rows);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="relative bg-blue-100 min-h-screen w-full">
      <div className="w-11/12 max-w-4xl mx-auto border rounded-lg grid grid-cols-1 p-3 relative top-7 justify-center text-center bg-blue-300 shadow-black shadow-2xl  ">
        {shipment?.rows && <ShipmentDetails shipment={shipment?.rows} />}
      </div>
    </div>
  );
}
