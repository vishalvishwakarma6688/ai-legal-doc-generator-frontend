import React from "react";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-lg w-full">
        <h2 className="text-[18px] font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-lg mb-10">{message}</p>
        <div className="flex mt-5 justify-end gap-3">
          <button
            className="px-5 py-3 bg-gray-300 rounded cursor-pointer hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-5 py-3 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
