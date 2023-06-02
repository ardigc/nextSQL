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
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BulletIcon, OrderedIcon, RedoIcon, UndoIcon } from '../Icons/Icons';
const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Strike,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
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
    content: '<p>Hello World! 🌎️</p>',
  });
  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="flex">
        <button
          className="border italic w-7 h-7 border-black"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <UndoIcon />
        </button>
        <button
          className="border italic w-7 h-7 border-black"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <RedoIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="font-bold italic border  w-7 h-7 border-black"
        >
          N
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="line-through border italic w-7 h-7 border-black"
        >
          S
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="underline border italic w-7 h-7 border-black"
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="border italic w-7 h-7 border-black"
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="border italic w-7 h-7 border-black"
        >
          <BulletIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="border italic w-7 h-7 border-black"
        >
          <OrderedIcon />
        </button>
        <select
          onChange={(ev) => {
            const value = parseInt(ev.currentTarget.value) as Level;
            console.log(editor);
            editor.chain().focus().toggleHeading({ level: value }).run();
          }}
        >
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
          <option value={4}>H4</option>
          <option value={5}>H5</option>
        </select>
        <div className="ml-2">Font:</div>
        <select
          className="border"
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
        <div className="ml-2">Color:</div>
        <select
          className="border "
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
        <div className="ml-2">Highlight:</div>
        <select
          className="border "
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
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          insertTable
        </button>
        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
          addColumnBefore
        </button>
        <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
          addColumnAfter
        </button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()}>
          deleteColumn
        </button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()}>
          addRowBefore
        </button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()}>
          addRowAfter
        </button>
        <button onClick={() => editor.chain().focus().deleteRow().run()}>
          deleteRow
        </button>
        <button onClick={() => editor.chain().focus().deleteTable().run()}>
          deleteTable
        </button>
        <button onClick={() => editor.chain().focus().mergeCells().run()}>
          mergeCells
        </button>
        <button onClick={() => editor.chain().focus().splitCell().run()}>
          splitCell
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        >
          toggleHeaderColumn
        </button>
        <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
          toggleHeaderRow
        </button>
      </div>
      <EditorContent className="prose top-0 relative" editor={editor} />
    </>
  );
};

export default Tiptap;