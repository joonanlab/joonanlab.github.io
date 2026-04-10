'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LangContext'
import type { NotePost } from '@/lib/data'

type NoteListItem = Omit<NotePost, 'content'>

const PER_PAGE = 10

export function NotesList({ notes }: { notes: NoteListItem[] }) {
  const { lang } = useLang()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const langFiltered = notes.filter(
      (n) => n.lang === 'both' || n.lang === lang
    )
    if (!search) return langFiltered
    const q = search.toLowerCase()
    return langFiltered.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [notes, search, lang])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  if (notes.length === 0) {
    return null
  }

  return (
    <div className="mb-16">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-base"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          placeholder="Search notes..."
        />
      </div>

      {/* Notes list */}
      <div className="space-y-1">
        {paginated.map((note, i) => (
          <motion.div
            key={note.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
          >
            <Link
              href={`/notes/${note.slug}`}
              className="flex items-baseline gap-4 py-3 px-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span
                className="text-sm shrink-0 tabular-nums"
                style={{ color: 'var(--text-muted)', minWidth: '5.5rem' }}
              >
                {note.date}
              </span>
              <span className="text-base font-medium truncate">
                {note.title}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
          <span className="en-only">No notes found.</span>
          <span className="ko-only">검색 결과가 없습니다.</span>
        </p>
      )}

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
