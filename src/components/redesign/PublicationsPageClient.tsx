'use client'

/**
 * PublicationsPageClient — v2 publications page.
 * Light theme, topic filter + year groups.
 *
 * The repo's publications.json doesn't carry an explicit topic tag, so we
 * derive a single best-fit topic per paper from title/journal keywords.
 * "Highlights" surfaces papers with highlight === 1.
 */

import { useMemo, useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS } from '@/lib/redesign-tokens'
import type { Publication } from '@/lib/data'

type Topic =
  | 'Highlights'
  | 'Autism'
  | 'Noncoding'
  | 'Cancer'
  | 'Alzheimer'
  | 'Review'
  | 'Other'

const TOPIC_ORDER: Topic[] = [
  'Highlights',
  'Autism',
  'Noncoding',
  'Cancer',
  'Alzheimer',
  'Review',
]

const TOPIC_KO: Record<Topic, string> = {
  Highlights: '주요 논문',
  Autism: '자폐',
  Noncoding: '비암호화',
  Cancer: '암',
  Alzheimer: '알츠하이머',
  Review: '리뷰',
  Other: '기타',
}

function deriveTopic(pub: Publication): Topic {
  const blob = `${pub.title} ${pub.journal}`.toLowerCase()
  if (
    pub.type === 'review' ||
    /\breview\b|\bperspective\b|opinion in/i.test(blob) ||
    /annual review/i.test(pub.journal)
  )
    return 'Review'
  if (/alzheimer/.test(blob)) return 'Alzheimer'
  if (/cancer|tumor|oncolog|carcinoma|leukemi/.test(blob)) return 'Cancer'
  if (
    /autism|asd|de novo|neurodevelopmental|psychiatr|spectrum disorder/.test(blob)
  )
    return 'Autism'
  if (
    /noncoding|regulator|enhancer|promoter|untranslated|utr|chromatin|epigenom|atac/.test(
      blob,
    )
  )
    return 'Noncoding'
  return 'Other'
}

interface PublicationsPageClientProps {
  publications: Publication[]
}

