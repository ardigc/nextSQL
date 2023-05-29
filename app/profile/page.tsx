import ProfileChange from '@/components/ProfileChange';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function Profile() {
  // hacer un select a la informacion
  const cookiesValue = cookies();
  let user = null;
  try {
    const userId = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof userId === 'string') return;

    user = await pool.query(
      'SELECT id, name, subname, email, phone FROM users_info WHERE id=' +
        userId.id
    );
    // console.log(user.rows);
  } catch (error: any) {
    throw 'No tienes iniciada sesion';
  }
  return (
    <div className="relative top-0 bg-blue-100 min-h-screen">
      <ProfileChange user={user.rows[0]} />
    </div>
  );
}
