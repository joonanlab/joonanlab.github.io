export function BilingualText({
  en,
  ko,
  as: Tag = 'span',
  className = '',
}: {
  en: string
  ko: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'
  className?: string
}) {
  return (
    <Tag className={className}>
      <span className="en-only">{en}</span>
      <span className="ko-only">{ko}</span>
    </Tag>
  )
}
