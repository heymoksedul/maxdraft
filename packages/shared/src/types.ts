import type { Editor } from '@tiptap/core'

// ─── Content types ────────────────────────────────────────────────────────────

export type JSONContent = {
  type?: string
  attrs?: Record<string, unknown>
  content?: JSONContent[]
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>
  text?: string
}

export type EditorContent = JSONContent | string

// ─── Theme ───────────────────────────────────────────────────────────────────

export type ThemeName = 'classic' | 'minimal' | 'dark' | 'wordpress'

export interface ThemeTokens {
  '--md-bg': string
  '--md-bg-secondary': string
  '--md-border': string
  '--md-toolbar-bg': string
  '--md-toolbar-border': string
  '--md-text': string
  '--md-text-muted': string
  '--md-accent': string
  '--md-accent-hover': string
  '--md-selection-bg': string
  '--md-code-bg': string
  '--md-radius': string
  '--md-font-body': string
  '--md-font-mono': string
}

// ─── Editor props ─────────────────────────────────────────────────────────────

export interface MaxDraftEditorProps {
  /** Initial content (HTML string or Tiptap JSON) */
  content?: EditorContent
  /** Callback fired on every content change */
  onChange?: (content: JSONContent) => void
  /** Callback fired on auto-save (debounced) */
  onAutoSave?: (content: JSONContent) => void
  /** Auto-save debounce delay in ms (default: 2000) */
  autoSaveDelay?: number
  /** Placeholder text */
  placeholder?: string
  /** Show the sticky toolbar */
  toolbar?: boolean
  /** Show the floating bubble menu */
  bubbleMenu?: boolean
  /** Enable slash command palette */
  slashCommand?: boolean
  /** Force dark mode (defaults to system) */
  darkMode?: boolean
  /** Theme preset */
  theme?: ThemeName
  /** Custom CSS class on the editor wrapper */
  className?: string
  /** Whether the editor is read-only */
  editable?: boolean
  /** Image upload handler */
  onImageUpload?: (file: File) => Promise<string>
  /** Called when the editor mounts */
  onMount?: (editor: Editor) => void
}

// ─── Toolbar item ─────────────────────────────────────────────────────────────

export type ToolbarGroupName =
  | 'history'
  | 'format'
  | 'heading'
  | 'list'
  | 'alignment'
  | 'insert'
  | 'advanced'

export interface ToolbarItem {
  id: string
  label: string
  icon?: string
  group: ToolbarGroupName
  shortcut?: string
  action: (editor: Editor) => void
  isActive?: (editor: Editor) => boolean
  isDisabled?: (editor: Editor) => boolean
}

// ─── Slash command ────────────────────────────────────────────────────────────

export interface SlashCommandItem {
  id: string
  title: string
  description: string
  icon: string
  keywords: string[]
  action: (editor: Editor) => void
}

// ─── Extension options ────────────────────────────────────────────────────────

export interface MaxDraftExtensionOptions {
  placeholder?: string
  onImageUpload?: (file: File) => Promise<string>
  slashCommands?: SlashCommandItem[]
}
