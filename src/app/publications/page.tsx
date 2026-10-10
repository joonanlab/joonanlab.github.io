import type { Metadata } from 'next'
import { getPublications } from '@/lib/data'
import { L } from '@/components/site/L'
import { PageHeader } from '@/components/site/PageHeader'
import { PublicationList } from '@/components/publications/PublicationList'

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Research publications from AN Lab at Korea University — autism genetics, noncoding genome, multi-omics, and methods.',
}

export default function PublicationsPage() {
  const publications = getPublications()
  // Newest first; preserve input order within a year as the json source defines it.
  const sorted = [...publications].sort((a, b) => b.year - a.year)

  return (
    <>
      <PageHeader
        title={<L en="Publications" ko="논문" />}
      />
      <PublicationList publications={sorted} />
    </>
  )
}
