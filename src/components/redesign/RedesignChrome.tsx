/**
 * RedesignChrome — v2 wrapper for pages that still use legacy components
 * (Breadcrumb, .card, .pill, .pub-card, etc.) but want the new --an-* palette
 * and LabHeader/LabFooter chrome.
 *
 * Strategy: re-bind the legacy CSS variables (--bg-*, --text-*, --accent*,
 * --border*) to the new --an-* tokens on a wrapper div, so existing markup
 * picks up the v2 palette without rewriting every component.
 *
 * Used by /notes, /notes/[slug], /alumni, /contact, /karc, /news, /tools
 * during the migration.
 */

'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { LabHeader } from './LabHeader'
import { LabFooter } from './LabFooter'
import { AN_TOKENS, type AnTheme } from '@/lib/redesign-tokens'

interface RedesignChromeProps {
  children: ReactNode
  /** Force a specific theme. Omit to follow the user's site-wide preference. */
  theme?: AnTheme
}

/**
 * Token re-bindings for the light v2 surface. Keeps legacy var names alive
 * but serves the new An Lab cream/red/gold palette underneath them.
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

export function RedesignChrome({ children, theme }: RedesignChromeProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Resolve order: explicit prop > user pref (after mount) > 'light' default.
  // Pre-mount we render with the light surface to avoid hydration flash;
  // next-themes attaches data-theme on <html> before paint, so the FOUC
  // window is small.
  const effective: AnTheme = theme ?? (mounted && resolvedTheme === 'dark' ? 'dark' : 'light')
  const overrides = effective === 'dark' ? DARK_OVERRIDES : LIGHT_OVERRIDES
  const bg = effective === 'dark' ? AN_TOKENS.darkBg : AN_TOKENS.lightBg

  return (
    <div
      style={{
        ...overrides,
        background: bg,
        minHeight: '100vh',
        fontFamily: AN_TOKENS.fontSans,
      }}
    >
      <LabHeader theme={effective} />
      {children}
      <LabFooter theme={effective} />
    </div>
  )
}
