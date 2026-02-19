'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Lang = 'en' | 'ko'

interface LangContextValue {
  lang: Lang
  toggleLang: () => void
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  toggleLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'ko' || stored === 'en') {
      setLang(stored)
      if (stored === 'ko') document.body.classList.add('lang-ko')
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ko' : 'en'
      localStorage.setItem('lang', next)
      if (next === 'ko') {
        document.body.classList.add('lang-ko')
      } else {
        document.body.classList.remove('lang-ko')
      }
      return next
    })
  }, [])

  return <LangContext.Provider value={{ lang, toggleLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
