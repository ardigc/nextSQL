import { pool } from '@/lib/server/pg';
import { Product } from '../../components/product/MyClientComponent';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export default async function Products() {
  const result = await pool.query('SELECT * FROM products;');
  return (
    <div>
      <div className="relative top-12 bg-blue-100 min-h-screen w-full">
        <div className="relative grid grid-cols-2">
          {result.rows.map((row) => (
            <Product key={row.id} {...row} />
          ))}
        </div>
      </div>
    </div>
  );
}
