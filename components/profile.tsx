import { UserIcon } from '@/Icons/Icons';
import { useState } from 'react';
import Cart from './Cart';
import LogOut from './LogOut';
import { verify } from 'jsonwebtoken';

export default function ProfileButton({ user }: { user: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="hover:ring-2 hover:ring-blue-800"
        onClick={() => setOpen(!open)}
      >
        {user}
      </button>
      {open && (
        <div className="absolute bg-blue-300 border border-blue-400 w-32 ">
          <ul>
            <li>Tu perfil</li>
            <li>Pedidos</li>
            <li>
              <LogOut />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
