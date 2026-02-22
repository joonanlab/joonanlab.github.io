'use client'

import { motion } from 'framer-motion'

const WORDS: { text: string; x: string; y: string; size: string; delay: number; centered?: boolean; opacity: number; gradient: string }[] = [
  { text: 'AI', x: '5%', y: '5%', size: 'text-[7rem] sm:text-[10rem] lg:text-[14rem]', delay: 0, opacity: 0.35, gradient: 'linear-gradient(135deg, var(--accent), var(--accent-gold))' },
  { text: 'VIRTUAL\nCELL', x: '48%', y: '8%', size: 'text-[5rem] sm:text-[7rem] lg:text-[10rem]', delay: 0.3, centered: true, opacity: 0.22, gradient: 'linear-gradient(135deg, var(--accent-gold), var(--accent))' },
  { text: 'AUTISM', x: '60%', y: '70%', size: 'text-[5rem] sm:text-[7rem] lg:text-[10rem]', delay: 0.6, opacity: 0.18, gradient: 'linear-gradient(135deg, #6b4c8a, var(--accent))' },
  { text: 'MULTIOMICS', x: '5%', y: '65%', size: 'text-[4rem] sm:text-[6rem] lg:text-[8rem]', delay: 0.8, opacity: 0.12, gradient: 'linear-gradient(135deg, var(--accent-gold), #4a6e8a)' },
]

export function HeroAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {WORDS.map((word) => (
        <motion.span
          key={word.text}
          className={`absolute font-black tracking-tighter leading-none ${word.size} ${word.centered ? 'text-center whitespace-pre-line' : ''}`}
          style={{
            left: word.x,
            top: word.y,
            background: word.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'blur(0.5px)',
            textShadow: '0 0 40px rgba(196, 30, 58, 0.3), 0 0 80px rgba(196, 154, 60, 0.15)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: word.opacity, y: 0 }}
          transition={{ duration: 1.4, delay: word.delay, ease: 'easeOut' }}
        >
          {word.text}
        </motion.span>
      ))}
    </div>
  )
}
