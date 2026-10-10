import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllNoteSlugs, getNoteBySlug } from '@/lib/data'
import { NoteLangRedirect } from '@/components/notes/NoteLangRedirect'
import { L } from '@/components/site/L'
import { formatDateEn, formatDateKo } from '@/lib/format'

const CATEGORY_KO: Record<string, string> = {
  'Genomics + AI': '유전체와 AI',
  Essay: '에세이',
  'Lab Notes': '연구실 노트',
}

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
    <>
    <div className="doc-page">
      <NoteLangRedirect noteLang={note.lang} counterpartSlug={counterpartSlug} />
      <div className="container-text">

        <article>
          <header style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
            <p className="t-meta" style={{ display: 'flex', gap: 12 }}>
              <Link href="/notes" className="text-link" style={{ textDecoration: 'none' }}>
                <L en="Notes" ko="노트" />
              </Link>
              <span>
                <L en={note.category} ko={CATEGORY_KO[note.category] ?? note.category} />
              </span>
            </p>
            <h1 className="t-h1" style={{ fontSize: 'clamp(2rem, 1.4rem + 2.2vw, 3rem)' }}>
              {note.title}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 16px' }}>
              <time className="t-meta" dateTime={note.date}>
                <L en={formatDateEn(note.date)} ko={formatDateKo(note.date)} />
              </time>
            </div>
          </header>

          <div className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />
        </article>

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
          <Link href="/notes" className="link-arrow">
            <L en="All notes" ko="노트 전체" />
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
