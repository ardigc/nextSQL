'use client';

import { MouseEventHandler, useContext } from 'react';
import { AdressContext } from '../context/AdressContextProvider';

export default function AdressDefault({
  adressId,
  userId,
}: {
  adressId: number;
  userId: number;
}) {
  const { adressDef } = useContext(AdressContext);
  const { setAdressDef } = useContext(AdressContext);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    const response = await fetch('/api/adress', {
      method: 'PATCH',
      body: JSON.stringify({ adressId, userId }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const adress = await response.json();
    if (response.ok) setAdressDef(adress.id);
  };

  return (
    <div>
      {adressDef !== adressId && (
        <button
          onClick={clickHandler}
          className='className="border mt-2 rounded-3xl bg-blue-400 px-2 mx-10"'
        >
          Enviar aqui
        </button>
      )}
      {adressDef === adressId && <div> Seleccionada </div>}
    </div>
  );
}
