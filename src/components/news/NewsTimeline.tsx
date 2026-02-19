'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { NewsItem } from '@/lib/data'

export function NewsTimeline({ news }: { news: NewsItem[] }) {
  const [showCount, setShowCount] = useState(20)
  const visible = news.slice(0, showCount)

  return (
    <div>
      <div className="space-y-4">
        {visible.map((item, i) => (
          <motion.div
            key={i}
            className="flex gap-4 py-3"
            style={{ borderBottom: '1px solid var(--border)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.6) }}
          >
            <span
              className="text-base whitespace-nowrap shrink-0"
              style={{ color: 'var(--text-muted)', minWidth: '130px' }}
            >
              {item.date}
            </span>
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

      {showCount < news.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowCount((c) => c + 20)}
            className="pill"
          >
            <span className="en-only">Load More</span>
            <span className="ko-only">더 보기</span>
          </button>
        </div>
      )}
    </div>
  )
}
