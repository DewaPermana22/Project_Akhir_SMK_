import React from "react";
import { Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import ToolbarButtonRichText from "./toolbar-button-richtext";


export const MediaSection = ({
  editor,
  onShowLinkDialog,
  onShowImageDialog,
}) => {
  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <div className="flex items-center gap-1">
      <ToolbarButtonRichText
        onClick={onShowLinkDialog}
        isActive={editor.isActive("link")}
        title="Add Link"
      >
        <LinkIcon size={16} />
      </ToolbarButtonRichText>
      {editor.isActive("link") && (
        <ToolbarButtonRichText onClick={removeLink} title="Remove Link">
          <span className="text-xs font-bold">×</span>
        </ToolbarButtonRichText>
      )}
      <ToolbarButtonRichText onClick={onShowImageDialog} title="Add Image">
        <ImageIcon size={16} />
      </ToolbarButtonRichText>
    </div>
  );
};
