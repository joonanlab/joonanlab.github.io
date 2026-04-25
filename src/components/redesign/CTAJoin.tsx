'use client'

/**
 * CTAJoin — recruitment teaser between content and footer.
 */

import Link from 'next/link'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS, anPalette, type AnTheme } from '@/lib/redesign-tokens'

interface CTAJoinProps {
  theme?: AnTheme
  accent?: string
}

export function CTAJoin({ theme = 'light', accent }: CTAJoinProps) {
  const { lang } = useLang()
  const p = anPalette(theme)
  const acc = accent ?? (theme === 'dark' ? AN_TOKENS.gold : AN_TOKENS.red)

  return (
    <section
      style={{
        background: p.bg,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 32px)',
        borderTop: `1px solid ${p.line}`,
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: AN_TOKENS.fontMono,
            fontSize: 12,
            color: acc,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          § 04 · {lang === 'ko' ? '합류하기' : 'Join us'}
        </div>
        <h2
          style={{
            fontFamily: AN_TOKENS.fontSerif,
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 400,
            color: p.ink,
            letterSpacing: -2,
            lineHeight: 1,
            margin: '0 0 24px',
            textWrap: 'balance',
          }}
        >
          {lang === 'ko' ? (
            <>
              우리는
              <br />
              <em style={{ color: acc, fontStyle: 'italic' }}>호기심과 엄밀함</em>을 함께
              찾습니다.
            </>
          ) : (
            <>
              We&apos;re looking for the
              <br />
              <em style={{ color: acc, fontStyle: 'italic' }}>curious and the rigorous.</em>
            </>
          )}
        </h2>
        <p
          style={{
            fontFamily: AN_TOKENS.fontSans,
            fontSize: 17,
            color: p.inkSoft,
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '0 auto 40px',
            textWrap: 'pretty',
          }}
        >
          {lang === 'ko'
            ? '박사과정, 박사후연구원, 학부연구생 — 생물학과 계산 양쪽 모두에 끌리는 분이라면 이야기 나눠보고 싶습니다.'
            : 'PhD students, postdocs, and undergraduate researchers — if biology and computation both pull at you, we want to hear from you.'}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/join"
            style={{
              padding: '14px 28px',
              background: acc,
              color: theme === 'dark' ? AN_TOKENS.darkBg : 'white',
              fontFamily: AN_TOKENS.fontSans,
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            {lang === 'ko' ? '모집 공고 보기' : 'Read open positions'}
          </Link>
          <a
            href="mailto:joonan30@korea.ac.kr"
            style={{
              padding: '14px 28px',
              background: 'transparent',
              color: p.ink,
              border: `1px solid ${p.line}`,
              fontFamily: AN_TOKENS.fontSans,
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            {lang === 'ko' ? '안 교수에게 이메일' : 'Email Prof. An'}
          </a>
        </div>
      </div>
    </section>
  )
}
