import type { Metadata } from 'next'
import { getPublications, getResearchAreas } from '@/lib/data'
import { getAreaFigure, getAreaPapers } from '@/lib/research-figures'
import { firstAuthorSurname } from '@/lib/format'
import { L } from '@/components/site/L'
import { PageHeader } from '@/components/site/PageHeader'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Research at AN Lab — deep learning for noncoding genomes, AI-driven virtual cells, autism genetics in East Asian cohorts, and integrative multi-omics.',
}

export default function ResearchPage() {
  const areas = getResearchAreas()
  const publications = getPublications()

  return (
    <>
      <PageHeader
        title={<L en="Projects" ko="프로젝트" />}
        lead={
          <L
            en="How the genome shapes the brain, through deep learning, single-cell biology, large-scale sequencing and integrative multi-omics"
            ko="딥러닝, 단일세포 생물학, 대규모 시퀀싱, 통합 멀티오믹스로 보는 유전체와 뇌"
          />
        }
      >
        <nav className="anchor-nav" aria-label="Projects" style={{ marginTop: 8 }}>
          {areas.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="chip">
              <L en={a.short} ko={a.shortKo} />
            </a>
          ))}
        </nav>
      </PageHeader>

      {areas.map((a) => {
        const fig = getAreaFigure(a.id, publications)
        const papers = getAreaPapers(a.id, publications)
        return (
          <section key={a.id} className="section" aria-labelledby={`${a.id}-title`}>
            <div className="container">
              <article id={a.id} className="research-area">
                <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
                  <h2 id={`${a.id}-title`} className="t-h2">
                    <L en={a.en} ko={a.ko} />
                  </h2>
                  <p className="t-body" style={{ maxWidth: '60ch' }}>
                    <L en={a.body} ko={a.bodyKo} />
                  </p>
                  {papers.length > 0 && (
                    <div className="key-papers">
                      <h3 className="t-label">
                        <L en="Key papers" ko="대표 연구" />
                      </h3>
                      <ul>
                        {papers.map((p) => (
                          <li key={p.title}>
                            <a href={p.link.url} target="_blank" rel="noopener noreferrer">
                              <span className="key-paper-title">{p.title}</span>
                              <span className="t-meta">
                                {firstAuthorSurname(p.authors)} et al., {p.journal}, {p.year}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <figure>
                  <div className="figure-frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fig.src} alt={fig.pub ? `Figure from: ${fig.pub.title}` : ''} loading="lazy" />
                  </div>
                  {fig.pub && (
                    <figcaption className="figure-caption">
                      <L en="Figure: " ko="그림: " />
                      {fig.pub.link.url ? (
                        <a href={fig.pub.link.url} target="_blank" rel="noopener noreferrer" className="text-link">
                          {firstAuthorSurname(fig.pub.authors)} et al., <i>{fig.pub.journal}</i> ({fig.pub.year})
                        </a>
                      ) : (
                        <>
                          {firstAuthorSurname(fig.pub.authors)} et al., <i>{fig.pub.journal}</i> ({fig.pub.year})
                        </>
                      )}
                    </figcaption>
                  )}
                </figure>
              </article>
            </div>
          </section>
        )
      })}
    </>
  )
}
