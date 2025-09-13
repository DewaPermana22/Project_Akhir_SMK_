import React from "react";

export const ImageDialog = ({
  show,
  imageUrl,
  setImageUrl,
  onAdd,
  onCancel,
}) => {
  if (!show) return null;

  const handleAdd = () => {
    if (imageUrl) {
      onAdd(imageUrl);
    }
  };

  return (
    <div className="p-4 bg-green-50 border-b">
      <div className="flex items-center gap-2">
        <input
          type="url"
          placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:border-green-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
            if (e.key === "Escape") onCancel();
          }}
          autoFocus
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
