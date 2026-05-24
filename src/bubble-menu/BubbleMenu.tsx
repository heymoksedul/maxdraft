import * as React from 'react'
import { BubbleMenu as TiptapBubble } from '@tiptap/react'
import type { Editor } from '@tiptap/core'
import { Bold, Italic, Underline, Strikethrough, Code, Link2, Highlighter } from 'lucide-react'

function MBtn({ label, active, onClick, children }: {
  label: string; active?: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 30, height: 30, padding: 0,
        border: 'none', borderRadius: 'var(--md-radius-sm)',
        cursor: 'pointer',
        background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
        color: active ? 'var(--md-text)' : 'var(--md-text-muted)',
        transition: 'all 0.1s',
        outline: 'none',
      }}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'
          ;(e.currentTarget as HTMLElement).style.color = 'var(--md-text)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLElement).style.color = 'var(--md-text-muted)'
        }
      }}
    >
      {children}
    </button>
  )
}

export function BubbleMenu({ editor }: { editor: Editor }) {
  return (
    <TiptapBubble
      editor={editor}
      tippyOptions={{ duration: [150, 100], placement: 'top', offset: [0, 10] }}
      style={{
        display: 'flex', alignItems: 'center', gap: 1,
        padding: '3px 5px',
        background: '#1c1c1e',
        border: '1px solid #2c2c2e',
        borderRadius: 8,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <MBtn label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={13} /></MBtn>
      <MBtn label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={13} /></MBtn>
      <MBtn label="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}><Underline size={13} /></MBtn>
      <MBtn label="Strike" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={13} /></MBtn>
      <MBtn label="Highlight" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()}><Highlighter size={13} /></MBtn>
      <MBtn label="Code" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}><Code size={13} /></MBtn>
      <div style={{ width: 1, height: 16, background: '#2c2c2e', margin: '0 2px' }} />
      <MBtn label="Link" active={editor.isActive('link')} onClick={() => {
        const prev = editor.getAttributes('link')['href'] as string | undefined
        const url = window.prompt('URL', prev ?? '')
        if (url === null) return
        if (url === '') { editor.chain().focus().unsetLink().run(); return }
        editor.chain().focus().setLink({ href: url }).run()
      }}><Link2 size={13} /></MBtn>
    </TiptapBubble>
  )
}
