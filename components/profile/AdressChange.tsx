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
  const [onEdit, setOnEdit] = useState(false);
  const submitHandler: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const id = adress.id;
    const formData = new FormData(ev.currentTarget);
    let set = '';
    let mod = null;
    // if (edit === 1) {
    //   const line = formData.get('line');
    //   set = 'line';
    //   mod = line;
    // }
    const response = await fetch(`/api/adress/${adress.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ set, mod }),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (response.ok) {
      window.location.reload();
    }
    console.log(response);
  };
  return (
    <div>
      {!onEdit && (
        <div className="flex items-center">
          <div className="my-5 flex-grow flex flex-col">
            <div>Dirección: {adress.line} </div>

            <div className="flex justify-around my-1">
              <div>Ciudad: {adress.city}</div>
              <div>CP: {adress.postal_code}</div>
              <div>Pais: {adress.country}</div>
            </div>
          </div>
          <div>
            <button
              onClick={() => setOnEdit(true)}
              className="px-1 border bg-blue-400 rounded-3xl mx-5"
            >
              {' '}
              Editar
            </button>
          </div>
        </div>
      )}
      {onEdit && (
        <div>
          <form onSubmit={submitHandler} className="flex items-center">
            <div className="my-5 flex-grow flex flex-col">
              <div>
                Dirección:{' '}
                <input className="w-4/6" name="line" type="text"></input>
              </div>
              <div className="flex justify-around my-1">
                <div>
                  Ciudad: <input name="line" type="text"></input>
                </div>
                <div>
                  CP: <input name="postal_code" type="number"></input>
                </div>
                <div>
                  Pais: <input name="country" type="text"></input>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => setOnEdit(false)}
                className="px-1 border bg-blue-400 rounded-3xl mx-5"
                type="submit"
              >
                {' '}
                Editar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
