'use client';
import { FormEventHandler } from 'react';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

import Link from 'next/link';
import { redirect } from 'next/dist/server/api-utils';
// import { useRouter } from 'next/router';

export default async function SignIn() {
  const cookiesValue = cookies();
  let user = null;
  let cart = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message);
  }
  if (user !== null) {
    window.location.assign('/products');
  }
  // const router =useRouter()
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
    if (!response.ok) return;
    const data = await response.json();
    document.cookie = `token=${data.token};`;
    // router.push("/products")
    window.location.assign('/products');
  };

  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full">
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
