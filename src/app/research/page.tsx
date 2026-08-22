import type { Metadata } from 'next'
import { getResearchAreas } from '@/lib/data'
import { LabHeader } from '@/components/redesign/LabHeader'
import { LabFooter } from '@/components/redesign/LabFooter'
import { ResearchPageClient } from '@/components/redesign/ResearchPageClient'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research at AN Lab — deep learning for noncoding genomes, AI-driven virtual cells, autism genetics in East Asian cohorts, and integrative multi-omics.',
}

export default function ResearchPage() {
  const areas = getResearchAreas()

  return (
    <div style={{ background: 'var(--an-surface-bg)', minHeight: '100vh' }}>
      <LabHeader />
      <ResearchPageClient areas={areas} />
      <LabFooter />
    </div>
  )
}
