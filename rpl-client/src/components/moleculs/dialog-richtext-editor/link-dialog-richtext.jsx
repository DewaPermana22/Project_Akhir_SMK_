import React from "react";

export const LinkDialog = ({ show, linkUrl, setLinkUrl, onAdd, onCancel }) => {
  if (!show) return null;

  const handleAdd = () => {
    if (linkUrl) {
      onAdd(linkUrl);
    }
  };

  return (
    <div className="p-4 bg-blue-50 border-b">
      <div className="flex items-center gap-2">
        <input
          type="url"
          placeholder="Enter URL (e.g., https://example.com)"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
            if (e.key === "Escape") onCancel();
          }}
          autoFocus
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
