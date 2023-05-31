import { UserIcon } from '@/components/Icons/Icons';
import { useState } from 'react';
import Cart from '../cart/Cart';
import LogOut from './LogOut';
import { verify } from 'jsonwebtoken';
import Link from 'next/link';

export default function ProfileButton({
  user,
}: {
  user: { id: number; name: string; role: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="hover:ring-2 hover:ring-blue-800"
        onClick={() => setOpen(!open)}
      >
        {user.name}
      </button>
      {open && (
        <div className="absolute bg-blue-300 border border-blue-400 w-32 ">
          <ul>
            <li>
              <Link href="/profile" onClick={() => setOpen(false)}>
                Tu perfil
              </Link>
            </li>
            <li>
              <Link href="/profile/orders">Pedidos</Link>
            </li>
            {user.role === 'seller' && (
              <li>
                <Link href="/profile/orders">Tus productos</Link>
              </li>
            )}
            <li onClick={() => setOpen(false)}>
              <LogOut />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
