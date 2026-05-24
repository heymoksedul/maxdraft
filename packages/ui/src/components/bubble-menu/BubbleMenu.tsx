'use client'

import * as React from 'react'
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import type { Editor } from '@tiptap/core'
import { Bold, Italic, Underline, Strikethrough, Code, Link } from 'lucide-react'
import { ToolbarButton } from '../toolbar/ToolbarButton'
import * as commands from '@maxdraft/core'

interface BubbleMenuProps {
  editor: Editor
}

export function BubbleMenu({ editor }: BubbleMenuProps) {
  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, placement: 'top' }}
      className={[
        'maxdraft-bubble-menu',
        'flex items-center gap-0.5 rounded-lg border shadow-xl',
        'bg-[var(--md-toolbar-bg)] border-[var(--md-toolbar-border)]',
        'px-1.5 py-1',
      ].join(' ')}
    >
      <ToolbarButton
        label="Bold" shortcut="⌘B" size="sm"
        isActive={editor.isActive('bold')}
        onClick={() => commands.toggleBold(editor)}
      >
        <Bold size={13} />
      </ToolbarButton>
      <ToolbarButton
        label="Italic" shortcut="⌘I" size="sm"
        isActive={editor.isActive('italic')}
        onClick={() => commands.toggleItalic(editor)}
      >
        <Italic size={13} />
      </ToolbarButton>
      <ToolbarButton
        label="Underline" shortcut="⌘U" size="sm"
        isActive={editor.isActive('underline')}
        onClick={() => commands.toggleUnderline(editor)}
      >
        <Underline size={13} />
      </ToolbarButton>
      <ToolbarButton
        label="Strike" size="sm"
        isActive={editor.isActive('strike')}
        onClick={() => commands.toggleStrike(editor)}
      >
        <Strikethrough size={13} />
      </ToolbarButton>
      <ToolbarButton
        label="Code" shortcut="⌘E" size="sm"
        isActive={editor.isActive('code')}
        onClick={() => commands.toggleCode(editor)}
      >
        <Code size={13} />
      </ToolbarButton>
      <div className="mx-1 h-4 w-px bg-[var(--md-toolbar-border)]" />
      <ToolbarButton label="Link" shortcut="⌘K" size="sm">
        <Link size={13} />
      </ToolbarButton>
    </TiptapBubbleMenu>
  )
}
