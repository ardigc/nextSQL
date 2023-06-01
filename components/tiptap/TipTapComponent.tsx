'use client';
import Bold from '@tiptap/extension-bold';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';

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
      // onSelect={(ev) =>{
      //   const value= ev.currentTarget.value
      //   console.log(value)
      // editor.chain().focus().toggleHeading({  }).run()}}
      >
        <option value={'level: 1'}>H1</option>
        <option value={2}>H2</option>
        <option value={3}>H3</option>
        <option value={4}>H4</option>
        <option value={5}>H5</option>
        <option value={6}>H6</option>
      </select>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
