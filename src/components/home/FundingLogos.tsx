'use client'

import { motion } from 'framer-motion'

export function FundingLogos() {
  return (
    <section className="py-12 px-6" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-medium uppercase tracking-widest shrink-0"
            style={{ color: 'var(--text-muted)' }}
          >
            Supported by
          </span>
          <div className="funding-logos flex flex-wrap items-center justify-center gap-8">
            <img src="/images/logopic/Logo_NRF.png" alt="NRF" height={48} loading="lazy" />
            <img src="/images/logopic/logo-NRL.png" alt="NRL" height={48} loading="lazy" />
            <img src="/images/logopic/aws.svg" alt="AWS" height={48} loading="lazy" />
            <img src="/images/logopic/logo-k-bds.png" alt="K-BDS" height={48} loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
