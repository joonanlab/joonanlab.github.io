import type { Metadata } from 'next'
import Link from 'next/link'
import { getNotes } from '@/lib/data'
import { formatDateEn, formatDateKo } from '@/lib/format'
import { L } from '@/components/site/L'
import { PageHeader } from '@/components/site/PageHeader'

export const metadata: Metadata = {
  title: 'Join',
  description:
    'Open positions at AN Lab — postdoctoral researchers, graduate students, and undergraduate researchers in genomics, AI, and autism genetics.',
}

const EMAIL = 'joonanlab@gmail.com'

const POSITIONS = [
  {
    titleEn: 'Postdoctoral Researcher',
    titleKo: '박사후연구원',
    countEn: '1–2 positions open',
    countKo: '1–2명 모집 중',
    whoEn:
      'Computational biologists with strong publication record in statistical genetics, deep learning for genomics, or single-cell analysis.',
    whoKo: '통계유전학, 유전체 딥러닝, 단일세포 분석 분야에서 발표 실적이 강한 계산생물학자.',
  },
  {
    titleEn: 'Ph.D. Student',
    titleKo: '박사과정',
    countEn: '2–3 admitted per year',
    countKo: '매년 2–3명 선발',
    whoEn:
      'Applicants with backgrounds in CS, statistics, biology, or bioinformatics. Coding fluency and comfort with large datasets required.',
    whoKo: '전산, 통계, 생물, 생물정보학 배경. 코딩 숙련도와 대용량 데이터 경험 필요.',
  },
  {
    titleEn: 'M.S. Student',
    titleKo: '석사과정',
    countEn: '2–3 admitted per year',
    countKo: '매년 2–3명 선발',
    whoEn: 'Strong interest in computational genomics and willingness to go deep on one question for 2 years.',
    whoKo: '계산유전체학에 강한 관심, 한 질문에 2년을 투자할 의지.',
  },
  {
    titleEn: 'Undergraduate Researcher',
    titleKo: '학부연구생',
    countEn: 'Rolling',
    countKo: '상시 모집',
    whoEn: 'KU undergraduates from any quantitative or biological major. Prior coding experience preferred.',
    whoKo: '고려대 정량/생물 계열 학부생. 코딩 경험 선호.',
  },
]

const QUESTIONS = [
  {
    en: "What if 98% of the genome has a grammar we haven't learned to read?",
    ko: '유전체의 98%에 우리가 아직 읽지 못한 문법이 있다면?',
  },
  {
    en: 'Can we predict how cells respond to genes, drugs and their combinations that no screen has measured?',
    ko: '아직 어떤 스크린에서도 측정하지 않은 유전자, 약물, 그 조합에 대한 세포 반응을 예측할 수 있을까?',
  },
  {
    en: "What does autism genetics look like when the cohort isn't European?",
    ko: '코호트가 유럽이 아닐 때 자폐 유전학은 어떻게 보일까?',
  },
]

const POSTINGS = [
  {
    url: 'https://joonanlab.notion.site/a1acff2799bc485bb6c9b05db1846b2e',
    en: 'Postdoctoral researcher posting (Korean)',
    ko: '박사후연구원 모집 공고',
  },
  {
    url: 'https://joonanlab.notion.site/e061f5837a4747a8a125714bd984046a',
    en: 'Graduate and undergraduate posting (Korean)',
    ko: '대학원생 및 학부연구생 모집 공고',
  },
]

export default function JoinPage() {
  const notes = getNotes()
  const recent = (lang: 'en' | 'ko') => notes.filter((n) => n.lang === lang || n.lang === 'both').slice(0, 3)

  const noteList = (lang: 'en' | 'ko') => (
    <ul className="rule-list">
      {recent(lang).map((n) => (
        <li key={n.slug}>
          <Link href={`/notes/${n.slug}`} className="row-link news-row">
            <time className="t-meta">{lang === 'ko' ? formatDateKo(n.date) : formatDateEn(n.date)}</time>
            <span className="t-h3 row-title">{n.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <PageHeader
        title={<L en="Join the lab" ko="합류하기" />}
        lead={
          <L
            en="Postdoctoral, graduate and undergraduate positions in genomics and AI"
            ko="유전체와 인공지능 분야 박사후연구원, 대학원생, 학부연구생 모집"
          />
        }
      />

      <section className="team-section" aria-labelledby="positions">
        <div className="container split">
          <h2 id="positions" className="t-h3">
            <L en="Open positions" ko="모집 분야" />
          </h2>
          <ul className="rule-list">
            {POSITIONS.map((p) => (
              <li key={p.titleEn} className="position-row">
                <div style={{ display: 'grid', gap: 6, alignContent: 'start' }}>
                  <h3 className="t-h3">
                    <L en={p.titleEn} ko={p.titleKo} />
                  </h3>
                  <span className="status">
                    <L en={p.countEn} ko={p.countKo} />
                  </span>
                </div>
                <p className="t-body">
                  <L en={p.whoEn} ko={p.whoKo} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="how-to-apply" className="team-section" aria-labelledby="apply">
        <div className="container split">
          <h2 id="apply" className="t-h3">
            <L en="How to apply" ko="지원 방법" />
          </h2>
          <div style={{ display: 'grid', gap: 20, maxWidth: '68ch' }}>
            <p className="t-body" style={{ color: 'var(--ink)', fontSize: '1.0625rem' }}>
              <L
                en={
                  <>
                    Send a brief email to{' '}
                    <a href={`mailto:${EMAIL}`} className="text-link">
                      {EMAIL}
                    </a>{' '}
                    with a description of your research interests and your CV. The same address handles
                    applications for postdoctoral, graduate, and undergraduate positions.
                  </>
                }
                ko={
                  <>
                    <a href={`mailto:${EMAIL}`} className="text-link">
                      {EMAIL}
                    </a>
                    로 본인의 연구 관심사와 이력서를 함께 보내 주세요. 박사후연구원, 대학원생, 학부연구생 모두 같은
                    주소로 지원받습니다.
                  </>
                }
              />
            </p>
            <ul style={{ display: 'grid', gap: 10 }}>
              {POSTINGS.map((p) => (
                <li key={p.url}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="link-arrow link-external">
                    <L en={p.en} ko={p.ko} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="team-section" aria-labelledby="questions">
        <div className="container split">
          <h2 id="questions" className="t-h3">
            <L en="Questions we work on" ko="연구 질문" />
          </h2>
          <ul className="question-list rule-list">
            {QUESTIONS.map((q) => (
              <li key={q.en}>
                <div style={{ display: 'grid', gap: 6 }}>
                  <p style={{ fontSize: '1.0625rem', fontWeight: 560, lineHeight: 1.5 }}>
                    <L en={q.en} ko={q.ko} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="team-section" aria-labelledby="read-first">
        <div className="container split">
          <h2 id="read-first" className="t-h3">
            <L en="Recent notes" ko="최근 노트" />
          </h2>
          <div>
            <div className="en-only">{noteList('en')}</div>
            <div className="ko-only">{noteList('ko')}</div>
            <div style={{ marginTop: 20 }}>
              <Link href="/notes" className="link-arrow">
                <L en="All notes" ko="노트 전체" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
