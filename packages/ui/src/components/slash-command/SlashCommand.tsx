'use client'

import * as React from 'react'
import type { Editor } from '@tiptap/core'
import type {} from '@tiptap/extension-task-list'
import type {} from '@tiptap/extension-table'
import type { SlashCommandItem } from '@maxdraft/shared'
import { cn } from '@maxdraft/shared'

interface SlashCommandListProps {
  items: SlashCommandItem[]
  command: (item: SlashCommandItem) => void
  selectedIndex?: number
}

export function SlashCommandList({ items, command, selectedIndex = 0 }: SlashCommandListProps) {
  if (!items.length) return null

  return (
    <div className={cn(
      'maxdraft-slash-menu',
      'z-50 w-72 overflow-hidden rounded-xl border shadow-2xl',
      'bg-[var(--md-bg)] border-[var(--md-border)]',
      'py-1',
    )}>
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => command(item)}
          className={cn(
            'flex w-full items-center gap-3 px-3 py-2 text-left',
            'transition-colors duration-75',
            'hover:bg-[var(--md-accent)]',
            index === selectedIndex && 'bg-[var(--md-accent)]',
          )}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border text-lg bg-[var(--md-bg-secondary)] border-[var(--md-border)]">
            {item.icon}
          </span>
          <div>
            <p className="text-sm font-medium text-[var(--md-text)]">{item.title}</p>
            <p className="text-xs text-[var(--md-text-muted)]">{item.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

/** Default slash command items */
export function getDefaultSlashCommands(editor: Editor): SlashCommandItem[] {
  return [
    {
      id: 'heading-1',
      title: 'Heading 1',
      description: 'Large section heading',
      icon: 'H₁',
      keywords: ['h1', 'heading', 'title'],
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      id: 'heading-2',
      title: 'Heading 2',
      description: 'Medium section heading',
      icon: 'H₂',
      keywords: ['h2', 'heading', 'subtitle'],
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      id: 'heading-3',
      title: 'Heading 3',
      description: 'Small section heading',
      icon: 'H₃',
      keywords: ['h3', 'heading'],
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      id: 'bullet-list',
      title: 'Bullet List',
      description: 'Unordered list of items',
      icon: '•',
      keywords: ['ul', 'list', 'bullet', 'unordered'],
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      id: 'ordered-list',
      title: 'Numbered List',
      description: 'Ordered list of items',
      icon: '1.',
      keywords: ['ol', 'numbered', 'ordered', 'list'],
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      id: 'task-list',
      title: 'Task List',
      description: 'Checklist / to-do items',
      icon: '☑',
      keywords: ['todo', 'task', 'checklist'],
      action: () => editor.chain().focus().toggleTaskList().run(),
    },
    {
      id: 'blockquote',
      title: 'Quote',
      description: 'Highlight a quote or callout',
      icon: '"',
      keywords: ['quote', 'blockquote', 'callout'],
      action: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      id: 'code-block',
      title: 'Code Block',
      description: 'Fenced code with syntax highlight',
      icon: '</>',
      keywords: ['code', 'codeblock', 'pre', 'snippet'],
      action: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      id: 'table',
      title: 'Table',
      description: 'Insert a 3×3 table',
      icon: '⊞',
      keywords: ['table', 'grid', 'spreadsheet'],
      action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      id: 'divider',
      title: 'Divider',
      description: 'Horizontal rule',
      icon: '—',
      keywords: ['hr', 'divider', 'rule', 'separator'],
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
  ]
}
