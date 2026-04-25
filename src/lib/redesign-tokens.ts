/**
 * Hex/numeric values for the redesign palette, mirrored from globals.css
 * `--an-*` CSS variables. Use these only for JS-driven contexts (canvas,
 * dynamic inline styles). For DOM styling prefer the CSS variables.
 */
export const AN_TOKENS = {
  red: '#C41E3A',
  redDeep: '#8B1428',
  redInk: '#3a0a13',
  gold: '#C49A3C',

  lightBg: '#F8F5EE',
  lightBgRaised: '#FFFFFF',
  lightBgAlt: '#F2EEE5',
  lightInk: '#1a1410',
  lightInkSoft: '#5a4f47',
  lightInkMuted: '#8a7d72',
  lightLine: 'rgba(26, 20, 16, 0.10)',
  lightLineSoft: 'rgba(26, 20, 16, 0.06)',

  darkBg: '#0F0E0D',
  darkBgRaised: '#1A1816',
  darkInk: '#F5EFE3',
  darkInkSoft: '#A8A099',
  darkInkMuted: '#6F6862',
  darkLine: 'rgba(245, 239, 227, 0.10)',
  darkLineSoft: 'rgba(245, 239, 227, 0.05)',

  fontSerif: 'var(--an-font-serif)',
  fontSans: 'var(--an-font-sans)',
  fontMono: 'var(--an-font-mono)',
} as const

/**
 * `'auto'` follows the user's theme via CSS variables (--an-surface-*).
 * `'light'` and `'dark'` pin a fixed palette, useful for hero sections
 * that should stay on one side of the toggle by design.
 */
export type AnTheme = 'light' | 'dark' | 'auto'

/** Convenience: pick the right ink/bg/line tokens based on section theme. */
export function anPalette(theme: AnTheme = 'auto') {
  if (theme === 'auto') {
    return {
      bg: 'var(--an-surface-bg)',
      bgRaised: 'var(--an-surface-bg-raised)',
      bgAlt: 'var(--an-surface-bg-alt)',
      ink: 'var(--an-surface-ink)',
      inkSoft: 'var(--an-surface-ink-soft)',
      inkMuted: 'var(--an-surface-ink-muted)',
      line: 'var(--an-surface-line)',
      lineSoft: 'var(--an-surface-line-soft)',
    }
  }
  return theme === 'dark'
    ? {
        bg: AN_TOKENS.darkBg,
        bgRaised: AN_TOKENS.darkBgRaised,
        bgAlt: AN_TOKENS.darkBgRaised,
        ink: AN_TOKENS.darkInk,
        inkSoft: AN_TOKENS.darkInkSoft,
        inkMuted: AN_TOKENS.darkInkMuted,
        line: AN_TOKENS.darkLine,
        lineSoft: AN_TOKENS.darkLineSoft,
      }
    : {
        bg: AN_TOKENS.lightBg,
        bgRaised: AN_TOKENS.lightBgRaised,
        bgAlt: AN_TOKENS.lightBgAlt,
        ink: AN_TOKENS.lightInk,
        inkSoft: AN_TOKENS.lightInkSoft,
        inkMuted: AN_TOKENS.lightInkMuted,
        line: AN_TOKENS.lightLine,
        lineSoft: AN_TOKENS.lightLineSoft,
      }
}
