import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default function adressConfiguration() {
  const cookiesValue = cookies();
  let user = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
  } catch {}

  const adress = pool.query('SELECT * FROM adress WHERE user_id=');
  return <div className="relative top-12 bg-blue-100 h-screen w-full"> </div>;
}
