'use client';

import Tiptap from '@/components/tiptap/TipTapComponent';
import { JSONContent } from '@tiptap/react';
import { FormEventHandler, useState } from 'react';

export default function Upload() {
  const [imageURL, setImageURL] = useState('');
  let productPage: JSONContent = { type: 'doc' };
  const pageOnChange = (page: JSONContent, imageURL: string) => {
    productPage = page;
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const response = await fetch('/api/upload_product', {
      method: 'POST',
      body: JSON.stringify({ name, description, price, productPage, imageURL }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (response.ok) {
      window.location.assign('/profile/products');
    }
  };
  return (
    <div>
      <div className="relative bg-blue-100 min-h-screen w-full">
        <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center bg-blue-300 shadow-black shadow-2xl ">
          <form onSubmit={submitHandler} className="flex flex-col">
            <label> Nombre del producto:</label>
            <input name="name" type="text"></input>
            <label> Breve descripcion del producto:</label>
            <input name="description" type="text"></input>
            <div className="flex justify-between mt-2">
              <div>
                <label> Precio en euros: </label>
                <input name="price" type="number"></input>
              </div>
            </div>
            <div className="my-5">
              <Tiptap pageOnChange={pageOnChange} setImageURL={setImageURL} />
            </div>
            <div>
              <button
                type="submit"
                className="px-1 border bg-blue-400 rounded-3xl mx-5"
              >
                Subir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
