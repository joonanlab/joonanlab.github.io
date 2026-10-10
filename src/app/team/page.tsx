import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getMemberProfile, getTeam, type TeamMember } from '@/lib/data'
import { L } from '@/components/site/L'
import { ROLE_KO, hasRealPhoto } from '@/lib/people'
import { PageHeader } from '@/components/site/PageHeader'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the members of AN Lab at Korea University.',
}

interface RoleGroup {
  id: string
  en: string
  ko: string
  match: (info: string) => boolean
  /** Render as a plain name list instead of photos. */
  listOnly?: boolean
}

// Grouping is derived from team.json `info`; no schema change needed.
const ROLE_GROUPS: RoleGroup[] = [
  { id: 'postdoc', en: 'Postdoctoral researchers', ko: '박사후연구원', match: (i) => i.startsWith('Postdoctoral') },
  { id: 'phd', en: 'PhD students', ko: '박사과정', match: (i) => i.startsWith('PhD') },
  {
    id: 'masters',
    en: 'Master’s students',
    ko: '석사과정',
    match: (i) => i.startsWith('Masters') || i.includes('Integrated Program'),
  },
  { id: 'research-staff', en: 'Research staff', ko: '연구원', match: (i) => i === 'Bioinformatician' },
  { id: 'undergrad', en: 'Undergraduate interns', ko: '학부 인턴', match: (i) => i.startsWith('Undergraduate') },
  {
    id: 'admin',
    en: 'Administrative staff',
    ko: '행정',
    match: (i) => i === 'Administrative Staff',
    listOnly: true,
  },
]

function initials(name: string) {
  return name
    .split(/[\s-]+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
}

function MemberCard({ m }: { m: TeamMember }) {
  const fellow = m.info.match(/^(.+?)\s*\(([^)]+)\)\s*$/)
  const role = fellow ? fellow[1] : m.info
  const hasPhoto = hasRealPhoto(m.photo)

  const inner = (
    <>
      <div className="member-photo">
        {hasPhoto ? (
          <Image src={`/images/teampic/${m.photo}`} alt="" width={320} height={320} />
        ) : (
          <span className="member-initials" aria-hidden="true">
            <L en={initials(m.name)} ko={(m.name_ko || m.name).slice(0, 1)} />
          </span>
        )}
      </div>
      <div>
        <p className="member-name">
          <L en={m.name} ko={m.name_ko || m.name} />
        </p>
        <p className="member-role">
          <L en={role} ko={ROLE_KO[role] ?? role} />
          {fellow && (
            <>
              <br />
              <span className="member-fellow">{fellow[2]}</span>
            </>
          )}
        </p>
      </div>
    </>
  )

  return m.url ? (
    <Link href={`/team/${m.url}`} className="member">
      {inner}
    </Link>
  ) : (
    <div className="member">{inner}</div>
  )
}

export default function TeamPage() {
  const team = getTeam()
  const pi = team.find((m) => m.group === 0)
  const profile = pi ? getMemberProfile(pi.url) : null
  const members = team.filter((m) => m.group !== 0)

  const groups = ROLE_GROUPS.map((g) => ({ ...g, list: members.filter((m) => g.match(m.info)) })).filter(
    (g) => g.list.length > 0,
  )

  // The first two narrative paragraphs; the full CV lives on the profile page.
  const shortBio = profile?.bio_html?.match(/<p>[\s\S]*?<\/p>/g)?.slice(0, 2).join('') ?? ''

  return (
    <>
      <PageHeader
        title={<L en="Team" ko="구성원" />}
      />

      {pi && (
        <section className="team-section" aria-labelledby="pi-label">
          <div className="container">
            <div className="group-head">
              <h2 id="pi-label" className="t-h3">
                <L en="Principal investigator" ko="책임연구자" />
              </h2>
            </div>
            <div className="pi-block">
              <div className="pi-photo">
                <Image src={`/images/teampic/${pi.photo}`} alt="" width={480} height={600} priority />
              </div>
              <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
                <div>
                  <h3 className="t-h2">
                    <L en={pi.name} ko={pi.name_ko} />
                  </h3>
                  <p className="t-small" style={{ marginTop: 6 }}>
                    <L
                      en="Associate Professor, School of Biosystems and Biomedical Sciences, Korea University"
                      ko="고려대학교 바이오시스템의과학부 부교수"
                    />
                  </p>
                </div>
                {shortBio && (
                  <div className="t-body prose-links" dangerouslySetInnerHTML={{ __html: shortBio }} />
                )}
                <div className="link-row" style={{ marginTop: 4 }}>
                  <Link href={`/team/${pi.url}`} className="link-arrow">
                    <L en="Full profile and CV" ko="프로필과 이력" />
                  </Link>
                  {profile?.scholar && (
                    <a
                      href={`https://scholar.google.com/citations?user=${profile.scholar}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow link-external"
                    >
                      Google Scholar
                    </a>
                  )}
                  {profile?.email && (
                    <a href={`mailto:${profile.email}`} className="text-link">
                      {profile.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="team-section" aria-labelledby="doban-label">
        <div className="container">
          <div className="group-head">
            <h2 id="doban-label" className="t-h3">
              <L en="How we work" ko="연구실 문화" />
            </h2>
          </div>
          <div className="doban">
            <p className="doban-title">
              <L en="Doban (道伴): walking the same path" ko="도반(道伴), 같은 길을 함께 걷는 사람" />
            </p>
            <div className="doban-text">
            <p className="t-body">
              <L
                en='Doban is a Korean Buddhist term meaning "fellow practitioner", those who walk a path together. While rooted in spiritual contexts, it captures something we believe about scientific work: real progress happens between people who support one another, learn from one another, and pursue higher goals together.'
                ko="도반(道伴)은 한국 불교 전통에서 유래한 말로, 같은 길을 함께 걷는 수행의 동반자를 뜻합니다. 본래 영적인 맥락에서 쓰이지만, 서로를 지지하고 배움을 나누며 더 높은 목표를 향해 나아가는 사람들을 가리키는 표현이기도 합니다."
              />
            </p>
            <p className="t-body">
              <L
                en="Our lab is a group of scientific companions on a shared journey of discovery, innovation, and intellectual growth. Each member acts as doban to the others, contributing to and growing from our collective progress."
                ko="우리 연구실은 발견과 혁신, 그리고 지적 성장의 여정을 함께하는 과학적 동반자들이 모인 곳입니다. 각자가 서로의 도반으로서 기여하고, 함께 성장합니다."
              />
            </p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section" aria-label="Lab members">
        <div className="container" style={{ display: 'grid', gap: 'clamp(32px, 4vw, 48px)' }}>
          {groups.map((g) => (
            <div key={g.id}>
              <div className="group-head">
                <h2 className="t-h3">
                  <L en={g.en} ko={g.ko} />
                </h2>
              </div>
              {g.listOnly ? (
                <ul className="staff-list">
                  {g.list.map((m) => (
                    <li key={m.name}>
                      <span className="member-name">
                        <L en={m.name} ko={m.name_ko || m.name} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="member-grid">
                  {g.list.map((m) => (
                    <MemberCard key={m.name} m={m} />
                  ))}
                </div>
              )}
            </div>
          ))}
          <div>
            <Link href="/alumni" className="link-arrow">
              <L en="Where our alumni are now" ko="졸업생 보기" />
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
