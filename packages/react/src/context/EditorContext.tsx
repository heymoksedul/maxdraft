'use client'

import { createContext, useContext } from 'react'
import type { Editor } from '@tiptap/core'

interface EditorContextValue {
  editor: Editor | null
}

export const EditorContext = createContext<EditorContextValue>({ editor: null })

export function useEditorContext(): EditorContextValue {
  return useContext(EditorContext)
}
