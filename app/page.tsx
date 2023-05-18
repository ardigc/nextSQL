import { pool } from '@/lib/server/pg';
import { Product } from './MyClientComponent';
import Sesion from '../components/Sesion';

export default async function Home() {
  const result = await pool.query('SELECT * FROM products;');
  const user = await pool.query('SELECT * FROM users_info WHERE id=1');
  console.log(user);
  return (
    <div>
      {/* { user.rows.map(row=> <h1> {row.name} {row.email}</h1>)} */}
      <div className="z-50 fixed top-0 w-screen h-12 flex items-center justify-center bg-blue-200">
        <h1>Eshop</h1>
        <Sesion />
      </div>
      <div className="relative top-12 grid grid-cols-2 bg-slate-200">
        {result.rows.map((row) => (
          <Product {...row} />
        ))}
      </div>
    </div>
  );
}
