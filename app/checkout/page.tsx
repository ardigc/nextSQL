import CheckOutComponent from '@/components/checkout/CheckOutComponent';
import { CartInterface } from '@/components/context/ContextProvider';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function CheckOut() {
  const cookiesValue = cookies();
  let user = null;
  let cart = null;
  let userFin = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    userFin = { id: user.id, name: user.name, role: user.role };
    const cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + user.id + " AND state='unpay'"
    );
    cart = await pool.query(
      `SELECT carts.id as cart_id , products.image_url, products.description, products.name, products.price, products.id as product_id, cart_items.qt, products.seller_id, users_info.name as seller_name, carts.user_id FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id INNER JOIN users_info ON products.seller_id=users_info.id WHERE carts.id=${cartId.rows[0].id} ORDER BY product_id DESC`
    );
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message);
    const noCart: Array<CartInterface> = [];
    cart = { rows: noCart };
  }
  const getSellers = (cart: CartInterface[]) => {
    const sellersId: number[] = [];
    cart.map((item) => {
      if (sellersId.findIndex((seller) => seller === item.seller_id) === -1) {
        sellersId.push(item.seller_id);
      }
    });
    let sellersCart = {};

    sellersId.forEach((seller) => {
      const products = cart.filter((item) => item.seller_id === seller);
      sellersCart = { ...sellersCart, [seller]: products };
    });

    return sellersCart;
  };
  return (
    <div className="relative w-full flex">
      <CheckOutComponent cart={getSellers(cart.rows)} />
    </div>
  );
}
