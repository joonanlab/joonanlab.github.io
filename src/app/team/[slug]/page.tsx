import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllMemberSlugs, getMemberProfile, getPublications, getTeam, getAlumni, getFunding, getActivities, getOutreach } from '@/lib/data'
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

  const allPubs = getPublications()
  const team = getTeam()
  const alumni = getAlumni()

  const isCurrentMember = team.some((m) => m.url === slug)
  const alumniEntry = alumni.find((a) => a.url === slug)

  // Match publications by full name or abbreviated name (e.g., "Lee H" for "Hyeji Lee")
  const nameParts = profile.name.split(' ')
  const lastName = nameParts.pop() || ''
  const firstName = nameParts.join(' ')
  const firstInitial = firstName ? firstName[0].toUpperCase() : ''
  const abbrevName = firstInitial ? `${lastName} ${firstInitial}` : lastName

  const memberPubs = allPubs.filter((p) => {
    // Check full name in authors_full (e.g., "Lee Hyeji")
    if (p.authors_full.includes(`${lastName} ${firstName}`)) return true
    if (p.authors_full.includes(profile.name)) return true
    // Check abbreviated name with word boundary (e.g., "Lee H," or "Lee H✻")
    const abbrevPattern = new RegExp(`${lastName}\\s+${firstInitial}[A-Z]*[✻†*]?\\b`)
    if (abbrevPattern.test(p.authors)) return true
    return false
  })

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
          publications={isPI ? [] : memberPubs}
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
