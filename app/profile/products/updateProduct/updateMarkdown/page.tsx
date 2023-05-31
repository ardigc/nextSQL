'use client';

import { useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
interface Product {
  name: string;
  description: string;
  price: number;
}
export default function updateMarkdown() {
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: 0,
  });
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleNameInputChange = () => {
    if (nameRef.current) {
      const newName = nameRef.current.value;
      setProduct((prev) => ({ ...prev, name: newName }));
    }
  };
  const handleDescriptionInputChange = () => {
    if (descriptionRef.current) {
      const newDescription = descriptionRef.current.value;
      setProduct((prev) => ({ ...prev, description: newDescription }));
    }
  };
  const handlePriceInputChange = () => {
    if (priceRef.current) {
      const newPrice = priceRef.current.value;
      const price = parseFloat(newPrice);
      setProduct((prev) => ({ ...prev, price: price }));
    }
  };

  console.log(product);
  return (
    <div>
      <div className="relative bg-blue-100 min-h-screen w-full">
        <div className="w-11/12  mx-auto border rounded-lg p-3 relative  top-7 justify-center bg-blue-300 shadow-black shadow-2xl ">
          <div className="flex items-center">
            <label>Name:</label>
            <textarea
              ref={nameRef}
              onChange={handleNameInputChange}
              rows={3}
              cols={50}
            />
            <label>Descricion:</label>
            <textarea
              ref={descriptionRef}
              onChange={handleDescriptionInputChange}
              rows={3}
              cols={50}
            />
            <label>Precio:</label>
            <input
              ref={priceRef}
              type="number"
              onChange={handlePriceInputChange}
            ></input>
          </div>
          <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative  top-7 justify-center mb-10 bg-blue-300 shadow-black shadow-2xl ">
            <div className="flex justify-center">
              <ReactMarkdown className="prose " children={product.name} />
            </div>
            <div className="flex justify-center">
              <ReactMarkdown
                className="prose "
                children={product.description}
              />
            </div>

            <div className="flex justify-end items-center">
              <button className="px-1 border bg-blue-400 rounded-3xl mx-5">
                Añadir al carrito
              </button>
              <div className="w-16 flex justify-end me-2">
                {product.price} €
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
