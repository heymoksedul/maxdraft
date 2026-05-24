'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useEditor as useTiptapEditor } from '@tiptap/react'
import { buildBaseExtensions } from '@maxdraft/core'
import { debounce } from '@maxdraft/shared'
import type { MaxDraftEditorProps, JSONContent } from '@maxdraft/shared'

export function useMaxDraftEditor(props: MaxDraftEditorProps) {
  const {
    content = '',
    onChange,
    onAutoSave,
    autoSaveDelay = 2000,
    placeholder,
    editable = true,
    onMount,
  } = props

  // Stable auto-save
  const autoSaveRef = useRef(onAutoSave)
  autoSaveRef.current = onAutoSave

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedAutoSave = useCallback(
    debounce((json: JSONContent) => {
      autoSaveRef.current?.(json)
    }, autoSaveDelay),
    [autoSaveDelay],
  )

  // exactOptionalPropertyTypes: omit the key entirely when undefined
  const extensionOptions = placeholder !== undefined ? { placeholder } : {}

  const editor = useTiptapEditor({
    extensions: buildBaseExtensions(extensionOptions),
    content,
    editable,

    onUpdate({ editor: e }) {
      const json = e.getJSON() as JSONContent
      onChange?.(json)
      if (autoSaveRef.current) debouncedAutoSave(json)
    },
  })

  // Fire onMount once
  useEffect(() => {
    if (editor) onMount?.(editor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!editor])

  return editor
}
