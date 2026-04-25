'use client'

/**
 * ResearchBento — 4-card grid of research areas.
 * 10-col asymmetric grid on desktop, 2-col on tablet, stacked on mobile.
 */

import Link from 'next/link'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS, anPalette, type AnTheme } from '@/lib/redesign-tokens'
import type { ResearchArea } from '@/lib/data'

interface ResearchBentoProps {
  areas: ResearchArea[]
  theme?: AnTheme
  /** Accent for eyebrow + numerical labels. Defaults to red on light, gold on dark. */
  accent?: string
}

export function ResearchBento({ areas, theme = 'light', accent }: ResearchBentoProps) {
  const { lang } = useLang()
  const p = anPalette(theme)
  const acc = accent ?? (theme === 'dark' ? AN_TOKENS.gold : AN_TOKENS.red)
  const cardBg = theme === 'dark' ? AN_TOKENS.darkBgRaised : AN_TOKENS.lightBgRaised

  return (
    <section
      style={{
        background: p.bg,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 32px)',
        borderTop: `1px solid ${p.line}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 48,
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: AN_TOKENS.fontMono,
                fontSize: 12,
                color: acc,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              § 01 · {lang === 'ko' ? '연구' : 'Research'}
            </div>
            <h2
              style={{
                fontFamily: AN_TOKENS.fontSerif,
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 400,
                color: p.ink,
                letterSpacing: -1.5,
                lineHeight: 1,
                margin: 0,
                maxWidth: 720,
                textWrap: 'balance',
              }}
            >
              {lang === 'ko' ? (
                <>
                  네 갈래의 질문, 하나의 축:
                  <br />
                  <em style={{ color: acc, fontStyle: 'italic' }}>
                    유전체는 어떻게 뇌를 만드는가?
                  </em>
                </>
              ) : (
                <>
                  Four threads, one question:
                  <br />
                  <em style={{ color: acc, fontStyle: 'italic' }}>
                    how does the genome shape the brain?
                  </em>
                </>
              )}
            </h2>
          </div>
          <div
            style={{
              fontFamily: AN_TOKENS.fontSans,
              fontSize: 13,
              color: p.inkSoft,
              maxWidth: 280,
              lineHeight: 1.6,
            }}
          >
            {lang === 'ko'
              ? '딥러닝, 단일세포 생물학, 대규모 시퀀싱, 통합 오믹스 — 한 질문이 네 방법을 묶어냅니다.'
              : 'We work across deep learning, single-cell biology, large-scale sequencing, and integrative omics — bound by one question.'}
          </div>
        </div>

        <div className="research-bento-grid">
          {areas.map((a, i) => {
            const isHero = i === 0
            const gridSpan = isHero
              ? 'span 4 / span 4'
              : i === 3
                ? 'span 6 / span 6'
                : 'span 3 / span 3'
            const rowSpan = isHero ? 'span 2 / span 2' : 'span 1 / span 1'
            return (
              <Link
                key={a.id}
                href={`/research#${a.id}`}
                className="research-bento-card"
                style={{
                  gridColumn: gridSpan,
                  gridRow: rowSpan,
                  background: cardBg,
                  border: `1px solid ${p.line}`,
                  borderRadius: 12,
                  padding: isHero ? 32 : 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: AN_TOKENS.fontMono,
                      fontSize: 11,
                      color: acc,
                      letterSpacing: 1.5,
                      marginBottom: 16,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} / 04
                  </div>
                  <h3
                    style={{
                      fontFamily: AN_TOKENS.fontSerif,
                      fontSize: isHero ? 'clamp(24px, 3vw, 36px)' : 'clamp(18px, 1.6vw, 22px)',
                      fontWeight: 400,
                      color: p.ink,
                      letterSpacing: -0.5,
                      lineHeight: 1.1,
                      margin: 0,
                      textWrap: 'balance',
                    }}
                  >
                    {lang === 'ko' ? a.ko : a.en}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: AN_TOKENS.fontSans,
                    fontSize: isHero ? 15 : 13.5,
                    color: p.inkSoft,
                    lineHeight: 1.55,
                    margin: 0,
                    marginTop: 16,
                    textWrap: 'pretty',
                  }}
                >
                  {lang === 'ko' ? a.descKo : a.descEn}
                </p>
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        .research-bento-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-auto-rows: 200px;
          gap: 16px;
        }
        .research-bento-card:hover {
          border-color: ${acc} !important;
        }
        @media (max-width: 1024px) {
          .research-bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
          }
          .research-bento-card {
            grid-column: auto !important;
            grid-row: auto !important;
            min-height: 180px;
          }
        }
        @media (max-width: 640px) {
          .research-bento-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
