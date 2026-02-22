import fs from 'fs'
import path from 'path'

// ===== Types =====

export interface TeamMember {
  name: string
  name_ko: string
  photo: string
  info: string
  url: string
  group: 0 | 1 | 2 | 3
  tags?: string[]
}

export interface AlumniMember {
  name: string
  name_ko: string
  photo: string
  info: string
  info_ko: string
  url: string
  group: number
  year: number
  thesis: string | null
  current: string | null
  current_ko: string | null
}

export interface MemberProfile {
  name: string
  name_ko?: string
  position?: string
  position_ko?: string
  photo: string
  handle: string
  email?: string
  twitter?: string
  github?: string
  scholar?: string
  orcid?: string
  scopus?: string
  linkedin?: string
  bio_html: string
  note?: string
  note_ko?: string
  year?: number
  thesis?: string | null
  current?: string | null
}

export interface Publication {
  title: string
  image?: string
  authors: string
  authors_full: string
  journal: string
  year: number
  date?: string
  vol: number | null
  issue: number | null
  page: string
  doi?: string
  link: {
    url: string
    display: string
    display_full?: string
  }
  highlight: 0 | 1
  type: 'article' | 'preprint'
}

export interface NewsItem {
  date: string
  headline: string
  headline_ko: string
}

export interface FundingItem {
  years: string
  role: 'PI' | 'CI'
  title_en: string
  source_en: string
  title_ko: string
  source_ko: string
}

export interface Activity {
  date: string
  event: string
  title: string
}

export interface ActivitiesData {
  conferences: Activity[]
  seminars: Activity[]
}

export interface OutreachData {
  outreach: Activity[]
  workshops: Activity[]
}

export interface LocalizedContent {
  en: string
  ko: string
}

export type Translations = Record<string, LocalizedContent>

// ===== Data Loading =====

const dataDir = path.join(process.cwd(), 'data')

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as T
}

export function getTeam(): TeamMember[] {
  return readJSON<TeamMember[]>('team.json')
}

export function getAlumni(): AlumniMember[] {
  return readJSON<AlumniMember[]>('alumni.json')
}

export function getPublications(): Publication[] {
  return readJSON<Publication[]>('publications.json')
}

export function getNews(): NewsItem[] {
  return readJSON<NewsItem[]>('news.json')
}

export function getTranslations(): Translations {
  return readJSON<Translations>('translations.json')
}

export function getFunding(): FundingItem[] {
  return readJSON<FundingItem[]>('joonan-funding.json')
}

export function getActivities(): ActivitiesData {
  return readJSON<ActivitiesData>('joonan-activities.json')
}

export function getOutreach(): OutreachData {
  return readJSON<OutreachData>('joonan-outreach.json')
}

export function getMemberProfile(slug: string): MemberProfile | null {
  const filePath = path.join(dataDir, 'members', `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as MemberProfile
}

export function getAllMemberSlugs(): string[] {
  const membersDir = path.join(dataDir, 'members')
  return fs
    .readdirSync(membersDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))
}
