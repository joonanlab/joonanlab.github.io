import Link from 'next/link'
import { getNews, getPublications, getResearchAreas } from '@/lib/data'
import { formatDateEn, formatDateKo } from '@/lib/format'
import { L } from '@/components/site/L'

export default function HomePage() {
  const areas = getResearchAreas()
  const news = getNews().slice(0, 4)
  const mapPaper =
    getPublications().find((p) => p.doi === '10.64898/2026.08.22.746387')?.link.url ??
    'https://www.biorxiv.org/content/10.64898/2026.08.22.746387v1.full'

  return (
    <>
      <section className="container home-intro" aria-label="About the lab">
        <div>
          <h1 className="home-intro-text">
            <L en="Reading the language of life, with machines." ko="기계와 함께, 생명의 언어를 읽는 일." />
          </h1>
          <p className="home-intro-sub">
            <L en="AI for Nature Lab, Korea University" ko="고려대학교 AI for Nature 연구실" />
          </p>
        </div>
        <figure className="home-map">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/respic/nocap-map.webp" alt="" />
          <figcaption>
            <L
              en="In silico perturbation map of 19,424 genes (Telen-NOCAP). Only C9 (pink) and C10 (orange) are enriched for autism risk genes."
              ko="유전자 19,424개의 가상 교란 지도(Telen-NOCAP). 자폐 위험 유전자는 C9(분홍)과 C10(주황)에서만 유의하게 농축됨."
            />{' '}
            <a href={mapPaper} target="_blank" rel="noopener noreferrer">
              Koh et al., 2026
            </a>
          </figcaption>
        </figure>
      </section>

      <div className="container home-split">
        <nav id="research" className="area-list" aria-label="Projects">
          <div className="home-label">
            <span>
              <L en="Projects" ko="프로젝트" />
            </span>
            <Link href="/research">
              → <L en="All projects" ko="프로젝트 전체" />
            </Link>
          </div>
          {areas.map((a) => (
            <Link key={a.id} href={`/research#${a.id}`} className="area-link">
              <span className="area-name">
                <L en={a.short} ko={a.shortKo} />
              </span>
            </Link>
          ))}
        </nav>

        <section id="news" className="home-news" aria-labelledby="home-news-title">
          <div className="home-label">
            <h2 id="home-news-title">
              <L en="News" ko="소식" />
            </h2>
            <Link href="/news">
              → <L en="All news" ko="소식 전체" />
            </Link>
          </div>
          <ul className="home-news-list">
            {news.map((item, i) => (
              <li key={`${item.date}-${i}`} className="home-news-item">
                <time className="home-news-date">
                  <L en={formatDateEn(item.date)} ko={formatDateKo(item.date)} />
                </time>
                <p className="home-news-text prose-links">
                  <span className="en-only" dangerouslySetInnerHTML={{ __html: item.headline }} />
                  <span className="ko-only" dangerouslySetInnerHTML={{ __html: item.headline_ko }} />
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
