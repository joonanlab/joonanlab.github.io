import { getNews, getPublications } from '@/lib/data'
import { HeroSection } from '@/components/home/HeroSection'
import { ResearchHighlights } from '@/components/home/ResearchHighlights'
import { NewsAndPubs } from '@/components/home/NewsAndPubs'
import { FundingLogos } from '@/components/home/FundingLogos'

export default function HomePage() {
  const news = getNews()
  const publications = getPublications()

  return (
    <div className="pt-16">
      <HeroSection />
      <ResearchHighlights />
      <NewsAndPubs news={news} publications={publications} />
      <FundingLogos />
    </div>
  )
}
