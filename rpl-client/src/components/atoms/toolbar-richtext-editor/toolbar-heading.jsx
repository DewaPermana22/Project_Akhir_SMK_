import React from "react";
import { Heading2 } from "lucide-react";
import { ToolbarSection } from "./toolbar-section";
import ToolbarButtonRichText from "./toolbar-button-richtext";


export const HeadingSection = ({ editor }) => {
  return (
    <ToolbarSection showDivider>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        <span className="text-sm font-bold">H1</span>
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        <span className="text-sm font-bold">H3</span>
      </ToolbarButtonRichText>
    </ToolbarSection>
  );
};
