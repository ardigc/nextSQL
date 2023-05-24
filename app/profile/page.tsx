import { pool } from '@/lib/server/pg';

export default async function Profile() {
  // hacer un select a la informacion
  const cart = await pool.query('SELECT * FROM user_info WHERE id=');
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full">hola</div>
  );
}
