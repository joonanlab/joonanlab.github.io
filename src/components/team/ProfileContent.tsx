'use client'

import { motion } from 'framer-motion'
import type { MemberProfile, Publication, AlumniMember, FundingItem, ActivitiesData, OutreachData } from '@/lib/data'

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

function highlightFirstAuthor(authors: string, profileName: string): string {
  const lastName = profileName.split(' ').pop() || ''
  // Try to highlight "An JY" or similar patterns
  const pattern = new RegExp(`(${lastName}\\s+\\w+)`, 'g')
  return authors.replace(pattern, '<span class="first-author">$1</span>')
}

export function ProfileContent({
  profile,
  publications,
  isCurrentMember,
  alumniEntry,
  funding,
  activities,
  outreach,
}: {
  profile: MemberProfile
  publications: Publication[]
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

      {/* Bio */}
      {profile.bio_html && (
        <motion.div
          className="bio-content mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          dangerouslySetInnerHTML={{ __html: profile.bio_html }}
        />
      )}

      {/* Funding (PI only) */}
      {funding && funding.length > 0 && (
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
            <span className="en-only">Funding</span>
            <span className="ko-only">연구비 지원</span>
          </h2>
          <div className="space-y-3">
            {funding.map((f, i) => (
              <div key={i} className="pub-card">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`badge ${f.role === 'PI' ? 'badge-accent' : 'badge-gold'}`}
                  >
                    {f.role}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {f.years}
                  </span>
                </div>
                <p className="text-base" style={{ color: 'var(--text-primary)' }}>
                  <span className="en-only">{f.title_en}</span>
                  <span className="ko-only">{f.title_ko}</span>
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  <span className="en-only">{f.source_en}</span>
                  <span className="ko-only">{f.source_ko}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Activities (PI only) */}
      {activities && (
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
            <span className="en-only">Conference Talks</span>
            <span className="ko-only">학회 발표</span>
          </h2>
          <div className="space-y-2">
            {activities.conferences.slice(0, 10).map((a, i) => (
              <div key={i} className="flex gap-3 text-base py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="shrink-0" style={{ color: 'var(--text-muted)', minWidth: '80px' }}>
                  {a.date}
                </span>
                <div>
                  <p style={{ color: 'var(--text-primary)' }}>{a.title}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{a.event}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: 'var(--accent)' }}>
            <span className="en-only">Invited Seminars</span>
            <span className="ko-only">초청 세미나</span>
          </h2>
          <div className="space-y-2">
            {activities.seminars.slice(0, 10).map((a, i) => (
              <div key={i} className="flex gap-3 text-base py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="shrink-0" style={{ color: 'var(--text-muted)', minWidth: '80px' }}>
                  {a.date}
                </span>
                <div>
                  <p style={{ color: 'var(--text-primary)' }}>{a.title}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{a.event}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Outreach (PI only) */}
      {outreach && (
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
            <span className="en-only">Public Engagement</span>
            <span className="ko-only">대중 참여</span>
          </h2>
          <div className="space-y-2">
            {outreach.outreach.map((a, i) => (
              <div key={i} className="flex gap-3 text-base py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="shrink-0" style={{ color: 'var(--text-muted)', minWidth: '80px' }}>
                  {a.date}
                </span>
                <div>
                  <p style={{ color: 'var(--text-primary)' }}>{a.title}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{a.event}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: 'var(--accent-gold)' }}>
            <span className="en-only">Education Workshops</span>
            <span className="ko-only">교육 워크숍</span>
          </h2>
          <div className="space-y-2">
            {outreach.workshops.map((a, i) => (
              <div key={i} className="flex gap-3 text-base py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="shrink-0" style={{ color: 'var(--text-muted)', minWidth: '80px' }}>
                  {a.date}
                </span>
                <div>
                  <p style={{ color: 'var(--text-primary)' }}>{a.title}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{a.event}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
            <span className="en-only">Publications</span>
            <span className="ko-only">논문</span>
            <span className="text-base font-normal ml-2" style={{ color: 'var(--text-muted)' }}>
              ({publications.length})
            </span>
          </h2>
          <div className="space-y-3">
            {publications.map((pub, i) => (
              <div key={i} className={`pub-card ${pub.highlight ? 'highlighted' : ''}`}>
                <p className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>
                  {pub.title}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--text-secondary)' }}
                  dangerouslySetInnerHTML={{
                    __html: highlightFirstAuthor(pub.authors, profile.name),
                  }}
                />
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {pub.journal} ({pub.year})
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
