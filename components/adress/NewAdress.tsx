'use client';

import {
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from 'react';
import Link from 'next/link';
import AdressDefault from './AdressDefault';
import { Button, Collapse, Paper } from 'gordo-ui';
import { PlusIcon } from '../Icons/Icons';
import { AdressContext } from '../context/AdressContextProvider';
import AdressComponent from './AdressComponent';
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
  const { adressDef } = useContext(AdressContext);
  const [showAdress, setShowAdress] = useState(false);
  const submitHandler: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const line = formData.get('adress');
    const city = formData.get('city');
    const postalCode = formData.get('postalCode');
    const country = formData.get('country');
    const response = await fetch('/api/adress', {
      method: 'POST',
      body: JSON.stringify({ line, city, postalCode, country, userId }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const id = await response.json();
    if (response.ok) window.location.assign('/payment');
  };
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    setShowAdress(!showAdress);
  };
  console.log(showAdress);

  return (
    <>
      {adress.length === 0 && (
        <AdressComponent userId={userId!} showAdress={true} />
      )}
      {adress.length! > 0 && (
        <Paper className=" mx-auto mt-7 border rounded-lg min-w-fit flex flex-col  p-5 gap-5 justify-center bg-white max-w-5xl ">
          <p className="text-lg font-semibold">Direccion de entrega</p>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {adress.map((adress) => (
              <div
                style={{
                  borderColor: adressDef === adress.id ? 'black' : 'inherit',
                }}
                key={adress.id}
                className="flex flex-col gap-2 p-2 justify-around items-center border-2  rounded-md "
              >
                <div className="text-center">Calle: {adress.line} </div>
                <div className="text-center">CP: {adress.postal_code} </div>
                <div className="text-center">Ciudad: {adress.city} </div>
                <div className="text-center">Pais: {adress.country} </div>

                <AdressDefault userId={userId!} adressId={adress.id} />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-end">
              <Button
                onClick={clickHandler}
                variant="text"
                disableRipple
                className="[div>&]:text-black"
              >
                <PlusIcon />
                Enviar a otra direccion
              </Button>
            </div>
            <Link href="/payment">
              <Button variant="contained" disableRipple color="success">
                Pagar{' '}
              </Button>
            </Link>
          </div>
          <AdressComponent userId={userId} showAdress={showAdress} />
        </Paper>
      )}
    </>
  );
}
