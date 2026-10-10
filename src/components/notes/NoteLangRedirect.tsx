'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '@/contexts/LangContext'

export function NoteLangRedirect({
  noteLang,
  counterpartSlug,
}: {
  noteLang: 'en' | 'ko' | 'both'
  counterpartSlug: string | null
}) {
  const { lang } = useLang()
  const router = useRouter()

  useEffect(() => {
    if (!counterpartSlug) return
    if (noteLang === 'both') return
    // LangProvider starts at 'en' and switches after mount; the pre-hydration
    // script has already written the real choice to <html data-lang>.
    const current = document.documentElement.dataset.lang === 'ko' ? 'ko' : lang
    if (noteLang !== current) {
      router.replace(`/notes/${counterpartSlug}`)
    }
  }, [lang, noteLang, counterpartSlug, router])

  return null
}
