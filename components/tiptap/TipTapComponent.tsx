'use client';
import Bold from '@tiptap/extension-bold';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Strike, Underline],
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
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
