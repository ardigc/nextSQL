'use client';

import { MouseEventHandler, useState } from 'react';
import AdressComponent from './AdressComponent';

export default function NewAdress({ userId }: { userId: number }) {
  const [showAdress, setShowAdress] = useState(false);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    setShowAdress(!showAdress);
  };
  return (
    <div>
      {!showAdress && (
        <div className="flex justify-end">
          <button
            onClick={clickHandler}
            className="border mt-2 rounded-3xl bg-blue-400 px-2 mx-1"
          >
            Enviar a otra direccion
          </button>
        </div>
      )}
      {showAdress && <AdressComponent userId={userId} />}
    </div>
  );
}
