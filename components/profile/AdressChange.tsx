'use client';
import { FormEventHandler, useState } from 'react';
import { CheckIcon, PenIcon } from '../Icons/Icons';
import { headers } from 'next/headers';

interface Adress {
  id: number;
  user_id: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
  marked_as_default: Date;
}
export default function AddressChange({ adress }: { adress: Adress }) {
  const [edit, setEdit] = useState(0);
  const submitHandler: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const id = adress.id;
    const formData = new FormData(ev.currentTarget);
    let set = '';
    let mod = null;
    if (edit === 1) {
      const line = formData.get('line');
      set = 'line';
      mod = line;
    }
    const response = await fetch(`/api/adress/${adress.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ set, mod }),
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log(response);
  };
  return (
    <div>
      <div>Tus direcciones</div>

      <div className="my-5 flex flex-col">
        {edit !== 1 && (
          <div>
            Dirección: {adress.line}{' '}
            <button onClick={() => setEdit(1)}>
              <PenIcon />
            </button>
          </div>
        )}
        {edit === 1 && (
          <form onSubmit={submitHandler}>
            Dirección: <input name="line" type="text"></input>
            <button type="submit">
              <CheckIcon />
            </button>
          </form>
        )}
        <div className="flex justify-around my-1">
          <div>Ciudad: {adress.city}</div>
          <div>CP: {adress.postal_code}</div>
          <div>Pais: {adress.country}</div>
        </div>
      </div>
    </div>
  );
}
