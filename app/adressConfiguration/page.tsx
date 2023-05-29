import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { FormEventHandler } from 'react';
import AdressComponent from '@/components/adress/AdressComponent';
import NewAdress from '@/components/adress/NewAdress';
import { QueryResult } from 'pg';
import AdressDefault from '@/components/adress/AdressDefault';
import { AdressProvider } from '@/components/context/AdressContextProvider';
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
  console.log(adress?.rows);
  return (
    <div className="relative top-12 bg-blue-100 min-h-screen w-full ">
      <AdressProvider initialAdress={adressDefault?.rows[0].id}>
        {adress && adressDefault && (
          <NewAdress
            adress={adress.rows}
            userId={userId!}
            adressDefault={adressDefault?.rows[0]}
          />
        )}
      </AdressProvider>
    </div>
  );
}
