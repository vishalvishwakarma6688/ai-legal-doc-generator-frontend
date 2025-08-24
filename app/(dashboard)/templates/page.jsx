"use client";

import React, { useState } from "react";
import { useTemplates } from "@/hooks/useTemplates";
import { useDownloadTemplate } from "@/hooks/useTemplates";

export default function TemplatesPage() {
  const { data: templates, isLoading } = useTemplates();
  const downloadTemplate = useDownloadTemplate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    const initialData = {};
    template.fields.forEach((field) => {
      initialData[field] = "";
    });
    setFormData(initialData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAndDownload = () => {
    if (!selectedTemplate) return;
    downloadTemplate.mutate({
      id: selectedTemplate.id,
      data: formData,
    });
  };

  if (isLoading) return <p className="text-black">Loading templates...</p>;

  return (
    <div className=" text-black">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {templates?.map((template) => (
          <div
            key={template.id}
            className="border border-gray-300 p-4 rounded shadow-md flex flex-col justify-between"
          >
            <h2 className="font-semibold text-lg">{template.name}</h2>
            <button
              onClick={() => handleEdit(template)}
              className="mt-4 bg-blue-500 text-white transition-all cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {selectedTemplate && (
        <div className="mt-6 border border-gray-300 p-4 rounded shadow">
          <div className="flex justify-between my-5 items-center">
            <h2 className="text-lg font-bold mb-4">
              Editing : {selectedTemplate.name}
            </h2>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-lg cursor-pointer font-bold mb-4"
            >
              X
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedTemplate.fields.map((field, index) =>
              field.toLowerCase().includes("terms") ? (
                <textarea
                  key={index}
                  name={field}
                  placeholder={field}
                  className="border border-gray-300 p-2 rounded col-span-2"
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  key={index}
                  type={
                    field.toLowerCase().includes("date")
                      ? "date"
                      : field.toLowerCase().includes("amount") ||
                        field.toLowerCase().includes("rent")
                      ? "number"
                      : "text"
                  }
                  name={field}
                  placeholder={field}
                  className="border border-gray-300 p-2 rounded"
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              )
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSaveAndDownload}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              disabled={downloadTemplate.isLoading}
            >
              {downloadTemplate.isLoading
                ? "Generating PDF..."
                : "Save & Download PDF"}
            </button>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
