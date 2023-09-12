import { pool } from '@/lib/server/pg';
import { Product } from '../../components/product/MyClientComponent';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export default async function Products() {
  const result = await pool.query(
    'SELECT * FROM products WHERE delete_at IS NULL;'
  );
  return (
    <div className=" mt-7 mx-5  max-w-5xl lg:mx-auto">
      <p className="text-3xl mb-3 font-semibold   ">
        Ultimos productos destacados
      </p>
      <div className="grid md:grid-cols-4 gap-5 grid-cols-2">
        {result.rows.map((row) => (
          <Product key={row.id} {...row} />
        ))}
      </div>
    </div>
  );
}
