'use client';

import { MouseEventHandler, useContext } from 'react';
import { AdressContext } from '../context/AdressContextProvider';
import { Button } from 'gordo-ui';

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
        <Button
          disableRipple
          size="small"
          variant="contained"
          onClick={clickHandler}
          color="info"
        >
          Marcar como predeterminada{' '}
        </Button>
      )}
    </div>
  );
}
