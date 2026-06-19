'use client'

/**
 * LabHeader — sticky, blur-backed nav for the v2 redesign.
 * Theme prop is per-page intent (dark hero pages vs. light body pages),
 * not the user's site-wide light/dark preference.
 *
 * Wires the EN/KO pill toggle into the existing LangContext.
 *
 * Below 1024px, primary nav items collapse into a hamburger drawer; brand,
 * EN/KO pill, and hamburger remain visible.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS, anPalette, type AnTheme } from '@/lib/redesign-tokens'

const NAV_ITEMS = [
  { href: '/', en: 'Home', ko: '홈' },
  { href: '/research', en: 'Research', ko: '연구' },
  { href: '/team', en: 'Team', ko: '구성원' },
  { href: '/publications', en: 'Publications', ko: '논문' },
  { href: '/tools', en: 'Tools', ko: '도구' },
  { href: '/notes', en: 'Notes', ko: '노트' },
  { href: '/join', en: 'Join', ko: '합류' },
]

interface LabHeaderProps {
  theme?: AnTheme
}

export function LabHeader({ theme = 'auto' }: LabHeaderProps) {
  const { lang, toggleLang } = useLang()
  const { resolvedTheme, setTheme } = useTheme()
  const pathname = usePathname()
  const p = anPalette(theme)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // next-themes returns undefined on SSR; avoid hydration flash by only
  // rendering the theme glyph after mount. The button itself stays in
  // the layout so widths are stable.
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkPref = resolvedTheme === 'dark'

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const headerBg =
    theme === 'auto'
      ? 'var(--an-surface-bg-glass)'
      : theme === 'dark'
      ? `${AN_TOKENS.darkBg}cc`
      : `${AN_TOKENS.lightBg}cc`

  return (
    <>
      <header
        className="lab-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: `1px solid ${p.line}`,
          background: headerBg,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '16px clamp(16px, 4vw, 32px)',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 2vw, 32px)',
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <img
              src="/images/logopic/Logo2025-AnLab.png"
              alt=""
              width={32}
              height={32}
              style={{ width: 32, height: 32, objectFit: 'contain' }}
            />
            <span
              style={{
                fontFamily: AN_TOKENS.fontSans,
                fontWeight: 600,
                fontSize: 15,
                color: p.ink,
                letterSpacing: -0.1,
                whiteSpace: 'nowrap',
              }}
            >
              AN Lab
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="lab-header-nav" style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 6,
                    fontFamily: AN_TOKENS.fontSans,
                    fontSize: 13.5,
                    color: active ? p.ink : p.inkSoft,
                    fontWeight: active ? 600 : 500,
                    textDecoration: 'none',
                    background: active ? p.lineSoft : 'transparent',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {lang === 'ko' ? item.ko : item.en}
                </Link>
              )
            })}
          </nav>

          {/* Theme toggle (sun/moon). The whole button is suppressed for
              hydration because next-themes returns undefined on SSR; we
              repaint after mount with the correct glyph + label. */}
          <button
            type="button"
            onClick={() => setTheme(isDarkPref ? 'light' : 'dark')}
            aria-label={isDarkPref ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkPref ? 'Light mode' : 'Dark mode'}
            suppressHydrationWarning
            className="lab-header-theme"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              border: `1px solid ${p.line}`,
              borderRadius: 8,
              background: 'transparent',
              color: p.inkSoft,
              cursor: 'pointer',
              flexShrink: 0,
              padding: 0,
            }}
          >
            <span suppressHydrationWarning style={{ display: 'inline-flex', width: 16, height: 16 }}>
              {mounted && isDarkPref ? (
                // Moon
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                // Sun (also shown during SSR / pre-mount)
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              )}
            </span>
          </button>

          {/* EN/KO pill (always visible) */}
          <div
            role="group"
            aria-label="Language toggle"
            className="lab-header-lang"
            style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${p.line}`,
              borderRadius: 20,
              padding: 2,
              fontFamily: AN_TOKENS.fontSans,
              fontSize: 11,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {(['en', 'ko'] as const).map((code) => {
              const selected = lang === code
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    if (!selected) toggleLang()
                  }}
                  aria-pressed={selected}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 18,
                    border: 0,
                    cursor: 'pointer',
                    background: selected ? AN_TOKENS.red : 'transparent',
                    color: selected ? 'white' : p.inkSoft,
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                  }}
                >
                  {code.toUpperCase()}
                </button>
              )
            })}
          </div>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            className="lab-header-hamburger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              border: `1px solid ${p.line}`,
              borderRadius: 8,
              background: 'transparent',
              color: p.ink,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <nav
            className="lab-header-mobile-nav"
            style={{
              borderTop: `1px solid ${p.line}`,
              background: p.bg,
              padding: '16px clamp(16px, 4vw, 32px) 24px',
              display: 'none',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 8,
                    fontFamily: AN_TOKENS.fontSans,
                    fontSize: 16,
                    color: active ? p.ink : p.inkSoft,
                    fontWeight: active ? 600 : 500,
                    textDecoration: 'none',
                    background: active ? p.lineSoft : 'transparent',
                  }}
                >
                  {lang === 'ko' ? item.ko : item.en}
                </Link>
              )
            })}
          </nav>
        )}
      </header>

      <style>{`
        @media (max-width: 1023px) {
          .lab-header-nav { display: none !important; }
          .lab-header-hamburger { display: inline-flex !important; }
          .lab-header-lang { margin-left: auto; }
          .lab-header-mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  )
}
