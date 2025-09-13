import React from 'react'
import { Hash } from 'lucide-react'
import { ToolbarSection } from './toolbar-section'
import ToolbarButtonRichText from './toolbar-button-richtext'


export const BlockSection = ({ editor }) => {
  return (
    <ToolbarSection showDivider>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        title="Code Block"
      >
        <span className="text-xs font-bold">{`</>`}</span>
      </ToolbarButtonRichText>
      <ToolbarButtonRichText
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        <Hash size={16} />
      </ToolbarButtonRichText>
    </ToolbarSection>
  )
}
