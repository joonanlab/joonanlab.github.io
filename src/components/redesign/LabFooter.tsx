'use client'

/**
 * LabFooter — minimal 2-column footer: lab identity + Contact link.
 * The earlier Lab/Connect link columns were dropped because the same
 * routes already live in the header nav, and the footer's job here
 * is just to say who we are and where to reach us.
 */

import Link from 'next/link'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS, anPalette, type AnTheme } from '@/lib/redesign-tokens'

interface LabFooterProps {
  theme?: AnTheme
}

export function LabFooter({ theme = 'auto' }: LabFooterProps) {
  const { lang } = useLang()
  const p = anPalette(theme)

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
          gridTemplateColumns: '2fr 1fr',
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
              AN Lab · AI for Nature
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

        {/* Contact */}
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
          <Link
            href="/contact"
            style={{
              fontSize: 13,
              color: p.ink,
              textDecoration: 'none',
              display: 'block',
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
        <span>© {new Date().getFullYear()} AN Lab, Korea University</span>
        <span>Inspired by Biology · Driven by AI</span>
      </div>
    </footer>
  )
}
