import { pool } from '@/lib/server/pg';
import { Product } from '../../components/product/MyClientComponent';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export default async function Products() {
  const result = await pool.query(
    'SELECT * FROM products WHERE delete_at IS NULL;'
  );
  return (
    <div className="grid gap-5  mx-5 grid-cols-2 md:grid-cols-4  max-w-5xl lg:mx-auto">
      {result.rows.map((row) => (
        <Product key={row.id} {...row} />
      ))}
    </div>
  );
}
