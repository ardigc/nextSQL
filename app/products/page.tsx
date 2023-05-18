import { pool } from '@/lib/server/pg';
import { Product } from '../MyClientComponent';

export default async function Products() {
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
