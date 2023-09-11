'use client';
import { FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { SnackBar, Alert } from 'gordo-ui';
export default function SignIn() {
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const pass = formData.get('pass');
    const response = await fetch('/api/auth/logIn', {
      method: 'POST',
      body: JSON.stringify({ email, pass }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!response.ok) {
      return;
    } else {
      const data = await response.json();
      document.cookie = `token=${data.token};`;
      // push("/products")
      window.location.assign('/products');
    }
  };
  return (
    <div className="relativew-full">
      <div className="absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg min-w-fit flex justify-center bg-blue-300 shadow-black shadow-2xl">
        <form onSubmit={submitHandler} className="px-3 grid grid-cols-1">
          <label>Correo electronico</label>
          <input name="email" type="email"></input>
          <label>Contraseña</label>
          <input name="pass" type="password"></input>
          <div className="flex">
            <Link href="/register">No tienes cuenta?</Link>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-1 my-2 border bg-blue-400 rounded-3xl ml-7"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
