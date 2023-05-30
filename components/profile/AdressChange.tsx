'use client';
import { FormEventHandler, MouseEventHandler, useState } from 'react';
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
    const line = formData.get('line');
    const city = formData.get('city');
    const postalCode = formData.get('postalCode');
    const country = formData.get('country');
    const response = await fetch(`/api/adress/${adress.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ line, city, postalCode, country }),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (response.ok) {
      window.location.reload();
    }
    // console.log(response);
  };
  const clickHandler: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    const response = await fetch(`/api/adress/${adress.id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      window.location.reload();
    }
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
            <button
              className="px-1 border bg-blue-400 rounded-3xl mx-5"
              onClick={clickHandler}
            >
              Borrar
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
                <input
                  className="w-4/6 bg-blue-200"
                  defaultValue={adress.line}
                  name="line"
                  type="text"
                ></input>
              </div>
              <div className="flex justify-around  my-1">
                <div>
                  Ciudad:{' '}
                  <input
                    defaultValue={adress.city}
                    className="w-11/12  bg-blue-200"
                    name="city"
                    type="text"
                  ></input>
                </div>
                <div>
                  CP:{' '}
                  <input
                    defaultValue={adress.postal_code}
                    className="w-11/12 bg-blue-200"
                    name="postalCode"
                    type="number"
                  ></input>
                </div>
                <div>
                  Pais:{' '}
                  <input
                    defaultValue={adress.country}
                    className="w-11/12 bg-blue-200"
                    name="country"
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div>
              <button
                className="px-1 border bg-blue-400 rounded-3xl mx-5"
                type="submit"
              >
                {' '}
                Confirmar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
