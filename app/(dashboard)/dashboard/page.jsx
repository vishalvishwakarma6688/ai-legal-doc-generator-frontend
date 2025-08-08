"use client";
import { useDocuments } from "@/hooks/useDocuments";
import formattDate from "@/utils/dateFormatter";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDocuments();

  if (isLoading) return <p>Loading documents...</p>;
  if (isError) {
    toast.error("Failed to load documents");
    return <p className="text-red-500">Error loading documents.</p>;
  }

  const documents = Array.isArray(data) ? data : [];
  if (documents.length === 0) {
    return (
      <div>
        <h1 className="text-black font-semibold text-3xl">Recent Documents</h1>
        <p className="text-gray-600">
          No documents found.{" "}
          <Link href="/documents/create" className="text-blue-600 underline">
            Create one
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-black font-semibold text-3xl">Recent Documents</h1>
      <div className="border shadow-lg rounded-lg mt-8 border-gray-300">
        <table className="min-w-full rounded-lg bg-white overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-300">
              <th className="px-6 py-6 text-left text-lg font-semibold text-gray-800">
                Document Name
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-800">
                Type
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-800">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-800">
                Status
              </th>
              <th className="px-4 py-3 text-left text-lg font-semibold text-gray-800">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {documents.map((doc) => (
              <tr key={doc._id} className="hover:bg-gray-50">
                {/* Document Name */}
                <td className="px-5 py-5 text-lg text-gray-900">{doc.title}</td>

                {/* Type */}
                <td className="px-5 py-5 text-lg text-blue-600">
                  {doc.type || "Document"}
                </td>

                {/* Last Modified */}
                <td className="px-5 py-5 text-lg text-gray-700">
                  {formattDate(doc.createdAt)}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      doc.status === "Completed"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {doc.status || "Completed"}
                  </span>
                </td>
                <td className="px-5 py-5 text-lg text-gray-700">
                  <Link
                    href={`/documents/${doc._id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
