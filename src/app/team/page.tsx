import type { Metadata } from 'next'
import { getTeam, getMemberProfile } from '@/lib/data'
import { LabHeader } from '@/components/redesign/LabHeader'
import { LabFooter } from '@/components/redesign/LabFooter'
import { TeamPageClient } from '@/components/redesign/TeamPageClient'
import { AN_TOKENS } from '@/lib/redesign-tokens'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the members of An Lab at Korea University.',
}

export default function TeamPage() {
  const team = getTeam()
  const pi = team.find((m) => m.group === 0)
  const piProfile = pi ? getMemberProfile(pi.url) : null

  return (
    <div style={{ background: AN_TOKENS.lightBg, minHeight: '100vh' }}>
      <LabHeader theme="light" />
      <TeamPageClient team={team} piProfile={piProfile} />
      <LabFooter theme="light" />
    </div>
  )
}
