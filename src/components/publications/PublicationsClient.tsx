'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Publication } from '@/lib/data'
import { generateBibtex } from '@/lib/bibtex'

export function PublicationsClient({ publications }: { publications: Publication[] }) {
  const [search, setSearch] = useState('')
  const [yearFilter, setYearFilter] = useState<number | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [highlightOnly, setHighlightOnly] = useState(false)
  const [openBibtex, setOpenBibtex] = useState<number | null>(null)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const years = useMemo(() => {
    const set = new Set(publications.map((p) => p.year))
    return [...set].sort((a, b) => b - a)
  }, [publications])

  const types = useMemo(() => {
    const set = new Set(publications.map((p) => p.type))
    return [...set].sort()
  }, [publications])

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      if (yearFilter && p.year !== yearFilter) return false
      if (typeFilter && p.type !== typeFilter) return false
      if (highlightOnly && p.highlight !== 1) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q) ||
          p.journal.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [publications, search, yearFilter, typeFilter, highlightOnly])

  const handleCopy = async (idx: number, pub: Publication) => {
    const bibtex = generateBibtex(pub)
    await navigator.clipboard.writeText(bibtex)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-base"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          placeholder="Search publications..."
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setHighlightOnly(!highlightOnly)}
          className={`pill ${highlightOnly ? 'active' : ''}`}
        >
          <span className="en-only">Highlighted</span>
          <span className="ko-only">주요 논문</span>
        </button>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(typeFilter === t ? null : t)}
            className={`pill ${typeFilter === t ? 'active' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setYearFilter(null)}
          className={`pill ${yearFilter === null ? 'active' : ''}`}
        >
          <span className="en-only">All Years</span>
          <span className="ko-only">전체 연도</span>
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYearFilter(yearFilter === y ? null : y)}
            className={`pill ${yearFilter === y ? 'active' : ''}`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-base mb-4" style={{ color: 'var(--text-muted)' }}>
        {filtered.length} publication{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Publication list */}
      <div className="space-y-3">
        {filtered.map((pub, i) => (
          <motion.div
            key={i}
            className={`pub-card ${pub.highlight === 1 ? 'highlighted' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.5) }}
          >
            <div className="flex gap-4">
              {pub.highlight === 1 && pub.image && (
                <img
                  src={`/images/pubpic/${pub.image}`}
                  alt=""
                  className="w-24 h-24 object-contain shrink-0 rounded hidden sm:block"
                  loading="lazy"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-base" style={{ color: 'var(--text-primary)' }}>
                  {pub.title}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {pub.authors.length > 120
                    ? pub.authors.slice(0, 120) + '...'
                    : pub.authors}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {pub.journal} ({pub.year})
                  {pub.vol && `, ${pub.vol}`}
                  {pub.issue && `(${pub.issue})`}
                  {pub.page && `: ${pub.page}`}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {pub.link.url && (
                    <a
                      href={pub.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill text-sm"
                    >
                      Link
                    </a>
                  )}
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill text-sm"
                    >
                      DOI
                    </a>
                  )}
                  <button
                    onClick={() => setOpenBibtex(openBibtex === i ? null : i)}
                    className="pill text-sm"
                  >
                    BibTeX
                  </button>
                  {openBibtex === i && (
                    <button
                      onClick={() => handleCopy(i, pub)}
                      className="pill text-sm"
                    >
                      {copiedIdx === i ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                {openBibtex === i && (
                  <pre
                    className="mt-2 p-3 rounded-lg text-sm overflow-x-auto"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {generateBibtex(pub)}
                  </pre>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
