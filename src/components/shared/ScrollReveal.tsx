import type { ReactNode } from 'react'

/**
 * Formerly a fade-up on scroll. Content now renders immediately; the
 * wrapper is kept so existing pages do not need to change their markup.
 */
export function ScrollReveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return <div className={className}>{children}</div>
}
