import Link from 'next/link';
import '/node_modules/gordo-ui/dist/style.css';

import './globals.css';
import { Inter } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { verify } from 'jsonwebtoken';
import LogOut from '@/components/profile/LogOut';
import Cart from '@/components/cart/Cart';
import { pool } from '@/lib/server/pg';
import { Provider } from '@/components/context/ContextProvider';
import { HomeIcon, UserIcon } from '@/components/Icons/Icons';
import { Button, IconButton } from 'gordo-ui';
import FooterComponent from '@/components/footer/FooterComponent';
import SearchComponent from '@/components/navbar/SearchComponent';

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
    userFin = { id: user.id, name: user.name, role: user.role };
    const cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + user.id + " AND state='unpay'"
    );
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
      <body className="relative font-base">
        <Provider initialCart={cart.rows}>
          <div className="z-50 sticky top-0 w-screen h-12 flex items-center justify-center  bg-blue-300">
            <div className="max-w-5xl flex justify-between w-[64rem] items-center">
              <Link href="/products" className="mx-3">
                Eshop
              </Link>
              <SearchComponent />
              <div className="rounded-lg min-w-fit md:mx-3 mx-1 ">
                {!user && (
                  <Link href="/login">
                    <Button
                      variant="contained"
                      className=" [a>&]:max-md:hidden md:inline-flex"
                      disableRipple
                    >
                      Iniciar Sesion
                    </Button>
                    <IconButton
                      className="max-md:inline-flex [a>&]:md:hidden [a>&]:hover:bg-blue-200"
                      disableRipple
                    >
                      <UserIcon />
                    </IconButton>
                  </Link>
                )}
                {userFin && cart && (
                  <div className="flex">
                    <Cart user={userFin} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <main className=" w-full ">{children}</main>
          <FooterComponent />
        </Provider>
      </body>
    </html>
  );
}
