/**
 * RedesignChrome — v2 wrapper for pages that still use legacy components
 * (Breadcrumb, .card, .pill, .pub-card, etc.) but want the new --an-* palette
 * and LabHeader/LabFooter chrome.
 *
 * Strategy: re-bind the legacy CSS variables (--bg-*, --text-*, --accent*,
 * --border*) to the adaptive --an-surface-* tokens, which themselves flip
 * with [data-theme] in globals.css. So the existing legacy markup picks up
 * the right palette automatically when the user toggles light/dark.
 *
 * Used by /notes, /notes/[slug], /alumni, /contact, /karc, /news, /tools.
 */

import type { CSSProperties, ReactNode } from 'react'
import { LabHeader } from './LabHeader'
import { LabFooter } from './LabFooter'
import { AN_TOKENS, type AnTheme } from '@/lib/redesign-tokens'

interface RedesignChromeProps {
  children: ReactNode
  /** Force a specific theme. Omit to follow the user's site-wide preference. */
  theme?: AnTheme
}

/**
 * Adaptive token bridge — legacy var names map to --an-surface-* which
 * already flip with [data-theme]. So the bridge itself doesn't care about
 * light vs dark; it just delegates.
 */
const ADAPTIVE_OVERRIDES = {
  '--bg-primary': 'var(--an-surface-bg)',
  '--bg-secondary': 'var(--an-surface-bg-raised)',
  '--bg-tertiary': 'var(--an-surface-bg-alt)',
  '--text-primary': 'var(--an-surface-ink)',
  '--text-secondary': 'var(--an-surface-ink-soft)',
  '--text-muted': 'var(--an-surface-ink-muted)',
  '--accent': 'var(--an-red)',
  '--accent-hover': 'var(--an-red-deep)',
  '--accent-subtle': 'rgba(196, 30, 58, 0.10)',
  '--accent-gold': 'var(--an-gold)',
  '--border': 'var(--an-surface-line)',
  '--border-hover': 'var(--an-surface-line)',
  '--glass-bg': 'var(--an-surface-bg-glass)',
  '--glass-border': 'var(--an-surface-line)',
} as CSSProperties

/**
 * Pinned light/dark overrides — used only when the page explicitly forces
 * a fixed theme via the `theme` prop. Most callers should not pass theme.
 */
const LIGHT_OVERRIDES = {
  '--bg-primary': 'var(--an-light-bg)',
  '--bg-secondary': 'var(--an-light-bg-raised)',
  '--bg-tertiary': 'var(--an-light-bg-alt)',
  '--text-primary': 'var(--an-light-ink)',
  '--text-secondary': 'var(--an-light-ink-soft)',
  '--text-muted': 'var(--an-light-ink-muted)',
  '--accent': 'var(--an-red)',
  '--accent-hover': 'var(--an-red-deep)',
  '--accent-subtle': 'rgba(196, 30, 58, 0.08)',
  '--accent-gold': 'var(--an-gold)',
  '--border': 'var(--an-light-line)',
  '--border-hover': 'rgba(26, 20, 16, 0.18)',
  '--glass-bg': 'rgba(248, 245, 238, 0.85)',
  '--glass-border': 'var(--an-light-line)',
} as CSSProperties

const DARK_OVERRIDES = {
  '--bg-primary': 'var(--an-dark-bg)',
  '--bg-secondary': 'var(--an-dark-bg-raised)',
  '--bg-tertiary': 'var(--an-dark-bg-raised)',
  '--text-primary': 'var(--an-dark-ink)',
  '--text-secondary': 'var(--an-dark-ink-soft)',
  '--text-muted': 'var(--an-dark-ink-muted)',
  '--accent': 'var(--an-red)',
  '--accent-hover': 'var(--an-red-deep)',
  '--accent-subtle': 'rgba(196, 30, 58, 0.18)',
  '--accent-gold': 'var(--an-gold)',
  '--border': 'var(--an-dark-line)',
  '--border-hover': 'rgba(245, 239, 227, 0.20)',
  '--glass-bg': 'rgba(15, 14, 13, 0.85)',
  '--glass-border': 'var(--an-dark-line)',
} as CSSProperties

export function RedesignChrome({ children, theme = 'auto' }: RedesignChromeProps) {
  const overrides =
    theme === 'auto' ? ADAPTIVE_OVERRIDES : theme === 'dark' ? DARK_OVERRIDES : LIGHT_OVERRIDES
  const bg =
    theme === 'auto'
      ? 'var(--an-surface-bg)'
      : theme === 'dark'
      ? AN_TOKENS.darkBg
      : AN_TOKENS.lightBg

  return (
    <div
      style={{
        ...overrides,
        background: bg,
        minHeight: '100vh',
        fontFamily: AN_TOKENS.fontSans,
      }}
    >
      <LabHeader theme={theme} />
      {children}
      <LabFooter theme={theme} />
    </div>
  )
}
