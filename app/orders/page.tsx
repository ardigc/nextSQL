import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function Orders() {
  const cookiesValue = cookies();
  let user = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }

    const orders = await pool.query(
      `SELECT * FROM orders INNER JOIN carts ON orders.cart_id=carts.id INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id INNER JOIN users_adress ON orders.adress= users_adress.id WHERE orders.user_id= ${user.id} ORDER BY orders.id DESC`
    );
    console.log(orders.rows);
  } catch (error: any) {
    throw error;
  }
  return <div className="relative top-12 bg-blue-100 h-screen w-full"></div>;
}
