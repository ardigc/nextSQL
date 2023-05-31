import { cookies } from 'next/headers';
import Link from 'next/link';

export default function productSeller() {
  const cookiesValue = cookies();
  const user = null;
  try {
  } catch (error) {}
  return (
    <div>
      <div className="relative bg-blue-100 min-h-screen w-full">
        <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl ">
          <Link
            href="/profile/products/uploadProduct"
            className="px-1 border bg-blue-400 rounded-3xl mx-5"
          >
            Subir producto
          </Link>
        </div>
      </div>
    </div>
  );
}
