import Link from 'next/link'
import type { TeamMember } from '@/lib/data'

export function PICard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/team/${member.url}`}
      className="card flex flex-col sm:flex-row items-center gap-6 group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-black/10"
    >
      <div
        className="w-32 h-32 rounded-full overflow-hidden shrink-0 transition-all duration-300 pi-photo-ring"
        style={{ background: 'var(--bg-tertiary)', border: '2px solid transparent' }}
      >
        <img
          src={`/images/teampic/${member.photo}`}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <h3
          className="text-2xl font-bold group-hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="en-only">{member.name}</span>
          <span className="ko-only">{member.name_ko}</span>
        </h3>
        <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
          {member.info}
        </p>
        <p className="text-base mt-1" style={{ color: 'var(--text-muted)' }}>
          <span className="en-only">Department of Biosystem and Biomedical Science, Korea University</span>
          <span className="ko-only">고려대학교 바이오시스템의과학부</span>
        </p>
      </div>
    </Link>
  )
}
