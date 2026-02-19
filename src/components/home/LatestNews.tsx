'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { NewsItem } from '@/lib/data'

export function LatestNews({ news }: { news: NewsItem[] }) {
  const latest = news.slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          className="font-bold tracking-tight text-2xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="en-only">Latest News</span>
          <span className="ko-only">최근 소식</span>
        </motion.h2>
        <Link
          href="/news"
          className="text-base hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          <span className="en-only">View All →</span>
          <span className="ko-only">전체 보기 →</span>
        </Link>
      </div>
      <div className="space-y-0">
        {latest.map((item, i) => (
          <motion.div
            key={i}
            className="news-dot py-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span
              className="text-sm block mb-1"
              style={{ color: 'var(--text-muted)' }}
            >
              {item.date}
            </span>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
    </div>
  )
}
