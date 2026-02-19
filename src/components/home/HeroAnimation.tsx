'use client'

import { motion } from 'framer-motion'

const WORDS = [
  { text: 'GENOMICS', x: '-5%', y: '8%', size: 'text-[8rem] sm:text-[12rem] lg:text-[16rem]', delay: 0 },
  { text: '& AI', x: '30%', y: '30%', size: 'text-[7rem] sm:text-[10rem] lg:text-[14rem]', delay: 0.3 },
  { text: 'AUTISM', x: '55%', y: '55%', size: 'text-[5rem] sm:text-[7rem] lg:text-[10rem]', delay: 0.6 },
  { text: 'DNA', x: '-2%', y: '60%', size: 'text-[4rem] sm:text-[6rem] lg:text-[8rem]', delay: 0.8 },
]

export function HeroAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {WORDS.map((word) => (
        <motion.span
          key={word.text}
          className={`absolute font-black tracking-tighter leading-none ${word.size}`}
          style={{
            left: word.x,
            top: word.y,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1.4, delay: word.delay, ease: 'easeOut' }}
        >
          {word.text}
        </motion.span>
      ))}
    </div>
  )
}
