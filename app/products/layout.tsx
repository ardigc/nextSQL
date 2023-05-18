import Link from 'next/link';
import { pool } from '@/lib/server/pg';
import '../globals.css';
import { Inter } from 'next/font/google';
import Cart from '@/components/Cart';
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
    <html lang="en">
      <body className={inter.className}>
        <div className="z-50 fixed top-0 w-screen h-12 flex items-center justify-center bg-blue-300">
          <h1>Eshop</h1>
          <div className="absolute flex right-9 ">
            <Cart cart={cart.rows} />
            <div className="rounded-lg min-w-fit items-center flex">
              <Link
                href="/login"
                className="border rounded-3xl bg-blue-400 px-2 mx-10"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
