import { pool } from '@/lib/server/pg';
import UpdatingProduct from '@/components/product/updatingProduct';
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
    <div>
      <UpdatingProduct {...product.rows[0]} />
    </div>
  );
}
