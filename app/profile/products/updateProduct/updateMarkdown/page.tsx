'use client';

import { useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
interface Product {
  name: string;
}
export default function updateMarkdown() {
  const [product, setProduct] = useState<Product>({
    name: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (inputRef.current) {
      const newValue = inputRef.current.value;
      setProduct((prev) => ({ ...prev, name: newValue }));
    }
  };
  console.log(product);
  return (
    <div>
      <div className="relative bg-blue-100 min-h-screen w-full">
        <div className="w-11/12  mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl ">
          <div>
            <label>Name:</label>
            <input ref={inputRef} onChange={handleInputChange}></input>
          </div>
          <div>
            <ReactMarkdown className="prose" children={product.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
