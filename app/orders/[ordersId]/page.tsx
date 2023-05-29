import OrderDetails from '@/components/OrderDetails';
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
  console.log(params.ordersId);
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    orders = await pool.query(
      `SELECT orders.id, orders.user_id, orders.cart_id , users_adress.line, users_adress.postal_code, users_adress.city, users_adress.country, users_adress.marked_as_default FROM orders INNER JOIN users_adress ON orders.adress= users_adress.id WHERE orders.id=${params.ordersId} ORDER BY orders.id DESC`
    );

    const cartBeta = await pool.query(
      'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
        orders.rows[0].cart_id +
        ' ORDER BY product_id DESC'
    );
    cart = cartBeta.rows;
  } catch (error: any) {
    throw error;
  }
  return (
    <div className="top-12 relative">
      <div className="w-11/12 max-w-2xl mx-auto border rounded-lg grid grid-cols-1 p-3 relative top-7 justify-center text-center bg-blue-300 shadow-black shadow-2xl  ">
        <OrderDetails order={orders.rows[0]} cart={cart} />
      </div>
    </div>
  );
}
