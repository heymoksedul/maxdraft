import type { ThemeTokens } from '@maxdraft/shared'

/** Classic (WordPress-inspired) light theme */
export const classicTokens: ThemeTokens = {
  '--md-bg': '#ffffff',
  '--md-bg-secondary': '#f9f9f9',
  '--md-border': '#dcdcde',
  '--md-toolbar-bg': '#f6f7f7',
  '--md-toolbar-border': '#dcdcde',
  '--md-text': '#1d2327',
  '--md-text-muted': '#646970',
  '--md-accent': '#f0f0f1',
  '--md-accent-hover': '#2271b1',
  '--md-selection-bg': '#d5e9f6',
  '--md-code-bg': '#f6f7f7',
  '--md-radius': '4px',
  '--md-font-body': '"Inter", "Segoe UI", system-ui, sans-serif',
  '--md-font-mono': '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
}

/** Minimal / Medium-inspired theme */
export const minimalTokens: ThemeTokens = {
  '--md-bg': '#ffffff',
  '--md-bg-secondary': '#fafafa',
  '--md-border': '#e8e8e8',
  '--md-toolbar-bg': '#ffffff',
  '--md-toolbar-border': '#e8e8e8',
  '--md-text': '#292929',
  '--md-text-muted': '#757575',
  '--md-accent': '#f2f2f2',
  '--md-accent-hover': '#191919',
  '--md-selection-bg': '#e6f3ff',
  '--md-code-bg': '#f5f5f5',
  '--md-radius': '6px',
  '--md-font-body': '"Georgia", "Times New Roman", serif',
  '--md-font-mono': 'ui-monospace, "Cascadia Code", monospace',
}

/** Dark theme */
export const darkTokens: ThemeTokens = {
  '--md-bg': '#0d1117',
  '--md-bg-secondary': '#161b22',
  '--md-border': '#30363d',
  '--md-toolbar-bg': '#161b22',
  '--md-toolbar-border': '#30363d',
  '--md-text': '#e6edf3',
  '--md-text-muted': '#8b949e',
  '--md-accent': '#21262d',
  '--md-accent-hover': '#58a6ff',
  '--md-selection-bg': '#1f3548',
  '--md-code-bg': '#161b22',
  '--md-radius': '6px',
  '--md-font-body': '"Inter", system-ui, sans-serif',
  '--md-font-mono': '"Fira Code", "JetBrains Mono", ui-monospace, monospace',
}

/** WordPress Classic Editor–faithful theme */
export const wordpressTokens: ThemeTokens = {
  '--md-bg': '#ffffff',
  '--md-bg-secondary': '#f6f7f7',
  '--md-border': '#8c8f94',
  '--md-toolbar-bg': '#f6f7f7',
  '--md-toolbar-border': '#8c8f94',
  '--md-text': '#1d2327',
  '--md-text-muted': '#50575e',
  '--md-accent': '#f0f0f1',
  '--md-accent-hover': '#135e96',
  '--md-selection-bg': '#bad6f1',
  '--md-code-bg': '#f0f0f1',
  '--md-radius': '3px',
  '--md-font-body': '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  '--md-font-mono': 'Consolas, Monaco, monospace',
}
