import SingleProduct from '@/components/product/SingleProduct';
import { pool } from '@/lib/server/pg';

export default async function ProductDetail({
  params,
}: {
  params: { productId: number };
}) {
  const product = await pool.query(
    'SELECT * FROM products WHERE id=' + params.productId
  );
  return (
    <div className="relative top-12 bg-blue-100 min-h-screen w-full">
      <SingleProduct {...product.rows[0]} />
    </div>
  );
}
