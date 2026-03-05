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
  const badges = parseBadges(member.info)
  const accentColor = group !== undefined && group % 2 === 0 ? 'var(--accent)' : 'var(--accent-gold)'

  return (
    <Link
      href={`/team/${member.url}`}
      className="tc-card group block h-full"
    >
      {/* Photo area */}
      <div className="tc-card-image">
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
        <h3 className="tc-card-name">
          <span className="en-only">{member.name}</span>
          <span className="ko-only">{member.name_ko}</span>
        </h3>
        <div
          className="tc-card-divider"
          style={{ background: accentColor }}
        />
        <p className="tc-card-role">
          {member.info.replace(/\s*\(.*\)/, '')}
        </p>
        {(badges.length > 0 || (member.tags && member.tags.length > 0)) && (
          <div className="flex flex-wrap gap-1 justify-center mt-1.5">
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
      </div>
    </Link>
  )
}
