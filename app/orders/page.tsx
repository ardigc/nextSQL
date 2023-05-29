import OrdersPrev from '@/components/OrderPrev';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Query, QueryResult } from 'pg';

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
export default async function Orders() {
  const cookiesValue = cookies();
  let user = null;
  let orders = null;
  let cart: Array<Array<Cart>> = [[]];
  function totalPrice(products: Array<Cart>) {
    return products.reduce((total, products) => {
      const price = products.price * products.qt;
      return total + price;
    }, 0);
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
      `SELECT orders.id, orders.created_at, orders.user_id, orders.cart_id , users_adress.line, users_adress.postal_code, users_adress.city, users_adress.country FROM orders INNER JOIN users_adress ON orders.adress= users_adress.id WHERE orders.user_id= ${user.id} ORDER BY orders.id DESC`
    );
    const cartPromises = orders.rows.map(async (order) => {
      const cartBeta = await pool.query(
        'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
          order.cart_id +
          ' ORDER BY product_id DESC'
      );
      return cartBeta.rows;
    });
    cart = await Promise.all(cartPromises);
  } catch (error: any) {
    throw error;
  }

  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full">
      <div className="w-11/12 max-w-2xl mx-auto border rounded-lg grid grid-cols-1 p-3 relative top-7 justify-center text-center bg-blue-300 shadow-black shadow-2xl  ">
        Tus pedidos
        {orders.rows.map((order, index) => (
          <OrdersPrev order={order} cart={cart[index]} />
        ))}
      </div>
    </div>
  );
}
