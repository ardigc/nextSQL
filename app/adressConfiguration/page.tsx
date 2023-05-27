import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { FormEventHandler } from 'react';
import AdressComponent from '@/components/AdressComponent';
import NewAdress from '@/components/NewAdress';

export default async function adressConfiguration() {
  const cookiesValue = cookies();
  let user = null;
  let userId = null;
  let adress = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    userId = user.id;
    adress = await pool.query(
      'SELECT * FROM users_adress WHERE user_id=' + user.id
    );
    // console.log(adress)
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message);
  }
  console.log(adress?.rows);
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full ">
      {adress?.rowCount === 0 && (
        <div className="w-11/12 max-w-3xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl">
          <AdressComponent userId={userId} />
        </div>
      )}
      {adress?.rows.length! > 0 && (
        <div className="w-11/12 max-w-3xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl">
          Tus direcciones:
          {adress?.rows.map((adress) => (
            <div className="flex justify-between items-center">
              <div>Calle: {adress.line} </div>
              <div>CP: {adress.postal_code} </div>
              <div>Ciudad: {adress.city} </div>
              <div>Pais: {adress.country} </div>
              <button className='className="border mt-2 rounded-3xl bg-blue-400 px-2 mx-10"'>
                Enviar aqui
              </button>
            </div>
          ))}
          <NewAdress userId={userId} />
        </div>
      )}
    </div>
  );
}
