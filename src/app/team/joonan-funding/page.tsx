import type { Metadata } from 'next'
import { getFunding } from '@/lib/data'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Funding - Joonan An',
  description: 'Research funding and grants for Joo-nan An at An Lab, Korea University.',
}

export default function JoonanFundingPage() {
  const funding = getFunding()

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Team', href: '/team' },
            { label: 'Joonan An', href: '/team/joonan' },
            { label: 'Funding' },
          ]}
        />

        <ScrollReveal>
          <h1 className="section-header mb-2">
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
                    className="font-semibold"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    {item.years}
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: item.role === 'PI' ? 'var(--accent-gold)' : 'var(--accent)',
                      color: '#fff',
                    }}
                  >
                    {item.role}
                  </span>
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
  )
}
