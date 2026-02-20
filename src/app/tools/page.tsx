import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BilingualText } from '@/components/shared/BilingualText'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Code and datasets from An Lab.',
}

const TOOLS = [
  {
    name: 'K-GeneBook',
    description:
      'An interactive resource for exploring ASD risk genes identified through whole-genome sequencing of Korean families, SSC, SPARK, and MSSNG cohorts.',
    image: '/images/codepic/kgenebook.png',
    links: [
      { label: 'Website', url: 'https://joonan-lab.github.io/k_genebook/' },
    ],
  },
  {
    name: 'Brain Transcriptome Single-cell (BTS) Atlas',
    description:
      'Anndata, Seurat object, and Celltypist model for the atlas. Plots for 3,380 neurological disorder risk genes expression profiles are available.',
    image: '/images/codepic/SCN2A_multiplot.png',
    links: [
      { label: 'Zenodo', url: 'https://zenodo.org/records/14177002' },
      { label: 'UCSC Browser', url: 'https://bts-brain-cell-atlas.cells.ucsc.edu/' },
      { label: 'Paper', url: 'https://www.nature.com/articles/s12276-024-01328-6' },
    ],
  },
  {
    name: 'CWAS-Plus',
    description:
      'A new Python package for category-wide association study with better user-interface. Now available via pip install.',
    image: '/images/codepic/cwas.png',
    links: [
      { label: 'GitHub', url: 'https://github.com/joonan-lab/cwas' },
      { label: 'Docs', url: 'https://cwas-plus.readthedocs.io/en/latest/index.html' },
    ],
  },
]

export default function ToolsPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tools' }]} />
        <BilingualText
          en="Code & Datasets"
          ko="코드 & 데이터"
          as="h1"
          className="section-header mb-10"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {TOOLS.map((tool, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <article className="tool-card">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-48 object-contain"
                  style={{ background: 'var(--bg-tertiary)' }}
                  loading="lazy"
                />
                <div className="p-6">
                  <h2
                    className="font-bold text-xl mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {tool.name}
                  </h2>
                  <p
                    className="text-base mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {tool.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill text-sm"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
