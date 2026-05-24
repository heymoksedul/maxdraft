'use client'

import { useState } from 'react'
import { Editor } from '@maxdraft/react'
import type { JSONContent, ThemeName } from '@maxdraft/shared'
import { classicTokens, minimalTokens, darkTokens, wordpressTokens } from '@maxdraft/themes'

const THEMES: ThemeName[] = ['classic', 'minimal', 'dark', 'wordpress']

const INITIAL_CONTENT = `
<h1>Welcome to MaxDraft</h1>
<p>A <strong>WordPress-classic</strong> inspired rich text editor for the modern React ecosystem.</p>
<h2>Features</h2>
<ul>
  <li>Tiptap-powered with ProseMirror under the hood</li>
  <li>shadcn/ui styled components</li>
  <li>Tailwind-first theming with CSS variables</li>
  <li>Slash commands — try typing <code>/</code></li>
  <li>Full keyboard shortcut support</li>
</ul>
<blockquote><p>A modern publishing editor with the familiarity of classic WordPress editing.</p></blockquote>
`

export default function PlaygroundPage() {
  const [content, setContent] = useState<JSONContent | undefined>()
  const [theme, setTheme] = useState<ThemeName>('classic')
  const [darkMode, setDarkMode] = useState(false)

  const themeTokens = {
    classic: classicTokens,
    minimal: minimalTokens,
    dark: darkTokens,
    wordpress: wordpressTokens,
  }[theme]

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">MaxDraft Playground</h1>

        <div className="flex items-center gap-3">
          {/* Theme switcher */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeName)}
            className="rounded border border-zinc-300 bg-white px-2 py-1 text-sm"
          >
            {THEMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Dark mode toggle */}
          <label className="flex cursor-pointer items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            Dark
          </label>
        </div>
      </div>

      {/* Editor */}
      <div style={themeTokens as unknown as React.CSSProperties}>
        <Editor
          content={INITIAL_CONTENT}
          onChange={setContent}
          toolbar
          bubbleMenu
          slashCommand
          darkMode={darkMode}
          theme={theme}
          placeholder="Start writing, or type '/' for commands…"
          onAutoSave={(c) => console.log('[autosave]', c)}
        />
      </div>

      {/* JSON inspector */}
      <details className="mt-6">
        <summary className="cursor-pointer text-sm text-zinc-500 hover:text-zinc-800">
          View JSON output
        </summary>
        <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">
          {JSON.stringify(content, null, 2)}
        </pre>
      </details>
    </main>
  )
}
