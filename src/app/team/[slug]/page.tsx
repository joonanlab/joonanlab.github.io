import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllMemberSlugs, getMemberProfile, getTeam, getAlumni, getFunding, getActivities, getOutreach } from '@/lib/data'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { ProfileContent } from '@/components/team/ProfileContent'

export function generateStaticParams() {
  return getAllMemberSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const profile = getMemberProfile(slug)
  if (!profile) return { title: 'Not Found' }
  return {
    title: profile.name,
    description: `${profile.name} - ${profile.position || 'Member'} at An Lab, Korea University`,
  }
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = getMemberProfile(slug)
  if (!profile) notFound()

  const team = getTeam()
  const alumni = getAlumni()

  const isCurrentMember = team.some((m) => m.url === slug)
  const alumniEntry = alumni.find((a) => a.url === slug)

  // For PI, strip Funding/Outreach/Activities sections from bio_html (handled by component)
  const isPI = slug === 'joonan'
  if (isPI && profile.bio_html) {
    // Remove sections: Funding, Public Engagement, Conference Talks (and everything after)
    profile.bio_html = profile.bio_html.replace(
      /<h2[^>]*>(?:<span[^>]*>)?(?:Funding|연구비)[\s\S]*$/,
      ''
    )
  }
  const funding = isPI ? getFunding() : null
  const activities = isPI ? getActivities() : null
  const outreach = isPI ? getOutreach() : null

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Team', href: '/team' },
            { label: profile.name },
          ]}
        />

        <ProfileContent
          profile={profile}
          isCurrentMember={isCurrentMember}
          alumniEntry={alumniEntry || null}
          funding={funding}
          activities={activities}
          outreach={outreach}
        />
      </div>
    </div>
  )
}
