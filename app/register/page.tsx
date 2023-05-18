'use client';

import { FormEventHandler } from 'react';

export default function SignIn() {
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const pass = formData.get('pass');
    const name = formData.get('name');
    const subname = formData.get('subname');
    console.log(email, pass, name, subname);
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, subname, email }),
      headers: {
        'Content-type': 'application/json',
      },
    });
  };
  return (
    <div className="absolute top-7 border rounded-lg min-w-fit right-9 bg-blue-300 ">
      <form onSubmit={submitHandler} className="px-3">
        <label>Correo electronico</label>
        <input name="email" type="email"></input>
        <label>Contraseña</label>
        <input name="pass" type="password"></input>
        <label>Nombre</label>
        <input name="name" type="text"></input>
        <label>Apellido</label>
        <input name="subname" type="text"></input>
        <div className="flex justify-end">
          <button
            type="submit"
            className="m-1 bg-slate-500 border rounded-full px-1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
