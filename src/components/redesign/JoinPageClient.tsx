'use client'

/**
 * JoinPageClient — v2 Join page.
 * Dark hero with 3 italic question hooks, then a light cream body
 * with featured Notes, positions, how-to-apply steps, and FAQ.
 *
 * Featured notes are pulled from the real notes index (top 3 newest
 * matching the current language), not from the mockup placeholder.
 */

import Link from 'next/link'
import { useMemo } from 'react'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS } from '@/lib/redesign-tokens'
import type { NotePost } from '@/lib/data'

type NoteListItem = Omit<NotePost, 'content'>

interface JoinPageClientProps {
  notes: NoteListItem[]
}

const HOOKS = [
  {
    en: "What if 98% of the genome has a grammar we haven't learned to read?",
    ko: '유전체의 98%에 우리가 아직 읽지 못한 문법이 있다면?',
    tieEn: 'Noncoding genome · Deep learning',
    tieKo: '비암호화 유전체 · 딥러닝',
  },
  {
    en: "Can we simulate a neuron's response to a genetic variant — before touching a pipette?",
    ko: '유전 변이에 대한 뉴런의 반응을 — 피펫을 잡기 전에 — 시뮬레이션할 수 있을까?',
    tieEn: 'Virtual cell · scRNA-seq',
    tieKo: '가상세포 · scRNA-seq',
  },
  {
    en: "What does autism genetics look like when the cohort isn't European?",
    ko: '코호트가 유럽이 아닐 때 자폐 유전학은 어떻게 보일까?',
    tieEn: 'East Asian WGS · Autism',
    tieKo: '동아시아 WGS · 자폐',
  },
]

const POSITIONS = [
  {
    titleEn: 'Postdoctoral Researcher',
    titleKo: '박사후연구원',
    countEn: '1–2 positions open',
    countKo: '1–2명 모집 중',
    whoEn:
      'Computational biologists with strong publication record in statistical genetics, deep learning for genomics, or single-cell analysis.',
    whoKo:
      '통계유전학, 유전체 딥러닝, 단일세포 분석 분야에서 발표 실적이 강한 계산생물학자.',
    status: 'hiring' as const,
  },
  {
    titleEn: 'Ph.D. Student',
    titleKo: '박사과정',
    countEn: '2–3 admitted per year',
    countKo: '매년 2–3명 선발',
    whoEn:
      'Applicants with backgrounds in CS, statistics, biology, or bioinformatics. Coding fluency and comfort with large datasets required.',
    whoKo:
      '전산·통계·생물·생정보 배경. 코딩 숙련도와 대용량 데이터 경험 필요.',
    status: 'hiring' as const,
  },
  {
    titleEn: 'M.S. Student',
    titleKo: '석사과정',
    countEn: '2–3 admitted per year',
    countKo: '매년 2–3명 선발',
    whoEn:
      'Strong interest in computational genomics and willingness to go deep on one question for 2 years.',
    whoKo: '계산유전체학에 강한 관심, 한 질문에 2년을 투자할 의지.',
    status: 'hiring' as const,
  },
  {
    titleEn: 'Undergraduate Researcher',
    titleKo: '학부연구생',
    countEn: 'Rolling',
    countKo: '상시 모집',
    whoEn:
      'KU undergraduates from any quantitative or biological major. Prior coding experience preferred.',
    whoKo: '고려대 정량/생물 계열 학부생. 코딩 경험 선호.',
    status: 'rolling' as const,
  },
]

