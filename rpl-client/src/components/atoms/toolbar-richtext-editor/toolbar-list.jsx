import React from "react";
import { List, ListOrdered, Quote } from "lucide-react";
import ToolbarButtonRichText from "./toolbar-button-richtext";
import { ToolbarSection } from "./toolbar-section";


export const ListSection = ({ editor }) => {
  return (
    <ToolbarSection showDivider>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List size={16} />
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Blockquote"
      >
        <Quote size={16} />
      </ToolbarButtonRichText>
    </ToolbarSection>
  );
};
