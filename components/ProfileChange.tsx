'use client';

import { CheckIcon, PenIcon } from '@/Icons/Icons';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  subname: string;
  email: string;
  phone: string;
}
export default function ProfileChange({ user }: { user: User }) {
  const [edit, setEdit] = useState(0);
  return (
    <div className="absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg min-w-1/4 h-52 flex justify-center bg-blue-300 shadow-black shadow-2xl">
      <div className="px-3 grid grid-cols-1 justify-center items-center">
        <div className="flex justify-center">Tu perfil</div>
        {edit !== 1 && (
          <div>
            Nombre: {user.name}{' '}
            <button onClick={() => setEdit(1)}>
              <PenIcon />
            </button>
          </div>
        )}
        {edit === 1 && (
          <form>
            Nombre: <input name="name" type="text"></input>
            <button type="submit">
              <CheckIcon />
            </button>
          </form>
        )}
        <div>
          Apellido: {user.subname}{' '}
          <button>
            <PenIcon />
          </button>
        </div>
        <div>
          Email: {user.email}{' '}
          <button>
            <PenIcon />
          </button>
        </div>
        <div>
          Telefono: {user.phone}{' '}
          <button>
            <PenIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
