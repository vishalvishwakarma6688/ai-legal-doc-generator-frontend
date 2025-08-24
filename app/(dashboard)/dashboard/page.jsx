"use client";

import ConfirmModal from "@/components/ConfirmModal";
import { useDeleteDocument, useDocuments } from "@/hooks/useDocuments";
import { useFetchLogs } from "@/hooks/userDownloadLog";
import formattDate from "@/utils/dateFormatter";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDocuments();
  const { data: logs, isLoading: logLoading } = useFetchLogs();
  const { mutate: deleteDoc } = useDeleteDocument();
  const [activeTab, setActiveTab] = useState("aidocument");
  const [confirmModal, setConfirmModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null);

  if (isLoading || logLoading) return <p>Loading...</p>;
  if (isError) {
    toast.error("Failed to load documents");
    return <p className="text-red-500">Error loading documents.</p>;
  }

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setConfirmModal(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      deleteDoc(selectedId);
    }
    setConfirmModal(false);
    setSelectedId(null);
  };

  const handleDelete = (id) => {
    deleteDoc(id);
  };

  const documents = Array.isArray(data) ? data : [];
  const downloadLogs = Array.isArray(logs) ? logs : [];

  const renderTable = (rows, isTemplate) => (
    <div className="border shadow-lg rounded-lg mt-8 border-gray-300">
      <table className="min-w-full rounded-lg bg-white overflow-hidden">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-300">
            <th className="px-6 py-6 text-left text-lg font-semibold text-gray-800">
              {isTemplate ? "Template Name" : "Document Name"}
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold text-gray-800">
              {isTemplate ? "Downloaded By" : "Type"}
            </th>
            <th className="px-4 py-3 text-left text-lg font-semibold text-gray-800">
              {isTemplate ? "Downloaded At" : "Created At"}
            </th>
            {!isTemplate && (
              <>
                <th className="px-4 py-3 text-left text-lg font-semibold text-gray-800">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-lg font-semibold text-gray-800">
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {rows.map((row) => (
            <tr key={row._id} className="hover:bg-gray-50">
              <td className="px-5 py-5 text-lg text-gray-900">
                {isTemplate ? row.templateName : row.title}
              </td>
              <td className="px-5 py-5 text-lg text-blue-600">
                {isTemplate ? row.downloadedBy : row.type || "Document"}
              </td>
              <td className="px-5 py-5 text-lg text-gray-700">
                {formattDate(isTemplate ? row.downloadedAt : row.createdAt)}
              </td>
              {!isTemplate && (
                <>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${row.status === "Completed"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {row.status || "Completed"}
                    </span>
                  </td>
                  <td className="px-5 py-5 flex gap-5 text-lg text-gray-700">
                    <Link
                      href={`/documents/${row?._id}`}
                      className="text-blue-600 underline"
                      title="View Document"
                    >
                      <FaEye className="text-blue-600 text-[18px] cursor-pointer hover:text-blue-800" />
                    </Link>
                    <button
                      onClick={() => openDeleteModal(row._id)}
                      title="Delete Document"
                    >
                      <FaTrash className="text-red-600 text-[18px] cursor-pointer hover:text-red-800" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {confirmModal &&
        (<ConfirmModal
          isOpen={confirmModal}
          title="Confirm delete"
          message="Are you sure you want to delete this Document?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmModal(false)}
        />)}
    </div>
  );

  return (
    <div>
      <div className="flex gap-10">
        <button
          onClick={() => setActiveTab("aidocument")}
          className={`cursor-pointer font-semibold text-3xl ${activeTab === "aidocument" ? "text-blue-600" : "text-black"
            }`}
        >
          Recent Documents (AI)
        </button>
        <button
          onClick={() => setActiveTab("template")}
          className={`cursor-pointer font-semibold text-3xl ${activeTab === "template" ? "text-blue-600" : "text-black"
            }`}
        >
          Created Using Template
        </button>
      </div>
      {activeTab === "aidocument"
        ? renderTable(documents, false)
        : renderTable(downloadLogs, true)}
    </div>
  );
}
