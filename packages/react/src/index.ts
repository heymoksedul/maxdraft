export { Editor } from './components/Editor'
export { EditorContext, useEditorContext } from './context/EditorContext'
export { useMaxDraftEditor } from './hooks/useMaxDraftEditor'
export { useEditorStats } from './hooks/useEditorStats'

// Re-export shared types so consumers get everything from one package
export type {
  MaxDraftEditorProps,
  JSONContent,
  ThemeName,
  SlashCommandItem,
  ToolbarItem,
} from '@maxdraft/shared'
