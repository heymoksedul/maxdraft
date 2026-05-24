'use client'

import { useEditorContext } from '../context/EditorContext'

export function useEditorStats() {
  const { editor } = useEditorContext()

  if (!editor) return { characters: 0, words: 0 }

  const storage = editor.storage['characterCount'] as
    | { characters: () => number; words: () => number }
    | undefined

  return {
    characters: storage?.characters() ?? 0,
    words: storage?.words() ?? 0,
  }
}
