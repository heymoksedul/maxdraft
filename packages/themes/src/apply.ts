import type { ThemeName, ThemeTokens } from '@maxdraft/shared'
import { classicTokens, minimalTokens, darkTokens, wordpressTokens } from './tokens'

const THEME_MAP: Record<ThemeName, ThemeTokens> = {
  classic: classicTokens,
  minimal: minimalTokens,
  dark: darkTokens,
  wordpress: wordpressTokens,
}

/**
 * Applies the given theme tokens as CSS custom properties on `element`
 * (defaults to `:root` / `document.documentElement`).
 */
export function applyTheme(
  theme: ThemeName,
  element: HTMLElement = document.documentElement,
): void {
  const tokens = THEME_MAP[theme] as unknown as Record<string, string>
  Object.entries(tokens).forEach(([key, value]) => {
    element.style.setProperty(key, value)
  })
}

/**
 * Returns the raw token map for a given theme — useful for SSR / inline styles.
 */
export function getThemeTokens(theme: ThemeName): ThemeTokens {
  return THEME_MAP[theme]!
}

/**
 * Converts a ThemeTokens object to an inline style record accepted by React
 * (`style` prop or `CSSProperties`).
 */
export function themeToStyle(tokens: ThemeTokens): Record<string, string> {
  return tokens as unknown as Record<string, string>
}
