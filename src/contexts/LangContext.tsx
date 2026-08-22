'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Lang = 'en' | 'ko'
const LANG_STORAGE_KEY = 'lang'

interface LangContextValue {
  lang: Lang
  toggleLang: () => void
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  toggleLang: () => {},
})

function isLang(value: string | null): value is Lang {
  return value === 'ko' || value === 'en'
}

function getStoredLang() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY)
    return isLang(stored) ? stored : null
  } catch {
    return null
  }
}

function getBrowserLang(): Lang {
  const primary =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages[0]
      : navigator.language

  return /^ko(?:-|$)/i.test(primary || '') ? 'ko' : 'en'
}

function applyDocumentLang(next: Lang) {
  document.documentElement.lang = next
  document.documentElement.dataset.lang = next
  document.body.classList.toggle('lang-ko', next === 'ko')
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const next = getStoredLang() ?? getBrowserLang()
    // SSR always renders 'en'; the stored/browser language is only knowable
    // on the client, so this one-shot mount sync is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(next)
    applyDocumentLang(next)
  }, [])

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ko' : 'en'
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next)
      } catch {
        // Ignore storage failures; the in-memory language still changes.
      }
      applyDocumentLang(next)
      return next
    })
  }, [])

  return <LangContext.Provider value={{ lang, toggleLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
