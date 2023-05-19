import { pool } from '@/lib/server/pg';
import { Product } from '../../components/MyClientComponent';
import { cookies } from 'next/headers';

export default async function Products() {
  const cookiesValue = cookies();
  console.log(cookiesValue);
  const result = await pool.query('SELECT * FROM products;');
  return (
    <div>
      <div className="relative top-12 grid grid-cols-2 bg-blue-200">
        {result.rows.map((row) => (
          <Product {...row} />
        ))}
      </div>
    </div>
  );
}
