'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LangContext'
import type { NotePost } from '@/lib/data'
import { formatDateEn, formatDateKo } from '@/lib/format'
import { L } from '@/components/site/L'

type NoteListItem = Omit<NotePost, 'content'>

const PER_PAGE = 12
const CATEGORIES = ['All', 'Genomics + AI', 'Essay', 'Lab Notes'] as const
type Category = (typeof CATEGORIES)[number]

const CATEGORY_KO: Record<Category, string> = {
  All: '전체',
  'Genomics + AI': '유전체와 AI',
  Essay: '에세이',
  'Lab Notes': '연구실 노트',
}

export function NotesList({ notes }: { notes: NoteListItem[] }) {
  const { lang } = useLang()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [page, setPage] = useState(1)

  const inLang = useMemo(() => notes.filter((n) => n.lang === 'both' || n.lang === lang), [notes, lang])

  const filtered = useMemo(() => {
    let out = inLang
    if (category !== 'All') out = out.filter((n) => n.category === category)
    const q = search.trim().toLowerCase()
    if (q) {
      out = out.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }
    return out
  }, [inLang, search, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  if (notes.length === 0) return null

  return (
    <div>
      <div className="pub-toolbar-inner" style={{ marginBottom: 8 }}>
        <div className="chip-row" role="group" aria-label={lang === 'ko' ? '분류' : 'Category'}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c)
                setPage(1)
              }}
            >
              {lang === 'ko' ? CATEGORY_KO[c] : c}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="sr-only">{lang === 'ko' ? '노트 검색' : 'Search notes'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder={lang === 'ko' ? '제목, 요약, 태그 검색' : 'Search titles, summaries, tags'}
          />
        </label>
      </div>

      <ul className="rule-list" style={{ marginTop: 24 }}>
        {visible.map((note) => (
          <li key={note.slug}>
            <Link href={`/notes/${note.slug}`} className="row-link note-row">
              <div className="note-row-meta t-meta" style={{ display: 'grid', gap: 2, alignContent: 'start' }}>
                <time>{lang === 'ko' ? formatDateKo(note.date) : formatDateEn(note.date)}</time>
                <span>{lang === 'ko' ? CATEGORY_KO[note.category] : note.category}</span>
              </div>
              <div>
                <h2 className="row-title">{note.title}</h2>
                {note.summary && <p>{note.summary}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="t-body" style={{ padding: '48px 0' }}>
          <L en="No notes match this search." ko="검색 결과가 없습니다." />
        </p>
      )}

      {totalPages > 1 && (
        <nav className="pager" aria-label={lang === 'ko' ? '페이지' : 'Pages'}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              aria-current={p === current ? 'page' : undefined}
              onClick={() => {
                setPage(p)
                window.scrollTo({ top: 0 })
              }}
            >
              {p}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
