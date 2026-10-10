import { splitAuthors } from '@/lib/format'

export function Authors({ authors }: { authors: string }) {
  return (
    <>
      {splitAuthors(authors).map((part, i) =>
        part.me ? (
          <span key={i} className="me">
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  )
}
