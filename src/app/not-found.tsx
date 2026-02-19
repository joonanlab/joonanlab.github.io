import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 px-6 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: 'var(--accent)' }}
        >
          404
        </h1>
        <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
          Page not found
        </p>
        <Link
          href="/"
          className="pill"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
