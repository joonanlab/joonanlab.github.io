import type { Metadata } from 'next'
import Link from 'next/link'
import { getTeam } from '@/lib/data'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BilingualText } from '@/components/shared/BilingualText'
import { TeamGrid } from '@/components/team/TeamGrid'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the members of An Lab at Korea University.',
}

export default function TeamPage() {
  const team = getTeam()

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Team' }]} />
        <BilingualText
          en="Our Team"
          ko="연구팀"
          as="h1"
          className="section-header mb-2"
        />
        <p className="mb-8 text-lg" style={{ color: 'var(--text-secondary)' }}>
          <span className="en-only">Meet the members of An Lab at Korea University.</span>
          <span className="ko-only">고려대학교 An Lab의 연구원들을 소개합니다.</span>
        </p>
        <TeamGrid team={team} />
        <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
          <Link
            href="/alumni"
            className="pill inline-flex items-center gap-2"
          >
            <span className="en-only">View Alumni &rarr;</span>
            <span className="ko-only">졸업생 보기 &rarr;</span>
          </Link>
          <a
            href="https://www.notion.so/joonanlab/Moments-1833dc859c414f0185681e3667722130"
            target="_blank"
            rel="noopener noreferrer"
            className="pill inline-flex items-center gap-2"
          >
            <span className="en-only">Moments &rarr;</span>
            <span className="ko-only">일상 &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
