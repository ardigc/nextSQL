import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { FormEventHandler } from 'react';
import AdressComponent from '@/components/AdressComponent';
import NewAdress from '@/components/NewAdress';
import { QueryResult } from 'pg';
import AdressDefault from '@/components/AdressDefault';
import { AdressProvider } from '@/components/AdressContextProvider';
import Link from 'next/link';

export default async function adressConfiguration() {
  const cookiesValue = cookies();
  let user = null;
  let userId: number | null = null;
  let adress = null;
  let adressDefault: QueryResult<any> | null = null;
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
      `SELECT * FROM users_adress WHERE user_id=${user.id} ORDER BY id DESC`
    );
    adressDefault = await pool.query(
      `SELECT * FROM users_adress WHERE user_id=${user.id} ORDER BY marked_as_default DESC LIMIT 1`
    );
    // console.log(adress)
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message);
  }
  // console.log(adressDefault?.rows[0].id);
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full ">
      <AdressProvider initialAdress={adressDefault?.rows[0].id}>
        {adress?.rowCount === 0 && (
          <div className="w-11/12 max-w-3xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl">
            <AdressComponent userId={userId!} />
          </div>
        )}
        {adress?.rows.length! > 0 && (
          <div className="w-11/12 max-w-3xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl">
            Tus direcciones:
            {adress?.rows.map((adress) => (
              <div className="flex justify-between items-center my-3">
                <div>Calle: {adress.line} </div>
                <div>CP: {adress.postal_code} </div>
                <div>Ciudad: {adress.city} </div>
                <div>Pais: {adress.country} </div>

                <AdressDefault userId={userId!} adressId={adress.id} />
              </div>
            ))}
            <div className="flex justify-between items-center">
              <NewAdress userId={userId!} />
              <Link
                className="border mt-2 rounded-3xl bg-blue-400 px-2 mx-1"
                href="/payment"
              >
                Pagar
              </Link>
            </div>
          </div>
        )}
      </AdressProvider>
    </div>
  );
}
