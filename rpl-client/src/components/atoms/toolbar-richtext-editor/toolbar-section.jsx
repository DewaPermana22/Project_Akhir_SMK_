import React from "react";

export const ToolbarSection = ({ children, showDivider = false }) => {
  return (
    <>
      <div className="flex items-center gap-1 mr-3">{children}</div>
      {showDivider && <div className="w-px h-6 bg-gray-300 mr-3"></div>}
    </>
  );
};
