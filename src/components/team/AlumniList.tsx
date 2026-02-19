'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { AlumniMember } from '@/lib/data'

const GROUP_LABELS: Record<number, { en: string; ko: string }> = {
  1: { en: 'Graduate Alumni', ko: '대학원 졸업생' },
  2: { en: 'Former Staff', ko: '전 연구원' },
  3: { en: 'Former Undergraduate Interns', ko: '전 학부 인턴' },
}

export function AlumniList({ alumni }: { alumni: AlumniMember[] }) {
  const groups = [1, 2, 3].filter((g) => alumni.some((a) => a.group === g))

  return (
    <div className="space-y-10">
      {groups.map((group) => {
        const members = alumni.filter((a) => a.group === group)
        const label = GROUP_LABELS[group]

        return (
          <section key={group}>
            <motion.h2
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--accent-gold)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="en-only">{label.en}</span>
              <span className="ko-only">{label.ko}</span>
            </motion.h2>
            <div className="space-y-3">
              {members.map((m, i) => (
                <motion.div
                  key={m.url}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={`/team/${m.url}`} className="pub-card flex items-center gap-4 block">
                    <div
                      className="w-12 h-12 rounded-full overflow-hidden shrink-0"
                      style={{ background: 'var(--bg-tertiary)' }}
                    >
                      <img
                        src={`/images/teampic/${m.photo}`}
                        alt={m.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                        <span className="en-only">{m.name}</span>
                        <span className="ko-only">{m.name_ko}</span>
                        <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>
                          {m.year}
                        </span>
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <span className="en-only">{m.info}</span>
                        <span className="ko-only">{m.info_ko}</span>
                      </p>
                      {m.current && (
                        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          <span className="en-only">Current: </span>
                          <span className="ko-only">현재: </span>
                          {m.current}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
