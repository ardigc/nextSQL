import Link from 'next/link';
import { pool } from '@/lib/server/pg';
import '../globals.css';
import { Inter } from 'next/font/google';
import Cart from '@/components/cart/Cart';
import LogOut from '@/components/profile/LogOut';
const inter = Inter({ subsets: ['latin'] });
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
