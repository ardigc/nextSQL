import AddressChange from '@/components/profile/AdressChange';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function Adress() {
  const cookiesValue = cookies();
  let user = null;
  let adress = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    const adressBeta = await pool.query(
      `SELECT * FROM users_adress WHERE user_id=${user.id} ORDER BY id DESC`
    );
    adress = adressBeta.rows;
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message);
  }
  return (
    <div className="relative bg-blue-100 min-h-screen w-full">
      <div className="w-11/12 max-w-2xl mx-auto border rounded-lg grid grid-cols-1 p-3 relative top-7 justify-center text-center bg-blue-300 shadow-black shadow-2xl  ">
        <div>Tus direcciones</div>
        {adress && adress.map((adress) => <AddressChange adress={adress} />)}
      </div>
    </div>
  );
}
