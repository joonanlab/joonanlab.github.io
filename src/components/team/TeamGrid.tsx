'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { TeamMember } from '@/lib/data'
import { PICard } from './PICard'
import { MemberCard } from './MemberCard'

const GROUP_LABELS: Record<number, { en: string; ko: string }> = {
  0: { en: 'Principal Investigator', ko: '연구 책임자' },
  1: { en: 'Graduate Students', ko: '대학원생' },
  2: { en: 'Staff', ko: '연구원' },
  3: { en: 'Undergraduate Interns', ko: '학부 인턴' },
}

const GRAD_FILTERS = [
  { key: 'all', en: 'All', ko: '전체' },
  { key: 'phd', en: 'PhD Students', ko: '박사' },
  { key: 'masters', en: 'Masters Students', ko: '석사' },
]

export function TeamGrid({ team }: { team: TeamMember[] }) {
  const [gradFilter, setGradFilter] = useState('all')
  const groups = [0, 1, 2, 3].filter((g) => team.some((m) => m.group === g))

  return (
    <div className="space-y-12">
      {groups.map((group) => {
        let members = team.filter((m) => m.group === group)
        const label = GROUP_LABELS[group]

        // Filter graduate students by PhD/Masters
        if (group === 1 && gradFilter !== 'all') {
          members = members.filter((m) =>
            gradFilter === 'phd'
              ? m.info.startsWith('PhD')
              : m.info.startsWith('Masters')
          )
        }

        return (
          <section key={group}>
            <motion.h2
              className="text-2xl font-bold mb-4"
              style={{ color: group % 2 === 0 ? 'var(--accent)' : 'var(--accent-gold)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="en-only">{label.en}</span>
              <span className="ko-only">{label.ko}</span>
            </motion.h2>

            {group === 1 && (
              <div className="flex gap-2 mb-6">
                {GRAD_FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setGradFilter(f.key)}
                    className="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                    style={{
                      background: gradFilter === f.key ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                      color: gradFilter === f.key ? '#fff' : 'var(--text-secondary)',
                      border: `1px solid ${gradFilter === f.key ? 'var(--accent-gold)' : 'var(--border)'}`,
                    }}
                  >
                    <span className="en-only">{f.en}</span>
                    <span className="ko-only">{f.ko}</span>
                  </button>
                ))}
              </div>
            )}

            {group === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {members.map((m) => (
                  <PICard key={m.url} member={m} />
                ))}
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {members.map((m, i) => (
                  <motion.div
                    key={m.url}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <MemberCard member={m} group={group} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
