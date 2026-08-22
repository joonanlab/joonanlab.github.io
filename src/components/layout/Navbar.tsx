'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useLang } from '@/contexts/LangContext'

const NAV_ITEMS = [
  { href: '/', label: 'Home', labelKo: '홈' },
  { href: '/team', label: 'Team', labelKo: '팀' },
  { href: '/research', label: 'Research', labelKo: '연구' },
  { href: '/publications', label: 'Publications', labelKo: '논문' },
  { href: '/tools', label: 'Tools', labelKo: '도구' },
  { href: '/notes', label: 'Notes', labelKo: '노트' },
  { href: '/news', label: 'News', labelKo: '소식' },
  { href: '/join', label: 'Join', labelKo: '모집' },
  { href: '/contact', label: 'Contact', labelKo: '연락처' },
]

export function Navbar() {
  const pathname = usePathname()
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
          <Image
            src="/images/logopic/Logo2025-AnLab.png"
            alt="AN Lab"
            className="h-8 w-auto"
            width={32}
            height={32}
          />
          <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
            AN Lab
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
