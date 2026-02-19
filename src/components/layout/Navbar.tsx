'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useLang } from '@/contexts/LangContext'

const NAV_ITEMS = [
  { href: '/', label: 'Home', labelKo: '홈' },
  { href: '/team', label: 'Team', labelKo: '팀' },
  { href: '/research', label: 'Research', labelKo: '연구' },
  { href: '/publications', label: 'Publications', labelKo: '논문' },
  { href: '/tools', label: 'Tools', labelKo: '도구' },
  { href: '/lectures', label: 'Lectures', labelKo: '강의' },
  { href: '/news', label: 'News', labelKo: '소식' },
  { href: '/join', label: 'Join', labelKo: '모집' },
  { href: '/contact', label: 'Contact', labelKo: '연락처' },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { lang, toggleLang } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="glass-nav fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/logopic/Logo2025-AnLab.png"
            alt="An Lab"
            className="h-8 w-auto"
            width={32}
            height={32}
          />
          <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
            An Lab
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
            >
              <span className="en-only">{item.label}</span>
              <span className="ko-only">{item.labelKo}</span>
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg transition-colors cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle theme"
          >
            {/* Sun icon */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ display: theme === 'dark' ? 'none' : 'block' }}
            >
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
            {/* Moon icon */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ display: theme === 'dark' ? 'block' : 'none' }}
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-lg text-base transition-colors cursor-pointer"
            style={{
              border: '1px solid var(--border-hover)',
              color: 'var(--text-secondary)',
            }}
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'KR' : 'EN'}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: 'var(--text-primary)' }}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pb-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex flex-col gap-3 pt-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="en-only">{item.label}</span>
                <span className="ko-only">{item.labelKo}</span>
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg cursor-pointer"
                style={{ color: 'var(--text-secondary)' }}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button
                onClick={toggleLang}
                className="px-3 py-1 rounded-lg text-sm cursor-pointer"
                style={{ border: '1px solid var(--border-hover)', color: 'var(--text-secondary)' }}
              >
                {lang === 'en' ? 'KR' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
