'use client';
import Bold from '@tiptap/extension-bold';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Heading, { Level } from '@tiptap/extension-heading';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Strike,
      Underline,
      Italic,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    ],
    content: '<p>Hello World! 🌎️</p>',
  });
  if (!editor) {
    return null;
  }
  return (
    <>
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
      Heading:
      <select
        onChange={(ev) => {
          const value = parseInt(ev.target.value);
          if (value === 1) {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          } else if (value === 2) {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          } else if (value === 3) {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          } else if (value === 4) {
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          } else if (value === 5) {
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          } else if (value === 6) {
            editor.chain().focus().toggleHeading({ level: 6 }).run();
          }
        }}
      >
        <option value={1}>H1</option>
        <option value={2}>H2</option>
        <option value={3}>H3</option>
        <option value={4}>H4</option>
        <option value={5}>H5</option>
        <option value={6}>H6</option>
      </select>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        Heading
      </button>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
