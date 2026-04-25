'use client'

/**
 * LabFooter — 4-column footer for the v2 redesign.
 * Identity / Lab links / Connect links / Contact.
 */

import Link from 'next/link'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS, anPalette, type AnTheme } from '@/lib/redesign-tokens'

interface LabFooterProps {
  theme?: AnTheme
}

interface FooterLink {
  href: string
  en: string
  ko: string
  external?: boolean
}

const LAB_LINKS: FooterLink[] = [
  { href: '/research', en: 'Research', ko: '연구' },
  { href: '/team', en: 'Team', ko: '구성원' },
  { href: '/publications', en: 'Publications', ko: '논문' },
  { href: '/news', en: 'News', ko: '소식' },
]

const CONNECT_LINKS: FooterLink[] = [
  { href: 'https://github.com/joonanlab', en: 'GitHub', ko: 'GitHub', external: true },
  {
    href: 'https://scholar.google.com/citations?user=GhUq2cIAAAAJ',
    en: 'Google Scholar',
    ko: 'Google Scholar',
    external: true,
  },
  { href: '/notes', en: 'Notes', ko: '노트' },
]

export function LabFooter({ theme = 'light' }: LabFooterProps) {
  const { lang } = useLang()
  const p = anPalette(theme)

  const renderLink = (item: FooterLink) => {
    const label = lang === 'ko' ? item.ko : item.en
    const style = {
      fontSize: 13,
      color: p.ink,
      textDecoration: 'none',
      display: 'block',
      marginBottom: 6,
    } as const
    if (item.external) {
      return (
        <a key={item.en} href={item.href} target="_blank" rel="noopener noreferrer" style={style}>
          {label}
        </a>
      )
    }
    return (
      <Link key={item.en} href={item.href} style={style}>
        {label}
      </Link>
    )
  }

  return (
    <footer
      style={{
        background: p.bg,
        borderTop: `1px solid ${p.line}`,
        padding: '48px 32px 64px',
        fontFamily: AN_TOKENS.fontSans,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
        }}
      >
        {/* Identity */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}
          >
            <img
              src="/images/logopic/Logo2025-AnLab.png"
              alt=""
              width={28}
              height={28}
              style={{ width: 28, height: 28, objectFit: 'contain' }}
            />
            <div style={{ fontWeight: 600, fontSize: 14, color: p.ink }}>
              An Lab · AI for Nature
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              color: p.inkSoft,
              lineHeight: 1.6,
              maxWidth: 360,
            }}
          >
            {lang === 'ko' ? (
              <>
                바이오시스템의과학부
                <br />
                고려대학교, 서울특별시, 대한민국
              </>
            ) : (
              <>
                School of Biosystems and Biomedical Sciences
                <br />
                Korea University, Seoul, Republic of Korea
              </>
            )}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              color: p.inkSoft,
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            {lang === 'ko' ? '연구실' : 'Lab'}
          </div>
          {LAB_LINKS.map(renderLink)}
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              color: p.inkSoft,
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            {lang === 'ko' ? '연결' : 'Connect'}
          </div>
          {CONNECT_LINKS.map(renderLink)}
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              color: p.inkSoft,
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            {lang === 'ko' ? '연락처' : 'Contact'}
          </div>
          <a
            href="mailto:joonan30@korea.ac.kr"
            style={{
              fontSize: 13,
              color: p.ink,
              marginBottom: 6,
              display: 'block',
              textDecoration: 'none',
            }}
          >
            joonan30@korea.ac.kr
          </a>
          <Link
            href="/contact"
            style={{
              fontSize: 13,
              color: p.inkSoft,
              textDecoration: 'none',
            }}
          >
            {lang === 'ko' ? '연락처 페이지' : 'Contact page'}
          </Link>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '48px auto 0',
          paddingTop: 24,
          borderTop: `1px solid ${p.line}`,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          color: p.inkSoft,
        }}
      >
        <span>© {new Date().getFullYear()} An Lab, Korea University</span>
        <span>Inspired by Biology · Driven by AI</span>
      </div>
    </footer>
  )
}
