import type { ReactNode } from 'react'

interface PageHeaderProps {
  /** Small label above the title, e.g. the section name. */
  label?: ReactNode
  title: ReactNode
  lead?: ReactNode
  /** Extra content under the lead (links, filters, meta). */
  children?: ReactNode
  /** Constrain to the reading column used by long-form pages. */
  narrow?: boolean
}

export function PageHeader({ label, title, lead, children, narrow = false }: PageHeaderProps) {
  return (
    <header className="page-head">
      <div className={narrow ? 'container-text' : 'container'}>
        <div className="page-head-inner">
          {label && <p className="t-label">{label}</p>}
          <h1 className="t-h1">{title}</h1>
          {lead && <p className="t-lead">{lead}</p>}
          {children}
        </div>
      </div>
    </header>
  )
}
