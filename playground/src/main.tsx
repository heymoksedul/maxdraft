import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MaxDraft } from 'maxdraft'
import type { JSONContent, ThemeName } from 'maxdraft'

const THEMES: { value: ThemeName; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'classic', label: 'Classic' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'wordpress', label: 'WordPress' },
]

const INITIAL = `<h1>MaxDraft Editor</h1>
<p>A clean, professional rich-text editor. Start writing or press <code>/</code> for commands.</p>
<ul><li>Bold, italic, underline, strikethrough</li><li>Headings, lists, tables, code blocks</li><li>Slash commands, bubble menu, image support</li></ul>
<blockquote><p>Simple by default. Powerful when you need it.</p></blockquote>`

function App() {
  const [theme, setTheme] = useState<ThemeName>('dark')
  const [json, setJson] = useState<JSONContent | null>(null)
  const [showJson, setShowJson] = useState(false)

  const isDark = theme === 'dark'

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark ? '#080808' : '#f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      fontFamily: '"Inter", -apple-system, sans-serif',
      transition: 'background 0.2s',
    }}>
      {/* Header */}
      <div style={{
        width: '100%', maxWidth: 820,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 28,
      }}>
        <div>
          <h1 style={{
            fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em',
            color: isDark ? '#f4f4f5' : '#18181b',
            margin: 0, lineHeight: 1,
          }}>
            Max<span style={{ color: '#60a5fa' }}>Draft</span>
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: isDark ? '#52525b' : '#71717a' }}>
            Rich text editor playground
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Theme pills */}
          <div style={{
            display: 'flex', gap: 4,
            background: isDark ? '#111' : '#e2e8f0',
            borderRadius: 8, padding: 3,
          }}>
            {THEMES.map(t => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                style={{
                  padding: '4px 10px', borderRadius: 6, border: 'none',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  background: theme === t.value
                    ? isDark ? '#27272a' : '#fff'
                    : 'transparent',
                  color: theme === t.value
                    ? isDark ? '#f4f4f5' : '#18181b'
                    : isDark ? '#52525b' : '#71717a',
                  boxShadow: theme === t.value
                    ? isDark ? '0 0 0 1px #333' : '0 1px 3px rgba(0,0,0,0.1)'
                    : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* JSON toggle */}
          <button
            onClick={() => setShowJson(v => !v)}
            style={{
              padding: '5px 12px', borderRadius: 7, border: 'none',
              background: showJson
                ? isDark ? '#27272a' : '#18181b'
                : isDark ? '#18181b' : '#e2e8f0',
              color: showJson
                ? isDark ? '#a3e635' : '#a3e635'
                : isDark ? '#71717a' : '#52525b',
              fontSize: 12, fontWeight: 500, cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '0.02em',
              transition: 'all 0.15s',
            }}
          >
            {showJson ? '{ json }' : '{ }'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div style={{ width: '100%', maxWidth: 820 }}>
        <MaxDraft
          content={INITIAL}
          onChange={setJson}
          onAutoSave={c => console.log('[autosave]', c)}
          toolbar
          bubbleMenu
          slashCommand
          theme={theme}
          darkMode={theme === 'dark'}
          placeholder="Start writing, or press / for commands…"
        />
      </div>

      {/* JSON output */}
      {showJson && (
        <div style={{ width: '100%', maxWidth: 820, marginTop: 16 }}>
          <pre style={{
            margin: 0, padding: '16px 20px',
            borderRadius: 10,
            background: '#0a0a0a',
            border: '1px solid #1f1f1f',
            color: '#a3e635',
            fontSize: 12,
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            overflow: 'auto',
            maxHeight: 320,
            lineHeight: 1.6,
          }}>
            {JSON.stringify(json, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

const root = document.getElementById('root')!
createRoot(root).render(<App />)
