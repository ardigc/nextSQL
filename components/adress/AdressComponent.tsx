'use client';
import { Paper } from 'gordo-ui';
import { FormEventHandler } from 'react';

export default function AdressComponent({ userId }: { userId: number }) {
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
  return (
    <Paper className=" mx-auto mt-7 border rounded-lg min-w-fit flex flex-col md:flex-row p-5 gap-5 justify-center bg-white max-w-5xl ">
      <form className="grid grid-cols-1" onSubmit={submitHandler}>
        <label>Direccion:</label>
        <input name="adress" type="text"></input>
        <div className="my-2 flex justify-around">
          <div>
            <label>Ciudad:</label>
            <input name="city" type="text"></input>
          </div>
          <div>
            <label>Codigo postal:</label>
            <input name="postalCode" type="number"></input>
          </div>
          <div>
            <label>Pais:</label>
            <input name="country" type="text"></input>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="border mt-2 rounded-3xl bg-blue-400 px-2 mx-10"
          >
            Continuar al pago
          </button>
        </div>
      </form>
    </Paper>
  );
}
