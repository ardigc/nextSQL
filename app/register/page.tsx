'use client';

import { FormEventHandler } from 'react';

export default function SignIn() {
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const pass = formData.get('pass');
    const name = formData.get('name');
    const phone = formData.get('phone');
    const subname = formData.get('subname');
    console.log(email, pass, name, subname, phone);
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, subname, email, phone, pass }),
      headers: {
        'Content-type': 'application/json',
      },
    });
  };
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full">
      <div className=" absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg min-w-fit flex justify-center bg-blue-300 shadow-black shadow-2xl">
        <form onSubmit={submitHandler} className="px-3 grid grid-cols-1">
          <label>Correo electronico</label>
          <input name="email" type="email"></input>
          <label>Contraseña</label>
          <input name="pass" type="password"></input>
          <label>Nombre</label>
          <input name="name" type="text"></input>
          <label>Apellido</label>
          <input name="subname" type="text"></input>
          <label>Telefono</label>
          <input name="phone" type="text"></input>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-1 border bg-blue-400 rounded-3xl my-2 ml-3"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
