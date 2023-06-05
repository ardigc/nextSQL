'use client';
import { JSONContent } from '@tiptap/react';
import Bold from '@tiptap/extension-bold';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Heading, { Level } from '@tiptap/extension-heading';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import DOMPurify from 'dompurify';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import { useEditor, EditorContent, generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMemo } from 'react';

import Tiptap from '@/components/tiptap/TipTapComponent';
import { FormEventHandler } from 'react';
import TiptapUpdate from '../tiptap/TipTapUpdate';

export default function UpdatingProduct({
  name,
  description,
  price,
  product_page,
  seller,
  id,
}: {
  name: string;
  description: string;
  price: number;
  id: number;
  product_page: string;
  seller?: number;
}) {
  let productPage: JSONContent = JSON.parse(product_page);
  const output = useMemo(() => {
    return generateHTML(productPage, [
      StarterKit,
      Bold,
      Strike,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link,
      TextStyle,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'table',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Italic,
      Highlight.configure({ multicolor: true }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
    ]);
  }, [productPage]);
  const sanitizedOutput = DOMPurify.sanitize(output);
  const pageOnChange = (page: JSONContent) => {
    productPage = page;
    console.log(page);
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const response = await fetch('/api/upload_product', {
      method: 'PATCH',
      body: JSON.stringify({ name, description, price, productPage, id }),
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
            <input defaultValue={name} name="name" type="text"></input>
            <label> Breve descripcion del producto:</label>
            <input
              defaultValue={description}
              name="description"
              type="text"
            ></input>
            <div className="flex justify-between mt-2">
              <div>
                <label> Precio en euros: </label>
                <input defaultValue={price} name="price" type="number"></input>
              </div>
            </div>
            <div className="my-5">
              <TiptapUpdate pageOnChange={pageOnChange} prev={output} />
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
