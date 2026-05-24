export { htmlToMarkdown } from './html-to-markdown'
export { markdownToHtml } from './markdown-to-html'

/**
 * Convenience helper: get Markdown from a Tiptap editor instance.
 */
export async function editorToMarkdown(
  editor: import('@tiptap/core').Editor,
): Promise<string> {
  const { htmlToMarkdown: convert } = await import('./html-to-markdown')
  return convert(editor.getHTML())
}

/**
 * Convenience helper: set Tiptap editor content from a Markdown string.
 */
export async function markdownToEditor(
  editor: import('@tiptap/core').Editor,
  markdown: string,
): Promise<void> {
  const { markdownToHtml: convert } = await import('./markdown-to-html')
  const html = convert(markdown)
  editor.commands.setContent(html)
}
