import Link from 'next/link'
import type { TeamMember } from '@/lib/data'
import { Badge } from '@/components/shared/Badge'

function parseBadges(info: string): { label: string; variant: 'accent' | 'gold' | 'crimson' }[] {
  const badges: { label: string; variant: 'accent' | 'gold' | 'crimson' }[] = []
  if (info.includes('Seoam')) badges.push({ label: 'Seoam', variant: 'gold' })
  if (info.includes('NRF') && !info.includes('CNRF'))
    badges.push({ label: 'NRF', variant: 'gold' })
  if (info.includes('CNRF')) badges.push({ label: 'CNRF', variant: 'gold' })
  return badges
}

const TAG_VARIANTS: Record<string, 'accent' | 'gold' | 'blue' | 'green' | 'crimson'> = {
  AI: 'crimson',
  WGS: 'crimson',
}

export function MemberCard({ member, group }: { member: TeamMember; group?: number }) {
  const ringClass = group !== undefined && group % 2 === 0 ? 'member-photo-ring-accent' : 'member-photo-ring';
  const badges = parseBadges(member.info)

  return (
    <Link href={`/team/${member.url}`} className="card block text-center group h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-black/10" style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className={`w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden transition-all duration-300 ${ringClass}`}
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
      {(badges.length > 0 || (member.tags && member.tags.length > 0)) && (
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {badges.map((b) => (
            <Badge key={b.label} variant={b.variant}>
              {b.label}
            </Badge>
          ))}
          {member.tags?.map((tag) => (
            <Badge key={tag} variant={TAG_VARIANTS[tag] || 'blue'}>
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  )
}
