import Link from 'next/link'
import type { TeamMember } from '@/lib/data'

export function PICard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/team/${member.url}`}
      className="tc-card tc-card-pi group block"
    >
      {/* Photo area */}
      <div className="tc-card-image tc-card-image-pi">
        <img
          src={`/images/teampic/${member.photo}`}
          alt={member.name}
          className="tc-card-img"
          loading="lazy"
        />
        <div className="tc-card-image-overlay" />
      </div>

      {/* Info area */}
      <div className="tc-card-info">
        <h3 className="tc-card-name text-lg">
          <span className="en-only">{member.name}</span>
          <span className="ko-only">{member.name_ko}</span>
        </h3>
        <div className="tc-card-divider" style={{ background: 'var(--accent)' }} />
        <p className="tc-card-role">{member.info}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          <span className="en-only">Dept. of Biosystem and Biomedical Science</span>
          <span className="ko-only">바이오시스템의과학부</span>
        </p>
      </div>
    </Link>
  )
}
