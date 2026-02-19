'use client'

import type { NewsItem, Publication } from '@/lib/data'
import { LatestNews } from './LatestNews'
import { FeaturedPubs } from './FeaturedPubs'

export function NewsAndPubs({
  news,
  publications,
}: {
  news: NewsItem[]
  publications: Publication[]
}) {
  return (
    <section className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* News: 5/12 width */}
          <div className="lg:col-span-5">
            <LatestNews news={news} />
          </div>
          {/* Publications: 7/12 width */}
          <div className="lg:col-span-7">
            <FeaturedPubs publications={publications} />
          </div>
        </div>
      </div>
    </section>
  )
}
