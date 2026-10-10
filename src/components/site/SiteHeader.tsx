'use client'

/**
 * SiteHeader — the one header for every route (rendered by app/layout).
 * Nav on the left, wordmark in the centre, language switch on the right.
 * Labels use en-only/ko-only spans so the pre-hydration language script
 * already shows the right text; the toggle itself needs LangContext.
 */

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import { NAV_ITEMS } from './nav'

export function SiteHeader() {
  const { lang, toggleLang } = useLang()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Close the mobile menu after client-side navigation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header-bar">
          <nav className="site-nav" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
                <span className="en-only">{item.en}</span>
                <span className="ko-only">{item.ko}</span>
              </Link>
            ))}
          </nav>

          <Link href="/" className="wordmark" aria-label="AN Lab home">
            <Image
              src="/images/logopic/Logo2025-AnLab.png"
              alt=""
              width={32}
              height={32}
              style={{ width: 32, height: 32, objectFit: 'contain' }}
              priority
            />
            AN LAB
          </Link>

          <div className="site-header-end">
            <button
              type="button"
              className="lang-switch"
              onClick={toggleLang}
              aria-label={lang === 'ko' ? 'Switch to English' : '한국어로 보기'}
            >
              <span className="en-only" lang="ko">
                한국어
              </span>
              <span className="ko-only" lang="en">
                English
              </span>
            </button>
            <button
              type="button"
              className="menu-button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
              </svg>
            </button>
          </div>
        </div>

        <nav id="mobile-nav" className="mobile-nav" data-open={open} aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
              <span className="en-only">{item.en}</span>
              <span className="ko-only">{item.ko}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
