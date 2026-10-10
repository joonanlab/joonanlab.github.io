import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllMemberSlugs, getMemberProfile, getTeam, getAlumni, getFunding, getActivities, getOutreach } from '@/lib/data'
import { ProfileContent } from '@/components/team/ProfileContent'
import { BackLink } from '@/components/site/BackLink'
import { L } from '@/components/site/L'

export function generateStaticParams() {
  return getAllMemberSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const profile = getMemberProfile(slug)
  if (!profile) return { title: 'Not Found' }
  const isCurrentMember = getTeam().some((member) => member.url === slug)
  const alumniEntry = getAlumni().find((member) => member.url === slug)
  const description = isCurrentMember
    ? `${profile.name} - ${profile.position || 'Member'} at AN Lab, Korea University`
    : `${profile.name} - ${alumniEntry?.current || profile.position || 'Alumni'}; AN Lab alumni profile.`
  return {
    title: profile.name,
    description,
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
    <>
      <div className="doc-page">
        <div className="container-text">
          {alumniEntry && !isCurrentMember ? (
            <BackLink href="/alumni">
              <L en="Alumni" ko="졸업생" />
            </BackLink>
          ) : (
            <BackLink href="/team">
              <L en="Team" ko="구성원" />
            </BackLink>
          )}

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
    </>
  )
}
