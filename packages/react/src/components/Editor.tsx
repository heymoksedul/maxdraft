'use client'

import { EditorContent } from '@tiptap/react'
import { EditorContext } from '../context/EditorContext'
import { useMaxDraftEditor } from '../hooks/useMaxDraftEditor'
import type { MaxDraftEditorProps } from '@maxdraft/shared'
import { cn } from '@maxdraft/shared'

/**
 * MaxDraft Editor — drop-in React rich-text editor component.
 *
 * @example
 * ```tsx
 * <Editor
 *   content={content}
 *   onChange={setContent}
 *   toolbar
 *   bubbleMenu
 *   slashCommand
 *   theme="classic"
 * />
 * ```
 */
export function Editor(props: MaxDraftEditorProps) {
  const {
    toolbar = true,
    bubbleMenu = true,
    slashCommand = true,
    darkMode,
    theme = 'classic',
    className,
  } = props

  const editor = useMaxDraftEditor(props)

  return (
    <EditorContext.Provider value={{ editor }}>
      <div
        className={cn(
          'maxdraft-root',
          `maxdraft-theme-${theme}`,
          darkMode && 'dark',
          className,
        )}
        data-editor="maxdraft"
      >
        {/* Toolbar — rendered by @maxdraft/ui; dynamically imported to keep core lean */}
        {toolbar && editor && <MaxDraftToolbarSlot editor={editor} />}

        {/* ProseMirror content area */}
        <div className="maxdraft-editor-wrapper">
          <EditorContent editor={editor} className="maxdraft-editor" />
        </div>

        {/* Bubble menu — rendered when text is selected */}
        {bubbleMenu && editor && <MaxDraftBubbleMenuSlot editor={editor} />}

        {/* Status bar */}
        <MaxDraftStatusBar editor={editor} />
      </div>
    </EditorContext.Provider>
  )
}

// ─── Slots (resolved by @maxdraft/ui at build time via peer dep) ──────────────

interface SlotProps {
  editor: import('@tiptap/core').Editor
}

/**
 * Toolbar slot — consumers can override this by wrapping <Editor> and passing
 * custom toolbar via context, or by using `@maxdraft/ui`'s Toolbar directly.
 */
function MaxDraftToolbarSlot({ editor: _editor }: SlotProps) {
  // @maxdraft/ui injects the real Toolbar via the EditorContext when installed.
  // This placeholder is rendered when @maxdraft/ui is not present.
  return null
}

function MaxDraftBubbleMenuSlot({ editor: _editor }: SlotProps) {
  return null
}

function MaxDraftStatusBar({ editor }: { editor: import('@tiptap/core').Editor | null }) {
  if (!editor) return null

  const storage = editor.storage['characterCount'] as
    | { characters: () => number; words: () => number }
    | undefined

  const words = storage?.words() ?? 0
  const chars = storage?.characters() ?? 0

  return (
    <div className="maxdraft-status-bar" aria-label="Editor statistics">
      <span>{words} {words === 1 ? 'word' : 'words'}</span>
      <span aria-hidden="true">·</span>
      <span>{chars} {chars === 1 ? 'character' : 'characters'}</span>
    </div>
  )
}
