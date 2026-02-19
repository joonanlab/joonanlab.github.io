'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { NewsItem } from '@/lib/data'

function extractYear(dateStr: string): string {
  const match = dateStr.match(/\d{4}/)
  return match ? match[0] : ''
}

export function NewsTimeline({ news }: { news: NewsItem[] }) {
  const [selectedYear, setSelectedYear] = useState<string>('all')

  // Get unique years sorted descending
  const years = useMemo(() => {
    const set = new Set<string>()
    news.forEach((item) => {
      const y = extractYear(item.date)
      if (y) set.add(y)
    })
    return Array.from(set).sort((a, b) => Number(b) - Number(a))
  }, [news])

  // Filter news by selected year
  const filtered = selectedYear === 'all'
    ? news
    : news.filter((item) => extractYear(item.date) === selectedYear)

  // Group filtered news by year
  const grouped = useMemo(() => {
    const map = new Map<string, NewsItem[]>()
    filtered.forEach((item) => {
      const y = extractYear(item.date)
      if (!map.has(y)) map.set(y, [])
      map.get(y)!.push(item)
    })
    return Array.from(map.entries())
  }, [filtered])

  return (
    <div>
      {/* Year filter pills */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <button
          className={`pill ${selectedYear === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedYear('all')}
        >
          <span className="en-only">All</span>
          <span className="ko-only">전체</span>
        </button>
        {years.map((year) => (
          <button
            key={year}
            className={`pill ${selectedYear === year ? 'active' : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="news-timeline">
        {grouped.map(([year, items], gi) => (
          <div key={year} className="relative">
            {/* Year heading with large dot */}
            <motion.div
              className="news-year-heading"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
            >
              <h2 style={{ color: 'var(--accent-gold)', fontSize: '1.75rem', fontWeight: 700 }}>
                {year}
              </h2>
            </motion.div>

            {/* News items */}
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="news-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min((gi * items.length + i) * 0.03, 0.6) }}
              >
                <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                  {item.date}
                </p>
                <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                  <span
                    className="en-only"
                    dangerouslySetInnerHTML={{ __html: item.headline }}
                  />
                  <span
                    className="ko-only"
                    dangerouslySetInnerHTML={{ __html: item.headline_ko }}
                  />
                </p>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
