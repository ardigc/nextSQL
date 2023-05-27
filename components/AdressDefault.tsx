'use client';

import { MouseEventHandler } from 'react';

export default function AdressDefault({
  adressId,
  userId,
}: {
  adressId: number;
  userId: number;
}) {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    const response = await fetch('/api/adress', {
      method: 'PATCH',
      body: JSON.stringify({ adressId, userId }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (response.ok) window.location.reload();
  };

  return (
    <div>
      <button
        onClick={clickHandler}
        className='className="border mt-2 rounded-3xl bg-blue-400 px-2 mx-10"'
      >
        Enviar aqui
      </button>
    </div>
  );
}
