import * as React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { buildExtensions } from '../extensions'
import { SlashCommand } from '../slash-command'
import { Toolbar } from '../toolbar/Toolbar'
import { BubbleMenu } from '../bubble-menu/BubbleMenu'
import { THEMES } from '../themes'
import type { MaxDraftProps, JSONContent, ThemeName } from '../types'

function debounce<T extends unknown[]>(fn: (...args: T) => void, ms: number) {
  let t: ReturnType<typeof setTimeout>
  return (...args: T) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) }
}

const SUPPORTED_IMG = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

// Editor prose styles injected once
const PROSE_STYLES = `
.md-prose { outline: none; font-size: 15px; line-height: 1.8; }
.md-prose > * + * { margin-top: 0.75em; }
.md-prose p { margin: 0; color: var(--md-text); }
.md-prose h1 { font-size: 2em; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; color: var(--md-text); margin: 1.4em 0 0.4em; }
.md-prose h2 { font-size: 1.5em; font-weight: 650; letter-spacing: -0.015em; line-height: 1.3; color: var(--md-text); margin: 1.3em 0 0.35em; }
.md-prose h3 { font-size: 1.2em; font-weight: 600; letter-spacing: -0.01em; color: var(--md-text); margin: 1.2em 0 0.3em; }
.md-prose strong { font-weight: 600; color: var(--md-text); }
.md-prose em { font-style: italic; }
.md-prose u { text-underline-offset: 3px; }
.md-prose s { opacity: 0.5; }
.md-prose a.md-link { color: #60a5fa; text-decoration: underline; text-underline-offset: 3px; }
.md-prose code { font-family: var(--md-font-mono); font-size: 0.85em; background: var(--md-code-bg); color: var(--md-code-text); padding: 2px 6px; border-radius: var(--md-radius-sm); }
.md-prose pre { background: var(--md-code-bg); border-radius: var(--md-radius); padding: 16px 20px; overflow-x: auto; margin: 1em 0; border: 1px solid var(--md-border); }
.md-prose pre code { background: none; color: var(--md-text); padding: 0; font-size: 13px; line-height: 1.6; }
.md-prose blockquote { border-left: 3px solid var(--md-border); padding-left: 16px; color: var(--md-text-muted); font-style: italic; margin: 1em 0; }
.md-prose ul, .md-prose ol { padding-left: 1.5em; }
.md-prose li { margin: 0.25em 0; color: var(--md-text); }
.md-prose li p { margin: 0; }
.md-prose ul[data-type="taskList"] { list-style: none; padding-left: 0.25em; }
.md-prose ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 8px; }
.md-prose ul[data-type="taskList"] li > label { margin-top: 3px; }
.md-prose hr { border: none; border-top: 1px solid var(--md-border); margin: 2em 0; }
.md-prose table { border-collapse: collapse; width: 100%; margin: 1em 0; }
.md-prose th, .md-prose td { border: 1px solid var(--md-border); padding: 8px 12px; color: var(--md-text); }
.md-prose th { background: var(--md-accent); font-weight: 600; }
.md-prose img.md-image { max-width: 100%; border-radius: var(--md-radius); }
.md-prose mark { background: rgba(250,204,21,0.3); color: inherit; border-radius: 2px; padding: 1px 2px; }

/* Placeholder */
.md-empty::before { content: attr(data-placeholder); pointer-events: none; float: left; height: 0; color: var(--md-text-subtle); }

/* Selection */
.md-prose ::selection { background: var(--md-selection); }
`

let stylesInjected = false
function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return
  const el = document.createElement('style')
  el.textContent = PROSE_STYLES
  document.head.appendChild(el)
  stylesInjected = true
}

export function MaxDraft({
  content = '',
  onChange,
  onAutoSave,
  autoSaveDelay = 2000,
  placeholder,
  toolbar = true,
  bubbleMenu = true,
  slashCommand = true,
  darkMode = false,
  theme = 'classic',
  className,
  editable = true,
  onImageUpload,
}: MaxDraftProps) {
  injectStyles()

  const autoSaveRef = React.useRef(onAutoSave)
  autoSaveRef.current = onAutoSave

  const debouncedSave = React.useMemo(
    () => debounce((json: JSONContent) => autoSaveRef.current?.(json), autoSaveDelay),
    [autoSaveDelay],
  )

  const extensions = React.useMemo(() => [
    ...buildExtensions(placeholder),
    ...(slashCommand ? [SlashCommand] : []),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  const editor = useEditor({
    extensions,
    content,
    editable,
    onUpdate({ editor: e }) {
      const json = e.getJSON() as JSONContent
      onChange?.(json)
      if (autoSaveRef.current) debouncedSave(json)
    },
  })

  React.useEffect(() => {
    if (!editor || !onImageUpload) return
    const dom = editor.view.dom as HTMLElement
    const handlePaste = async (e: ClipboardEvent) => {
      const file = Array.from(e.clipboardData?.items ?? []).find(i => i.type.startsWith('image/'))?.getAsFile()
      if (!file) return
      e.preventDefault()
      const url = await onImageUpload(file)
      editor.chain().focus().setImage({ src: url }).run()
    }
    const handleDrop = async (e: DragEvent) => {
      const file = Array.from(e.dataTransfer?.files ?? []).find(f => SUPPORTED_IMG.includes(f.type))
      if (!file) return
      e.preventDefault()
      const url = await onImageUpload(file)
      editor.chain().focus().setImage({ src: url }).run()
    }
    dom.addEventListener('paste', handlePaste)
    dom.addEventListener('drop', handleDrop)
    return () => { dom.removeEventListener('paste', handlePaste); dom.removeEventListener('drop', handleDrop) }
  }, [editor, onImageUpload])

  // dark mode overrides theme
  const resolvedTheme: ThemeName = darkMode ? 'dark' : (theme as ThemeName)
  const tokens = THEMES[resolvedTheme] ?? THEMES.classic

  const storage = editor?.storage['characterCount'] as { words: () => number; characters: () => number } | undefined

  return (
    <div
      className={className}
      style={{
        ...(tokens as React.CSSProperties),
        fontFamily: 'var(--md-font)',
        color: 'var(--md-text)',
        background: 'var(--md-bg)',
        borderRadius: 'var(--md-radius)',
        boxShadow: 'var(--md-shadow)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {toolbar && editor && (
        <Toolbar
          editor={editor}
          onImageInsert={() => {
            const url = window.prompt('Image URL')
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}
          onLinkInsert={() => {
            const prev = editor.getAttributes('link')['href'] as string | undefined
            const url = window.prompt('URL', prev ?? '')
            if (!url) return
            editor.chain().focus().setLink({ href: url }).run()
          }}
        />
      )}

      {bubbleMenu && editor && <BubbleMenu editor={editor} />}

      <EditorContent
        editor={editor}
        className="md-prose"
        style={{
          flex: 1,
          padding: '24px 32px',
          minHeight: 320,
          overflowY: 'auto',
        }}
      />

      {editor && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '6px 14px',
          borderTop: '1px solid var(--md-toolbar-border)',
          background: 'var(--md-toolbar-bg)',
          fontSize: 11,
          fontFamily: 'var(--md-font-mono)',
          color: 'var(--md-text-subtle)',
          letterSpacing: '0.02em',
        }}>
          <span>{storage?.words() ?? 0} words</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{storage?.characters() ?? 0} chars</span>
        </div>
      )}
    </div>
  )
}
