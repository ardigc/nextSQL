'use client';

import { MouseEventHandler, useState } from 'react';
import AdressComponent from './AdressComponent';
import Link from 'next/link';
import AdressDefault from './AdressDefault';
interface Adress {
  id: number;
  user_id: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
  marked_as_default: Date;
}

export default function NewAdress({
  userId,
  adress,
  adressDefault,
}: {
  userId: number;
  adress: Array<Adress>;
  adressDefault: Adress;
}) {
  const [showAdress, setShowAdress] = useState(false);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    setShowAdress(!showAdress);
  };

  return (
    <div>
      {!showAdress && (
        <div>
          {adress.length === 0 && <AdressComponent userId={userId!} />}
          {adress.length! > 0 && (
            <div className="w-11/12 max-w-3xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl">
              Tus direcciones:
              {adress.map((adress) => (
                <div
                  key={adress.id}
                  className="flex justify-between items-center my-3"
                >
                  <div>Calle: {adress.line} </div>
                  <div>CP: {adress.postal_code} </div>
                  <div>Ciudad: {adress.city} </div>
                  <div>Pais: {adress.country} </div>

                  <AdressDefault userId={userId!} adressId={adress.id} />
                </div>
              ))}
              <div className="flex justify-between items-center">
                <div className="flex justify-end">
                  <button
                    onClick={clickHandler}
                    className="border mt-2 rounded-3xl bg-blue-400 px-2 mx-1"
                  >
                    Enviar a otra direccion
                  </button>
                </div>
                <Link
                  className="border mt-2 rounded-3xl bg-blue-400 px-2 mx-1"
                  href="/payment"
                >
                  Pagar
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      {showAdress && <AdressComponent userId={userId} />}
    </div>
  );
}
