import type { Editor } from '@tiptap/core'
import type { JSONContent } from '@maxdraft/shared'

/**
 * Returns the current content as a Tiptap JSON object.
 */
export function getJSON(editor: Editor): JSONContent {
  return editor.getJSON() as JSONContent
}

/**
 * Returns the current content as an HTML string.
 */
export function getHTML(editor: Editor): string {
  return editor.getHTML()
}

/**
 * Returns the current content as plain text.
 */
export function getText(editor: Editor): string {
  return editor.getText()
}

/**
 * Sets editor content from an HTML string or JSON object.
 */
export function setContent(editor: Editor, content: JSONContent | string): void {
  editor.commands.setContent(content as Parameters<typeof editor.commands.setContent>[0])
}

/**
 * Returns character and word count from the editor.
 */
export function getStats(editor: Editor): { characters: number; words: number } {
  const storage = editor.storage['characterCount'] as
    | { characters: () => number; words: () => number }
    | undefined

  return {
    characters: storage?.characters() ?? 0,
    words: storage?.words() ?? 0,
  }
}
