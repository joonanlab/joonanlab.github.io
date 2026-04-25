'use client'

/**
 * LegacyChrome — wraps page content with the existing Navbar/Footer/BackToTop
 * unless the route owns its own chrome (the v2-redesigned pages).
 *
 * Each PR in the redesign migration adds its route to REDESIGNED_ROUTES.
 * Once every route is migrated this component can be deleted.
 */

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/layout/BackToTop'

const REDESIGNED_EXACT = new Set<string>([
  '/',
  '/research',
  '/team',
  '/publications',
  '/join',
  '/notes',
  '/alumni',
  '/contact',
  '/karc',
  '/news',
  '/tools',
])

// Sub-routes that own their own chrome (e.g. /notes/[slug], /team/[slug]).
const REDESIGNED_PREFIXES = ['/notes/', '/team/']

export function LegacyChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const ownsChrome =
    REDESIGNED_EXACT.has(pathname) ||
    REDESIGNED_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (ownsChrome) {
    return <main id="main-content">{children}</main>
  }

  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
    </>
  )
}
