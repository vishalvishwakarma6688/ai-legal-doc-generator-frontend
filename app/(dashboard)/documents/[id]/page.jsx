'use client';
import { useDocument, useUpdateDocument } from '@/hooks/useDocuments';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function DocumentPage() {
  const { id } = useParams();
  const { data, isLoading } = useDocument(id);
  const { mutate: updateDoc, isPending } = useUpdateDocument();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Initialize Tiptap editor with SSR fix
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (data && editor) {
      setTitle(data.title);
      setContent(data.content);
      editor.commands.setContent(data.content);
    }
  }, [data, editor]);

  if (isLoading) return <p>Loading...</p>;

  const handleSave = () => {
    updateDoc({ id, title, content });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      {/* Title input */}
      <input
        className="w-full text-black text-2xl font-bold border-b mb-4 p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Tiptap Editor */}
      {editor && (
        <div className="border text-black rounded p-3 mb-4">
          <EditorContent editor={editor} />
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
