import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'K-ARC Consortium',
  description: 'Korean Autism Research Consortium (K-ARC) - advancing autism research through genomic and multi-omics approaches.',
}

export default function KARCPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'K-ARC' }]} />

        <ScrollReveal>
          <div className="flex items-center gap-6 mb-8">
            <img
              src="/images/logopic/logo-K-ARC.png"
              alt="K-ARC Logo"
              className="h-20 w-auto"
              loading="lazy"
            />
            <h1 className="section-header">Korean Autism Research Consortium (K-ARC)</h1>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="card mb-8">
            <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              The Korean Autism Research Consortium (K-ARC) is a collaborative initiative led by
              Dr. Hee Jeong Yoo at Seoul National University Bundang Hospital, bringing together
              leading researchers to advance autism spectrum disorder research through comprehensive
              genomic and multi-omics approaches. The consortium includes Dr. Eunjoon Kim (Synaptic
              Brain Dysfunctions, Institute for Basic Science), who provided early large seed
              funding for genomic resources. Dr. Joon-Yong An (Korea University) leads genomics
              analysis of whole-genome sequencing data.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Clinicians Drs. So Hyun (Sophy) Kim (Korea University), Mi Ae Oh (Kyung Hee
              University), and Jae Hyun Han (Seoul National University Bundang Hospital) conduct
              clinical and behavioral assessment. Drs. Yong-Seok Lee (Seoul National University),
              Eunha Kim (Korea University) and Dae-Ki Lee (Ewha Womans University) conduct animal
              model studies. Drs. Jae Sang Kim (Ewha Womans University), Woong Sun (Korea
              University) and Ji Yeon Lee (Seoul National University) conduct organoid research.
              Additional collaborators include Drs. Ilbin Kim (Gangnam CHA Hospital), Min-Sik Kim
              (DGIST), Jun Kim (Chungnam National University), Hong-Hee Won (Sungkyunkwan
              University), Woo-Jae Myung (Seoul National University Bundang Hospital), and Minji
              Jeon (Korea University) for genomics/multiomics analysis and AI model development.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
              Cohort &amp; Key Findings
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              K-ARC has established one of the largest autism whole-genome sequencing cohorts of
              East Asian ancestry, with over 1,000 Korean families, enabling discoveries in genetic
              architecture underlying Korean ASD families.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
              Key Publications
            </h2>
            <div className="space-y-3">
              <a
                href="https://genomemedicine.biomedcentral.com/articles/10.1186/s13073-025-01532-7"
                target="_blank"
                rel="noopener noreferrer"
                className="pub-card highlighted block"
              >
                <p className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Kim et al. 2025, Genome Medicine
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Within-family analysis: de novo PTV and missense variants show stronger
                  phenotypic effects accounting for familial background.
                </p>
              </a>
              <a
                href="https://genomemedicine.biomedcentral.com/articles/10.1186/s13073-024-01385-6"
                target="_blank"
                rel="noopener noreferrer"
                className="pub-card highlighted block"
              >
                <p className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Kim et al. 2024, Genome Medicine
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Sex differences and familial patterns contributing to phenotypic diversity in
                  autism.
                </p>
              </a>
              <a
                href="https://academic.oup.com/bib/article/25/4/bbae323/7706421"
                target="_blank"
                rel="noopener noreferrer"
                className="pub-card block"
              >
                <p className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Kim et al. 2024, Briefings in Bioinformatics
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  CWAS-Plus: identifying noncoding variant associations.
                </p>
              </a>
              <a
                href="https://onlinelibrary.wiley.com/doi/10.1111/pcn.13676"
                target="_blank"
                rel="noopener noreferrer"
                className="pub-card block"
              >
                <p className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Kim et al. 2024, Psychiatry and Clinical Neurosciences
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Short tandem repeat expansions in East Asian ASD cases.
                </p>
              </a>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
              International Collaborations
            </h2>
            <div className="card">
              <ul className="text-base space-y-2" style={{ color: 'var(--text-secondary)' }}>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>Stephan Sanders</strong> -
                  University of Oxford
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>Donna Werling</strong> -
                  University of Wisconsin-Madison
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    Brett Trost &amp; Stephen Scherer
                  </strong>{' '}
                  - SickKids Hospital
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    Anders D. B&oslash;rglum &amp; Jakob Grove
                  </strong>{' '}
                  - iPSYCH, Aarhus University, Denmark
                </li>
              </ul>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
