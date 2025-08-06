'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGenerateDocument } from '@/hooks/useGenerateDocument';

export default function CreateDocumentPage() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();
  const { mutate, isLoading } = useGenerateDocument();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    mutate(prompt, {
      onSuccess: (data) => {
        router.push(`/documents/${data._id}`);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-black mb-4">Create New Document</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border p-3 text-black rounded h-40"
          placeholder="Enter your prompt to generate a document..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? 'Generating...' : 'Generate Document'}
        </button>
      </form>
    </div>
  );
}
