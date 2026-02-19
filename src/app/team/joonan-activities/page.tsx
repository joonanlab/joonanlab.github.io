import type { Metadata } from 'next'
import { getActivities } from '@/lib/data'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Activities - Joonan An',
  description: 'Conference talks and invited seminars by Joo-nan An at An Lab, Korea University.',
}

export default function JoonanActivitiesPage() {
  const activities = getActivities()

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Team', href: '/team' },
            { label: 'Joonan An', href: '/team/joonan' },
            { label: 'Activities' },
          ]}
        />

        <ScrollReveal>
          <h1 className="section-header mb-2">
            <span className="en-only">Conference Talks &amp; Invited Seminars</span>
            <span className="ko-only">학회 발표 &amp; 초청 세미나</span>
          </h1>
          <p className="mb-10" style={{ color: 'var(--text-secondary)' }}>
            <span className="en-only">
              {activities.conferences.length} conference talks and{' '}
              {activities.seminars.length} invited seminars (2019–present).
            </span>
            <span className="ko-only">
              학회 발표 {activities.conferences.length}건, 초청 세미나{' '}
              {activities.seminars.length}건 (2019–현재).
            </span>
          </p>
        </ScrollReveal>

        {/* Conference Talks */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
            <span className="en-only">Conference Talks</span>
            <span className="ko-only">학회 발표</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0 mb-12">
          {[...activities.conferences].reverse().map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.03}>
              <div className="news-dot py-3">
                <span
                  className="font-semibold block mb-1"
                  style={{ color: 'var(--accent-gold)' }}
                >
                  {item.date}
                </span>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {item.event}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Invited Seminars */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
            <span className="en-only">Invited Seminars</span>
            <span className="ko-only">초청 세미나</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {[...activities.seminars].reverse().map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.03}>
              <div className="news-dot py-3">
                <span
                  className="font-semibold block mb-1"
                  style={{ color: 'var(--accent-gold)' }}
                >
                  {item.date}
                </span>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {item.event}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
