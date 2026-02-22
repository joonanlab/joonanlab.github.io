'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const RESEARCH_AREAS = [
  {
    en: 'Deep Learning for Noncoding Genome',
    ko: '비암호화 유전체를 위한 딥러닝',
    descEn:
      'Using LLMs and deep learning to study noncoding regulatory mutations in autism and neurodevelopmental disorders.',
    descKo:
      'LLM과 딥러닝을 활용하여 자폐 및 신경발달장애의 비암호화 조절 돌연변이를 연구합니다.',
    color: 'var(--accent)',
    icon: (
      <Image src="/images/brain-network.png" alt="Brain network" width={48} height={48} className="w-12 h-12 research-icon" />
    ),
    // Bento: col-span-2 row-span-2, hero card
    gridClass: 'lg:col-span-4 lg:row-span-2',
    isHero: true,
    initial: { opacity: 0, x: -30 },
    delay: 0,
  },
  {
    en: 'AI-Driven Virtual Cell',
    ko: 'AI 기반 가상 세포',
    descEn:
      'Building large-scale scRNA-seq atlas and AI-driven virtual cell for risk gene discovery.',
    descKo:
      '대규모 단일세포 RNA 시퀀싱 아틀라스와 AI 기반 가상 세포를 구축하여 위험 유전자를 발굴합니다.',
    color: 'var(--accent)',
    icon: (
      <Image src="/images/virtual-cell.png" alt="Virtual cell" width={48} height={48} className="w-12 h-12 research-icon" />
    ),
    gridClass: 'lg:col-span-3',
    isHero: false,
    initial: { opacity: 0, y: -20 },
    delay: 0.12,
  },
  {
    en: 'Genetic Architecture of Autism',
    ko: '자폐의 유전적 구조',
    descEn:
      'Investigating autism genetics in East Asian populations with long-read WGS and one of the largest Korean cohorts.',
    descKo:
      '롱리드 전장 유전체 시퀀싱과 동아시아 최대 규모 코호트를 활용하여 자폐 유전학을 연구합니다.',
    color: 'var(--accent-gold)',
    icon: (
      <Image src="/images/genetics-autism.png" alt="Genetic architecture of autism" width={48} height={48} className="w-12 h-12 research-icon" />
    ),
    gridClass: 'lg:col-span-3',
    isHero: false,
    initial: { opacity: 0, x: 30 },
    delay: 0.24,
  },
  {
    en: 'Integrative Multi-omics',
    ko: '통합 멀티오믹스',
    descEn:
      'Systems approaches integrating genomics, transcriptomics, and proteomics to understand complex disorders.',
    descKo:
      '유전체학, 전사체학, 단백질체학을 통합하는 시스템 접근법으로 복합 질환을 이해합니다.',
    color: 'var(--accent-gold)',
    icon: (
      <Image src="/images/multi-omics.png" alt="Integrative multi-omics" width={48} height={48} className="w-12 h-12 research-icon" />
    ),
    gridClass: 'lg:col-span-6',
    isHero: false,
    initial: { opacity: 0, y: 30 },
    delay: 0.36,
  },
]

export function ResearchHighlights() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="en-only">Research Highlights</span>
          <span className="ko-only">연구 하이라이트</span>
        </motion.h2>
        <motion.p
          className="section-subtitle text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="en-only">Four core research themes driving our lab</span>
          <span className="ko-only">연구실을 이끄는 네 가지 핵심 연구 주제</span>
        </motion.p>

        {/* Bento Grid: 5 columns — hero(2) + right(3), auto rows ~200px */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 lg:auto-rows-[200px] gap-4 mt-10">
          {RESEARCH_AREAS.map((area) => (
            <motion.div
              key={area.en}
              className={area.gridClass}
              initial={area.initial}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: area.delay }}
            >
              <Link
                href="/research"
                className={`bento-card block h-full ${area.isHero ? 'bento-card-hero' : ''}`}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-3" style={{ color: area.color }}>
                      {area.icon}
                    </div>
                    <h3
                      className={`font-semibold mb-2 ${area.isHero ? 'text-2xl lg:text-3xl' : 'text-lg'}`}
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span className="en-only">{area.en}</span>
                      <span className="ko-only">{area.ko}</span>
                    </h3>
                  </div>
                  <p
                    className={`${area.isHero ? 'text-base' : 'text-sm'} leading-relaxed`}
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="en-only">{area.descEn}</span>
                    <span className="ko-only">{area.descKo}</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
