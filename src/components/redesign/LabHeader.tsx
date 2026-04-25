'use client'

/**
 * LabHeader — sticky, blur-backed nav for the v2 redesign.
 * Theme prop is per-page intent (dark hero pages vs. light body pages),
 * not the user's site-wide light/dark preference.
 *
 * Wires the EN/KO pill toggle into the existing LangContext.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS, anPalette, type AnTheme } from '@/lib/redesign-tokens'

const NAV_ITEMS = [
  { href: '/', en: 'Home', ko: '홈' },
  { href: '/research', en: 'Research', ko: '연구' },
  { href: '/team', en: 'Team', ko: '구성원' },
  { href: '/publications', en: 'Publications', ko: '논문' },
  { href: '/notes', en: 'Notes', ko: '노트' },
  { href: '/join', en: 'Join', ko: '합류' },
]

interface LabHeaderProps {
  theme?: AnTheme
}

export function LabHeader({ theme = 'light' }: LabHeaderProps) {
  const { lang, toggleLang } = useLang()
  const pathname = usePathname()
  const p = anPalette(theme)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: `1px solid ${p.line}`,
        background: theme === 'dark' ? `${AN_TOKENS.darkBg}cc` : `${AN_TOKENS.lightBg}cc`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 32,
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
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: AN_TOKENS.red,
              color: 'white',
              display: 'grid',
              placeItems: 'center',
              fontFamily: AN_TOKENS.fontSans,
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: -0.5,
            }}
          >
            AN
          </div>
          <span
            style={{
              fontFamily: AN_TOKENS.fontSans,
              fontWeight: 600,
              fontSize: 15,
              color: p.ink,
              letterSpacing: -0.1,
            }}
          >
            An Lab
          </span>
        </Link>

        <span
          style={{
            fontFamily: AN_TOKENS.fontSans,
            fontSize: 13,
            color: p.inkSoft,
          }}
        >
          {lang === 'ko' ? '· 고려대학교' : '· Korea University'}
        </span>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
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
                }}
              >
                {lang === 'ko' ? item.ko : item.en}
              </Link>
            )
          })}
        </nav>

        {/* EN/KO pill */}
        <div
          role="group"
          aria-label="Language toggle"
          style={{
            display: 'flex',
            alignItems: 'center',
            border: `1px solid ${p.line}`,
            borderRadius: 20,
            padding: 2,
            fontFamily: AN_TOKENS.fontSans,
            fontSize: 11,
            fontWeight: 600,
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
      </div>
    </header>
  )
}
