import type { Editor } from '@tiptap/core'

// ─── History ──────────────────────────────────────────────────────────────────
export const undo = (editor: Editor) => editor.chain().focus().undo().run()
export const redo = (editor: Editor) => editor.chain().focus().redo().run()

// ─── Inline formatting ────────────────────────────────────────────────────────
export const toggleBold = (editor: Editor) => editor.chain().focus().toggleBold().run()
export const toggleItalic = (editor: Editor) => editor.chain().focus().toggleItalic().run()
export const toggleUnderline = (editor: Editor) => editor.chain().focus().toggleUnderline().run()
export const toggleStrike = (editor: Editor) => editor.chain().focus().toggleStrike().run()
export const toggleCode = (editor: Editor) => editor.chain().focus().toggleCode().run()
export const toggleHighlight = (editor: Editor) => editor.chain().focus().toggleHighlight().run()

// ─── Block formatting ─────────────────────────────────────────────────────────
export const setParagraph = (editor: Editor) => editor.chain().focus().setParagraph().run()

export const setHeading = (editor: Editor, level: 1 | 2 | 3 | 4 | 5 | 6) =>
  editor.chain().focus().toggleHeading({ level }).run()

export const toggleBulletList = (editor: Editor) =>
  editor.chain().focus().toggleBulletList().run()

export const toggleOrderedList = (editor: Editor) =>
  editor.chain().focus().toggleOrderedList().run()

export const toggleTaskList = (editor: Editor) =>
  editor.chain().focus().toggleTaskList().run()

export const toggleBlockquote = (editor: Editor) =>
  editor.chain().focus().toggleBlockquote().run()

export const toggleCodeBlock = (editor: Editor) =>
  editor.chain().focus().toggleCodeBlock().run()

export const setHorizontalRule = (editor: Editor) =>
  editor.chain().focus().setHorizontalRule().run()

// ─── Alignment ────────────────────────────────────────────────────────────────
export const setAlignLeft = (editor: Editor) =>
  editor.chain().focus().setTextAlign('left').run()

export const setAlignCenter = (editor: Editor) =>
  editor.chain().focus().setTextAlign('center').run()

export const setAlignRight = (editor: Editor) =>
  editor.chain().focus().setTextAlign('right').run()

export const setAlignJustify = (editor: Editor) =>
  editor.chain().focus().setTextAlign('justify').run()

// ─── Link ─────────────────────────────────────────────────────────────────────
export const setLink = (editor: Editor, href: string) =>
  editor.chain().focus().setLink({ href }).run()

export const unsetLink = (editor: Editor) => editor.chain().focus().unsetLink().run()

// ─── Image ────────────────────────────────────────────────────────────────────
export const insertImage = (editor: Editor, src: string, alt?: string) =>
  editor.chain().focus().setImage({ src, alt: alt ?? '' }).run()

// ─── Table ────────────────────────────────────────────────────────────────────
export const insertTable = (editor: Editor, rows = 3, cols = 3) =>
  editor
    .chain()
    .focus()
    .insertTable({ rows, cols, withHeaderRow: true })
    .run()
