'use client';
import { MouseEventHandler, useState } from 'react';

export default function Sesion() {
  const [inLogging, setInLogging] = useState(false);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    setInLogging(true);
  };
  const clickHandler2: MouseEventHandler<HTMLButtonElement> = (ev) => {
    setInLogging(false);
  };

  return (
    <div className="absolute flex items-center justify-end w-screen h-12">
      <div className="relative">
        <button
          onClick={clickHandler}
          className=" border rounded-3xl bg-slate-500 px-1 mx-10"
        >
          Iniciar sesion
        </button>
        {inLogging && (
          <div className="absolute top-7 border rounded-lg min-w-fit right-9 bg-blue-300 ">
            <div className="flex justify-end text-blue-400 px-2">
              <button onClick={clickHandler2}>x</button>
            </div>
            <form className="px-3">
              <label>Correo electronico</label>
              <input></input>
              <label>Contraseña</label>
              <input></input>
              <div className="flex justify-end">
                <button className="m-1 bg-slate-500 border rounded-full px-1">
                  Summit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
