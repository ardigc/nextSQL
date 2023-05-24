import { UserIcon } from '@/Icons/Icons';
import { useState } from 'react';
import Cart from './Cart';
import LogOut from './LogOut';

export default function ProfileButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-full">
      <button onClick={() => setOpen(!open)}>
        <UserIcon />
      </button>
      {open && (
        <div className="absolute bg-blue-300 border border-blue-400 w-32 ">
          <ul>
            <li>Tu perfil</li>
            <li>Pedidos</li>
            <li>
              <LogOut />{' '}
            </li>
          </ul>
          hola cara cola
        </div>
      )}
    </div>
  );
}
