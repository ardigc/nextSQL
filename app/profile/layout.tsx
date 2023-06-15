import { pool } from '@/lib/server/pg';
import '../globals.css';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesValue = cookies();
  let user = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    // const response =await
    if (typeof user === 'string') {
      return;
    }
    // console.log(user);
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message);
  }
  // if (user === null) {
  //   redirect('/login');
  // }
  if (typeof user === 'string') {
    return;
  }
  return (
    <div>
      <div className="grid grid-cols-[1fr_6fr] relative">
        <div className=" left-0 bg-blue-400  z-10  h-screen">
          <div className="sticky top-12 flex flex-col justify-around items-center h-1/4">
            <Link href="/profile/orders"> Mis pedidos</Link>
            <Link href="/profile">Mis datos</Link>
            <Link href="/profile/adress">Mis datos de envio</Link>
            <Link href="/profile/payment">Mis medios de pago</Link>
            {user && user.role === 'seller' && (
              <>
                <Link href="/profile/products">Mis Productos</Link>
                <Link href="/profile/sellers/orders">Pedidos recibidos</Link>
              </>
            )}
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
