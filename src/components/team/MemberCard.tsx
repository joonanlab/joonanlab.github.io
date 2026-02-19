import Link from 'next/link'
import type { TeamMember } from '@/lib/data'
import { Badge } from '@/components/shared/Badge'

function parseBadges(info: string): { label: string; variant: 'accent' | 'gold' }[] {
  const badges: { label: string; variant: 'accent' | 'gold' }[] = []
  if (info.includes('Seoam')) badges.push({ label: 'Seoam', variant: 'gold' })
  if (info.includes('NRF') && !info.includes('CNRF'))
    badges.push({ label: 'NRF', variant: 'accent' })
  if (info.includes('CNRF')) badges.push({ label: 'CNRF', variant: 'accent' })
  return badges
}

export function MemberCard({ member }: { member: TeamMember }) {
  const badges = parseBadges(member.info)

  return (
    <Link href={`/team/${member.url}`} className="card block text-center group hover:border-transparent" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.4), rgba(196, 154, 60, 0.2), rgba(26, 39, 68, 0.4))',
          padding: '1px',
          borderRadius: '0.75rem',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div
        className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden transition-all duration-300 member-photo-ring"
        style={{
          background: 'var(--bg-tertiary)',
          border: '2px solid transparent',
        }}
      >
        <img
          src={`/images/teampic/${member.photo}`}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3
        className="font-semibold text-base group-hover:opacity-80 transition-opacity"
        style={{ color: 'var(--text-primary)' }}
      >
        <span className="en-only">{member.name}</span>
        <span className="ko-only">{member.name_ko}</span>
      </h3>
      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
        {member.info.replace(/\s*\(.*\)/, '')}
      </p>
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {badges.map((b) => (
            <Badge key={b.label} variant={b.variant}>
              {b.label}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  )
}
