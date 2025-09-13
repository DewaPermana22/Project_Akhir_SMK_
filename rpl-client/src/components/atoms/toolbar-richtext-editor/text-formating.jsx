import React from "react";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough,
  Code as CodeIcon,
} from "lucide-react";
import ToolbarButtonRichText from "./toolbar-button-richtext";
import { ToolbarSection } from "./toolbar-section";


export const TextFormattingSection = ({ editor }) => {
  return (
    <ToolbarSection showDivider>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold (Ctrl+B)"
      >
        <BoldIcon size={16} />
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic (Ctrl+I)"
      >
        <ItalicIcon size={16} />
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline (Ctrl+U)"
      >
        <UnderlineIcon size={16} />
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        title="Inline Code"
      >
        <CodeIcon size={16} />
      </ToolbarButtonRichText>
    </ToolbarSection>
  );
};
