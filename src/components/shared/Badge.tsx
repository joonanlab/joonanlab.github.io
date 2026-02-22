export function Badge({
  children,
  variant = 'accent',
}: {
  children: React.ReactNode
  variant?: 'accent' | 'gold' | 'blue' | 'green' | 'crimson'
}) {
  const clsMap = {
    accent: 'badge badge-accent',
    gold: 'badge badge-gold',
    blue: 'badge badge-blue',
    green: 'badge badge-green',
    crimson: 'badge badge-crimson',
  }
  return <span className={clsMap[variant]}>{children}</span>
}
