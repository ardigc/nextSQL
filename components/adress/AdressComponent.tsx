'use client';
import { Button, Collapse, Paper, TextField } from 'gordo-ui';
import { FormEventHandler } from 'react';

export default function AdressComponent({
  userId,
}: // showAdress,
{
  userId: number;
  // showAdress: boolean;
}) {
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
    // <Collapse open={showAdress}>
    <form className="flex flex-col gap-2" onSubmit={submitHandler}>
      <TextField
        label="Dirección"
        name="adress"
        type="text"
        classes={{ inputClassName: 'w-full' }}
      />
      <div className="md:my-2 gap-2 flex flex-col md:flex-row justify-around w-full">
        <TextField
          label="Ciudad"
          name="city"
          type="text"
          classes={{ inputClassName: 'w-full' }}
        />

        <TextField
          label="Codigo Postal"
          name="postalCode"
          type="number"
          classes={{ inputClassName: 'w-full' }}
        />

        <TextField
          label="Pais"
          name="country"
          type="text"
          classes={{ inputClassName: 'w-full' }}
        />
      </div>
      <div className="flex justify-end m-1">
        <Button variant="contained" disableRipple color="success">
          Continuar al pago
        </Button>
      </div>
    </form>
    // </Collapse>
  );
}
