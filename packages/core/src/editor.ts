import { Editor } from '@tiptap/core'
import type { MaxDraftEditorProps } from '@maxdraft/shared'
import { buildBaseExtensions } from './extensions'

export interface CreateEditorOptions
  extends Pick<
    MaxDraftEditorProps,
    'content' | 'placeholder' | 'editable' | 'onImageUpload'
  > {
  onUpdate?: (editor: Editor) => void
  onBlur?: (editor: Editor) => void
  onFocus?: (editor: Editor) => void
}

/**
 * Creates a headless Tiptap Editor instance with MaxDraft's default extensions.
 * Use this inside `@maxdraft/react`'s `useEditor` hook, or directly in
 * framework-agnostic environments.
 */
export function createEditor(options: CreateEditorOptions = {}): Editor {
  const {
    content = '',
    placeholder,
    editable = true,
    onUpdate,
    onBlur,
    onFocus,
  } = options

  // exactOptionalPropertyTypes requires we omit the key entirely when undefined
  const extensionOptions = placeholder !== undefined ? { placeholder } : {}

  return new Editor({
    content,
    editable,
    extensions: buildBaseExtensions(extensionOptions),

    onUpdate({ editor }) {
      onUpdate?.(editor)
    },

    onBlur({ editor }) {
      onBlur?.(editor)
    },

    onFocus({ editor }) {
      onFocus?.(editor)
    },
  })
}
