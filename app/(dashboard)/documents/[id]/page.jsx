'use client';
import { useDocument, useUpdateDocument } from '@/hooks/useDocuments';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
      editor.commands.setContent(data.content, false);
    }
  }, [data, editor]);

  if (isLoading) return <p>Loading...</p>;

  const handleSave = () => {
    updateDoc({ id, title, content });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();  
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    const html = editor.getHTML();
    doc.html(html, {
      x: 14,
      y: 30,
      width: 180, // mm
      windowWidth: 800,
      callback: function (doc) {
        doc.save(`${title}.pdf`);
      },
    });
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
      <div className='flex gap-5'>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-blue-600 text-white px-4 cursor-pointer py-2 rounded"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-4 cursor-pointer py-2 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
