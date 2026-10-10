import type { Metadata } from 'next'
import { getOutreach } from '@/lib/data'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { BackLink } from '@/components/site/BackLink'
import { L } from '@/components/site/L'

export const metadata: Metadata = {
  title: 'Outreach & Education - Joon-Yong An',
  description: 'Public engagement and education workshops by Joon-Yong An at AN Lab, Korea University.',
}

export default function JoonanOutreachPage() {
  const outreach = getOutreach()

  return (
    <>
    <div className="doc-page">
      <div className="container-text">
        <BackLink href="/team/joonan">
          <L en="Joon-Yong An" ko="안준용" />
        </BackLink>

        <ScrollReveal>
          <h1 className="t-h1 mb-2">
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
          <h2 className="t-h3 mb-6" style={{ marginTop: 40 }}>
            <span className="en-only">Public Engagement</span>
            <span className="ko-only">대중 참여</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0 mb-12">
          {[...outreach.outreach].reverse().map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="news-dot py-3">
                <span
                  className="t-meta block mb-1"
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
          <h2 className="t-h3 mb-6" style={{ marginTop: 40 }}>
            <span className="en-only">Education Workshops</span>
            <span className="ko-only">교육 워크숍</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {[...outreach.workshops].reverse().map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.03}>
              <div className="news-dot py-3">
                <span
                  className="t-meta block mb-1"
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
    </>
  )
}
