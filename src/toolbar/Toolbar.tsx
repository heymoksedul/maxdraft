import * as React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import type { Editor } from '@tiptap/core'
import {
  Bold, Italic, Underline, Strikethrough, Code, Code2,
  List, ListOrdered, CheckSquare,
  Quote, Minus, Link2, ImageIcon, Table2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Undo2, Redo2,
  Superscript, Subscript,
  ChevronDown,
} from 'lucide-react'

// ─── Tooltip Button ──────────────────────────────────────────────────────────

interface BtnProps {
  label: string
  shortcut?: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

function Btn({ label, shortcut, active, disabled, onClick, children }: BtnProps) {
  return (
    <Tooltip.Provider delayDuration={700}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            onMouseDown={(e) => { e.preventDefault(); if (!disabled) onClick() }}
            aria-label={label}
            aria-pressed={active}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 26,
              height: 26,
              padding: 0,
              borderRadius: 5,
              border: 'none',
              cursor: disabled ? 'default' : 'pointer',
              flexShrink: 0,
              background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: active
                ? 'var(--md-text)'
                : disabled
                ? 'var(--md-text-subtle)'
                : 'var(--md-text-muted)',
              transition: 'background 0.1s, color 0.1s',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              if (!disabled && !active) {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.07)'
                el.style.color = 'var(--md-text)'
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled && !active) {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
                el.style.color = 'var(--md-text-muted)'
              }
            }}
          >
            {children}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={6}
            style={{
              background: '#111',
              color: '#e8e8e8',
              border: '1px solid #333',
              borderRadius: 5,
              padding: '4px 8px',
              fontSize: 11,
              fontFamily: 'var(--md-font)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              zIndex: 9999,
              pointerEvents: 'none',
            }}
          >
            {label}
            {shortcut && (
              <kbd style={{ opacity: 0.5, fontSize: 10, fontFamily: 'var(--md-font-mono)' }}>
                {shortcut}
              </kbd>
            )}
            <Tooltip.Arrow style={{ fill: '#333' }} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

// ─── Separator ───────────────────────────────────────────────────────────────

function Sep() {
  return (
    <div style={{
      width: 1, height: 14,
      background: 'var(--md-toolbar-border)',
      margin: '0 3px',
      flexShrink: 0,
    }} />
  )
}

// ─── Block-type dropdown ──────────────────────────────────────────────────────

function BlockSelect({ editor }: { editor: Editor }) {
  function getActive(): string {
    if (editor.isActive('heading', { level: 1 })) return 'h1'
    if (editor.isActive('heading', { level: 2 })) return 'h2'
    if (editor.isActive('heading', { level: 3 })) return 'h3'
    if (editor.isActive('blockquote'))            return 'quote'
    if (editor.isActive('codeBlock'))             return 'code'
    return 'p'
  }

  const options = [
    { value: 'p',     label: 'Normal text' },
    { value: 'h1',    label: 'Heading 1' },
    { value: 'h2',    label: 'Heading 2' },
    { value: 'h3',    label: 'Heading 3' },
    { value: 'quote', label: 'Quote' },
    { value: 'code',  label: 'Code block' },
  ]

  function apply(val: string) {
    const chain = editor.chain().focus()
    if (val === 'p')     chain.setParagraph().run()
    if (val === 'h1')    chain.toggleHeading({ level: 1 }).run()
    if (val === 'h2')    chain.toggleHeading({ level: 2 }).run()
    if (val === 'h3')    chain.toggleHeading({ level: 3 }).run()
    if (val === 'quote') chain.toggleBlockquote().run()
    if (val === 'code')  chain.toggleCodeBlock().run()
  }

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select
        value={getActive()}
        onChange={e => apply(e.target.value)}
        onMouseDown={e => e.stopPropagation()}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          padding: '0 22px 0 8px',
          height: 26,
          borderRadius: 5,
          border: '1px solid var(--md-border)',
          background: 'var(--md-accent)',
          color: 'var(--md-text)',
          fontSize: 12,
          fontFamily: 'var(--md-font)',
          fontWeight: 500,
          cursor: 'pointer',
          outline: 'none',
          minWidth: 110,
        }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}
            style={{ background: '#1a1a1a', color: '#e8e8e8' }}
          >
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={11}
        style={{ position: 'absolute', right: 6, pointerEvents: 'none', color: 'var(--md-text-muted)' }}
      />
    </div>
  )
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────

interface ToolbarProps {
  editor: Editor
  onImageInsert?: () => void
  onLinkInsert?: () => void
}

const ROW: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 2,
  padding: '5px 10px',
}

