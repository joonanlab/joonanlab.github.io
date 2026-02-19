import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BilingualText } from '@/components/shared/BilingualText'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research at An Lab - deep learning for noncoding genome, AI-driven virtual cells, autism genetics, and integrative multi-omics.',
}

const RESEARCH_AREAS = [
  {
    titleEn: 'Deep Learning to Understand Regulatory Pattern in Noncoding Genome',
    titleKo: '비암호화 유전체의 조절 패턴 이해를 위한 딥러닝',
    contentEn: `Our lab develops and applies DNA language models — deep learning foundation models that treat DNA sequences as a language to learn the regulatory grammar of the genome — to study noncoding regulatory mutations associated with autism and other neurodevelopmental disorders. We've developed the CWAS framework (<a href="https://academic.oup.com/bib/article/25/4/bbae323/7706421" target="_blank" rel="noopener" class="text-link">Kim et al. 2024</a>) to analyze whole genome sequencing data from autism families. Currently, we're integrating single-cell multiomics datasets from developing human brains to further refine our approach. By leveraging DNA language models, we aim to systematically interpret noncoding mutations and their regulatory effects on neurodevelopment.`,
    contentKo: `본 연구실은 DNA 언어모델 — DNA 서열을 언어로 취급하여 유전체의 조절 문법을 학습하는 딥러닝 파운데이션 모델 — 을 개발·활용하여 자폐 및 신경발달장애와 관련된 비암호화 조절 돌연변이를 연구합니다. 자폐 가족의 전장 유전체 서열 분석 데이터를 분석하기 위해 CWAS 프레임워크(<a href="https://academic.oup.com/bib/article/25/4/bbae323/7706421" target="_blank" rel="noopener" class="text-link">Kim et al. 2024</a>)를 개발하였습니다. 현재 발달 중인 인간 뇌의 단일세포 멀티오믹스 데이터셋을 통합하여 접근법을 고도화하고 있습니다.`,
    image: '/images/respic/deep_learning_noncoding.png',
    imageAlt: 'Deep learning for noncoding genome',
    color: 'var(--accent)',
    reverse: false,
  },
  {
    titleEn: 'AI-Driven Virtual Cell to Risk Gene Discovery and Regulatory Interaction',
    titleKo: 'AI 기반 가상 세포를 통한 위험 유전자 발굴 및 조절 상호작용 연구',
    contentEn: `Our research focuses on building a large-scale single-cell RNA sequencing atlas to comprehensively map cellular states and gene regulatory networks across various biological systems. By integrating LLM-based foundation models, we develop an AI-driven virtual cell (AIVC) that enables the discovery of novel risk genes and their functional interactions. Through this approach, we systematically identify core gene regulatory networks and predict disease-associated mechanisms, with applications in neurodevelopmental disorders and autism.`,
    contentKo: `본 연구는 다양한 생물학적 시스템에서 세포 상태와 유전자 조절 네트워크를 포괄적으로 매핑하기 위한 대규모 단일세포 RNA 시퀀싱 아틀라스 구축에 중점을 둡니다. LLM 기반 파운데이션 모델을 통합하여 새로운 위험 유전자와 기능적 상호작용을 발굴하는 AI 기반 가상 세포(AIVC)를 개발하고 있습니다.`,
    image: '/images/respic/virtual_cell.png',
    imageAlt: 'Virtual cell',
    color: 'var(--accent-gold)',
    reverse: true,
  },
  {
    titleEn: 'Genetic Architecture of Autism in Korea',
    titleKo: '한국인 자폐의 유전적 구조',
    contentEn: `Our lab investigates the genetic architecture of autism with a particular focus on East Asian populations, leveraging long-read whole genome sequencing to uncover previously inaccessible genomic variations. Since establishing our research group at Korea University in 2019, we have concentrated on exploring the genetic architecture of autism in Korean families. Our investigations encompass a wide range of genetic factors, including common, rare, and de novo variants, which we are analyzing within one of the largest East Asian cohorts for autism. Notably, our research has recently revealed sex-specific patterns in genetic risk factors among Korean autism families (<a href="https://link.springer.com/article/10.1186/s13073-024-01385-6" target="_blank" rel="noopener" class="text-link">Kim et al. 2024, Genome Medicine</a>; <a href="https://genomemedicine.biomedcentral.com/articles/10.1186/s13073-025-01532-7" target="_blank" rel="noopener" class="text-link">Kim et al. 2025, Genome Medicine</a>).`,
    contentKo: `본 연구실은 동아시아 인구집단에 초점을 맞추어 자폐의 유전적 구조를 연구하며, 롱리드 전장 유전체 시퀀싱을 활용하여 기존에 접근하기 어려웠던 유전체 변이를 발굴합니다. 2019년 고려대학교에 연구그룹을 설립한 이후, 한국 자폐 가족의 유전적 구조 탐구에 집중하고 있습니다. 최근 연구에서는 한국 자폐 가족의 유전적 위험 인자에서 성별 특이적 패턴을 밝혀내었습니다 (<a href="https://link.springer.com/article/10.1186/s13073-024-01385-6" target="_blank" rel="noopener" class="text-link">Kim et al. 2024, Genome Medicine</a>; <a href="https://genomemedicine.biomedcentral.com/articles/10.1186/s13073-025-01532-7" target="_blank" rel="noopener" class="text-link">Kim et al. 2025, Genome Medicine</a>).`,
    image: '/images/respic/autism_architecture.png',
    imageAlt: 'Autism architecture',
    color: 'var(--accent)',
    reverse: false,
  },
  {
    titleEn: 'Integrative Multi-omics Approaches to Understand Complex Disorder',
    titleKo: '복합 질환 이해를 위한 통합 멀티오믹스 접근법',
    contentEn: `Our research explores the extreme genetic heterogeneity underlying complex human disorders through integrative multi-omics approaches. We have integrated large-scale whole-genome sequencing and transcriptomics datasets of human post-mortem cortex across fetal to adult stages (<a href="https://www.sciencedirect.com/science/article/pii/S2211124720303673" target="_blank" rel="noopener" class="text-link">Werling et al. 2020</a>), and developed an integrative single-cell atlas to explore the cellular and temporal specificity of neurological disorder genes during human brain development (<a href="https://www.nature.com/articles/s12276-024-01328-6" target="_blank" rel="noopener" class="text-link">Kim et al. 2024</a>). In addition, we have developed proteogenomic analytical frameworks for multi-omics analysis of Korean cancer patients (<a href="https://www.nature.com/articles/s41467-024-54434-4" target="_blank" rel="noopener" class="text-link">Song et al. 2024</a>).`,
    contentKo: `본 연구는 통합 멀티오믹스 접근법을 활용하여 복합 인간 질환의 극도의 유전적 이질성을 탐구합니다. 태아기부터 성인기까지의 인간 사후 피질 대규모 전장 유전체 시퀀싱 및 전사체 데이터셋을 통합하였으며(<a href="https://www.sciencedirect.com/science/article/pii/S2211124720303673" target="_blank" rel="noopener" class="text-link">Werling et al. 2020</a>), 인간 뇌 발달 과정에서 신경학적 질환 유전자의 세포 및 시간적 특이성을 탐구하기 위한 통합 단일세포 아틀라스를 개발하였습니다(<a href="https://www.nature.com/articles/s12276-024-01328-6" target="_blank" rel="noopener" class="text-link">Kim et al. 2024</a>).`,
    image: '/images/respic/multiomics.png',
    imageAlt: 'Multi-omics',
    color: 'var(--accent-gold)',
    reverse: true,
  },
]

export default function ResearchPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Research' }]} />
        <BilingualText
          en="Research"
          ko="연구"
          as="h1"
          className="section-header mb-12"
        />

        <div className="space-y-16">
          {RESEARCH_AREAS.map((area, i) => (
            <ScrollReveal key={i}>
              <section>
                <div
                  className={`flex flex-col ${area.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-start`}
                >
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: area.color }}>
                      <span className="en-only">{area.titleEn}</span>
                      <span className="ko-only">{area.titleKo}</span>
                    </h2>
                    <div style={{ color: 'var(--text-secondary)' }} className="leading-relaxed text-base">
                      <span
                        className="en-only"
                        dangerouslySetInnerHTML={{ __html: area.contentEn }}
                      />
                      <span
                        className="ko-only"
                        dangerouslySetInnerHTML={{ __html: area.contentKo }}
                      />
                    </div>
                  </div>
                  <img
                    src={area.image}
                    alt={area.imageAlt}
                    className="w-full md:w-80 h-auto rounded-lg"
                    style={{ border: '1px solid var(--border)' }}
                    loading="lazy"
                  />
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
