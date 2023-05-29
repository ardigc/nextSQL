import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function Adress() {
  const cookiesValue = cookies();
  let user = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') {
      return;
    }
    const adress = await pool.query(
      `SELECT * FROM users_adress WHERE user_id=${user.id}`
    );
    console.log(adress.rows);
  } catch (error: any) {
    console.error('Error al verificar el token:', error.message);
  }
  return <div></div>;
}
