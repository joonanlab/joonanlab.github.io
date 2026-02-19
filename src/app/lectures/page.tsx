import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BilingualText } from '@/components/shared/BilingualText'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Lectures',
  description: 'Lectures and courses from An Lab at Korea University.',
}

export default function LecturesPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Lectures' }]} />
        <BilingualText
          en="Lectures & Courses"
          ko="강의"
          as="h1"
          className="section-header mb-10"
        />

        {/* Genetics */}
        <ScrollReveal>
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              <span className="en-only">Genetics</span>
              <span className="ko-only">유전학 (Genetics)</span>
            </h2>
            <p className="text-base mb-3" style={{ color: 'var(--text-secondary)' }}>
              <span className="en-only">An undergraduate course at Korea University.</span>
              <span className="ko-only">고려대학교 학부 강의</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://chaek.org/books/human-genetics" target="_blank" rel="noopener" className="pill text-sm">Online Textbook</a>
              <a href="https://github.com/joonan30/ku-genetics-quiz" target="_blank" rel="noopener" className="pill text-sm">Quiz</a>
              <a href="https://www.youtube.com/playlist?list=PLrSeOrCeGDLHncPpe1DdXJhh9kES734U4" target="_blank" rel="noopener" className="pill text-sm">Lectures (EN)</a>
              <a href="https://www.youtube.com/watch?v=D5ytuZGtVZE&list=PLrSeOrCeGDLF6CzLvPUj9eQBb_fIO3WTB" target="_blank" rel="noopener" className="pill text-sm">Lectures (KR)</a>
            </div>
          </div>
        </ScrollReveal>

        {/* Bioinformatics */}
        <ScrollReveal delay={0.1}>
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              <span className="en-only">Introduction to Bioinformatics</span>
              <span className="ko-only">생물정보학 기초 시리즈 (Introduction to Bioinformatics)</span>
            </h2>
            <p className="text-base mb-3" style={{ color: 'var(--text-secondary)' }}>
              <span className="en-only">Foundational lectures on bioinformatics and bio big data analysis.</span>
              <span className="ko-only">생물정보학, 바이오 빅데이터 분석 관련 기본 강의들을 업로드 합니다.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://chaek.org/books/basic-stats-omics-labs" target="_blank" rel="noopener" className="pill text-sm">Online Textbook</a>
              <a href="https://www.youtube.com/playlist?list=PLrSeOrCeGDLHJDRWShvuCf8l7uffUqqvC" target="_blank" rel="noopener" className="pill text-sm">YouTube</a>
            </div>
          </div>
        </ScrollReveal>

        {/* AI Biology (Korean only) */}
        <ScrollReveal delay={0.2}>
          <div className="card mb-6 ko-only">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>
              바이오 인공지능 시리즈 (AI Biology)
            </h2>
            <p className="text-base mb-3" style={{ color: 'var(--text-secondary)' }}>
              딥러닝을 이용한 유전체 데이터 연구 및 분석을 소개합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.youtube.com/playlist?list=PLrSeOrCeGDLGTc2V5CEr_3yck4xmC6kGu" target="_blank" rel="noopener" className="pill text-sm">YouTube</a>
            </div>
          </div>
        </ScrollReveal>

        {/* Paper Tips (Korean only) */}
        <ScrollReveal delay={0.2}>
          <div className="card mb-6 ko-only">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>
              대학원 신입생 및 학부생을 위한 논문 읽기 그리고 쓰기 팁
            </h2>
            <p className="text-base mb-3" style={{ color: 'var(--text-secondary)' }}>
              연구 논문을 찾고, 읽는 법 그리고 본인의 논문 작성을 위한 방법들을 소개합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://chaek.org/books/how-to-write-paper" target="_blank" rel="noopener" className="pill text-sm">Online Textbook</a>
              <a href="https://www.youtube.com/playlist?list=PLrSeOrCeGDLEDv5TuWY8MD-5Oej_7rhyi" target="_blank" rel="noopener" className="pill text-sm">YouTube</a>
            </div>
          </div>
        </ScrollReveal>

        {/* KPBA Online (Korean only) */}
        <ScrollReveal delay={0.2}>
          <div className="card mb-6 ko-only">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              한국제약바이오협회 온라인 교육
            </h2>
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>인공지능을 활용한 전장유전체 유전변이분석</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>전장유전체 분석을 통해 발굴된 유전변이를 해석하는데 사용되는 인공지능 기반의 방법론 등을 학습한다.</p>
                <a href="https://www.laidd.org/local/ubonline/view.php?id=397&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9rZXl3b3JkPSVFQyU5RCVCOCVFQSVCMyVCNSVFQyVBNyU4MCVFQiU4QSVBNSslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmbGFuZz1lbg==" target="_blank" rel="noopener" className="pill text-sm">Lecture</a>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>약물 유전체 연구를 위한 유전변이 분석 기초 및 실습</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>약물 유전체 연구에 필수적인 유전변이 데이터에 대한 기본 개념과 형태를 학습합니다.</p>
                <a href="https://www.laidd.org/local/ubonline/view.php?id=379&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL3NlYXJjaC5waHA/a2V5d29yZD0lRUMlOTUlODglRUMlQTQlODAlRUMlOUElQTk=" target="_blank" rel="noopener" className="pill text-sm">Lecture</a>
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>전장유전체 변이 분석의 이해</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>전장유전체 분석에 필요한 기본개념과 Hail 분석 플랫폼을 학습합니다.</p>
                <a href="https://www.laidd.org/local/ubonline/view.php?id=405&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL3NlYXJjaC5waHA/a2V5d29yZD0lRUMlOTUlODglRUMlQTQlODAlRUMlOUElQTk=" target="_blank" rel="noopener" className="pill text-sm">Lecture</a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Public Lectures (Korean only) */}
        <ScrollReveal delay={0.2}>
          <div className="ko-only mt-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--accent-gold)' }}>
              공개 강의 모음
            </h2>
            <div className="space-y-8">
              <div className="card">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>[3rd 오티즘스쿨] &quot;자폐의 유전자 연구: 유전자 연구란 무엇인가?&quot;</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>2024년 AUTISM EXPO에서 대중 강연을 공유합니다.</p>
                <div className="video-container">
                  <iframe src="https://www.youtube.com/embed/p7i0nGTBzig?si=s_vQZuNIKUjSf0-J" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>
                </div>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>DNA를 통해 본 여성의 자폐 (제 19회 경암바이오유스캠프)</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>경암바이오유스캠프에서 고등학생들을 대상으로 한 강의를 공유합니다.</p>
                <div className="video-container">
                  <iframe src="https://www.youtube.com/embed/ukLaizaZ_rw?si=HkB_6eI9i4z-EdOq" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>
                </div>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>고려대학교의 클라우드를 활용한 유전체 분석 연구의 혁신 사례</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>AWS Seoul Summit에서 발표한 강의를 공유합니다.</p>
                <div className="video-container">
                  <iframe src="https://www.youtube.com/embed/g-bDdEGZD08?si=eMmlHNUemNRvgkry&start=789" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
