import type { Publication } from '@/lib/data'

export type Topic =
  | 'Autism'
  | 'VirtualCell'
  | 'Noncoding'
  | 'Cancer'
  | 'Alzheimer'
  | 'NeuralCircuit'
  | 'GeneticDiagnosis'
  | 'Review'
  | 'Other'

export const TOPIC_ORDER: Topic[] = [
  'Autism',
  'VirtualCell',
  'NeuralCircuit',
  'Noncoding',
  'Cancer',
  'Alzheimer',
  'GeneticDiagnosis',
  'Review',
]

export const TOPIC_LABEL: Record<Topic, { en: string; ko: string }> = {
  Autism: { en: 'Autism', ko: '자폐' },
  VirtualCell: { en: 'Virtual cell', ko: '가상세포' },
  Noncoding: { en: 'Noncoding', ko: '비암호화' },
  Cancer: { en: 'Cancer', ko: '암' },
  Alzheimer: { en: 'Alzheimer', ko: '알츠하이머' },
  NeuralCircuit: { en: 'Neural circuit', ko: '신경회로' },
  GeneticDiagnosis: { en: 'Genetic diagnosis', ko: '유전진단' },
  Review: { en: 'Review', ko: '리뷰' },
  Other: { en: 'Other', ko: '기타' },
}

function normalizeTopicTag(tag: string): Topic | null {
  const normalized = tag.trim().toLowerCase().replace(/[\s_-]+/g, '')
  if (normalized === 'autism' || normalized === '자폐') return 'Autism'
  if (normalized === 'virtualcell' || normalized === '가상세포') return 'VirtualCell'
  if (normalized === 'noncoding' || normalized === '비암호화') return 'Noncoding'
  if (normalized === 'cancer' || normalized === '암') return 'Cancer'
  if (normalized === 'alzheimer' || normalized === 'alzheimers' || normalized === '알츠하이머') return 'Alzheimer'
  if (normalized === 'neuralcircuit' || normalized === 'neuralcircuits' || normalized === '신경회로') return 'NeuralCircuit'
  if (normalized === 'geneticdiagnosis' || normalized === '유전진단') return 'GeneticDiagnosis'
  if (normalized === 'review' || normalized === '리뷰') return 'Review'
  return null
}

/**
 * publications.json can carry explicit topic tags. Fallback topics are
 * derived from title/journal keywords so older entries stay browsable.
 */
export function deriveTopics(pub: Publication): Topic[] {
  const blob = `${pub.title} ${pub.journal}`.toLowerCase()
  const topics: Topic[] = []
  const add = (t: Topic) => {
    if (!topics.includes(t)) topics.push(t)
  }

  for (const tag of pub.tags ?? []) {
    const topic = normalizeTopicTag(tag)
    if (topic) add(topic)
  }

  if (
    pub.type === 'review' ||
    /\breview\b|\bperspective\b|opinion in/i.test(blob) ||
    /annual review/i.test(pub.journal)
  )
    add('Review')
  if (/alzheimer/.test(blob)) add('Alzheimer')
  if (/cancer|tumou?r|oncolog|carcinoma|leukemi|glioblastoma|melanoma/.test(blob)) add('Cancer')
  if (/autism|asd|de novo|neurodevelopmental|psychiatr|spectrum disorder/.test(blob)) add('Autism')
  if (/noncoding|regulator|enhancer|promoter|untranslated|utr|chromatin|epigenom|atac/.test(blob))
    add('Noncoding')
  if (topics.length === 0) add('Other')
  return topics
}
