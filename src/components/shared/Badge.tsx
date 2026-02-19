export function Badge({
  children,
  variant = 'accent',
}: {
  children: React.ReactNode
  variant?: 'accent' | 'gold'
}) {
  const cls = variant === 'gold' ? 'badge badge-gold' : 'badge badge-accent'
  return <span className={cls}>{children}</span>
}
