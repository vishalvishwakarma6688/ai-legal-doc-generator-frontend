'use client';
import { useDocuments } from '@/hooks/useDocuments';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { data, isLoading, isError } = useDocuments();
  console.log("Data ", data);

  if (isLoading) return <p>Loading documents...</p>;
  if (isError) {
    toast.error('Failed to load documents');
    return <p className="text-red-500">Error loading documents.</p>;
  }

  // Handle non-array or empty responses
  const documents = Array.isArray(data) ? data : [];
  if (documents.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold !text-black mb-4">Your Documents</h1>
        <p className="text-gray-600">
          No documents found. <Link href="/documents/create" className="text-blue-600 underline">Create one</Link>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">Your Documents</h1>
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc._id} className="p-4 bg-white shadow rounded flex justify-between">
            <span className='text-black'>{doc.title}</span>
            <Link href={`/documents/${doc._id}`} className="text-blue-600 underline">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
