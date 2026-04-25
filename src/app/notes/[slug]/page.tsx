import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllNoteSlugs, getNoteBySlug } from '@/lib/data'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { NoteLangRedirect } from '@/components/notes/NoteLangRedirect'
import { RedesignChrome } from '@/components/redesign/RedesignChrome'

function getCounterpartSlug(slug: string): string | null {
  const all = new Set(getAllNoteSlugs())
  const candidate = slug.endsWith('-en') ? slug.slice(0, -3) : `${slug}-en`
  return all.has(candidate) ? candidate : null
}

export function generateStaticParams() {
  return getAllNoteSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const note = await getNoteBySlug(slug)
  if (!note) return { title: 'Not Found' }
  return {
    title: note.title,
    description: note.summary,
  }
}

export default async function NotePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = await getNoteBySlug(slug)
  if (!note) notFound()
  const counterpartSlug = getCounterpartSlug(slug)

  return (
    <RedesignChrome>
    <div className="pt-16 pb-16 px-6">
      <NoteLangRedirect noteLang={note.lang} counterpartSlug={counterpartSlug} />
      <div className="max-w-3xl mx-auto">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Notes', href: '/notes' },
          { label: note.title },
        ]} />

        <article>
          {/* Header */}
          <header className="mb-10">
            <h1
              className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {note.title}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {note.date}
            </p>
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div
            className="note-content"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </article>

        {/* Back link */}
        <div className="mt-12 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
          <Link
            href="/notes"
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            &larr; Back to Notes
          </Link>
        </div>
      </div>
    </div>
    </RedesignChrome>
  )
}
