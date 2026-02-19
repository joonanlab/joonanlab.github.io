'use client'

import { useLang } from '@/contexts/LangContext'
import type { Translations } from '@/lib/data'

export function T({
  k,
  translations,
  className = '',
}: {
  k: string
  translations: Translations
  className?: string
}) {
  const { lang } = useLang()
  const entry = translations[k]
  if (!entry) return <span className={className}>{k}</span>
  return <span className={className}>{entry[lang]}</span>
}
