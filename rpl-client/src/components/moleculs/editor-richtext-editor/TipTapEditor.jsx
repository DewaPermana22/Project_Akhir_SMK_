import React, { useState } from "react";
import { EditorContent } from "@tiptap/react";
import { useTiptapEditor } from "@/hooks/useTipTapEditor";
import { LinkDialog } from "../dialog-richtext-editor/link-dialog-richtext";
import { ImageDialog } from "../dialog-richtext-editor/image-dialog-richtext";
import { TiptapToolbar } from "./TipTapToolbar";


export default function TiptapEditor({
  content = "",
  onUpdate,
  placeholder = "",
  className = "",
  readOnly = false,
}) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const editor = useTiptapEditor({ content, onUpdate });

  if (!editor) {
    return null;
  }

  editor.setEditable(!readOnly);

  const addLink = (url) => {
    editor.chain().focus().setLink({ href: url }).run();
    setLinkUrl("");
    setShowLinkDialog(false);
  };

  const addImage = (url) => {
    editor.chain().focus().setImage({ src: url }).run();
    setImageUrl("");
    setShowImageDialog(false);
  };

  return (
    <div
      className={`mx-auto rounded-lg shadow-lg border border-gray-200 ${className}`}
    >
      {!readOnly && (
        <TiptapToolbar
          editor={editor}
          onShowLinkDialog={() => setShowLinkDialog(true)}
          onShowImageDialog={() => setShowImageDialog(true)}
        />
      )}

      <LinkDialog
        show={showLinkDialog}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
        onAdd={addLink}
        onCancel={() => setShowLinkDialog(false)}
      />

      <ImageDialog
        show={showImageDialog}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onAdd={addImage}
        onCancel={() => setShowImageDialog(false)}
      />

      <EditorContent editor={editor} className="h-full" />
    </div>
  );
}
