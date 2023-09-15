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
  const seller = await pool.query(
    'SELECT name FROM users_info WHERE id=' + product.rows[0].seller_id
  );

  return (
    <div className="relative max-w-5xl mt-7 lg:max-w-7xl lg:mx-auto">
      <SingleProduct {...product.rows[0]} seller={seller.rows[0]?.name} />
    </div>
  );
}
