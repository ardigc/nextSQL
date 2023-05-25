'use client';

import { CheckIcon, PenIcon } from '@/Icons/Icons';
import { useRouter } from 'next/navigation';

import { FormEventHandler, useState } from 'react';

interface User {
  id: number;
  name: string;
  subname: string;
  email: string;
  phone: string;
}
export default function ProfileChange({ user }: { user: User }) {
  const [edit, setEdit] = useState(0);
  const router = useRouter();
  const submitHandler: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const id = user.id;
    const formData = new FormData(ev.currentTarget);
    const email = formData.get('email');
    const name = formData.get('name');
    const subname = formData.get('subname');
    const phone = formData.get('phone');
    if (name !== null) {
      const set = 'name';
      const mode = name;
      const response = await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify({ id, mode, set }),
        headers: {
          'content-type': 'application/json',
        },
      });
      if (response.ok) {
        window.location.reload();
      }
    }
  };
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
          <form onSubmit={submitHandler}>
            Nombre: <input name="name" type="text"></input>
            <button type="submit">
              <CheckIcon />
            </button>
          </form>
        )}
        {edit !== 2 && (
          <div>
            Apellido: {user.subname}{' '}
            <button onClick={() => setEdit(2)}>
              <PenIcon />
            </button>
          </div>
        )}
        {edit === 2 && (
          <form onSubmit={submitHandler}>
            Nombre: <input name="subname" type="text"></input>
            <button type="submit">
              <CheckIcon />
            </button>
          </form>
        )}
        {edit !== 3 && (
          <div>
            Email: {user.email}{' '}
            <button onClick={() => setEdit(3)}>
              <PenIcon />
            </button>
          </div>
        )}
        {edit === 3 && (
          <form onSubmit={submitHandler}>
            Nombre: <input name="email" type="text"></input>
            <button type="submit">
              <CheckIcon />
            </button>
          </form>
        )}
        {edit !== 4 && (
          <div>
            Telefono: {user.phone}{' '}
            <button onClick={() => setEdit(4)}>
              <PenIcon />
            </button>
          </div>
        )}
        {edit === 4 && (
          <form onSubmit={submitHandler}>
            Nombre: <input name="phone" type="text"></input>
            <button type="submit">
              <CheckIcon />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
