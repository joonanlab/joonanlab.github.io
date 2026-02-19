import type { Metadata } from 'next'
import Link from 'next/link'
import { getAlumni } from '@/lib/data'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BilingualText } from '@/components/shared/BilingualText'
import { AlumniList } from '@/components/team/AlumniList'

export const metadata: Metadata = {
  title: 'Alumni',
  description: 'Alumni of An Lab at Korea University.',
}

export default function AlumniPage() {
  const alumni = getAlumni()

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Alumni' }]} />
        <BilingualText
          en="Alumni"
          ko="졸업생"
          as="h1"
          className="section-header mb-8"
        />
        <AlumniList alumni={alumni} />
      </div>
    </div>
  )
}
