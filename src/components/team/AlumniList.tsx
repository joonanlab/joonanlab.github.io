import Image from 'next/image'
import Link from 'next/link'
import type { AlumniMember } from '@/lib/data'
import { L } from '@/components/site/L'
import { hasRealPhoto } from '@/lib/people'

const GROUP_LABELS: Record<number, { en: string; ko: string }> = {
  1: { en: 'Graduate alumni', ko: '대학원 졸업생' },
  2: { en: 'Former staff', ko: '전 연구원' },
  3: { en: 'Former undergraduate interns', ko: '전 학부 인턴' },
}

export function AlumniList({ alumni }: { alumni: AlumniMember[] }) {
  const groups = [1, 2, 3].filter((g) => alumni.some((a) => a.group === g))

  return (
    <div style={{ display: 'grid', gap: 'clamp(32px, 4vw, 48px)' }}>
      {groups.map((group) => {
        const members = alumni.filter((a) => a.group === group)
        const label = GROUP_LABELS[group]
        return (
          <section key={group} className="split" aria-label={label.en}>
            <h2>
              <L en={label.en} ko={label.ko} />
            </h2>
            <ul className="rule-list">
              {members.map((m) => (
                <li key={m.url}>
                  <Link href={`/team/${m.url}`} className="row-link alumni-row">
                    <span className="alumni-photo">
                      {hasRealPhoto(m.photo) && (
                        <Image src={`/images/teampic/${m.photo}`} alt="" width={96} height={96} />
                      )}
                    </span>
                    <span style={{ display: 'grid', gap: 2, minWidth: 0 }}>
                      <span className="member-name row-title">
                        <L en={m.name} ko={m.name_ko || m.name} />
                      </span>
                      <span className="member-role">
                        <L en={m.info} ko={m.info_ko || m.info} />
                        {m.current && (
                          <>
                            <br />
                            <L en={`Now: ${m.current}`} ko={`현재: ${m.current_ko || m.current}`} />
                          </>
                        )}
                      </span>
                    </span>
                    <span className="t-meta">{m.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
