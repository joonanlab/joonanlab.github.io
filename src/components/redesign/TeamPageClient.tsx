'use client'

/**
 * TeamPageClient — v2 Team page.
 * Dark PI band + light members grid grouped by role.
 *
 * Group taxonomy is derived from the existing team.json `info` field
 * (no schema changes). PI is rendered separately above the grid.
 */

import Link from 'next/link'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS } from '@/lib/redesign-tokens'
import type { TeamMember, MemberProfile } from '@/lib/data'

interface RoleSection {
  id: string
  en: string
  ko: string
  match: (info: string) => boolean
}

const ROLES: RoleSection[] = [
  {
    id: 'phd',
    en: 'PhD Students',
    ko: '박사과정',
    match: (info) => info.startsWith('PhD'),
  },
  {
    id: 'masters',
    en: 'Masters Students',
    ko: '석사과정',
    match: (info) => info.startsWith('Masters'),
  },
  {
    id: 'staff',
    en: 'Research & Administrative Staff',
    ko: '연구·행정 스태프',
    match: (info) => info === 'Bioinformatician' || info === 'Administrative Staff',
  },
  {
    id: 'undergrad',
    en: 'Undergraduate Interns',
    ko: '학부 인턴',
    match: (info) => info.startsWith('Undergraduate'),
  },
]

interface TeamPageClientProps {
  team: TeamMember[]
  piProfile: MemberProfile | null
}

