import type { Metadata } from 'next'
import { getNews } from '@/lib/data'
import { NewsTimeline } from '@/components/news/NewsTimeline'
import { L } from '@/components/site/L'
import { PageHeader } from '@/components/site/PageHeader'

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news and announcements from AN Lab.',
}

export default function NewsPage() {
  const news = getNews()

  return (
    <>
      <PageHeader
        title={<L en="News" ko="소식" />}
      />
      <NewsTimeline news={news} />
    </>
  )
}
