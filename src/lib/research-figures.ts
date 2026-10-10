import type { Publication, ResearchArea } from './data'

/**
 * One representative figure and a few key papers per research area.
 * Papers are resolved from data/publications.json by DOI (or by link URL
 * when a paper has no DOI), so titles and venues stay in sync with that file.
 */
const AREA_FIGURE: Record<ResearchArea['id'], { src: string; doi: string }> = {
  // AnnFlux Fig. 1a: control cells move to perturbed states along a learned drift field.
  virtualcell: { src: '/images/respic/annflux-drift.webp', doi: '10.64898/2026.09.01.748703' },
  noncoding: { src: '/images/pubpic/Kim2024_CWAS.png', doi: '10.1101/2024.04.15.24305828' },
  autism: { src: '/images/pubpic/Kim2025_WFSD.png', doi: '10.1186/s13073-025-01532-7' },
  multiomics: { src: '/images/pubpic/Song2024_multiomics.png', doi: '10.1038/s41467-024-54434-4' },
}

const AREA_PAPERS: Record<ResearchArea['id'], string[]> = {
  virtualcell: ['10.64898/2026.08.22.746387', '10.64898/2026.09.01.748703', '10.3350/cmh.2026.0820'],
  noncoding: ['10.1101/2024.04.15.24305828', '10.1126/science.aat6576', 'https://openreview.net/forum?id=vmpP5SzOFK'],
  autism: ['10.1186/s13073-025-01532-7', '10.1186/s13073-024-01385-6', '10.1016/j.cell.2019.12.036'],
  multiomics: ['10.1038/s41467-024-54434-4', '10.1038/s41467-025-59949-y'],
}

export interface AreaFigure {
  src: string
  pub: Publication | null
}

export function getAreaFigure(id: ResearchArea['id'], publications: Publication[]): AreaFigure {
  const { src, doi } = AREA_FIGURE[id]
  return { src, pub: publications.find((p) => p.doi === doi) ?? null }
}

export function getAreaPapers(id: ResearchArea['id'], publications: Publication[]): Publication[] {
  return AREA_PAPERS[id]
    .map((key) => publications.find((p) => p.doi === key || p.link.url === key))
    .filter((p): p is Publication => Boolean(p))
}
