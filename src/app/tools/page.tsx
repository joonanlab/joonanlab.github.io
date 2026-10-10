import type { Metadata } from 'next'
import { TOOLS } from '@/lib/tools'
import { L } from '@/components/site/L'
import { PageHeader } from '@/components/site/PageHeader'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Code and datasets from AN Lab.',
}

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        title={<L en="Code and datasets" ko="코드와 데이터" />}
      />

      <section className="container" style={{ paddingBottom: 'clamp(40px, 5vw, 72px)' }} aria-label="Tools">
        <div className="tool-grid">
          {TOOLS.map((tool) => (
            <article key={tool.name} className="tool-card">
              <div className="figure-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tool.image} alt="" loading="lazy" />
              </div>
              <div className="tool-card-body">
                <h2 className="t-h3">{tool.name}</h2>
                <p className="t-small">{tool.description}</p>
                <div className="link-row">
                  {tool.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow link-external"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
