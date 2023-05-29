import { pool } from '@/lib/server/pg';
import '../globals.css';
import { verify } from 'jsonwebtoken';
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
    if (typeof user === 'string') {
      return;
    }
    // const response =await
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message);
  }
  if (user === null) {
    redirect('/login');
  }
  return (
    <div>
      <div className="grid grid-cols-[1fr_6fr] top-12 relative">
        <div className=" left-0 bg-blue-400 h-screen z-10  ">
          <div className="sticky top-12 ">
            <Link href="/profile/orders"> Mis pedidos</Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
