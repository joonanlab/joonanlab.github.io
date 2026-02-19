'use client'

import { motion } from 'framer-motion'

export function SectionHeader({
  children,
  className = '',
  center = false,
}: {
  children: React.ReactNode
  className?: string
  center?: boolean
}) {
  return (
    <motion.h2
      className={`section-header ${center ? 'text-center' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  )
}
