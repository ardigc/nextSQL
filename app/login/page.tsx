'use client';
import { FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { SnackBar, Alert, Paper, Button } from 'gordo-ui';
export default function SignIn() {
  const [openAlert, setOpenAlert] = useState(false);
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const pass = formData.get('pass');
    const response = await fetch('/api/auth/logIn', {
      method: 'POST',
      body: JSON.stringify({ email, pass }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!response.ok) {
      setOpenAlert(true);
      return;
    } else {
      const data = await response.json();
      document.cookie = `token=${data.token};`;
      // push("/products")
      window.location.assign('/products');
    }
  };
  return (
    <div className="relative w-full flex">
      <Paper className=" mx-auto mt-7 border rounded-lg min-w-fit flex justify-center bg-white max-w-5xl ">
        <div className=" m-3  grid grid-cols-2 w-full gap-3">
          <div className="text-3xl border-b pb-2 ">Iniciar sesión</div>
          <div className=" text-3xl border-b  pb-2">
            <p>¿No tienes cuenta?</p>
          </div>
          <form onSubmit={submitHandler} className="gap-3 grid grid-cols-1 ">
            <label>Correo electronico</label>
            <input name="email" type="email"></input>

            <label>Contraseña</label>
            <input name="pass" type="password"></input>

            <div className="flex justify-end">
              <Button
                disableRipple
                className="w-full my-2"
                color="success"
                variant="contained"
                size="small"
              >
                Iniciar Sesión
              </Button>
            </div>
          </form>
          <div>
            Crea tu cuenta ahora y disfruta de todos los productos disponibles
            <Link href="/register">¿No tienes cuenta?</Link>
          </div>
        </div>
        <SnackBar
          autoHideDuration={3000}
          transition="fade"
          open={openAlert}
          onClose={() => setOpenAlert(false)}
        >
          <Alert onClose={() => setOpenAlert(false)} severity="error">
            Usuario o contraseña incorrectos
          </Alert>
        </SnackBar>
      </Paper>
    </div>
  );
}
