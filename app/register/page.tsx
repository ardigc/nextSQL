'use client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { FormEventHandler } from 'react';
import { Button, Paper, TextField } from 'gordo-ui';
import Link from 'next/link';

export default function SignIn() {
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const pass = formData.get('pass');
    const name = formData.get('name');
    const phone = formData.get('phone');
    const subname = formData.get('subname');
    let role = 'buyer';
    const seller = formData.get('seller');
    if (seller) {
      role = 'seller';
    }
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, subname, email, phone, pass, role }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.token};`;
      window.location.assign('/products');
    }
  };

  return (
    <div className="relative w-full flex">
      <Paper className=" mx-auto mt-7 border rounded-lg min-w-fit flex  justify-center bg-white max-w-5xl ">
        <div className="m-3  grid grid-cols-1 md:grid-cols-2  w-full gap-3">
          <div>
            <div className="text-3xl border-b pb-2 mb-2 text-blue-400">
              Crear cuenta
            </div>
            <form
              onSubmit={submitHandler}
              className="px-3 grid gap-3 grid-cols-1"
            >
              <TextField
                name="email"
                type="email"
                label="Correo electronico"
                classes={{ inputClassName: 'w-full' }}
              />
              <TextField
                label="Contraseña"
                name="pass"
                type="password"
                classes={{ inputClassName: 'w-full' }}
              />
              <TextField
                name="name"
                type="text"
                label="Nombre"
                classes={{ inputClassName: 'w-full' }}
              />
              <TextField
                name="subname"
                type="text"
                label="Apellido"
                classes={{ inputClassName: 'w-full' }}
              />
              <label>Telefono</label>
              <PhoneInput
                inputProps={{ name: 'phone', id: 'phone-input' }}
                country={'es'}
                countryCodeEditable
              />
              <div className="flex justify-between">
                <div>
                  <input id="seller" name="seller" type="checkbox"></input>
                  <label htmlFor="seller" className="pl-2">
                    ¿Eres vendedor?
                  </label>
                </div>
                <Button
                  disableRipple
                  className=" my-2"
                  color="success"
                  variant="contained"
                  size="small"
                >
                  Registrarse
                </Button>
              </div>
            </form>
          </div>
          <div>
            <div className=" text-3xl border-b  pb-2 mb-2">
              <p>¿Ya tienes cuenta?</p>
            </div>
            <div className="flex flex-col gap-3">
              Inicia sesión y disfruta de todos los productos disponibles
              <Link href="/login" className="flex justify-end">
                <Button
                  disableRipple
                  size="small"
                  color="success"
                  variant="contained"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
