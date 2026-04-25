'use client'

/**
 * ResearchPageClient — v2 Research page.
 * Dark theme, four full-width sections (alternating bg), each with
 * § number, eyebrow, italic lede quote, body paragraph, method tags,
 * and a "View papers" link. Sections expose anchor IDs so links from
 * the home bento can scroll-target them.
 */

import Link from 'next/link'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS } from '@/lib/redesign-tokens'
import type { ResearchArea } from '@/lib/data'

interface ResearchPageClientProps {
  areas: ResearchArea[]
}

export function ResearchPageClient({ areas }: ResearchPageClientProps) {
  const { lang } = useLang()

  return (
    <>
      {/* Page header */}
      <section
        style={{
          background: AN_TOKENS.darkBg,
          color: AN_TOKENS.darkInk,
          padding: 'clamp(64px, 9vw, 100px) clamp(20px, 4vw, 32px) clamp(48px, 7vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: AN_TOKENS.fontMono,
              fontSize: 12,
              color: AN_TOKENS.gold,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ width: 32, height: 1, background: AN_TOKENS.red }} />
            {lang === 'ko' ? '연구 · 네 개의 갈래' : 'Research · Four threads'}
          </div>
          <h1
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(48px, 8vw, 104px)',
              fontWeight: 300,
              letterSpacing: 'clamp(-2px, -0.4vw, -4px)',
              lineHeight: 0.9,
              margin: '0 0 32px',
              maxWidth: 1100,
              textWrap: 'balance',
            }}
          >
            {lang === 'ko' ? (
              <>
                유전체·세포·뇌 —
                <br />
                <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>한 질문의</em> 네 시선
              </>
            ) : (
              <>
                Four perspectives on
                <br />
                <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>one question.</em>
              </>
            )}
          </h1>
          <p
            style={{
              fontFamily: AN_TOKENS.fontSans,
              fontSize: 'clamp(15px, 1.4vw, 19px)',
              color: AN_TOKENS.darkInkSoft,
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 720,
              textWrap: 'pretty',
            }}
          >
            {lang === 'ko'
              ? '유전체가 어떻게 뇌를 만드는가? 이 질문 하나를 딥러닝·단일세포·대규모 시퀀싱·통합 멀티오믹스의 네 각도에서 추적합니다.'
              : 'How does the genome shape the brain? We pursue one question from four angles — deep learning, single-cell biology, large-scale sequencing, and integrative multi-omics.'}
          </p>
        </div>
      </section>

      {/* Each area as a full-width section */}
      {areas.map((a, i) => {
        const accent = i % 2 === 0 ? AN_TOKENS.red : AN_TOKENS.gold
        const num = String(i + 1).padStart(2, '0')
        const sectionBg = i % 2 === 1 ? AN_TOKENS.darkBgRaised : AN_TOKENS.darkBg
        return (
          <section
            key={a.id}
            id={a.id}
            style={{
              background: sectionBg,
              color: AN_TOKENS.darkInk,
              borderTop: `1px solid ${AN_TOKENS.darkLine}`,
              padding: 'clamp(64px, 9vw, 100px) clamp(20px, 4vw, 32px)',
              scrollMarginTop: 80,
            }}
          >
            <div
              className="research-section-grid"
              style={{
                maxWidth: 1280,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '120px 1fr 1fr',
                gap: 'clamp(24px, 4vw, 48px)',
              }}
            >
              <div
                style={{
                  fontFamily: AN_TOKENS.fontMono,
                  fontSize: 14,
                  color: accent,
                  letterSpacing: 2,
                  fontWeight: 600,
                }}
              >
                § {num}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: AN_TOKENS.fontMono,
                    fontSize: 11,
                    color: accent,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    marginBottom: 16,
                  }}
                >
                  {lang === 'ko' ? a.shortKo : a.short}
                </div>
                <h2
                  style={{
                    fontFamily: AN_TOKENS.fontSerif,
                    fontSize: 'clamp(32px, 5vw, 54px)',
                    fontWeight: 300,
                    letterSpacing: -1.5,
                    lineHeight: 1.0,
                    margin: '0 0 28px',
                    textWrap: 'balance',
                  }}
                >
                  {lang === 'ko' ? a.ko : a.en}
                </h2>
                <p
                  style={{
                    fontFamily: AN_TOKENS.fontSerif,
                    fontStyle: 'italic',
                    fontSize: 'clamp(17px, 1.6vw, 22px)',
                    color: AN_TOKENS.darkInk,
                    lineHeight: 1.45,
                    margin: '0 0 24px',
                    maxWidth: 540,
                    fontWeight: 300,
                    textWrap: 'pretty',
                  }}
                >
                  &ldquo;{lang === 'ko' ? a.ledeKo : a.lede}&rdquo;
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: AN_TOKENS.fontSans,
                    fontSize: 16,
                    color: AN_TOKENS.darkInkSoft,
                    lineHeight: 1.65,
                    margin: '0 0 32px',
                    textWrap: 'pretty',
                  }}
                >
                  {lang === 'ko' ? a.bodyKo : a.body}
                </p>
                <div
                  style={{
                    fontFamily: AN_TOKENS.fontMono,
                    fontSize: 10,
                    color: AN_TOKENS.darkInkMuted,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  {lang === 'ko' ? '방법론' : 'Methods'}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  {a.methods.map((m) => (
                    <span
                      key={m}
                      style={{
                        padding: '6px 12px',
                        fontFamily: AN_TOKENS.fontMono,
                        fontSize: 11,
                        color: AN_TOKENS.darkInk,
                        border: `1px solid ${AN_TOKENS.darkLine}`,
                        borderRadius: 30,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <Link
                  href="/publications"
                  style={{
                    fontFamily: AN_TOKENS.fontSans,
                    fontSize: 13,
                    color: accent,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  {lang === 'ko' ? '관련 논문 보기 →' : 'View papers in this area →'}
                </Link>
              </div>
            </div>
          </section>
        )
      })}

      <style>{`
        @media (max-width: 900px) {
          .research-section-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
