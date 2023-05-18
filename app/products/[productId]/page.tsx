import SingleProduct from '@/components/SingleProduct';
import { pool } from '@/lib/server/pg';

export default async function ProductDetail({
  params,
}: {
  params: { productId: number };
}) {
  const product = await pool.query(
    'SELECT * FROM products WHERE id=' + params.productId
  );
  console.log(params.productId);
  return (
    <div className="top-12 relative">
      <SingleProduct {...product.rows[0]} />
    </div>
  );
}
