import { pool } from '@/lib/server/pg';
import '../globals.css';
import { verify } from 'jsonwebtoken';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
  return <div>{children}</div>;
}
