'use client';

import Link from 'next/link';

export default function SignIn() {
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full">
      <div className="absolute top-7 left-1/2 -translate-x-1/2 border rounded-lg min-w-fit flex justify-center bg-blue-300 shadow-black shadow-2xl">
        <form className="px-3 grid grid-cols-1">
          <label>Correo electronico</label>
          <input></input>
          <label>Contraseña</label>
          <input type="password"></input>
          <div className="flex">
            <Link href="/register">No tienes cuenta?</Link>

            <div className="flex justify-end">
              <button className="px-1 my-2 border bg-blue-400 rounded-3xl ml-7">
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
