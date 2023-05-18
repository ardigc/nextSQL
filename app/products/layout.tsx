import Link from 'next/link';
import '../globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="z-50 fixed top-0 w-screen h-12 flex items-center justify-center bg-blue-300">
          <h1>Eshop</h1>
          <div className="absolute rounded-lg min-w-fit right-9 ">
            <Link
              href="/login"
              className="border rounded-3xl bg-blue-400 px-2 mx-10"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
