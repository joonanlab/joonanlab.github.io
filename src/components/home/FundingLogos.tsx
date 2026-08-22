'use client'

import Image from 'next/image'
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
            <Image src="/images/logopic/Logo_NRF.png" alt="NRF" width={96} height={48} />
            <Image src="/images/logopic/logo-NRL.png" alt="NRL" width={109} height={48} />
            <Image src="/images/logopic/aws.svg" alt="AWS" width={70} height={48} />
            <Image src="/images/logopic/logo-k-bds.png" alt="K-BDS" width={306} height={48} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
