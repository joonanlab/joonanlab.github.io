import type { Metadata } from 'next'
import { getFunding } from '@/lib/data'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { BackLink } from '@/components/site/BackLink'
import { L } from '@/components/site/L'

export const metadata: Metadata = {
  title: 'Funding - Joon-Yong An',
  description: 'Research funding and grants for Joon-Yong An at AN Lab, Korea University.',
}

export default function JoonanFundingPage() {
  const funding = getFunding()

  return (
    <>
    <div className="doc-page">
      <div className="container-text">
        <BackLink href="/team/joonan">
          <L en="Joon-Yong An" ko="안준용" />
        </BackLink>

        <ScrollReveal>
          <h1 className="t-h1 mb-2">
            <span className="en-only">Funding</span>
            <span className="ko-only">연구비 지원</span>
          </h1>
          <p className="mb-10" style={{ color: 'var(--text-secondary)' }}>
            <span className="en-only">
              {funding.filter(f => f.role === 'PI').length} grants as PI and{' '}
              {funding.filter(f => f.role !== 'PI').length} grants as CI (2018–present).
            </span>
            <span className="ko-only">
              PI {funding.filter(f => f.role === 'PI').length}건, CI{' '}
              {funding.filter(f => f.role !== 'PI').length}건 (2018–현재).
            </span>
          </p>
        </ScrollReveal>

        <div className="space-y-0">
          {funding.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="news-dot py-4">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="t-meta"
                  >
                    {item.years}
                  </span>
                  <span className="t-meta">{item.role}</span>
                </div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  <span className="en-only">{item.title_en}</span>
                  <span className="ko-only">{item.title_ko || item.title_en}</span>
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  <span className="en-only">{item.source_en}</span>
                  <span className="ko-only">{item.source_ko || item.source_en}</span>
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
