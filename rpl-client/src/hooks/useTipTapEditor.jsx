import { useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Code from "@tiptap/extension-code";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { UndoRedo } from "@tiptap/extensions";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export const useTiptapEditor = ({ content, onUpdate }) => {
  const editor = useEditor({
    content,
    extensions: [
      UndoRedo,
      Document,
      Paragraph,
      Text,
      Bold.configure({
        HTMLAttributes: { class: "font-bold" },
      }),
      Italic.configure({
        HTMLAttributes: { class: "italic" },
      }),
      Strike.configure({
        HTMLAttributes: { class: "line-through" },
      }),
      Underline,
      Code.configure({
        HTMLAttributes: {
          class: "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: { class: "font-bold" },
      }),
      BulletList.configure({
        HTMLAttributes: { class: "list-disc pl-6" },
      }),
      OrderedList.configure({
        HTMLAttributes: { class: "list-decimal pl-6" },
      }),
      ListItem,
      Blockquote.configure({
        HTMLAttributes: { class: "border-l-4 border-gray-300 pl-4 italic" },
      }),
      CodeBlock.configure({
        HTMLAttributes: { class: "bg-gray-100 p-3 rounded font-mono text-sm" },
      }),
      HardBreak,
      HorizontalRule.configure({
        HTMLAttributes: { class: "my-4 border-t-2 border-gray-300" },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer hover:text-blue-800",
        },
      }),
      Image.configure({
        HTMLAttributes: { class: "max-w-full h-auto rounded shadow-md" },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none p-4 min-h-[300px]",
      },
    },
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        const html = editor.getHTML();
        const json = editor.getJSON();
        const text = editor.getText();
        onUpdate({ html, json, text });
      }
    },
  });

  return editor;
};
