'use client'

/**
 * NewsAndPubs — two-column section: latest news (with link extracted from
 * headline HTML) on the left, selected publications on the right.
 *
 * Data sources are real (data/news.json + highlighted entries from
 * data/publications.json). News headlines contain inline anchor HTML
 * (e.g. "...published <a href='URL'>(link)</a>.") — we strip the anchor
 * for display text and surface the URL as the news item's destination.
 */

import Link from 'next/link'
import type { NewsItem, Publication } from '@/lib/data'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS, anPalette, type AnTheme } from '@/lib/redesign-tokens'

interface NewsAndPubsProps {
  news: NewsItem[]
  publications: Publication[]
  theme?: AnTheme
  accent?: string
}

interface ParsedNews {
  date: string
  text: string
  url?: string
  badge?: string
}

const LINK_TAIL = /\s*<a\s[^>]*href=['"]([^'"]+)['"][^>]*>([^<]*)<\/a>\s*[.!?]?\s*$/i

function parseNews(headline: string): { text: string; url?: string } {
  const match = headline.match(LINK_TAIL)
  if (!match) {
    return { text: headline.replace(/<[^>]+>/g, ''), url: undefined }
  }
  // Strip anchor + label from the tail; preserve trailing punctuation.
  const url = match[1]
  const cleaned = headline.slice(0, match.index).replace(/<[^>]+>/g, '').trim()
  // Re-attach a closing punctuation if the original ended in . or ! and we trimmed it.
  const ended = cleaned.endsWith('.') || cleaned.endsWith('!') || cleaned.endsWith('?')
  return { text: ended ? cleaned : `${cleaned}.`, url }
}

function inferBadge(text: string, lang: 'en' | 'ko'): string | undefined {
  if (lang === 'ko') {
    if (text.includes('수상') || text.includes('포스터')) return '수상'
    if (text.includes('축하') || text.includes('학위')) return '축하'
    if (text.includes('게재')) return '게재'
    return undefined
  }
  if (/award|prize|poster award/i.test(text)) return 'Award'
  if (/honor|fellowship|appointed|selected/i.test(text)) return 'Honor'
  if (/congrat|graduat|ph\.?d\.?/i.test(text)) return 'Milestone'
  if (/publish|paper|article/i.test(text)) return 'Publication'
  return undefined
}

