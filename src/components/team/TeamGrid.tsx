'use client'

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

export function TeamGrid({ team }: { team: TeamMember[] }) {
  const groups = [0, 1, 2, 3].filter((g) => team.some((m) => m.group === g))

  return (
    <div className="space-y-12">
      {groups.map((group) => {
        const members = team.filter((m) => m.group === group)
        const label = GROUP_LABELS[group]

        return (
          <section key={group}>
            <motion.h2
              className="text-2xl font-bold mb-6"
              style={{ color: group % 2 === 0 ? 'var(--accent)' : 'var(--accent-gold)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="en-only">{label.en}</span>
              <span className="ko-only">{label.ko}</span>
            </motion.h2>

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
                    <MemberCard member={m} />
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
