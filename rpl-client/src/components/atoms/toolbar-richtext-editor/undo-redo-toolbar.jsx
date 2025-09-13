import React from "react";
import { Undo, Redo } from "lucide-react";
import { ToolbarSection } from "./toolbar-section";
import ToolbarButtonRichText from "./toolbar-button-richtext";

export const UndoRedoSection = ({ editor }) => {
  return (
    <ToolbarSection showDivider>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <Undo size={16} />
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Y)"
      >
        <Redo size={16} />
      </ToolbarButtonRichText>
    </ToolbarSection>
  );
};
