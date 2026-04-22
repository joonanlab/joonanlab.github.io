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
    if (noteLang !== lang) {
      router.replace(`/notes/${counterpartSlug}`)
    }
  }, [lang, noteLang, counterpartSlug, router])

  return null
}
