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
    <div className="max-w-5xl 2xl:max-w-full lg:mx-auto">
      <Link className="relative" href={'/products/51'}>
        <Image
          alt={'Main offer'}
          className="w-full"
          width={2100}
          height={1060}
          src={'https://ardigc.blob.core.windows.net/images/iphone titanio.jpg'}
        ></Image>
        <div className="absolute top-0 h-full left-0 w-full z-[1] flex justify-center ">
          <Image
            alt="Iphone logo"
            className="relative top-[10%] w-[20%] md:w-[10%] h-fit"
            width={180}
            height={50}
            src={
              'https://ardigc.blob.core.windows.net/images/logo_iphone_15_pro.png'
            }
          ></Image>
        </div>
      </Link>
      <div className="mx-5">
        <p className="text-3xl my-3 font-semibold   ">
          Ultimos productos destacados
        </p>
        <div className="grid md:grid-cols-4 gap-5 2xl:grid-cols-8 grid-cols-2">
          {result.rows.map((row) => (
            <Product key={row.id} {...row} />
          ))}
        </div>
      </div>
    </div>
  );
}
