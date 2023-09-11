import ModifyProduct from '@/components/product/ModifyProduct';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Link from 'next/link';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  seller_id: number;
}

export default async function productSeller() {
  const cookiesValue = cookies();
  let user = null;
  let products: Array<Product> | null = null;
  try {
    user = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof user === 'string') return;
    const result = await pool.query(
      `SELECT * FROM products WHERE seller_id=${user.id} AND delete_at IS NULL;`
    );
    products = result.rows;
  } catch (error) {}
  return (
    <div>
      <div className="relative bg-blue-100 min-h-screen w-full">
        <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl ">
          <div>{products && <ModifyProduct products={products} />}</div>
          <div className="flex justify-center">
            <Link
              href="/profile/products/uploadProduct"
              className="px-1 border bg-blue-400 rounded-3xl mx-5"
            >
              Subir nuevo producto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
