/**
 * Converts an HTML string to Markdown.
 * Uses a simple regex-based approach for common patterns.
 * For production use, consider `turndown` or `rehype-remark`.
 */
export function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<u[^>]*>(.*?)<\/u>/gi, '_$1_')
    .replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) =>
      content.split('\n').map((l: string) => `> ${l}`).join('\n') + '\n\n',
    )
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n')
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content) =>
      content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n',
    )
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content) => {
      let idx = 0
      return content.replace(/<li[^>]*>(.*?)<\/li>/gi, (_: string, item: string) => `${++idx}. ${item}\n`) + '\n'
    })
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<hr[^>]*\/?>/gi, '\n---\n\n')
    .replace(/<br[^>]*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
