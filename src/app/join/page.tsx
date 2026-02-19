import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BilingualText } from '@/components/shared/BilingualText'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Join Us',
  description:
    'Open positions at An Lab - postdoctoral researchers and graduate students in genomics and AI.',
}

export default function JoinPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Join' }]} />
        <BilingualText
          en="Open Positions"
          ko="채용 공고"
          as="h1"
          className="section-header mb-4"
        />
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          <span className="en-only">Thank you for your interest in joining the An Lab.</span>
          <span className="ko-only">An Lab에 관심을 가져 주셔서 감사합니다.</span>
        </p>

        {/* Korean Notion Links */}
        <ScrollReveal>
          <div className="card mb-8">
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              우리말로 된 자세한 모집 정보 및 절차는 Notion 페이지에서 확인할 수 있습니다.
            </p>
            <div className="space-y-3">
              <a
                href="https://joonanlab.notion.site/a1acff2799bc485bb6c9b05db1846b2e"
                target="_blank"
                rel="noopener"
                className="block font-medium hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                박사후 연구원 모집 공고 (Notion) &rarr;
              </a>
              <a
                href="https://joonanlab.notion.site/e061f5837a4747a8a125714bd984046a"
                target="_blank"
                rel="noopener"
                className="block font-medium hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                대학원생 및 학부연구생 모집 공고 (Notion) &rarr;
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Postdoc */}
        <ScrollReveal delay={0.1}>
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
              <span className="en-only">Postdoctoral Researchers</span>
              <span className="ko-only">박사후 연구원</span>
            </h2>
            <div style={{ color: 'var(--text-secondary)' }} className="space-y-4 text-base leading-relaxed">
              <p>
                We have more data and research ideas than trainees, so are keen to recruit
                exceptional researchers. The lab offers a collaborative and supportive environment
                and has a strong track record in helping students develop and begin their own
                independent research careers.
              </p>
              <p>We are currently looking for researchers with a strong computational background in:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Whole genome sequencing analysis for neurodevelopmental disorders</li>
                <li>Genome-wide association study for complex diseases</li>
                <li>Single cell transcriptomics</li>
              </ul>
              <p>
                If you are interested, please contact Dr. An (
                <span style={{ color: 'var(--accent)' }}>joonanlab at gmail dot com</span>)
                directly.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Graduate */}
        <ScrollReveal delay={0.2}>
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
              <span className="en-only">Graduate Students</span>
              <span className="ko-only">대학원생</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              If you are interested in PhD or MS-PhD courses in our lab, please send a merged PDF of
              your cover letter, CV and academic record (transcript) of your undergraduate to Dr. An
              (<span style={{ color: 'var(--accent)' }}>joonanlab at gmail dot com</span>).
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
