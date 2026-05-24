export type JSONContent = {
  type?: string
  attrs?: Record<string, unknown>
  content?: JSONContent[]
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>
  text?: string
}

export type ThemeName = 'classic' | 'minimal' | 'dark' | 'wordpress'

export interface MaxDraftProps {
  /** Initial HTML string or Tiptap JSON */
  content?: string | JSONContent
  /** Called on every change */
  onChange?: (content: JSONContent) => void
  /** Auto-save callback (debounced) */
  onAutoSave?: (content: JSONContent) => void
  /** Auto-save debounce ms (default 2000) */
  autoSaveDelay?: number
  /** Placeholder text */
  placeholder?: string
  /** Show toolbar (default true) */
  toolbar?: boolean
  /** Show bubble menu on selection (default true) */
  bubbleMenu?: boolean
  /** Enable /slash commands (default true) */
  slashCommand?: boolean
  /** Dark mode */
  darkMode?: boolean
  /** Theme preset */
  theme?: ThemeName
  /** Extra class on the root element */
  className?: string
  /** Read-only mode */
  editable?: boolean
  /** Upload an image file, return its URL */
  onImageUpload?: (file: File) => Promise<string>
}
