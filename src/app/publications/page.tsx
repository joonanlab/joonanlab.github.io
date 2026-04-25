import type { Metadata } from 'next'
import { getPublications } from '@/lib/data'
import { LabHeader } from '@/components/redesign/LabHeader'
import { LabFooter } from '@/components/redesign/LabFooter'
import { PublicationsPageClient } from '@/components/redesign/PublicationsPageClient'
import { AN_TOKENS } from '@/lib/redesign-tokens'

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Research publications from An Lab at Korea University — autism genetics, noncoding genome, multi-omics, and methods.',
}

export default function PublicationsPage() {
  const publications = getPublications()
  // Newest first; preserve input order within a year as the json source defines it.
  const sorted = [...publications].sort((a, b) => b.year - a.year)

  return (
    <div style={{ background: AN_TOKENS.lightBg, minHeight: '100vh' }}>
      <LabHeader theme="light" />
      <PublicationsPageClient publications={sorted} />
      <LabFooter theme="light" />
    </div>
  )
}
