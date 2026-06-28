'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { useEffect, type ReactNode } from 'react'

type SiteTheme = 'light' | 'dark'

function getTimeBasedTheme(date = new Date()): SiteTheme {
  const hour = date.getHours()
  return hour >= 7 && hour < 19 ? 'light' : 'dark'
}

function msUntilNextThemeBoundary(now = new Date()) {
  const next = new Date(now)
  const hour = now.getHours()

  if (hour < 7) {
    next.setHours(7, 0, 0, 0)
  } else if (hour < 19) {
    next.setHours(19, 0, 0, 0)
  } else {
    next.setDate(next.getDate() + 1)
    next.setHours(7, 0, 0, 0)
  }

  return Math.max(next.getTime() - now.getTime(), 1000)
}

function TimeThemeSync() {
  const { setTheme } = useTheme()

  useEffect(() => {
    let timeoutId: number | undefined

    const applyTheme = () => setTheme(getTimeBasedTheme())
    const scheduleNextBoundary = () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        applyTheme()
        scheduleNextBoundary()
      }, msUntilNextThemeBoundary())
    }

    applyTheme()
    scheduleNextBoundary()

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [setTheme])

  return null
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TimeThemeSync />
      {children}
    </NextThemesProvider>
  )
}
