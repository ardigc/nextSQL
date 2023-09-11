import OrderDetails from '@/components/order/OrderDetails';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface Order {
  id: number;
  user_id: number;
  cart_id: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
  marked_as_default: Date;
  shipment_status: string;
  seller_id: number;
  order_id: number;
  name: string;
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
  seller_id: number;
}
export default async function OrderDetail({
  params,
}: {
  params: { ordersId: number };
}) {
  const cookiesValue = cookies();
  let user = null;
  let orders = null;
  let cart: Array<Cart> = [];
  function extractShipmentData(data: Array<Order>) {
    return data.map(({ shipment_status, id, order_id, name, seller_id }) => ({
      shipment_status,
      id,
      order_id,
      name,
      seller_id,
    }));
  }
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    orders = await pool.query(
      `SELECT shipment.shipment_status, shipment.seller_id, shipment.id, shipment.order_id, orders.created_at, orders.user_id, orders.cart_id , users_adress.line, users_adress.postal_code, users_adress.city, users_adress.country, users_info.name FROM shipment INNER JOIN users_info ON seller_id=users_info.id INNER JOIN orders ON shipment.order_id=orders.id INNER JOIN users_adress ON orders.adress= users_adress.id WHERE orders.id=${params.ordersId} ORDER BY orders.id DESC`
    );
    const cartBeta = await pool.query(
      'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
        orders.rows[0].cart_id +
        ' ORDER BY seller_id DESC'
    );
    cart = cartBeta.rows;
  } catch (error: any) {
    throw error;
  }
  const shipment = extractShipmentData(orders.rows);
  return (
    <div className="relative bg-blue-100 min-h-screen w-full">
      <div className="w-11/12 max-w-2xl mx-auto border rounded-lg grid grid-cols-1 p-3 relative top-7 justify-center text-center bg-blue-300 shadow-black shadow-2xl  ">
        <OrderDetails shipment={shipment} order={orders.rows[0]} cart={cart} />
      </div>
    </div>
  );
}
