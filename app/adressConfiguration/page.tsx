import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { FormEventHandler } from 'react';
import AdressComponent from '@/components/AdressComponent';

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

  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full ">
      {adress?.rowCount === 0 && <AdressComponent userId={userId} />}
    </div>
  );
}
