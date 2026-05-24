'use client'

import * as React from 'react'
import type { Editor } from '@tiptap/core'
import {
  Bold, Italic, Underline, Strikethrough, Code, Code2,
  Heading1, Heading2, Heading3,
  List, ListOrdered, CheckSquare,
  Quote, Minus,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link, Image, Table,
  Undo2, Redo2,
  Highlighter,
} from 'lucide-react'
import { ToolbarButton } from './ToolbarButton'
import { ToolbarSeparator } from './ToolbarSeparator'
import * as commands from '@maxdraft/core'
import { cn } from '@maxdraft/shared'

interface ToolbarProps {
  editor: Editor
  className?: string
  sticky?: boolean
}

export function Toolbar({ editor, className, sticky = true }: ToolbarProps) {
  const e = editor

  return (
    <div
      role="toolbar"
      aria-label="Text formatting toolbar"
      className={cn(
        'maxdraft-toolbar',
        'flex flex-wrap items-center gap-0.5 rounded-t border-b px-2 py-1',
        'bg-[var(--md-toolbar-bg)] border-[var(--md-toolbar-border)]',
        sticky && 'sticky top-0 z-10',
        className,
      )}
    >
      {/* History */}
      <ToolbarButton label="Undo" shortcut="⌘Z" onClick={() => commands.undo(e)}>
        <Undo2 size={15} />
      </ToolbarButton>
      <ToolbarButton label="Redo" shortcut="⌘⇧Z" onClick={() => commands.redo(e)}>
        <Redo2 size={15} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Headings */}
      <ToolbarButton
        label="Heading 1" shortcut="⌘⌥1"
        isActive={e.isActive('heading', { level: 1 })}
        onClick={() => commands.setHeading(e, 1)}
      >
        <Heading1 size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 2" shortcut="⌘⌥2"
        isActive={e.isActive('heading', { level: 2 })}
        onClick={() => commands.setHeading(e, 2)}
      >
        <Heading2 size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3" shortcut="⌘⌥3"
        isActive={e.isActive('heading', { level: 3 })}
        onClick={() => commands.setHeading(e, 3)}
      >
        <Heading3 size={15} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Inline formatting */}
      <ToolbarButton
        label="Bold" shortcut="⌘B"
        isActive={e.isActive('bold')}
        onClick={() => commands.toggleBold(e)}
      >
        <Bold size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Italic" shortcut="⌘I"
        isActive={e.isActive('italic')}
        onClick={() => commands.toggleItalic(e)}
      >
        <Italic size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Underline" shortcut="⌘U"
        isActive={e.isActive('underline')}
        onClick={() => commands.toggleUnderline(e)}
      >
        <Underline size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        isActive={e.isActive('strike')}
        onClick={() => commands.toggleStrike(e)}
      >
        <Strikethrough size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Highlight"
        isActive={e.isActive('highlight')}
        onClick={() => commands.toggleHighlight(e)}
      >
        <Highlighter size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Inline code" shortcut="⌘E"
        isActive={e.isActive('code')}
        onClick={() => commands.toggleCode(e)}
      >
        <Code size={15} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Lists */}
      <ToolbarButton
        label="Bullet list" shortcut="⌘⇧8"
        isActive={e.isActive('bulletList')}
        onClick={() => commands.toggleBulletList(e)}
      >
        <List size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Ordered list" shortcut="⌘⇧7"
        isActive={e.isActive('orderedList')}
        onClick={() => commands.toggleOrderedList(e)}
      >
        <ListOrdered size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Task list"
        isActive={e.isActive('taskList')}
        onClick={() => commands.toggleTaskList(e)}
      >
        <CheckSquare size={15} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Block */}
      <ToolbarButton
        label="Blockquote"
        isActive={e.isActive('blockquote')}
        onClick={() => commands.toggleBlockquote(e)}
      >
        <Quote size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Code block"
        isActive={e.isActive('codeBlock')}
        onClick={() => commands.toggleCodeBlock(e)}
      >
        <Code2 size={15} />
      </ToolbarButton>
      <ToolbarButton label="Horizontal rule" onClick={() => commands.setHorizontalRule(e)}>
        <Minus size={15} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Alignment */}
      <ToolbarButton
        label="Align left" shortcut="⌘⇧L"
        isActive={e.isActive({ textAlign: 'left' })}
        onClick={() => commands.setAlignLeft(e)}
      >
        <AlignLeft size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Align center" shortcut="⌘⇧E"
        isActive={e.isActive({ textAlign: 'center' })}
        onClick={() => commands.setAlignCenter(e)}
      >
        <AlignCenter size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Align right" shortcut="⌘⇧R"
        isActive={e.isActive({ textAlign: 'right' })}
        onClick={() => commands.setAlignRight(e)}
      >
        <AlignRight size={15} />
      </ToolbarButton>
      <ToolbarButton
        label="Justify"
        isActive={e.isActive({ textAlign: 'justify' })}
        onClick={() => commands.setAlignJustify(e)}
      >
        <AlignJustify size={15} />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Insert */}
      <ToolbarButton label="Insert link" shortcut="⌘K">
        <Link size={15} />
      </ToolbarButton>
      <ToolbarButton label="Insert image">
        <Image size={15} />
      </ToolbarButton>
      <ToolbarButton label="Insert table" onClick={() => commands.insertTable(e)}>
        <Table size={15} />
      </ToolbarButton>
    </div>
  )
}
