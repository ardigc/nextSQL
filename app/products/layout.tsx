import Link from 'next/link';
import { pool } from '@/lib/server/pg';
import '../globals.css';
import { Inter } from 'next/font/google';
import Cart from '@/components/Cart';
import LogOut from '@/components/LogOut';
const inter = Inter({ subsets: ['latin'] });
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ahora mismo solo he creado carritos a los usuarios id 1, 3 y 7
  const id = 1;
  const cart = await pool.query(
    'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
      id
  );
  return (
    <div>
      <Cart cart={cart.rows} />
      {/* <LogOut /> */}
      {children}
    </div>
  );
}
