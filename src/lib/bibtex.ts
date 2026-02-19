import type { Publication } from './data'

export function generateBibtex(pub: Publication): string {
  const firstAuthor = pub.authors.split(',')[0].trim().replace(/\s+/g, '')
  const key = `${firstAuthor}${pub.year}`
  const type = pub.type === 'preprint' ? 'article' : 'article'

  const lines = [`@${type}{${key},`]
  lines.push(`  title = {${pub.title}},`)
  lines.push(`  author = {${pub.authors_full}},`)
  lines.push(`  journal = {${pub.journal}},`)
  lines.push(`  year = {${pub.year}},`)
  if (pub.vol) lines.push(`  volume = {${pub.vol}},`)
  if (pub.issue) lines.push(`  number = {${pub.issue}},`)
  if (pub.page) lines.push(`  pages = {${pub.page}},`)
  if (pub.doi) lines.push(`  doi = {${pub.doi}},`)
  lines.push('}')

  return lines.join('\n')
}
