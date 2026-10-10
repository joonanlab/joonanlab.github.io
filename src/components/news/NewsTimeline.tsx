'use client'

import { useMemo, useState } from 'react'
import type { NewsItem } from '@/lib/data'
import { formatDateEn, formatDateKo, yearOf } from '@/lib/format'
import { L } from '@/components/site/L'

export function NewsTimeline({ news }: { news: NewsItem[] }) {
  const [year, setYear] = useState<string>('all')

  const years = useMemo(
    () => [...new Set(news.map((n) => yearOf(n.date)).filter(Boolean))].sort((a, b) => Number(b) - Number(a)),
    [news],
  )

  const grouped = useMemo(() => {
    const map = new Map<string, NewsItem[]>()
    for (const item of news) {
      const y = yearOf(item.date)
      if (year !== 'all' && y !== year) continue
      map.set(y, [...(map.get(y) ?? []), item])
    }
    return [...map.entries()]
  }, [news, year])

  return (
    <>
      <div className="pub-toolbar">
        <div className="container">
          <div className="chip-row" role="group" aria-label="Year">
            <button type="button" className="chip" aria-pressed={year === 'all'} onClick={() => setYear('all')}>
              <L en="All" ko="전체" />
            </button>
            {years.map((y) => (
              <button key={y} type="button" className="chip" aria-pressed={year === y} onClick={() => setYear(y)}>
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 'clamp(40px, 5vw, 72px)' }}>
        {grouped.map(([y, items]) => (
          <section key={y} className="pub-year" aria-label={y}>
            <h2 className="pub-year-label">{y}</h2>
            <ul className="rule-list">
              {items.map((item, i) => (
                <li key={`${item.date}-${i}`} className="news-row" style={{ gap: 6 }}>
                  <time className="t-meta">
                    <L en={formatDateEn(item.date)} ko={formatDateKo(item.date)} />
                  </time>
                  <p className="prose-links" style={{ fontSize: '1rem', lineHeight: 1.65 }}>
                    <span className="en-only" dangerouslySetInnerHTML={{ __html: item.headline }} />
                    <span className="ko-only" dangerouslySetInnerHTML={{ __html: item.headline_ko }} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
