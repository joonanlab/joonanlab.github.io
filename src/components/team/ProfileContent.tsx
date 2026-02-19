'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { MemberProfile, AlumniMember, FundingItem, ActivitiesData, OutreachData } from '@/lib/data'

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="pill text-sm"
      aria-label={label}
    >
      {children}
    </a>
  )
}

export function ProfileContent({
  profile,
  isCurrentMember,
  alumniEntry,
  funding,
  activities,
  outreach,
}: {
  profile: MemberProfile
  isCurrentMember: boolean
  alumniEntry: AlumniMember | null
  funding: FundingItem[] | null
  activities: ActivitiesData | null
  outreach: OutreachData | null
}) {
  return (
    <div>
      {/* Profile Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-36 h-36 rounded-full overflow-hidden shrink-0"
          style={{ background: 'var(--bg-tertiary)' }}
        >
          <img
            src={`/images/teampic/${profile.photo}`}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {profile.name}
            {profile.name_ko && (
              <span className="ml-2 text-xl font-normal" style={{ color: 'var(--text-muted)' }}>
                {profile.name_ko}
              </span>
            )}
          </h1>
          {profile.position && (
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              <span className="en-only">{profile.position}</span>
              {profile.position_ko && <span className="ko-only">{profile.position_ko}</span>}
            </p>
          )}

          {/* Alumni info */}
          {alumniEntry && (
            <div className="mt-2 space-y-1 text-base" style={{ color: 'var(--text-muted)' }}>
              {alumniEntry.thesis && (
                <p>
                  <span className="en-only">Thesis: </span>
                  <span className="ko-only">논문: </span>
                  <em>{alumniEntry.thesis}</em>
                </p>
              )}
              {alumniEntry.current && (
                <p>
                  <span className="en-only">Current: </span>
                  <span className="ko-only">현재: </span>
                  {alumniEntry.current}
                </p>
              )}
            </div>
          )}

          {/* Note from PI */}
          {(profile.note || profile.note_ko) && (
            <div
              className="mt-3 p-3 rounded-lg text-base"
              style={{ background: 'var(--accent-subtle)', color: 'var(--text-secondary)' }}
            >
              {profile.note && <span className="en-only">{profile.note}</span>}
              {profile.note_ko && <span className="ko-only">{profile.note_ko}</span>}
            </div>
          )}

          {/* Social links */}
          <div className="flex flex-wrap gap-2 mt-4">
            {profile.email && (
              <SocialLink href={`mailto:${profile.email}`} label="Email">
                Email
              </SocialLink>
            )}
            {profile.scholar && (
              <SocialLink
                href={`https://scholar.google.com/citations?user=${profile.scholar}`}
                label="Google Scholar"
              >
                Scholar
              </SocialLink>
            )}
            {profile.orcid && (
              <SocialLink href={`https://orcid.org/${profile.orcid}`} label="ORCID">
                ORCID
              </SocialLink>
            )}
            {profile.github && (
              <SocialLink href={`https://github.com/${profile.github}`} label="GitHub">
                GitHub
              </SocialLink>
            )}
            {profile.twitter && (
              <SocialLink href={`https://twitter.com/${profile.twitter}`} label="Twitter">
                Twitter
              </SocialLink>
            )}
            {profile.linkedin && (
              <SocialLink
                href={`https://www.linkedin.com/in/${profile.linkedin}`}
                label="LinkedIn"
              >
                LinkedIn
              </SocialLink>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bio with auto-processed publication filters */}
      {profile.bio_html && (
        <BioWithPubFilters bioHtml={profile.bio_html} />
      )}

      {/* Funding (PI only) — Summary + Link */}
      {funding && funding.length > 0 && (
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            <span className="en-only">Funding</span>
            <span className="ko-only">연구비 지원</span>
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            <span className="en-only">
              {funding.filter(f => f.role === 'PI').length} grants as PI and {funding.filter(f => f.role !== 'PI').length} grants as CI (2018–present).
            </span>
            <span className="ko-only">
              PI {funding.filter(f => f.role === 'PI').length}건, CI {funding.filter(f => f.role !== 'PI').length}건 (2018–현재).
            </span>
          </p>
          <a href="/team/joonan-funding" className="pill" style={{ color: 'var(--accent)' }}>
            <span className="en-only">View all funding →</span>
            <span className="ko-only">전체 연구비 보기 →</span>
          </a>
        </motion.section>
      )}

      {/* Outreach (PI only) — Summary + Link */}
      {outreach && (
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            <span className="en-only">Public Engagement &amp; Education Workshops</span>
            <span className="ko-only">대중 참여 &amp; 교육 워크숍</span>
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            <span className="en-only">
              {outreach.outreach.length} public engagement activities and {outreach.workshops.length} education workshops (2019–present).
            </span>
            <span className="ko-only">
              대중 참여 {outreach.outreach.length}건, 교육 워크숍 {outreach.workshops.length}건 (2019–현재).
            </span>
          </p>
          <a href="/team/joonan-outreach" className="pill" style={{ color: 'var(--accent)' }}>
            <span className="en-only">View all outreach &amp; education →</span>
            <span className="ko-only">전체 보기 →</span>
          </a>
        </motion.section>
      )}

      {/* Activities (PI only) — Summary + Link */}
      {activities && (
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            <span className="en-only">Conference Talks &amp; Invited Seminars</span>
            <span className="ko-only">학회 발표 &amp; 초청 세미나</span>
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            <span className="en-only">
              {activities.conferences.length} conference talks and {activities.seminars.length} invited seminars (2019–present).
            </span>
            <span className="ko-only">
              학회 발표 {activities.conferences.length}건, 초청 세미나 {activities.seminars.length}건 (2019–현재).
            </span>
          </p>
          <a href="/team/joonan-activities" className="pill" style={{ color: 'var(--accent)' }}>
            <span className="en-only">View all activities →</span>
            <span className="ko-only">전체 활동 보기 →</span>
          </a>
        </motion.section>
      )}

      {/* Publications are handled inside BioWithPubFilters from bio_html */}
    </div>
  )
}

/** Parse bio_html into: before-pubs, pub heading, pub items, after-pubs */
function splitBioHtml(bioHtml: string) {
  // Find the Publications heading (h2 or h3)
  const headingMatch = bioHtml.match(/<(h[23])[^>]*>(?:<span[^>]*>)?(?:Publications|논문)[\s\S]*?<\/\1>/i)
  if (!headingMatch) return { before: bioHtml, pubHeading: '', pubItems: [] as string[], after: '' }

  const headingIdx = bioHtml.indexOf(headingMatch[0])
  const before = bioHtml.slice(0, headingIdx)
  const afterHeading = bioHtml.slice(headingIdx + headingMatch[0].length)

  // Find the <ul>...</ul> right after the heading
  const ulMatch = afterHeading.match(/^\s*<ul>([\s\S]*?)<\/ul>/)
  if (!ulMatch) return { before: bioHtml, pubHeading: '', pubItems: [], after: '' }

  const after = afterHeading.slice(ulMatch[0].length)

  // Extract individual <li> items
  const liMatches = ulMatch[1].match(/<li>[\s\S]*?<\/li>/g) || []
  const pubItems = liMatches.map((li) => li.replace(/^<li>/, '').replace(/<\/li>$/, ''))

  return { before, pubHeading: headingMatch[0], pubItems, after }
}

function classifyPub(html: string): 'first' | 'co' {
  // First author: <strong> at start, or ✻ right after name in <strong>
  if (/^\s*<strong[\s>]/i.test(html) || /<strong[^>]*>[^<]*\u273B/i.test(html)) return 'first'
  return 'co'
}

/** Renders bio_html with publication filter buttons between heading and list */
function BioWithPubFilters({ bioHtml }: { bioHtml: string }) {
  const [filter, setFilter] = useState<'all' | 'first' | 'co'>('all')

  const { before, pubHeading, pubItems, after } = splitBioHtml(bioHtml)

  const classified = pubItems.map((html) => ({ html, role: classifyPub(html) }))
  const firstCount = classified.filter((p) => p.role === 'first').length
  const coCount = classified.filter((p) => p.role === 'co').length
  const hasPubs = pubItems.length > 0

  const filtered = classified.filter((p) => {
    if (filter === 'first') return p.role === 'first'
    if (filter === 'co') return p.role === 'co'
    return true
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Bio content before publications */}
      <div className="bio-content mb-6" dangerouslySetInnerHTML={{ __html: before }} />

      {/* Publications section */}
      {hasPubs && (
        <div className="mb-6">
          <h3 style={{ color: 'var(--accent)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <span className="en-only">Publications</span>
            <span className="ko-only">논문</span>
          </h3>

          {/* Filter buttons */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <button className={`pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              <span className="en-only">All</span><span className="ko-only">전체</span>
              <span className="ml-1">({pubItems.length})</span>
            </button>
            <button className={`pill ${filter === 'first' ? 'active' : ''}`} onClick={() => setFilter('first')}>
              <span className="en-only">First Author</span><span className="ko-only">1저자</span>
              <span className="ml-1">({firstCount})</span>
            </button>
            <button className={`pill ${filter === 'co' ? 'active' : ''}`} onClick={() => setFilter('co')}>
              <span className="en-only">Co-author</span><span className="ko-only">공저자</span>
              <span className="ml-1">({coCount})</span>
            </button>
          </div>

          {/* Publication list */}
          <ul className="pub-list">
            {filtered.map((pub, i) => (
              <li
                key={i}
                className={pub.role === 'first' ? 'first-author-item' : 'co-author-item'}
                dangerouslySetInnerHTML={{ __html: pub.html }}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Bio content after publications */}
      {after && <div className="bio-content mb-6" dangerouslySetInnerHTML={{ __html: after }} />}
    </motion.div>
  )
}
