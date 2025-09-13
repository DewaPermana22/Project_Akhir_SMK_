import { TextFormattingSection } from "@/components/atoms/toolbar-richtext-editor/text-formating";
import { BlockSection } from "@/components/atoms/toolbar-richtext-editor/toolbar-block";
import { HeadingSection } from "@/components/atoms/toolbar-richtext-editor/toolbar-heading";
import { ListSection } from "@/components/atoms/toolbar-richtext-editor/toolbar-list";
import { MediaSection } from "@/components/atoms/toolbar-richtext-editor/toolbar-media";
import { UndoRedoSection } from "@/components/atoms/toolbar-richtext-editor/undo-redo-toolbar";
import React from "react";

export const TiptapToolbar = ({
  editor,
  onShowLinkDialog,
  onShowImageDialog,
}) => {
  return (
    <div className="flex items-center gap-1 p-3 bg-gray-50 rounded-t-xl border-b flex-wrap">
      <UndoRedoSection editor={editor} />
      <TextFormattingSection editor={editor} />
      <HeadingSection editor={editor} />
      <ListSection editor={editor} />
      <BlockSection editor={editor} />
      <MediaSection
        editor={editor}
        onShowLinkDialog={onShowLinkDialog}
        onShowImageDialog={onShowImageDialog}
      />
    </div>
  );
};
