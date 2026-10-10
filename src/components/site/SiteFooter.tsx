import Image from 'next/image'
import Link from 'next/link'
import { L } from './L'

const LAB_LINKS = [
  { href: '/research', en: 'Projects', ko: '프로젝트' },
  { href: '/publications', en: 'Publications', ko: '논문' },
  { href: '/tools', en: 'Tools', ko: '도구' },
  { href: '/karc', en: 'K-ARC consortium', ko: 'K-ARC 컨소시엄' },
]

const PEOPLE_LINKS = [
  { href: '/team', en: 'Team', ko: '구성원' },
  { href: '/alumni', en: 'Alumni', ko: '졸업생' },
  { href: '/join', en: 'Join the lab', ko: '합류하기' },
  { href: '/notes', en: 'Notes', ko: '노트' },
  { href: '/news', en: 'News', ko: '소식' },
]


export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-grid">
          <div>
            <Link href="/" className="brand">
              <Image
                src="/images/logopic/Logo2025-AnLab.png"
                alt=""
                width={28}
                height={28}
                style={{ width: 28, height: 28, objectFit: 'contain' }}
              />
              <span className="brand-name">AN Lab</span>
            </Link>
            <p className="t-small" style={{ marginTop: 14, maxWidth: 320 }}>
              <span className="en-only">
                School of Biosystems and Biomedical Sciences
                <br />
                Korea University, Seoul, Republic of Korea
              </span>
              <span className="ko-only">
                고려대학교 바이오시스템의과학부
                <br />
                대한민국 서울
              </span>
            </p>
          </div>

          <div>
            <h2>
              <L en="Lab" ko="연구실" />
            </h2>
            <ul>
              {LAB_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <L en={l.en} ko={l.ko} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>
              <L en="People" ko="사람들" />
            </h2>
            <ul>
              {PEOPLE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <L en={l.en} ko={l.ko} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>
              <L en="Contact" ko="연락처" />
            </h2>
            <ul>
              <li>
                <a href="mailto:joonanlab@gmail.com">joonanlab@gmail.com</a>
              </li>
              <li>
                <Link href="/contact">
                  <L en="Location & map" ko="위치와 지도" />
                </Link>
              </li>
              <li>
                <a href="https://github.com/joonan-lab" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>© {new Date().getFullYear()} AN Lab, Korea University</span>
          <Link href="/privacy">
            <L en="Privacy policy" ko="개인정보처리방침" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
