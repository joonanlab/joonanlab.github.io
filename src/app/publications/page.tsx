import type { Metadata } from 'next'
import { getPublications } from '@/lib/data'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BilingualText } from '@/components/shared/BilingualText'
import { PublicationsClient } from '@/components/publications/PublicationsClient'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Research publications from An Lab at Korea University.',
}

export default function PublicationsPage() {
  const publications = getPublications()

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Publications' }]} />
        <BilingualText
          en="Publications"
          ko="논문"
          as="h1"
          className="section-header mb-8"
        />
        <PublicationsClient publications={publications} />
      </div>
    </div>
  )
}