export function NewsAndPubs({
  news,
  publications,
  theme = 'auto',
  accent,
}: NewsAndPubsProps) {
  const { lang } = useLang()
  const p = anPalette(theme)
  const acc = accent ?? AN_TOKENS.red
  const altBg = p.bgAlt
  const cardBg = p.bgRaised

  const newsItems: ParsedNews[] = news.slice(0, 6).map((n) => {
    const raw = lang === 'ko' ? n.headline_ko : n.headline
    const { text, url } = parseNews(raw)
    return {
      date: n.date,
      text,
      url,
      badge: inferBadge(text, lang),
    }
  })

  const featured = publications.filter((pub) => pub.highlight === 1).slice(0, 5)

  return (
    <section
      style={{
        background: altBg,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 32px)',
      }}
    >
      <div
        className="news-pubs-grid"
        style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gap: 80 }}
      >
        {/* News column */}
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
            § 02 · {lang === 'ko' ? '소식' : 'News'}
          </div>
          <h2
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(28px, 3.4vw, 40px)',
              fontWeight: 400,
              color: p.ink,
              letterSpacing: -1,
              margin: '0 0 32px',
              textWrap: 'balance',
            }}
          >
            {lang === 'ko' ? '연구실 최신 소식' : 'Latest from the lab'}
          </h2>
          <div>
            {newsItems.map((n, i) => {
              const inner = (
                <div
                  style={{
                    padding: '20px 0',
                    borderTop: i === 0 ? `1px solid ${p.line}` : 'none',
                    borderBottom: `1px solid ${p.line}`,
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      fontFamily: AN_TOKENS.fontMono,
                      fontSize: 11,
                      color: p.inkMuted,
                      letterSpacing: 0.5,
                      paddingTop: 3,
                    }}
                  >
                    {n.date}
                  </div>
                  <div>
                    {n.badge && (
                      <div
                        style={{
                          display: 'inline-block',
                          fontFamily: AN_TOKENS.fontMono,
                          fontSize: 10,
                          color: acc,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          border: `1px solid ${acc}33`,
                          borderRadius: 3,
                          marginBottom: 8,
                        }}
                      >
                        {n.badge}
                      </div>
                    )}
                    <div
                      style={{
                        fontFamily: AN_TOKENS.fontSans,
                        fontSize: 14,
                        color: p.ink,
                        lineHeight: 1.5,
                        textWrap: 'pretty',
                      }}
                    >
                      {n.text}
                    </div>
                  </div>
                </div>
              )
              if (n.url) {
                return (
                  <a
                    key={`${n.date}-${i}`}
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    {inner}
                  </a>
                )
              }
              return <div key={`${n.date}-${i}`}>{inner}</div>
            })}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link
              href="/news"
              style={{
                fontFamily: AN_TOKENS.fontSans,
                fontSize: 13,
                fontWeight: 600,
                color: acc,
                letterSpacing: 0.2,
                textDecoration: 'none',
              }}
            >
              {lang === 'ko' ? '모든 소식 보기 →' : 'View all news →'}
            </Link>
          </div>
        </div>

        {/* Featured publications column */}
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
            § 03 · {lang === 'ko' ? '주요 논문' : 'Selected Publications'}
          </div>
          <h2
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(28px, 3.4vw, 40px)',
              fontWeight: 400,
              color: p.ink,
              letterSpacing: -1,
              margin: '0 0 32px',
              textWrap: 'balance',
            }}
          >
            {lang === 'ko' ? '최근 연구' : 'Recent work'}
          </h2>
          <div style={{ display: 'grid', gap: 20 }}>
            {featured.map((pub, i) => (
              <a
                key={`${pub.title}-${i}`}
                href={pub.link.url || '#'}
                target={pub.link.url ? '_blank' : undefined}
                rel={pub.link.url ? 'noopener noreferrer' : undefined}
                style={{
                  padding: '24px 28px',
                  background: cardBg,
                  border: `1px solid ${p.line}`,
                  borderRadius: 10,
                  textDecoration: 'none',
                  display: 'block',
                  color: 'inherit',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: AN_TOKENS.fontMono,
                      fontSize: 11,
                      color: acc,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}
                  >
                    {pub.journal}
                  </span>
                  <span
                    style={{
                      fontFamily: AN_TOKENS.fontMono,
                      fontSize: 11,
                      color: p.inkMuted,
                    }}
                  >
                    {pub.year}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: AN_TOKENS.fontSerif,
                    fontSize: 18,
                    fontWeight: 400,
                    color: p.ink,
                    lineHeight: 1.3,
                    letterSpacing: -0.2,
                    margin: '0 0 10px',
                    textWrap: 'balance',
                  }}
                >
                  {pub.title}
                </h3>
                <div
                  style={{
                    fontFamily: AN_TOKENS.fontSans,
                    fontSize: 12.5,
                    color: p.inkSoft,
                  }}
                >
                  {pub.authors}
                </div>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link
              href="/publications"
              style={{
                fontFamily: AN_TOKENS.fontSans,
                fontSize: 13,
                fontWeight: 600,
                color: acc,
                letterSpacing: 0.2,
                textDecoration: 'none',
              }}
            >
              {lang === 'ko' ? '모든 논문 보기 →' : 'View all publications →'}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .news-pubs-grid {
          grid-template-columns: 5fr 7fr;
        }
        @media (max-width: 1024px) {
          .news-pubs-grid {
            grid-template-columns: 1fr;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  )
}