export function Toolbar({ editor: e, onImageInsert, onLinkInsert }: ToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-label="Text formatting"
      style={{
        background: 'var(--md-toolbar-bg)',
        borderBottom: '1px solid var(--md-toolbar-border)',
        userSelect: 'none',
      }}
    >
      {/* ── Row 1: text formatting ── */}
      <div style={ROW}>
        <Btn label="Undo" shortcut="⌘Z" disabled={!e.can().undo()} onClick={() => e.chain().focus().undo().run()}><Undo2 size={13} /></Btn>
        <Btn label="Redo" shortcut="⌘⇧Z" disabled={!e.can().redo()} onClick={() => e.chain().focus().redo().run()}><Redo2 size={13} /></Btn>

        <Sep />
        <BlockSelect editor={e} />
        <Sep />

        <Btn label="Bold"          shortcut="⌘B" active={e.isActive('bold')}      onClick={() => e.chain().focus().toggleBold().run()}>      <Bold size={13} /></Btn>
        <Btn label="Italic"        shortcut="⌘I" active={e.isActive('italic')}    onClick={() => e.chain().focus().toggleItalic().run()}>    <Italic size={13} /></Btn>
        <Btn label="Underline"     shortcut="⌘U" active={e.isActive('underline')} onClick={() => e.chain().focus().toggleUnderline().run()}> <Underline size={13} /></Btn>
        <Btn label="Strikethrough"               active={e.isActive('strike')}    onClick={() => e.chain().focus().toggleStrike().run()}>    <Strikethrough size={13} /></Btn>
        <Btn label="Highlight"                   active={e.isActive('highlight')} onClick={() => e.chain().focus().toggleHighlight().run()}> <Highlighter size={13} /></Btn>
        <Btn label="Inline code"   shortcut="⌘E" active={e.isActive('code')}      onClick={() => e.chain().focus().toggleCode().run()}>      <Code size={13} /></Btn>

        <Sep />

        <Btn label="Superscript" active={e.isActive('superscript')} onClick={() => e.chain().focus().toggleSuperscript().run()}><Superscript size={13} /></Btn>
        <Btn label="Subscript"   active={e.isActive('subscript')}   onClick={() => e.chain().focus().toggleSubscript().run()}>  <Subscript size={13} /></Btn>

        <Sep />

        <Btn label="Align left"   active={e.isActive({ textAlign: 'left' })}    onClick={() => e.chain().focus().setTextAlign('left').run()}>    <AlignLeft size={13} /></Btn>
        <Btn label="Align center" active={e.isActive({ textAlign: 'center' })}  onClick={() => e.chain().focus().setTextAlign('center').run()}>  <AlignCenter size={13} /></Btn>
        <Btn label="Align right"  active={e.isActive({ textAlign: 'right' })}   onClick={() => e.chain().focus().setTextAlign('right').run()}>   <AlignRight size={13} /></Btn>
        <Btn label="Justify"      active={e.isActive({ textAlign: 'justify' })} onClick={() => e.chain().focus().setTextAlign('justify').run()}> <AlignJustify size={13} /></Btn>
      </div>

      {/* ── Row 2: blocks & insert ── */}
      <div style={{ ...ROW, paddingTop: 4, paddingBottom: 5, borderTop: '1px solid var(--md-toolbar-border)' }}>
        <Btn label="Bullet list"   active={e.isActive('bulletList')}  onClick={() => e.chain().focus().toggleBulletList().run()}>  <List size={13} /></Btn>
        <Btn label="Numbered list" active={e.isActive('orderedList')} onClick={() => e.chain().focus().toggleOrderedList().run()}> <ListOrdered size={13} /></Btn>
        <Btn label="Task list"     active={e.isActive('taskList')}    onClick={() => e.chain().focus().toggleTaskList().run()}>    <CheckSquare size={13} /></Btn>
        <Btn label="Blockquote"    active={e.isActive('blockquote')}  onClick={() => e.chain().focus().toggleBlockquote().run()}>  <Quote size={13} /></Btn>

        <Sep />

        <Btn label="Link"   shortcut="⌘K" active={e.isActive('link')} onClick={() => onLinkInsert?.()}>  <Link2 size={13} /></Btn>
        <Btn label="Image"                                             onClick={() => onImageInsert?.()}> <ImageIcon size={13} /></Btn>
        <Btn label="Table"                                             onClick={() => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><Table2 size={13} /></Btn>

        <Sep />

        <Btn label="Code block" active={e.isActive('codeBlock')} onClick={() => e.chain().focus().toggleCodeBlock().run()}><Code2 size={13} /></Btn>
        <Btn label="Divider"                                      onClick={() => e.chain().focus().setHorizontalRule().run()}><Minus size={13} /></Btn>
      </div>
    </div>
  )
}
