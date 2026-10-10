import type { Metadata } from 'next'
import { getNotes } from '@/lib/data'
import { NotesList } from '@/components/notes/NotesList'
import { L } from '@/components/site/L'
import { PageHeader } from '@/components/site/PageHeader'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Blog posts and lectures from AN Lab at Korea University.',
}

interface Course {
  titleEn?: string
  titleKo: string
  descEn?: string
  descKo: string
  links: { label: string; url: string }[]
  /** Korean-language material only. */
  koOnly?: boolean
}

const COURSES: Course[] = [
  {
    titleEn: 'Genetics',
    titleKo: '유전학 (Genetics)',
    descEn: 'An undergraduate course at Korea University.',
    descKo: '고려대학교 학부 강의',
    links: [
      { label: 'Online Textbook', url: 'https://chaek.org/books/human-genetics' },
      { label: 'Quiz', url: 'https://github.com/joonan30/ku-genetics-quiz' },
      { label: 'Lectures (EN)', url: 'https://www.youtube.com/playlist?list=PLrSeOrCeGDLHncPpe1DdXJhh9kES734U4' },
      {
        label: 'Lectures (KR)',
        url: 'https://www.youtube.com/watch?v=D5ytuZGtVZE&list=PLrSeOrCeGDLF6CzLvPUj9eQBb_fIO3WTB',
      },
    ],
  },
  {
    titleEn: 'Introduction to Bioinformatics',
    titleKo: '생물정보학 기초 시리즈 (Introduction to Bioinformatics)',
    descEn: 'Foundational lectures on bioinformatics and bio big data analysis.',
    descKo: '생물정보학과 바이오 빅데이터 분석 기초 강의',
    links: [
      { label: 'Online Textbook', url: 'https://chaek.org/books/basic-stats-omics-labs' },
      { label: 'YouTube', url: 'https://www.youtube.com/playlist?list=PLrSeOrCeGDLHJDRWShvuCf8l7uffUqqvC' },
    ],
  },
  {
    titleKo: '바이오 인공지능 시리즈 (AI Biology)',
    descKo: '딥러닝을 이용한 유전체 데이터 연구와 분석',
    links: [{ label: 'YouTube', url: 'https://www.youtube.com/playlist?list=PLrSeOrCeGDLGTc2V5CEr_3yck4xmC6kGu' }],
    koOnly: true,
  },
  {
    titleKo: '대학원 신입생 및 학부생을 위한 논문 읽기 그리고 쓰기 팁',
    descKo: '논문을 찾고 읽는 법과 직접 쓰는 법',
    links: [
      { label: 'Online Textbook', url: 'https://chaek.org/books/how-to-write-paper' },
      { label: 'YouTube', url: 'https://www.youtube.com/playlist?list=PLrSeOrCeGDLEDv5TuWY8MD-5Oej_7rhyi' },
    ],
    koOnly: true,
  },
]

const KPBA = [
  {
    title: '인공지능을 활용한 전장유전체 유전변이분석',
    desc: '전장유전체 분석으로 찾은 유전변이를 해석하는 인공지능 방법론',
    url: 'https://www.laidd.org/local/ubonline/view.php?id=397&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9rZXl3b3JkPSVFQyU5RCVCOCVFQSVCMyVCNSVFQyVBNyU4MCVFQiU4QSVBNSslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmbGFuZz1lbg==',
  },
  {
    title: '약물 유전체 연구를 위한 유전변이 분석 기초 및 실습',
    desc: '약물 유전체 연구에 필요한 유전변이 데이터의 기본 개념과 형식',
    url: 'https://www.laidd.org/local/ubonline/view.php?id=379&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL3NlYXJjaC5waHA/a2V5d29yZD0lRUMlOTUlODglRUMlQTQlODAlRUMlOUElQTk=',
  },
  {
    title: '전장유전체 변이 분석의 이해',
    desc: '전장유전체 분석의 기본 개념과 Hail 분석 플랫폼',
    url: 'https://www.laidd.org/local/ubonline/view.php?id=405&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL3NlYXJjaC5waHA/a2V5d29yZD0lRUMlOTUlODglRUMlQTQlODAlRUMlOUElQTk=',
  },
]

const TALKS = [
  {
    title: '[3rd 오티즘스쿨] "자폐의 유전자 연구: 유전자 연구란 무엇인가?"',
    desc: '2024 AUTISM EXPO 대중 강연',
    src: 'https://www.youtube.com/embed/p7i0nGTBzig?si=s_vQZuNIKUjSf0-J',
  },
  {
    title: 'DNA를 통해 본 여성의 자폐 (제 19회 경암바이오유스캠프)',
    desc: '경암바이오유스캠프 고등학생 대상 강의',
    src: 'https://www.youtube.com/embed/ukLaizaZ_rw?si=HkB_6eI9i4z-EdOq',
  },
  {
    title: '고려대학교의 클라우드를 활용한 유전체 분석 연구의 혁신 사례',
    desc: 'AWS Seoul Summit 발표',
    src: 'https://www.youtube.com/embed/g-bDdEGZD08?si=eMmlHNUemNRvgkry&start=789',
  },
]

function ExternalLinks({ links }: { links: { label: string; url: string }[] }) {
  return (
    <div className="link-row">
      {links.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="link-arrow link-external">
          {l.label}
        </a>
      ))}
    </div>
  )
}

export default function NotesPage() {
  const notes = getNotes()

  return (
    <>
      <PageHeader
        title={<L en="Notes" ko="노트" />}
      />

      <section className="container" style={{ paddingBottom: 'clamp(40px, 5vw, 72px)' }} aria-label="Notes">
        <NotesList notes={notes} />
      </section>

      <section className="team-section" aria-labelledby="lectures">
        <div className="container split">
          <h2 id="lectures" className="t-h3">
            <L en="Lectures and courses" ko="강의" />
          </h2>
          <div style={{ display: 'grid', gap: 48 }}>
            <ul className="rule-list">
              {COURSES.map((c) => (
                <li key={c.titleKo} className={c.koOnly ? 'ko-only' : undefined}>
                  <div className="news-row" style={{ gap: 6, paddingBlock: 22 }}>
                    <h3 className="t-h3">
                      {c.titleEn ? <L en={c.titleEn} ko={c.titleKo} /> : c.titleKo}
                    </h3>
                    <p className="t-small" style={{ color: 'var(--ink-2)' }}>
                      {c.descEn ? <L en={c.descEn} ko={c.descKo} /> : c.descKo}
                    </p>
                    <ExternalLinks links={c.links} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="ko-only">
              <h3 className="t-h3" style={{ marginBottom: 8 }}>
                한국제약바이오협회 온라인 교육
              </h3>
              <ul className="rule-list">
                {KPBA.map((k) => (
                  <li key={k.title}>
                    <div className="news-row" style={{ gap: 6 }}>
                      <p style={{ fontWeight: 600 }}>{k.title}</p>
                      <p className="t-small" style={{ color: 'var(--ink-2)' }}>
                        {k.desc}
                      </p>
                      <ExternalLinks links={[{ label: 'Lecture', url: k.url }]} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ko-only">
              <h3 className="t-h3" style={{ marginBottom: 20 }}>
                공개 강의 모음
              </h3>
              <div className="tool-grid">
                {TALKS.map((t) => (
                  <div key={t.src} style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
                    <div className="video-container">
                      <iframe
                        src={t.src}
                        title={t.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <p style={{ fontWeight: 600, lineHeight: 1.45 }}>{t.title}</p>
                    <p className="t-small" style={{ color: 'var(--ink-3)' }}>
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
