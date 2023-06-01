'use client';
import Bold from '@tiptap/extension-bold';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Bold],
    content: '<p>Hello World! 🌎️</p>',
  });
  if (!editor) {
    return null;
  }
  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        toggleBold
      </button>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
