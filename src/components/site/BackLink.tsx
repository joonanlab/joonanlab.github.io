import Link from 'next/link'
import type { ReactNode } from 'react'

/** Small "up one level" link shown above a detail page's title. */
export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className="t-meta" style={{ marginBottom: 20 }}>
      <Link href={href} className="text-link" style={{ textDecoration: 'none' }}>
        {children}
      </Link>
    </p>
  )
}
