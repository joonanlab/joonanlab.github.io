'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Publication } from '@/lib/data'

export function FeaturedPubs({ publications }: { publications: Publication[] }) {
  const featured = publications.filter((p) => p.highlight === 1).slice(0, 4)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          className="font-bold tracking-tight text-2xl"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="en-only">Featured Publications</span>
          <span className="ko-only">주요 논문</span>
        </motion.h2>
        <Link
          href="/publications"
          className="text-base hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          <span className="en-only">View All →</span>
          <span className="ko-only">전체 보기 →</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featured.map((pub, i) => (
          <motion.a
            key={i}
            href={pub.link.url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card block shimmer-line"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            {pub.image && (
              <div className="mb-3 rounded-lg overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                <img
                  src={`/images/pubpic/${pub.image}`}
                  alt=""
                  className="w-full h-36 object-contain"
                  loading="lazy"
                />
              </div>
            )}
            <p
              className="font-semibold text-base mb-1 line-clamp-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {pub.title}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {pub.link.display}
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