export function PublicationsPageClient({ publications }: PublicationsPageClientProps) {
  const { lang } = useLang()
  const [filter, setFilter] = useState<Topic | 'All'>('All')

  const enriched = useMemo(
    () => publications.map((p) => ({ pub: p, topic: deriveTopic(p) })),
    [publications],
  )

  const filtered = useMemo(() => {
    if (filter === 'All') return enriched
    if (filter === 'Highlights')
      return enriched.filter(({ pub }) => pub.highlight === 1)
    return enriched.filter(({ topic }) => topic === filter)
  }, [enriched, filter])

  const byYear = useMemo(() => {
    const out: Record<number, typeof enriched> = {}
    for (const item of filtered) {
      ;(out[item.pub.year] = out[item.pub.year] || []).push(item)
    }
    return out
  }, [filtered])

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a)

  const topics: ('All' | Topic)[] = ['All', ...TOPIC_ORDER]

  const labelFor = (t: 'All' | Topic) => {
    if (t === 'All') return lang === 'ko' ? '전체' : 'All'
    if (lang === 'ko') return TOPIC_KO[t]
    return t
  }

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'var(--an-surface-bg)',
          color: 'var(--an-surface-ink)',
          padding: 'clamp(64px, 9vw, 100px) clamp(20px, 4vw, 32px) clamp(40px, 6vw, 60px)',
          borderBottom: `1px solid ${'var(--an-surface-line)'}`,
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: AN_TOKENS.fontMono,
              fontSize: 12,
              color: AN_TOKENS.red,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ width: 32, height: 1, background: AN_TOKENS.red }} />
            {lang === 'ko'
              ? `논문 · ${years.length > 0 ? `${years[years.length - 1]}–${years[0]}` : '2014–2026'}`
              : `Publications · ${years.length > 0 ? `${years[years.length - 1]}–${years[0]}` : '2014–2026'}`}
          </div>
          <h1
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(48px, 8vw, 104px)',
              fontWeight: 300,
              letterSpacing: 'clamp(-2px, -0.4vw, -4px)',
              lineHeight: 0.9,
              margin: '0 0 32px',
              color: 'var(--an-surface-ink)',
              textWrap: 'balance',
            }}
          >
            {lang === 'ko' ? (
              <>
                그동안 <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>물어본</em>{' '}
                질문들.
              </>
            ) : (
              <>
                The questions,
                <br />
                <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>in print.</em>
              </>
            )}
          </h1>
          <p
            style={{
              fontFamily: AN_TOKENS.fontSans,
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              color: 'var(--an-surface-ink-soft)',
              lineHeight: 1.6,
              maxWidth: 640,
              margin: 0,
              textWrap: 'pretty',
            }}
          >
            {lang === 'ko'
              ? `${publications.length}편 이상의 논문 — Cell, Nature, Science 계열을 비롯한 다양한 저널. 아래 필터로 주제별로 볼 수 있습니다.`
              : `${publications.length}+ papers in venues including Cell, Nature, and Science. Filter by topic below.`}
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section
        style={{
          padding: '32px clamp(20px, 4vw, 32px)',
          borderBottom: `1px solid ${'var(--an-surface-line)'}`,
          background: 'var(--an-surface-bg-raised)',
          position: 'sticky',
          top: 64,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: AN_TOKENS.fontMono,
              fontSize: 11,
              color: 'var(--an-surface-ink-muted)',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginRight: 12,
            }}
          >
            {lang === 'ko' ? '주제 필터' : 'Filter by topic'}
          </span>
          {topics.map((t) => {
            const active = filter === t
            return (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                aria-pressed={active}
                style={{
                  padding: '8px 16px',
                  borderRadius: 30,
                  border: `1px solid ${active ? AN_TOKENS.red : 'var(--an-surface-line)'}`,
                  background: active ? AN_TOKENS.red : 'transparent',
                  color: active ? 'white' : 'var(--an-surface-ink)',
                  fontFamily: AN_TOKENS.fontSans,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {labelFor(t)}
              </button>
            )
          })}
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: AN_TOKENS.fontMono,
              fontSize: 12,
              color: 'var(--an-surface-ink-muted)',
            }}
          >
            {filtered.length} {lang === 'ko' ? '편' : filtered.length === 1 ? 'paper' : 'papers'}
          </span>
        </div>
      </section>

      {/* List */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 32px)', background: 'var(--an-surface-bg)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {years.length === 0 && (
            <p
              style={{
                fontFamily: AN_TOKENS.fontSans,
                fontSize: 16,
                color: 'var(--an-surface-ink-muted)',
                textAlign: 'center',
                padding: '80px 0',
              }}
            >
              {lang === 'ko' ? '해당 주제의 논문이 아직 없습니다.' : 'No publications match that filter yet.'}
            </p>
          )}
          {years.map((year) => (
            <div key={year} style={{ marginBottom: 56 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 20,
                  borderBottom: `1px solid ${'var(--an-surface-line)'}`,
                  paddingBottom: 12,
                  marginBottom: 24,
                }}
              >
                <h2
                  style={{
                    fontFamily: AN_TOKENS.fontSerif,
                    fontSize: 'clamp(36px, 5vw, 56px)',
                    fontWeight: 300,
                    color: 'var(--an-surface-ink)',
                    letterSpacing: -2,
                    margin: 0,
                  }}
                >
                  {year}
                </h2>
                <span
                  style={{
                    fontFamily: AN_TOKENS.fontMono,
                    fontSize: 12,
                    color: 'var(--an-surface-ink-muted)',
                  }}
                >
                  {byYear[year].length} {lang === 'ko' ? '편' : byYear[year].length === 1 ? 'paper' : 'papers'}
                </span>
              </div>
              <div style={{ display: 'grid', gap: 16 }}>
                {byYear[year].map(({ pub, topic }, i) => {
                  const cardInner = (
                    <div
                      className="pub-row"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '160px 1fr 240px',
                        gap: 24,
                        padding: '24px 28px',
                        background: 'var(--an-surface-bg-raised)',
                        border: `1px solid ${'var(--an-surface-line)'}`,
                        borderRadius: 10,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                          paddingTop: 4,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: AN_TOKENS.fontMono,
                            fontSize: 11,
                            color: AN_TOKENS.red,
                            letterSpacing: 1.5,
                            textTransform: 'uppercase',
                          }}
                        >
                          {lang === 'ko' && topic !== 'Other' ? TOPIC_KO[topic] : topic === 'Other' ? '—' : topic}
                        </span>
                        {pub.highlight === 1 && (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              fontFamily: AN_TOKENS.fontMono,
                              fontSize: 10,
                              color: AN_TOKENS.gold,
                              letterSpacing: 1,
                              textTransform: 'uppercase',
                            }}
                          >
                            ★ {lang === 'ko' ? '주요' : 'Featured'}
                          </span>
                        )}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h3
                          style={{
                            fontFamily: AN_TOKENS.fontSerif,
                            fontSize: 19,
                            fontWeight: 400,
                            color: 'var(--an-surface-ink)',
                            lineHeight: 1.3,
                            letterSpacing: -0.2,
                            margin: '0 0 8px',
                            textWrap: 'balance',
                          }}
                        >
                          {pub.title}
                        </h3>
                        <div
                          style={{
                            fontFamily: AN_TOKENS.fontSans,
                            fontSize: 12.5,
                            color: 'var(--an-surface-ink-soft)',
                            lineHeight: 1.5,
                          }}
                        >
                          {pub.authors}
                        </div>
                      </div>
                      <div className="pub-row-meta" style={{ textAlign: 'right' }}>
                        <div
                          style={{
                            fontFamily: AN_TOKENS.fontSerif,
                            fontStyle: 'italic',
                            fontSize: 15,
                            color: 'var(--an-surface-ink)',
                            marginBottom: 6,
                            textWrap: 'balance',
                          }}
                        >
                          {pub.journal}
                        </div>
                        {pub.link.url ? (
                          <span
                            style={{
                              fontFamily: AN_TOKENS.fontMono,
                              fontSize: 11,
                              color: AN_TOKENS.red,
                              letterSpacing: 1,
                              textTransform: 'uppercase',
                            }}
                          >
                            {lang === 'ko' ? '읽기 →' : 'Read →'}
                          </span>
                        ) : (
                          <span
                            style={{
                              fontFamily: AN_TOKENS.fontMono,
                              fontSize: 11,
                              color: 'var(--an-surface-ink-muted)',
                              letterSpacing: 1,
                              textTransform: 'uppercase',
                            }}
                          >
                            {pub.type === 'preprint'
                              ? lang === 'ko'
                                ? '프리프린트'
                                : 'Preprint'
                              : '—'}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                  if (pub.link.url) {
                    return (
                      <a
                        key={`${pub.title}-${i}`}
                        href={pub.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                      >
                        {cardInner}
                      </a>
                    )
                  }
                  return <div key={`${pub.title}-${i}`}>{cardInner}</div>
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .pub-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .pub-row-meta {
            text-align: left !important;
          }
        }
      `}</style>
    </>
  )
}
