/**
 * Small display helpers shared by server and client components.
 * No Node APIs here, so client components can import it.
 */

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface Ymd {
  y: number
  m: number
  d: number
}

/** Parses "Sep 17th 2026" (news.json) and "2026-09-17" (notes frontmatter). */
export function parseDate(raw: string): Ymd | null {
  const s = raw.trim()
  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (iso) return { y: Number(iso[1]), m: Number(iso[2]), d: Number(iso[3]) }
  const en = s.match(/^([A-Za-z]{3})[a-z]*\.? (\d{1,2})(?:st|nd|rd|th)?,? (\d{4})$/)
  if (en) {
    const m = MONTHS.indexOf(en[1].toLowerCase()) + 1
    if (m > 0) return { y: Number(en[3]), m, d: Number(en[2]) }
  }
  return null
}

export function formatDateEn(raw: string): string {
  const p = parseDate(raw)
  return p ? `${MONTHS_EN[p.m - 1]} ${p.d}, ${p.y}` : raw
}

export function formatDateKo(raw: string): string {
  const p = parseDate(raw)
  return p ? `${p.y}. ${p.m}. ${p.d}.` : raw
}

export function yearOf(raw: string): string {
  const m = raw.match(/\d{4}/)
  return m ? m[0] : ''
}

/**
 * News headlines carry inline anchors such as "...published <a href='URL'>(link)</a>."
 * When the only anchor is a bare "(link)" label, return the plain sentence and
 * the URL so the whole row can link out. Otherwise keep the HTML as is.
 */
export function splitNewsLink(headline: string): { html: string; url?: string } {
  const anchors = [...headline.matchAll(/<a\s[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi)]
  if (anchors.length === 1) {
    const [whole, url, label] = anchors[0]
    if (/^\s*\(?\s*(link|링크)\s*\)?\s*$/i.test(label)) {
      const html = headline.replace(whole, '').replace(/\s+([.!?])/g, '$1').trim()
      return { html, url }
    }
  }
  return { html: headline }
}

/** Splits an author string so the PI's name can be emphasised. */
export function splitAuthors(authors: string): { text: string; me: boolean }[] {
  const parts = authors.split(/(\bAn JY\b\*?)/)
  return parts.filter(Boolean).map((text) => ({ text, me: /^An JY/.test(text) }))
}

/** First author's surname for short figure credits ("Kim et al."). */
export function firstAuthorSurname(authors: string): string {
  const first = authors.split(',')[0]?.trim() ?? ''
  return first.split(/\s+/)[0] ?? first
}
