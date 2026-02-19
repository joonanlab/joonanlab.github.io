import type { Metadata } from 'next'
import { getOutreach } from '@/lib/data'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Outreach & Education - Joonan An',
  description: 'Public engagement and education workshops by Joo-nan An at An Lab, Korea University.',
}

export default function JoonanOutreachPage() {
  const outreach = getOutreach()

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Team', href: '/team' },
            { label: 'Joonan An', href: '/team/joonan' },
            { label: 'Outreach & Education' },
          ]}
        />

        <ScrollReveal>
          <h1 className="section-header mb-2">
            <span className="en-only">Public Engagement &amp; Education Workshops</span>
            <span className="ko-only">대중 참여 &amp; 교육 워크숍</span>
          </h1>
          <p className="mb-10" style={{ color: 'var(--text-secondary)' }}>
            <span className="en-only">
              {outreach.outreach.length} public engagement activities and{' '}
              {outreach.workshops.length} education workshops (2019–present).
            </span>
            <span className="ko-only">
              대중 참여 {outreach.outreach.length}건, 교육 워크숍{' '}
              {outreach.workshops.length}건 (2019–현재).
            </span>
          </p>
        </ScrollReveal>

        {/* Public Engagement */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--accent-gold)' }}>
            <span className="en-only">Public Engagement</span>
            <span className="ko-only">대중 참여</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0 mb-12">
          {[...outreach.outreach].reverse().map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
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

        {/* Education Workshops */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--accent-gold)' }}>
            <span className="en-only">Education Workshops</span>
            <span className="ko-only">교육 워크숍</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {[...outreach.workshops].reverse().map((item, i) => (
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
