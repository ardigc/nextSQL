import OrdersPrev from '@/components/OrderPrev';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function Orders() {
  const cookiesValue = cookies();
  let user = null;
  let orders = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    orders = await pool.query(
      `SELECT orders.id, orders.user_id, orders.cart_id , users_adress.line, users_adress.postal_code, users_adress.city, users_adress.country, users_adress.marked_as_default FROM orders INNER JOIN users_adress ON orders.adress= users_adress.id WHERE orders.user_id= ${user.id} ORDER BY orders.id DESC`
    );

    console.log(orders.rows);
  } catch (error: any) {
    throw error;
  }
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full">
      <div className="w-11/12 max-w-2xl mx-auto border rounded-lg grid grid-cols-1 p-3 relative top-7 justify-center text-center bg-blue-300 shadow-black shadow-2xl  ">
        Tus pedidos
        {orders.rows.map((order) => (
          <OrdersPrev order={order} />
        ))}
      </div>
    </div>
  );
}
