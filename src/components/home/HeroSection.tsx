'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { HeroAnimation } from './HeroAnimation'

export function HeroSection() {
  return (
    <section className="hero-section relative" style={{ minHeight: '60vh' }}>
      <div className="hero-gradient" />
      <HeroAnimation />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="en-only">Genomics &amp; AI for Understanding Human Disease</span>
          <span className="ko-only">AI와 유전체 기술을 활용한 인간 질환 연구</span>
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          An Lab, Korea University
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/team"
            className="px-8 py-4 text-lg font-semibold rounded-xl transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            <span className="en-only">Meet Our Team</span>
            <span className="ko-only">팀 소개</span>
          </Link>
          <Link
            href="/publications"
            className="px-8 py-4 text-lg font-semibold rounded-xl transition-colors"
            style={{
              border: '1px solid var(--border-hover)',
              color: 'var(--text-primary)',
            }}
          >
            <span className="en-only">View Publications</span>
            <span className="ko-only">논문 보기</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
