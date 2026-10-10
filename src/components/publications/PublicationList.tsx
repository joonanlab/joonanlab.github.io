'use client'

import { useMemo, useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import type { Publication } from '@/lib/data'
import { Authors } from '@/components/home/PubRow'
import { L } from '@/components/site/L'
import { TOPIC_LABEL, TOPIC_ORDER, deriveTopics, type Topic } from './topics'

type Filter = 'All' | 'Selected' | Topic

const TYPE_LABEL: Partial<Record<Publication['type'], { en: string; ko: string }>> = {
  preprint: { en: 'Preprint', ko: '프리프린트' },
  conference: { en: 'Workshop / conference', ko: '학회 발표' },
}

export function PublicationList({ publications }: { publications: Publication[] }) {
  const { lang } = useLang()
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')

  const enriched = useMemo(
    () => publications.map((pub) => ({ pub, topics: deriveTopics(pub) })),
    [publications],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return enriched.filter(({ pub, topics }) => {
      if (filter === 'Selected' && pub.highlight !== 1) return false
      if (filter !== 'All' && filter !== 'Selected' && !topics.includes(filter)) return false
      if (!q) return true
      return `${pub.title} ${pub.authors} ${pub.journal} ${pub.year}`.toLowerCase().includes(q)
    })
  }, [enriched, filter, query])

  const byYear = useMemo(() => {
    const out = new Map<number, typeof filtered>()
    for (const item of filtered) {
      const list = out.get(item.pub.year) ?? []
      list.push(item)
      out.set(item.pub.year, list)
    }
    return [...out.entries()].sort((a, b) => b[0] - a[0])
  }, [filtered])

  const filters: Filter[] = ['All', 'Selected', ...TOPIC_ORDER]
  const filterLabel = (f: Filter) => {
    if (f === 'All') return { en: 'All', ko: '전체' }
    if (f === 'Selected') return { en: 'Selected', ko: '주요 논문' }
    return TOPIC_LABEL[f]
  }

  return (
    <>
      <div className="pub-toolbar">
        <div className="container pub-toolbar-inner">
          <div className="chip-row" role="group" aria-label={lang === 'ko' ? '주제 필터' : 'Filter by topic'}>
            {filters.map((f) => {
              const label = filterLabel(f)
              return (
                <button
                  key={f}
                  type="button"
                  className="chip"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  <L en={label.en} ko={label.ko} />
                </button>
              )
            })}
          </div>
          <label className="search-field">
            <span className="sr-only">{lang === 'ko' ? '논문 검색' : 'Search publications'}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'ko' ? '제목, 저자, 저널 검색' : 'Search title, author, journal'}
            />
          </label>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 'clamp(40px, 5vw, 72px)' }}>

        {byYear.length === 0 && (
          <p className="t-body" style={{ padding: '64px 0' }}>
            <L en="No publications match this filter." ko="조건에 맞는 논문이 없습니다." />
          </p>
        )}

        {byYear.map(([year, items]) => (
          <section key={year} className="pub-year" aria-label={String(year)}>
            <h2 className="pub-year-label">{year}</h2>
            <ul className="rule-list">
              {items.map(({ pub, topics }) => {
                const typeLabel = TYPE_LABEL[pub.type]
                const visibleTopics = topics.filter((t) => t !== 'Other' && t !== 'Review')
                const title = <span className="pub-title row-title">{pub.title}</span>
                return (
                  <li key={`${pub.title}-${pub.year}`} className="pub-entry">
                    <div className="pub-row" style={{ padding: 0 }}>
                      <span className="pub-venue">
                        {pub.journal}
                        {typeLabel && (
                          <>
                            {' ('}
                            <L en={typeLabel.en} ko={typeLabel.ko} />
                            {')'}
                          </>
                        )}
                      </span>
                      {pub.link.url ? (
                        <a href={pub.link.url} target="_blank" rel="noopener noreferrer" className="row-link">
                          {title}
                        </a>
                      ) : (
                        title
                      )}
                      <span className="pub-authors">
                        <Authors authors={pub.authors} />
                      </span>
                    </div>
                    {(visibleTopics.length > 0 || pub.highlight === 1) && (
                      <div className="pub-entry-side">
                        {pub.highlight === 1 && (
                          <span className="pub-flag">
                            <L en="Selected" ko="주요 논문" />
                          </span>
                        )}
                        <span className="t-meta">
                          <L
                            en={visibleTopics.map((t) => TOPIC_LABEL[t].en).join(', ')}
                            ko={visibleTopics.map((t) => TOPIC_LABEL[t].ko).join(', ')}
                          />
                        </span>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
