import type { Metadata } from 'next'
import { getAlumni } from '@/lib/data'
import { AlumniList } from '@/components/team/AlumniList'
import { L } from '@/components/site/L'
import { PageHeader } from '@/components/site/PageHeader'

export const metadata: Metadata = {
  title: 'Alumni',
  description: 'Alumni of AN Lab at Korea University.',
}

export default function AlumniPage() {
  const alumni = getAlumni()

  return (
    <>
      <PageHeader
        title={<L en="Alumni" ko="졸업생" />}
      />
      <div className="container" style={{ paddingBottom: 'clamp(40px, 5vw, 72px)' }}>
        <AlumniList alumni={alumni} />
      </div>
    </>
  )
}
