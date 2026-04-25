import { getNews, getPublications, getResearchAreas } from '@/lib/data'
import { LabHeader } from '@/components/redesign/LabHeader'
import { LabFooter } from '@/components/redesign/LabFooter'
import { ConstellationHero } from '@/components/redesign/ConstellationHero'
import { ResearchBento } from '@/components/redesign/ResearchBento'
import { NewsAndPubs } from '@/components/redesign/NewsAndPubs'
import { CTAJoin } from '@/components/redesign/CTAJoin'
import { AN_TOKENS } from '@/lib/redesign-tokens'

export default function HomePage() {
  const news = getNews()
  const publications = getPublications()
  const researchAreas = getResearchAreas()

  return (
    <div style={{ background: 'var(--an-surface-bg)', minHeight: '100vh' }}>
      <LabHeader />
      <ConstellationHero />
      <ResearchBento areas={researchAreas} accent={AN_TOKENS.gold} />
      <NewsAndPubs news={news} publications={publications} accent={AN_TOKENS.red} />
      <CTAJoin accent={AN_TOKENS.gold} />
      <LabFooter />
    </div>
  )
}
