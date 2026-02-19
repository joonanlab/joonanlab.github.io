import Link from 'next/link'

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="separator">/</span>}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span className="current" style={{ color: 'var(--text-primary)' }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