export function TeamPageClient({ team, piProfile }: TeamPageClientProps) {
  const { lang } = useLang()

  const pi = team.find((m) => m.group === 0)
  const members = team.filter((m) => m.group !== 0)

  const sections = ROLES.map((role) => ({
    role,
    members: members.filter((m) => role.match(m.info)),
  })).filter((s) => s.members.length > 0)

  // Take just the first ~3 narrative paragraphs from the full member bio
  // so the Team page hero stays scannable. The full timeline lives on the
  // member detail page.
  const shortBio = piProfile?.bio_html
    ? piProfile.bio_html
        .match(/<p>[\s\S]*?<\/p>/g)
        ?.slice(0, 2)
        .join('') ?? piProfile.bio_html
    : ''

  const initials = (name: string) =>
    name
      .split(' ')
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')

  return (
    <>
      {/* PI band — dark */}
      <section
        style={{
          background: AN_TOKENS.darkBg,
          color: AN_TOKENS.darkInk,
          padding: 'clamp(48px, 6vw, 72px) clamp(20px, 4vw, 32px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: AN_TOKENS.fontMono,
              fontSize: 12,
              color: AN_TOKENS.gold,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ width: 32, height: 1, background: AN_TOKENS.red }} />
            {lang === 'ko' ? '책임연구자 · Principal Investigator' : 'Principal Investigator'}
          </div>

          <div
            className="team-pi-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 'clamp(24px, 4vw, 48px)',
              alignItems: 'start',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 200,
                aspectRatio: '4 / 5',
                borderRadius: 12,
                overflow: 'hidden',
                position: 'relative',
                background: `linear-gradient(160deg, ${AN_TOKENS.redDeep} 0%, ${AN_TOKENS.red} 60%, ${AN_TOKENS.gold} 120%)`,
              }}
            >
              {pi && (
                <img
                  src={`/images/teampic/${pi.photo}`}
                  alt={lang === 'ko' ? pi.name_ko : pi.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>

            <div>
              <h1
                style={{
                  fontFamily: AN_TOKENS.fontSerif,
                  fontSize: 'clamp(28px, 3.6vw, 48px)',
                  fontWeight: 300,
                  letterSpacing: -1.5,
                  lineHeight: 1.05,
                  margin: '0 0 8px',
                  textWrap: 'balance',
                }}
              >
                {lang === 'ko' && pi ? pi.name_ko : (pi?.name ?? 'Joon-Yong An')}
              </h1>
              <div
                style={{
                  fontFamily: AN_TOKENS.fontSans,
                  fontSize: 16,
                  color: AN_TOKENS.gold,
                  letterSpacing: 0.5,
                  marginBottom: 8,
                }}
              >
                {lang === 'ko'
                  ? piProfile?.position_ko ?? '부교수'
                  : piProfile?.position ?? 'Associate Professor'}
              </div>
              <div
                style={{
                  fontFamily: AN_TOKENS.fontSans,
                  fontSize: 14,
                  color: AN_TOKENS.darkInkSoft,
                  marginBottom: 32,
                }}
              >
                {lang === 'ko'
                  ? '고려대학교 바이오시스템의과학부'
                  : 'School of Biosystems and Biomedical Sciences, Korea University'}
              </div>

              {shortBio && (
                <div
                  style={{
                    fontFamily: AN_TOKENS.fontSerif,
                    fontSize: 'clamp(14px, 1.2vw, 16px)',
                    fontStyle: 'italic',
                    color: AN_TOKENS.darkInk,
                    lineHeight: 1.55,
                    margin: '0 0 24px',
                    maxWidth: 720,
                    fontWeight: 300,
                    textWrap: 'pretty',
                  }}
                  dangerouslySetInnerHTML={{ __html: shortBio }}
                />
              )}

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {piProfile?.email && (
                  <a
                    href={`mailto:${piProfile.email}`}
                    style={{
                      padding: '12px 20px',
                      background: AN_TOKENS.red,
                      color: 'white',
                      fontFamily: AN_TOKENS.fontSans,
                      fontSize: 13,
                      fontWeight: 600,
                      borderRadius: 8,
                      textDecoration: 'none',
                    }}
                  >
                    {piProfile.email}
                  </a>
                )}
                {piProfile?.scholar && (
                  <a
                    href={piProfile.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '12px 20px',
                      background: 'transparent',
                      color: AN_TOKENS.darkInk,
                      border: `1px solid ${AN_TOKENS.darkLine}`,
                      fontFamily: AN_TOKENS.fontSans,
                      fontSize: 13,
                      fontWeight: 600,
                      borderRadius: 8,
                      textDecoration: 'none',
                    }}
                  >
                    Google Scholar
                  </a>
                )}
                {pi?.url && (
                  <Link
                    href={`/team/${pi.url}`}
                    style={{
                      padding: '12px 20px',
                      background: 'transparent',
                      color: AN_TOKENS.darkInk,
                      border: `1px solid ${AN_TOKENS.darkLine}`,
                      fontFamily: AN_TOKENS.fontSans,
                      fontSize: 13,
                      fontWeight: 600,
                      borderRadius: 8,
                      textDecoration: 'none',
                    }}
                  >
                    {lang === 'ko' ? '프로필 →' : 'Full profile →'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doban band — cream, lab philosophy */}
      <section
        style={{
          background: AN_TOKENS.lightBgAlt,
          color: AN_TOKENS.lightInk,
          padding: 'clamp(56px, 8vw, 88px) clamp(20px, 4vw, 32px)',
          borderTop: `1px solid ${AN_TOKENS.lightLine}`,
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: AN_TOKENS.fontMono,
              fontSize: 12,
              color: AN_TOKENS.red,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {lang === 'ko' ? '도반 · 道伴' : 'Doban · 道伴'}
          </div>
          <h2
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              fontWeight: 300,
              letterSpacing: -1.2,
              lineHeight: 1.1,
              margin: '0 0 28px',
              color: AN_TOKENS.lightInk,
              textWrap: 'balance',
            }}
          >
            {lang === 'ko' ? (
              <>
                같은 길을 걷는 <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>동반자</em>로서.
              </>
            ) : (
              <>
                Walking the same path, as <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>doban.</em>
              </>
            )}
          </h2>
          <p
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(16px, 1.5vw, 19px)',
              fontWeight: 400,
              color: AN_TOKENS.lightInkSoft,
              lineHeight: 1.7,
              margin: '0 0 16px',
              maxWidth: 760,
              textWrap: 'pretty',
            }}
          >
            {lang === 'ko'
              ? '도반(道伴)은 한국 불교 전통에서 유래된 말로, 같은 길을 함께 걷는 수행의 동반자를 뜻합니다. 본래 영적인 맥락에서 쓰이지만, 서로를 지지하고 배움을 나누며 더 높은 목표를 향해 나아가는 사람들을 가리키는 표현이기도 합니다.'
              : 'Doban (道伴) is a Korean Buddhist term meaning "fellow practitioner" — those who walk a path together. While rooted in spiritual contexts, it captures something we believe about scientific work: that real progress happens between people who support one another, learn from one another, and pursue higher goals together.'}
          </p>
          <p
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(16px, 1.5vw, 19px)',
              fontWeight: 400,
              color: AN_TOKENS.lightInkSoft,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 760,
              textWrap: 'pretty',
            }}
          >
            {lang === 'ko'
              ? '우리 연구실은 발견과 혁신, 그리고 지적 성장의 여정을 함께하는 과학적 동반자들이 모인 곳입니다. 각자가 서로의 도반으로서 기여하고, 함께 성장합니다.'
              : 'Our lab is a group of scientific companions on a shared journey of discovery, innovation, and intellectual growth. Each member acts as doban to the others — contributing to and growing from our collective progress.'}
          </p>
        </div>
      </section>

      {/* Members band — light */}
      <section
        style={{
          background: AN_TOKENS.lightBg,
          color: AN_TOKENS.lightInk,
          padding: 'clamp(64px, 10vw, 100px) clamp(20px, 4vw, 32px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 56,
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: AN_TOKENS.fontMono,
                  fontSize: 12,
                  color: AN_TOKENS.red,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                § 02 · {lang === 'ko' ? '구성원' : 'Lab members'}
              </div>
              <h2
                style={{
                  fontFamily: AN_TOKENS.fontSerif,
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 300,
                  letterSpacing: -2,
                  lineHeight: 1,
                  margin: 0,
                  color: AN_TOKENS.lightInk,
                  textWrap: 'balance',
                }}
              >
                {lang === 'ko' ? '함께 연구하는 사람들' : 'The people doing the work.'}
              </h2>
            </div>
            <div
              style={{
                fontFamily: AN_TOKENS.fontMono,
                fontSize: 12,
                color: AN_TOKENS.lightInkMuted,
                letterSpacing: 1.5,
              }}
            >
              {members.length} {lang === 'ko' ? '명' : 'members'} · Seoul, KR
            </div>
          </div>

          {/* Alumni CTA — sits between members header and the role groups */}
          <div
            style={{
              marginBottom: 48,
              padding: '20px 28px',
              background: AN_TOKENS.lightBgRaised,
              border: `1px solid ${AN_TOKENS.lightLine}`,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: AN_TOKENS.fontSerif,
                  fontSize: 'clamp(18px, 1.8vw, 22px)',
                  fontWeight: 400,
                  color: AN_TOKENS.lightInk,
                  marginBottom: 4,
                  letterSpacing: -0.3,
                }}
              >
                {lang === 'ko' ? '졸업생을 찾으시나요?' : 'Looking for our alumni?'}
              </div>
              <div
                style={{
                  fontFamily: AN_TOKENS.fontSans,
                  fontSize: 14,
                  color: AN_TOKENS.lightInkSoft,
                }}
              >
                {lang === 'ko'
                  ? '랩을 거쳐간 도반들의 현재 행보를 확인해보세요.'
                  : 'See where our former doban have moved on to.'}
              </div>
            </div>
            <Link
              href="/alumni"
              style={{
                fontFamily: AN_TOKENS.fontSans,
                fontSize: 14,
                fontWeight: 600,
                color: AN_TOKENS.red,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {lang === 'ko' ? '졸업생 →' : 'Alumni →'}
            </Link>
          </div>

          {sections.map(({ role, members: list }) => (
            <div key={role.id} style={{ marginBottom: 56 }}>
              <div
                style={{
                  fontFamily: AN_TOKENS.fontMono,
                  fontSize: 11,
                  color: AN_TOKENS.lightInkMuted,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  marginBottom: 20,
                  paddingBottom: 8,
                  borderBottom: `1px solid ${AN_TOKENS.lightLine}`,
                }}
              >
                {lang === 'ko' ? role.ko : role.en} · {list.length}
              </div>
              <div
                className="team-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: 20,
                }}
              >
                {list.map((m) => {
                  const Card = (
                    <div
                      style={{
                        padding: 24,
                        background: AN_TOKENS.lightBgRaised,
                        border: `1px solid ${AN_TOKENS.lightLine}`,
                        borderRadius: 10,
                        display: 'grid',
                        gridTemplateColumns: '96px 1fr',
                        gap: 18,
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <div
                        style={{
                          width: 96,
                          height: 96,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          background: `linear-gradient(135deg, ${AN_TOKENS.red}22, ${AN_TOKENS.gold}33)`,
                          display: 'grid',
                          placeItems: 'center',
                          fontFamily: AN_TOKENS.fontSerif,
                          fontSize: 28,
                          fontWeight: 400,
                          color: AN_TOKENS.red,
                          flexShrink: 0,
                        }}
                      >
                        {m.photo ? (
                          <img
                            src={`/images/teampic/${m.photo}`}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        ) : (
                          initials(m.name)
                        )}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: AN_TOKENS.fontSans,
                            fontSize: 16,
                            fontWeight: 600,
                            color: AN_TOKENS.lightInk,
                            marginBottom: 4,
                          }}
                        >
                          {lang === 'ko' && m.name_ko ? m.name_ko : m.name}
                        </div>
                        <div
                          style={{
                            fontFamily: AN_TOKENS.fontSans,
                            fontSize: 13,
                            color: AN_TOKENS.lightInkSoft,
                            lineHeight: 1.4,
                          }}
                        >
                          {m.info}
                        </div>
                      </div>
                    </div>
                  )
                  if (m.url) {
                    return (
                      <Link
                        key={m.name}
                        href={`/team/${m.url}`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          display: 'block',
                        }}
                      >
                        {Card}
                      </Link>
                    )
                  }
                  return <div key={m.name}>{Card}</div>
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
