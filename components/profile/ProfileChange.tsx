'use client';

import { CheckIcon, PenIcon } from '@/components/Icons/Icons';
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
  const submitHandler: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const id = user.id;
    const formData = new FormData(ev.currentTarget);
    let set = '';
    let mode = null;
    if (edit === 1) {
      const name = formData.get('name');
      set = 'name';
      mode = name;
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } else if (edit === 2) {
      const subname = formData.get('subname');
      set = 'subname';
      mode = subname;
    } else if (edit === 3) {
      const email = formData.get('email');
      set = 'email';
      mode = email;
    } else if (edit === 4) {
      const phone = formData.get('phone');
      set = 'phone';
      mode = phone;
    }
    const response = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify({ id, mode, set }),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (edit === 1) {
      if (!response.ok) return;
      const data = await response.json();
      document.cookie = `token=${data.token};`;
    }
    if (response.ok) {
      window.location.reload();
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
            Apellido: <input name="subname" type="text"></input>
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
            Email: <input name="email" type="text"></input>
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
            Telefono: <input name="phone" type="text"></input>
            <button type="submit">
              <CheckIcon />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
