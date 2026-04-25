import type { Metadata } from 'next'
import { getNotes } from '@/lib/data'
import { LabHeader } from '@/components/redesign/LabHeader'
import { LabFooter } from '@/components/redesign/LabFooter'
import { JoinPageClient } from '@/components/redesign/JoinPageClient'
import { AN_TOKENS } from '@/lib/redesign-tokens'

export const metadata: Metadata = {
  title: 'Join',
  description:
    "Open positions at An Lab — postdoctoral researchers, graduate students, and undergraduate researchers in genomics, AI, and autism genetics.",
}

export default function JoinPage() {
  const notes = getNotes()

  return (
    <div style={{ background: AN_TOKENS.lightBg, minHeight: '100vh' }}>
      <LabHeader theme="light" />
      <JoinPageClient notes={notes} />
      <LabFooter theme="light" />
    </div>
  )
}
