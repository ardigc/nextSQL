'use client';
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

import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import {
  useEditor,
  EditorContent,
  generateHTML,
  JSONContent,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlingCenterIcon,
  AlingLeftIcon,
  AlingRightIcon,
  AlingjustifyIcon,
  BulletIcon,
  ColumAfterIcon,
  ColumBeforeIcon,
  ColumDeleteIcon,
  LinkIcon,
  OrderedIcon,
  RedoIcon,
  RowAfterIcon,
  RowBeforeIcon,
  RowDeleteIcon,
  TableDeleteIcon,
  TableIcon,
  UndoIcon,
} from '../Icons/Icons';
import { useCallback, useMemo, useState } from 'react';
import TipTapOutput from './TipTapOutput';
const TiptapUpdate = ({
  pageOnChange,
  prev,
}: {
  prev: string;
  pageOnChange?: any;
}) => {
  const [json, setJson] = useState<JSONContent>({ type: 'doc' });
  const editor = useEditor({
    extensions: [
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
    ],
    content: `${prev}`,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setJson(json);
    },
  });
  if (pageOnChange) {
    pageOnChange(json);
  }
  const setLink = useCallback(() => {
    if (!editor) {
      return null;
    }
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    editor.chain().focus().toggleLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="flex">
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <UndoIcon />
        </button>
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <RedoIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="font-bold italic border  w-7 h-7 border-black flex justify-center items-center"
        >
          N
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="line-through border italic w-7 h-7 border-black flex justify-center items-center"
        >
          S
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="underline border italic w-7 h-7 border-black flex justify-center items-center"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="border italic w-7 h-7 border-black flex justify-center items-center"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="border italic w-7 h-7 border-black flex justify-center items-center"
        >
          <BulletIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="border italic w-7 h-7 border-black flex justify-center items-center"
        >
          <OrderedIcon />
        </button>
        <select
          className="border italic border-black flex justify-center items-center"
          onChange={(ev) => {
            const value = parseInt(ev.currentTarget.value) as Level;
            // console.log(editor);
            editor.chain().focus().toggleHeading({ level: value }).run();
          }}
        >
          <option value={5}>H5</option>
          <option value={4}>H4</option>
          <option value={3}>H3</option>
          <option value={2}>H2</option>
          <option value={1}>H1</option>
        </select>
        <div className="ml-2 border italic border-black flex justify-center items-center pr-1">
          Font:
        </div>
        <select
          className="border italic border-black flex justify-center  items-center"
          onChange={(ev) => {
            const value = ev.currentTarget.value;

            if (value === 'unset') {
              editor.chain().focus().unsetFontFamily().run();
            }
            editor.chain().focus().setFontFamily(value).run();
          }}
        >
          <option value={'unset'}>Stock</option>
          <option value={'Comic Sans MS, Comic Sans'}>Comic Sans</option>
          <option value={'serif'}>Serif</option>
          <option value={'monospace'}>Monospace</option>
          <option value={'cursive'}>Cursive</option>
        </select>
        <div className="ml-2 border italic border-black flex justify-center items-center pr-1">
          Color:
        </div>
        <select
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onChange={(ev) => {
            const value = ev.currentTarget.value;

            editor.chain().focus().setColor(value).run();
          }}
        >
          <option value={'#94a3b8'} className="w-2 h-2 bg-slate-400"></option>
          <option value={'#6b7280'} className="w-2 h-2 bg-gray-500"></option>
          <option value={'#ef4444'} className="w-2 h-2 bg-red-500"></option>
          <option value={'#fb923c'} className="w-2 h-2 bg-orange-400"></option>
          <option value={'#4ade80'} className="w-2 h-2 bg-green-400"></option>
          <option value={'#2dd4bf'} className="w-2 h-2 bg-teal-400"></option>
          <option value={'#22d3ee'} className="w-2 h-2 bg-cyan-400"></option>
          <option value={'#2563eb'} className="w-2 h-2 bg-blue-600"></option>
          <option value={'#c084fc'} className="w-2 h-2 bg-purple-400"></option>
          <option value={'#e879f9'} className="w-2 h-2 bg-fuchsia-400"></option>
          <option value={'#f472b6'} className="w-2 h-2 bg-pink-400"></option>
          <option value={'#fb7185'} className="w-2 h-2 bg-rose-400"></option>
          <option value={'#000000'} className="w-2 h-2 bg-black"></option>
          <option value={'#FFFFFF'} className="w-2 h-2 bg-white"></option>
        </select>
        <div className="ml-2 border italic border-black flex justify-center items-center pr-1">
          Highlight:
        </div>
        <select
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onChange={(ev) => {
            const value = ev.currentTarget.value;

            editor.chain().focus().toggleHighlight({ color: value }).run();
          }}
        >
          <option value={'#94a3b8'} className="w-2 h-2 bg-slate-400"></option>
          <option value={'#6b7280'} className="w-2 h-2 bg-gray-500"></option>
          <option value={'#ef4444'} className="w-2 h-2 bg-red-500"></option>
          <option value={'#fb923c'} className="w-2 h-2 bg-orange-400"></option>
          <option value={'#4ade80'} className="w-2 h-2 bg-green-400"></option>
          <option value={'#2dd4bf'} className="w-2 h-2 bg-teal-400"></option>
          <option value={'#22d3ee'} className="w-2 h-2 bg-cyan-400"></option>
          <option value={'#2563eb'} className="w-2 h-2 bg-blue-600"></option>
          <option value={'#c084fc'} className="w-2 h-2 bg-purple-400"></option>
          <option value={'#e879f9'} className="w-2 h-2 bg-fuchsia-400"></option>
          <option value={'#f472b6'} className="w-2 h-2 bg-pink-400"></option>
          <option value={'#fb7185'} className="w-2 h-2 bg-rose-400"></option>
          <option value={'#000000'} className="w-2 h-2 bg-black"></option>
          <option value={'#FFFFFF'} className="w-2 h-2 bg-white"></option>
        </select>
      </div>
      <div className="flex">
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <TableIcon />
        </button>
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
        >
          <ColumBeforeIcon />
        </button>
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          <ColumAfterIcon />
        </button>
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() => editor.chain().focus().deleteColumn().run()}
        >
          <ColumDeleteIcon />
        </button>
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() => editor.chain().focus().addRowBefore().run()}
        >
          <RowBeforeIcon />
        </button>
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          <RowAfterIcon />
        </button>
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() => editor.chain().focus().deleteRow().run()}
        >
          <RowDeleteIcon />
        </button>
        <button
          type="button"
          className="border italic w-7 h-7 border-black flex justify-center items-center"
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          <TableDeleteIcon />
        </button>
        <select
          className="border italic w-7 h-7 border-black flex justify-center items-center "
          onChange={(ev) => {
            const value = ev.currentTarget.value;
            if (value === '1') {
              editor.chain().focus().mergeCells().run();
            } else if (value === '2') {
              editor.chain().focus().splitCell().run();
            } else if (value === '3') {
              editor.chain().focus().toggleHeaderColumn().run();
            } else if (value === '4') {
              editor.chain().focus().toggleHeaderRow().run();
            }
          }}
        >
          <option></option>
          <option value="1">Fusionar celdas</option>
          <option value="2">Separar celdas</option>
          <option value="3">Columna encabezado</option>
          <option value="4">Fila encabezado</option>
        </select>
        <button
          type="button"
          className="border italic w-8 h-7 border-black flex justify-center items-center ml-6 "
          onClick={setLink}
        >
          <LinkIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className="border italic w-7 h-7 border-black flex justify-center items-center"
        >
          <AlingLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className="border italic w-7 h-7 border-black flex justify-center items-center"
        >
          <AlingCenterIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className="border italic w-7 h-7 border-black flex justify-center items-center"
        >
          <AlingRightIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className="border italic w-7 h-7 border-black flex justify-center items-center"
        >
          <AlingjustifyIcon />
        </button>
      </div>
      <EditorContent
        id="editor"
        className="prose p-5 mt-3 border top-0 relative"
        editor={editor}
      />
      <div className="flex justify-center text-lg font-bold">
        Asi se vera la pagina de tu producto
      </div>
      <TipTapOutput json={json} />
    </>
  );
};

export default TiptapUpdate;
