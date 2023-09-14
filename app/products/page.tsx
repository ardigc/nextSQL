import { pool } from '@/lib/server/pg';
import { Product } from '../../components/product/MyClientComponent';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import Image from 'next/image';
import Link from 'next/link';

export default async function Products() {
  const result = await pool.query(
    'SELECT products.name, products.description, products.price, products.id, products.image_url ,users_info.name AS seller_name FROM products INNER JOIN users_info ON products.seller_id=users_info.id WHERE delete_at IS NULL;'
  );
  return (
    <div className=" mt-7 mx-5  max-w-5xl lg:mx-auto">
      <Link href={'/products/51'}>
        <Image
          alt={'Main offer'}
          width={1100}
          height={460}
          src={'https://ardigc.blob.core.windows.net/images/iphone 15 pro.webp'}
        ></Image>
      </Link>
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
