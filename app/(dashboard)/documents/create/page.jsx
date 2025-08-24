'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGenerateDocument } from '@/hooks/useGenerateDocument';
import Loader from '@/components/Loader';
import { useLoader } from '@/contexts/LoaderContext';

export default function CreateDocumentPage() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();
  const { setLoading } = useLoader();
  const { mutate, isPending } = useGenerateDocument();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    mutate(prompt, {
      onSuccess: (data) => {
        const formattedHTML = `<p>${data.content.replace(/\n/g, '</p><p>')}</p>`;
        setLoading(true);
        router.push(`/documents/${data._id}`);
      },
    });
  };

  return (
    <>
      {isPending && <Loader />}
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
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 cursor-pointer rounded hover:bg-blue-700"
          >
            {isPending ? 'Generating...' : 'Generate Document'}
          </button>
        </form>
      </div>
    </>
  );
}
