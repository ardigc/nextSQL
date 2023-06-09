import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { verify } from 'jsonwebtoken';
import LogOut from '@/components/profile/LogOut';
import Cart from '@/components/cart/Cart';
import { pool } from '@/lib/server/pg';
import { Provider } from '@/components/context/ContextProvider';
import { HomeIcon } from '@/components/Icons/Icons';

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

const inter = Inter({ subsets: ['latin'] });
export const revalidate = 0;
export const metadata = {
  title: 'Eshop',
  description: 'Generated by Adrian Gordo',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    // console.log(user);
    userFin = { id: user.id, name: user.name, role: user.role };
    // console.log(user);
    const cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + user.id + " AND state='unpay'"
    );

    // console.log(cartId.rows);

    cart = await pool.query(
      `SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=${cartId.rows[0].id} ORDER BY product_id DESC`
    );
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message);
    const noCart: Array<Cart> = [];
    cart = { rows: noCart };
  }
  return (
    <html lang="en">
      <body className="relative">
        <Provider initialCart={cart.rows}>
          <div className="z-50 fixed top-0 w-screen h-12 flex items-center justify-center bg-blue-300">
            <Link href="/products">Eshop</Link>
            <div className="absolute rounded-lg min-w-fit right-20 ">
              {!user && (
                <Link
                  href="/login"
                  className="border rounded-3xl bg-blue-400 px-2 mx-10"
                >
                  Iniciar sesión
                </Link>
              )}
              {userFin && cart && (
                <div className="flex">
                  <Cart user={userFin} />
                </div>
              )}
            </div>
          </div>
          <div className="bg-blue-100 min-h-screen w-full overflow-auto ">
            <div className="relative top-9">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
