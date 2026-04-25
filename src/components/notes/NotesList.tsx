'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LangContext'
import type { NotePost } from '@/lib/data'

type NoteListItem = Omit<NotePost, 'content'>

const PER_PAGE = 10
const CATEGORIES = ['All', 'Genomics + AI', 'Essay', 'Lab Notes'] as const
type Category = typeof CATEGORIES[number]

const CAT_VAR: Record<string, string> = {
  'Genomics + AI': 'var(--cat-genomics)',
  'Essay':         'var(--cat-essay)',
  'Lab Notes':     'var(--cat-notes)',
}

export function NotesList({ notes }: { notes: NoteListItem[] }) {
  const { lang } = useLang()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let out = notes.filter((n) => n.lang === 'both' || n.lang === lang)
    if (category !== 'All') out = out.filter((n) => n.category === category)
    if (search) {
      const q = search.toLowerCase()
      out = out.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return out
  }, [notes, search, lang, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const featured = page === 1 && category === 'All' && !search ? paginated[0] : null
  const rest = featured ? paginated.slice(1) : paginated

  const resetPage = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v)
    setPage(1)
  }

  if (notes.length === 0) return null

  return (
    <div className="mb-16">
      {/* Controls */}
      <div className="notes-controls">
        <div className="notes-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => resetPage(setSearch)(e.target.value)}
            placeholder={lang === 'ko' ? '검색...' : 'Search posts, tags, ideas...'}
          />
        </div>
        <div className="notes-tabs" role="tablist">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              className={category === c ? 'active' : ''}
              onClick={() => resetPage(setCategory)(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Meta bar */}
      <div className="notes-meta-bar">
        <span>Writing · {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}</span>
        <span style={{ textTransform: 'none', letterSpacing: 0 }}>Sort: Newest</span>
      </div>

      {/* Grid */}
      <div className="notes-grid">
        {featured && (
          <Link href={`/notes/${featured.slug}`} className="note-featured">
            <span className="note-featured-pill">
              <span className="star">★</span> Featured · {featured.category}
            </span>
            <h3>{featured.title}</h3>
            <p className="note-featured-summary">{featured.summary}</p>
            <div className="note-featured-meta">
              <span>{featured.date}</span>
              <span>·</span>
              <span className="note-featured-cta">Read note →</span>
            </div>
          </Link>
        )}

        {rest.map((note, i) => (
          <motion.div
            key={note.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            style={{ display: 'contents' }}
          >
            <Link
              href={`/notes/${note.slug}`}
              className="note-card"
              style={{ '--cat-color': CAT_VAR[note.category] } as React.CSSProperties}
            >
              <div className="note-card-meta">
                <span className="note-card-cat">
                  <span className="dot" style={{ background: CAT_VAR[note.category] }} />
                  {note.category}
                </span>
                <span>·</span>
                <span>{note.date}</span>
              </div>
              <h3>{note.title}</h3>
              {note.summary && <p className="note-card-summary">{note.summary}</p>}
              {note.tags.length > 0 && (
                <div className="note-card-tags">
                  {note.tags.slice(0, 3).map((t) => (
                    <span key={t} className="note-card-tag">{t}</span>
                  ))}
                </div>
              )}
            </Link>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="notes-empty">
            {lang === 'ko' ? '검색 결과가 없습니다.' : 'No notes found.'}
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: p === page ? 'var(--accent)' : 'var(--bg-secondary)',
                color: p === page ? '#fff' : 'var(--text-secondary)',
                border: '1px solid transparent',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
