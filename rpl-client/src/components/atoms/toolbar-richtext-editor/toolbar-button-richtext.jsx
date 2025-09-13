import React from "react";

const ToolbarButtonRichText = ({
  onClick,
  isActive,
  children,
  title,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`
      flex items-center justify-center w-9 h-9 rounded border transition-all
      ${
        isActive
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
      }
      hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed
    `}
    >
      {children}
    </button>
  );
};

export default ToolbarButtonRichText;
