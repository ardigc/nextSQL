'use client';

import { MouseEventHandler, useContext } from 'react';
import { GlobalContext } from '../context/ContextProvider';
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
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMemo } from 'react';

// import { useRouter } from 'next/navigation';

export default function SingleProduct({
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
  const { setCart } = useContext(GlobalContext);
  const productPage = JSON.parse(product_page);
  console.log(productPage);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    ev.preventDefault();
    const response = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ id }),
      // prueba
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setCart(data);
  };
  if (product_page) {
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
    return (
      <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center mb-10 bg-blue-300 shadow-black shadow-2xl ">
        <div
          className="prose ProseMirror"
          dangerouslySetInnerHTML={{ __html: sanitizedOutput }}
        ></div>
        <div className="flex justify-end items-center">
          <button
            onClick={clickHandler}
            className="px-1 border bg-blue-400 rounded-3xl mx-5"
          >
            Añadir al carrito
          </button>
          <div className="w-16 min-w-fit flex justify-end me-2">{price} €</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center mb-10 bg-blue-300 shadow-black shadow-2xl ">
        <div className="flex justify-center">{name}</div>
        <div className="flex justify-center items-center">{description}</div>
        <div className="flex justify-end items-center">
          <button
            onClick={clickHandler}
            className="px-1 border bg-blue-400 rounded-3xl mx-5"
          >
            Añadir al carrito
          </button>
          <div className="w-16 min-w-fit flex justify-end me-2">{price} €</div>
        </div>
        {seller && (
          <div className="flex justify-end items-center mt-2">
            {' '}
            Vendido por {seller}
          </div>
        )}
      </div>
    );
  }
}
