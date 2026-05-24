import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

/**
 * Converts a Markdown string to HTML that Tiptap can consume.
 */
export function markdownToHtml(markdown: string): string {
  return md.render(markdown)
}
