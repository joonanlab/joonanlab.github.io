import type { Metadata } from 'next'
import { getNews } from '@/lib/data'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BilingualText } from '@/components/shared/BilingualText'
import { NewsTimeline } from '@/components/news/NewsTimeline'

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news and announcements from An Lab.',
}

export default function NewsPage() {
  const news = getNews()

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News' }]} />
        <BilingualText
          en="News"
          ko="소식"
          as="h1"
          className="section-header mb-8"
        />
        <NewsTimeline news={news} />
      </div>
    </div>
  )
}
