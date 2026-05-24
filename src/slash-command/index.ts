import { Extension } from '@tiptap/core'
import type { Range } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'

interface SlashItem {
  title: string
  keywords: string[]
  action: (editor: import('@tiptap/core').Editor) => void
}

function defaultItems(editor: import('@tiptap/core').Editor): SlashItem[] {
  return [
    { title: 'Heading 1', keywords: ['h1', 'heading'], action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { title: 'Heading 2', keywords: ['h2', 'heading'], action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { title: 'Heading 3', keywords: ['h3', 'heading'], action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { title: 'Bullet List', keywords: ['ul', 'list', 'bullet'], action: () => editor.chain().focus().toggleBulletList().run() },
    { title: 'Numbered List', keywords: ['ol', 'numbered', 'ordered'], action: () => editor.chain().focus().toggleOrderedList().run() },
    { title: 'Task List', keywords: ['todo', 'task', 'check'], action: () => editor.chain().focus().toggleTaskList().run() },
    { title: 'Quote', keywords: ['quote', 'blockquote'], action: () => editor.chain().focus().toggleBlockquote().run() },
    { title: 'Code Block', keywords: ['code', 'codeblock', 'pre'], action: () => editor.chain().focus().toggleCodeBlock().run() },
    { title: 'Table', keywords: ['table', 'grid'], action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    { title: 'Divider', keywords: ['hr', 'divider', 'rule'], action: () => editor.chain().focus().setHorizontalRule().run() },
  ]
}

// Reads a CSS variable from the editor wrapper element, falls back to a default
function readVar(editorEl: Element | null, name: string, fallback: string): string {
  if (!editorEl) return fallback
  const wrapper = editorEl.closest('[style*="--md-bg"]') as HTMLElement | null
  if (!wrapper) return fallback
  return getComputedStyle(wrapper).getPropertyValue(name).trim() || fallback
}

function renderPopup() {
  let el: HTMLDivElement | null = null
  let items: SlashItem[] = []
  let selected = 0
  let onSelect: ((item: SlashItem) => void) | null = null
  let editorEl: Element | null = null

  function buildStyles() {
    const bg       = readVar(editorEl, '--md-bg',        '#0f0f0f')
    const border   = readVar(editorEl, '--md-border',    '#2a2a2a')
    const text     = readVar(editorEl, '--md-text',      '#ededed')
    const accent   = readVar(editorEl, '--md-accent',    '#1f1f1f')
    const muted    = readVar(editorEl, '--md-text-muted','#666')
    return { bg, border, text, accent, muted }
  }

  function render() {
    if (!el) return
    const { bg, text, accent } = buildStyles()
    el.innerHTML = ''
    items.forEach((item, i) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.textContent = item.title
      btn.style.cssText = `
        display:block; width:100%; padding:7px 12px; border:none; cursor:pointer;
        text-align:left; font-size:13.5px; border-radius:5px; font-family:inherit;
        background:${i === selected ? accent : 'transparent'};
        color:${text};
        transition:background 0.08s;
      `
      btn.addEventListener('mouseenter', () => { btn.style.background = accent })
      btn.addEventListener('mouseleave', () => { btn.style.background = i === selected ? accent : 'transparent' })
      btn.addEventListener('mousedown', (e) => { e.preventDefault(); onSelect?.(item) })
      el!.appendChild(btn)
    })
    // Update container colors in case theme changed
    el.style.background = bg
    el.style.borderColor = readVar(editorEl, '--md-border', '#2a2a2a')
  }

  return {
    onStart({ items: i, clientRect, command, editor }: {
      items: SlashItem[]
      clientRect: (() => DOMRect | null) | null
      command: (item: SlashItem) => void
      editor: import('@tiptap/core').Editor
    }) {
      items = i; selected = 0; onSelect = command
      editorEl = editor.view.dom

      const { bg, border } = buildStyles()

      el = document.createElement('div')
      el.style.cssText = `
        position:fixed; z-index:9999; min-width:210px; border-radius:8px;
        background:${bg}; border:1px solid ${border};
        box-shadow:0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25);
        padding:4px; overflow:hidden;
        font-family: "Inter", -apple-system, sans-serif;
      `
      const rect = clientRect?.()
      if (rect) {
        el.style.top  = `${rect.bottom + 6}px`
        el.style.left = `${rect.left}px`
      }
      document.body.appendChild(el)
      render()
    },

    onUpdate({ items: i, clientRect }: { items: SlashItem[]; clientRect: (() => DOMRect | null) | null }) {
      items = i; selected = 0
      const rect = clientRect?.()
      if (el && rect) {
        el.style.top  = `${rect.bottom + 6}px`
        el.style.left = `${rect.left}px`
      }
      render()
    },

    onKeyDown({ event }: { event: KeyboardEvent }) {
      if (event.key === 'ArrowDown') { selected = (selected + 1) % items.length; render(); return true }
      if (event.key === 'ArrowUp')   { selected = (selected - 1 + items.length) % items.length; render(); return true }
      if (event.key === 'Enter') {
        const item = items[selected]
        if (item) onSelect?.(item)
        return true
      }
      if (event.key === 'Escape') { el?.remove(); el = null; return true }
      return false
    },

    onExit() {
      el?.remove(); el = null
    },
  }
}

export const SlashCommand = Extension.create({
  name: 'slashCommand',

  addProseMirrorPlugins() {
    const editor = this.editor
    return [
      Suggestion({
        editor,
        char: '/',
        command: ({ editor: e, range, props }: {
          editor: import('@tiptap/core').Editor
          range: Range
          props: SlashItem
        }) => {
          e.chain().focus().deleteRange(range).run()
          props.action(e)
        },
        items: ({ query }: { query: string }) => {
          const all = defaultItems(editor)
          if (!query) return all
          const q = query.toLowerCase()
          return all.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.keywords.some(k => k.includes(q))
          )
        },
        render: renderPopup,
      }),
    ]
  },
})
