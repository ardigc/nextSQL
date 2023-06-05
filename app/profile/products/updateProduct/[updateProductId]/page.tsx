import { pool } from '@/lib/server/pg';

export default async function ProductDetail({
  params,
}: {
  params: { updateProductId: number };
}) {
  const product = await pool.query(
    'SELECT * FROM products WHERE id=' + params.updateProductId
  );

  console.log(product.rows);
  return (
    <div className="relative top-12 bg-blue-100 min-h-screen w-full"></div>
  );
}
