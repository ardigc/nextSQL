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

export default function TipTapOutput({ json }: { json: JSONContent }) {
  console.log(json);
  const output = useMemo(() => {
    return generateHTML(json, [
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
  }, [json]);
  // const output =JSON.parse(json)
  const sanitizedOutput = DOMPurify.sanitize(output);
  return (
    <div className="w-11/12 max-w-2xl mx-auto border rounded-lg p-3 relative top-7 justify-center mb-10 bg-blue-300 shadow-black shadow-2xl ">
      <div
        className="prose ProseMirror"
        dangerouslySetInnerHTML={{ __html: sanitizedOutput }}
      ></div>
      <div className="flex justify-end items-center">
        <button
          //   onClick={clickHandler}
          className="px-1 border bg-blue-400 rounded-3xl mx-5"
        >
          Añadir al carrito
        </button>
        <div className="w-16 min-w-fit flex justify-end me-2">price €</div>
      </div>
    </div>
  );
}