export function JoinPageClient({ notes }: JoinPageClientProps) {
  const { lang } = useLang()

  const featuredNotes = useMemo(
    () => notes.filter((n) => n.lang === lang || n.lang === 'both').slice(0, 3),
    [notes, lang],
  )

  return (
    <>
      {/* Dark hero */}
      <section
        style={{
          background: 'var(--an-surface-bg)',
          color: 'var(--an-surface-ink)',
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 32px) clamp(64px, 9vw, 100px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at 70% 50%, ${AN_TOKENS.red}15 0%, transparent 60%)`,
          }}
        />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              fontFamily: AN_TOKENS.fontMono,
              fontSize: 12,
              color: AN_TOKENS.gold,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ width: 32, height: 1, background: AN_TOKENS.red }} />
            {lang === 'ko' ? '합류 · 우리가 찾는 사람' : "Join · Who we're looking for"}
          </div>
          <h1
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(48px, 9vw, 132px)',
              fontWeight: 300,
              letterSpacing: 'clamp(-2px, -0.4vw, -5px)',
              lineHeight: 0.88,
              margin: '0 0 40px',
              maxWidth: 1100,
              textWrap: 'balance',
            }}
          >
            {lang === 'ko' ? (
              <>
                이런 질문이{' '}
                <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>당신을</em>
                <br />
                붙잡는다면,
              </>
            ) : (
              <>
                If these questions
                <br />
                <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>pull at</em> you,
              </>
            )}
          </h1>
          <p
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(17px, 1.8vw, 24px)',
              fontStyle: 'italic',
              color: 'var(--an-surface-ink-soft)',
              lineHeight: 1.5,
              margin: '0 0 56px',
              maxWidth: 720,
              fontWeight: 300,
              textWrap: 'pretty',
            }}
          >
            {lang === 'ko'
              ? '우리가 찾는 사람은 정답을 가진 사람이 아니라, 질문에 매달릴 사람입니다. 아래 중 하나라도 밤늦게 뇌를 붙잡는다면 — 연락 주세요.'
              : "We're not hiring for answers. We're hiring for people who stay up thinking about the questions. If any of the below keeps your brain busy at 2am — write to us."}
          </p>

          <div
            className="join-hooks"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
          >
            {HOOKS.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: '28px 28px 32px',
                  background: `linear-gradient(180deg, ${'var(--an-surface-bg-raised)'} 0%, transparent 100%)`,
                  border: `1px solid ${'var(--an-surface-line)'}`,
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: AN_TOKENS.fontMono,
                    fontSize: 10,
                    color: AN_TOKENS.gold,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 14,
                  }}
                >
                  Q · {String(i + 1).padStart(2, '0')}
                </div>
                <p
                  style={{
                    fontFamily: AN_TOKENS.fontSerif,
                    fontSize: 'clamp(17px, 1.8vw, 22px)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'var(--an-surface-ink)',
                    lineHeight: 1.35,
                    margin: '0 0 24px',
                    textWrap: 'pretty',
                  }}
                >
                  &ldquo;{lang === 'ko' ? h.ko : h.en}&rdquo;
                </p>
                <div
                  style={{
                    fontFamily: AN_TOKENS.fontMono,
                    fontSize: 10,
                    color: 'var(--an-surface-ink-muted)',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  ↳ {lang === 'ko' ? h.tieKo : h.tieEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Notes bridge */}
      <section
        style={{
          background: 'var(--an-surface-bg)',
          padding: 'clamp(64px, 10vw, 100px) clamp(20px, 4vw, 32px)',
          borderBottom: `1px solid ${'var(--an-surface-line)'}`,
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            className="join-notes-header"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              alignItems: 'end',
              marginBottom: 56,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: AN_TOKENS.fontMono,
                  fontSize: 12,
                  color: AN_TOKENS.red,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                {lang === 'ko' ? '§ 02 · 우리가 쓰는 글' : '§ 02 · What we write about'}
              </div>
              <h2
                style={{
                  fontFamily: AN_TOKENS.fontSerif,
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: -1.5,
                  lineHeight: 1.0,
                  margin: 0,
                  color: 'var(--an-surface-ink)',
                  textWrap: 'balance',
                }}
              >
                {lang === 'ko' ? (
                  <>
                    합류 전에, <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>읽어 주세요.</em>
                  </>
                ) : (
                  <>
                    Read us before
                    <br />
                    <em style={{ color: AN_TOKENS.red, fontStyle: 'italic' }}>you write to us.</em>
                  </>
                )}
              </h2>
            </div>
            <p
              style={{
                fontFamily: AN_TOKENS.fontSans,
                fontSize: 16,
                color: 'var(--an-surface-ink-soft)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 460,
                textWrap: 'pretty',
              }}
            >
              {lang === 'ko'
                ? '우리 랩의 Notes는 아직 출판되지 않은 생각들입니다. 이 중 하나에라도 공감한다면, 당신은 이미 후보입니다.'
                : "Our Notes are the thoughts before they become papers. If any of them resonate, you're already on the shortlist."}
            </p>
          </div>

          <div
            className="join-notes-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
          >
            {featuredNotes.map((n) => (
              <Link
                key={n.slug}
                href={`/notes/${n.slug}`}
                style={{
                  display: 'block',
                  padding: '28px 28px 32px',
                  background: 'var(--an-surface-bg-raised)',
                  border: `1px solid ${'var(--an-surface-line)'}`,
                  borderRadius: 12,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  style={{
                    fontFamily: AN_TOKENS.fontMono,
                    fontSize: 10,
                    color: 'var(--an-surface-ink-muted)',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 14,
                  }}
                >
                  {n.date}
                </div>
                <h3
                  style={{
                    fontFamily: AN_TOKENS.fontSerif,
                    fontSize: 'clamp(18px, 1.8vw, 22px)',
                    fontWeight: 400,
                    color: 'var(--an-surface-ink)',
                    lineHeight: 1.25,
                    letterSpacing: -0.4,
                    margin: '0 0 14px',
                    textWrap: 'balance',
                  }}
                >
                  {n.title}
                </h3>
                {n.summary && (
                  <p
                    style={{
                      fontFamily: AN_TOKENS.fontSerif,
                      fontStyle: 'italic',
                      fontSize: 14,
                      color: 'var(--an-surface-ink-soft)',
                      lineHeight: 1.55,
                      margin: '0 0 20px',
                      textWrap: 'pretty',
                    }}
                  >
                    &ldquo;{n.summary}&rdquo;
                  </p>
                )}
                <div
                  style={{
                    fontFamily: AN_TOKENS.fontMono,
                    fontSize: 11,
                    color: AN_TOKENS.red,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {lang === 'ko' ? '읽기 →' : 'Read →'}
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link
              href="/notes"
              style={{
                fontFamily: AN_TOKENS.fontSans,
                fontSize: 14,
                color: 'var(--an-surface-ink)',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: `2px solid ${AN_TOKENS.red}`,
                paddingBottom: 4,
              }}
            >
              {lang === 'ko' ? '모든 Notes 보기 →' : 'Browse all Notes →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Positions */}
      <section
        style={{
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 32px)',
          background: 'var(--an-surface-bg-raised)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: AN_TOKENS.fontMono,
              fontSize: 12,
              color: AN_TOKENS.red,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {lang === 'ko' ? '§ 03 · 지금 열린 모집 분야' : '§ 03 · Open positions'}
          </div>
          <h2
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: 300,
              letterSpacing: -2,
              lineHeight: 1.0,
              margin: '0 0 56px',
              color: 'var(--an-surface-ink)',
            }}
          >
            {lang === 'ko' ? '모집 분야' : 'Open positions.'}
          </h2>
          <div
            className="join-positions-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20,
            }}
          >
            {POSITIONS.map((p, i) => {
              const hiring = p.status === 'hiring'
              return (
                <div
                  key={i}
                  style={{
                    padding: '32px 36px',
                    background: 'var(--an-surface-bg)',
                    border: `1px solid ${'var(--an-surface-line)'}`,
                    borderRadius: 12,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 18,
                      gap: 12,
                      flexWrap: 'wrap',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: AN_TOKENS.fontSerif,
                        fontSize: 'clamp(22px, 2.2vw, 28px)',
                        fontWeight: 400,
                        color: 'var(--an-surface-ink)',
                        letterSpacing: -0.5,
                        margin: 0,
                      }}
                    >
                      {lang === 'ko' ? p.titleKo : p.titleEn}
                    </h3>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 10px',
                        background: hiring ? `${AN_TOKENS.red}12` : 'transparent',
                        border: `1px solid ${hiring ? `${AN_TOKENS.red}44` : 'var(--an-surface-line)'}`,
                        borderRadius: 30,
                        fontFamily: AN_TOKENS.fontMono,
                        fontSize: 10,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: hiring ? AN_TOKENS.red : 'var(--an-surface-ink-muted)',
                      }}
                    >
                      {hiring && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: AN_TOKENS.red,
                          }}
                        />
                      )}
                      {lang === 'ko' ? p.countKo : p.countEn}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: AN_TOKENS.fontSans,
                      fontSize: 14.5,
                      color: 'var(--an-surface-ink-soft)',
                      lineHeight: 1.6,
                      margin: 0,
                      textWrap: 'pretty',
                    }}
                  >
                    {lang === 'ko' ? p.whoKo : p.whoEn}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section
        style={{
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 32px)',
          background: 'var(--an-surface-bg)',
          borderTop: `1px solid ${'var(--an-surface-line)'}`,
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: AN_TOKENS.fontMono,
              fontSize: 12,
              color: AN_TOKENS.red,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {lang === 'ko' ? '§ 04 · 지원 방법' : '§ 04 · How to apply'}
          </div>
          <h2
            style={{
              fontFamily: AN_TOKENS.fontSerif,
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: 300,
              letterSpacing: -2,
              lineHeight: 1.0,
              margin: '0 0 32px',
              color: 'var(--an-surface-ink)',
              textWrap: 'balance',
            }}
          >
            {lang === 'ko' ? '지원 방법' : 'How to apply.'}
          </h2>
          <p
            style={{
              fontFamily: AN_TOKENS.fontSans,
              fontSize: 17,
              color: 'var(--an-surface-ink-soft)',
              lineHeight: 1.7,
              margin: '0 0 40px',
              maxWidth: 720,
              textWrap: 'pretty',
            }}
          >
            {lang === 'ko'
              ? '관심 있으신 분은 joonanlab@gmail.com 으로 본인의 연구 관심사와 이력서를 함께 보내주시기 바랍니다. 박사후연구원, 대학원생, 학부연구생 모두 동일한 채널로 지원받고 있습니다.'
              : 'If you are interested in our work, please send a brief email to joonanlab@gmail.com with a description of your research interests and your CV. The same address handles applications for postdoctoral, graduate, and undergraduate positions.'}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <a
              href="mailto:joonanlab@gmail.com"
              style={{
                display: 'inline-block',
                padding: '18px 36px',
                background: AN_TOKENS.red,
                color: 'white',
                fontFamily: AN_TOKENS.fontSans,
                fontSize: 15,
                fontWeight: 600,
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              {lang === 'ko' ? 'joonanlab@gmail.com 으로 메일 →' : 'Email joonanlab@gmail.com →'}
            </a>
          </div>

          <div
            style={{
              marginTop: 40,
              padding: '20px 24px',
              background: 'var(--an-surface-bg-raised)',
              border: `1px solid ${'var(--an-surface-line)'}`,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontFamily: AN_TOKENS.fontMono,
                fontSize: 11,
                color: 'var(--an-surface-ink-muted)',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {lang === 'ko' ? '한글 상세 모집 공고 (Notion)' : 'Detailed listings (Korean, Notion)'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a
                href="https://joonanlab.notion.site/a1acff2799bc485bb6c9b05db1846b2e"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: AN_TOKENS.fontSans,
                  fontSize: 14,
                  color: 'var(--an-surface-ink)',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {lang === 'ko' ? '박사후 연구원 모집 공고 →' : 'Postdoctoral Researcher posting →'}
              </a>
              <a
                href="https://joonanlab.notion.site/e061f5837a4747a8a125714bd984046a"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: AN_TOKENS.fontSans,
                  fontSize: 14,
                  color: 'var(--an-surface-ink)',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {lang === 'ko'
                  ? '대학원생 및 학부연구생 모집 공고 →'
                  : 'Graduate & Undergraduate posting →'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .join-hooks { grid-template-columns: 1fr !important; }
          .join-notes-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .join-notes-grid { grid-template-columns: 1fr !important; }
          .join-positions-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
