import type { Metadata } from 'next'
import { BilingualText } from '@/components/shared/BilingualText'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the AN Lab website (joonanlab.github.io).',
}

const EFFECTIVE_DATE = '2026-10-10'

export default function PrivacyPage() {
  return (
    <>
    <div className="doc-page">
      <div className="container-text">
        <BilingualText
          en="Privacy Policy"
          ko="개인정보처리방침"
          as="h1"
          className="t-h1 mb-4"
        />
        <p className="mb-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span className="en-only">Effective date: {EFFECTIVE_DATE}</span>
          <span className="ko-only">시행일: {EFFECTIVE_DATE}</span>
        </p>

        <ScrollReveal>
          <div className="card mb-6">
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="en-only">
                This policy explains what personal information the AN Lab website
                (joonanlab.github.io) handles and how. The website is operated by AN Lab, School of
                Biosystems and Biomedical Sciences, Korea University.
              </span>
              <span className="ko-only">
                이 방침은 AN Lab 웹사이트(joonanlab.github.io)가 어떤 개인정보를 어떻게 다루는지
                설명합니다. 이 웹사이트는 고려대학교 바이오시스템의과학부 AN Lab이 운영합니다.
              </span>
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <section className="mb-6">
            <h2 className="t-h3 mb-4">
              <span className="en-only">1. Information We Collect</span>
              <span className="ko-only">1. 수집하는 정보</span>
            </h2>
            <div className="card space-y-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                <span className="en-only">
                  This website has no user accounts and no sign-up or contact forms. We do not
                  intentionally collect names, contact details, or other personal information from
                  visitors.
                </span>
                <span className="ko-only">
                  이 웹사이트에는 회원 가입이나 문의 양식이 없습니다. 방문자의 이름, 연락처 등 개인정보를
                  의도적으로 수집하지 않습니다.
                </span>
              </p>
              <p>
                <span className="en-only">
                  Like any web server, the hosting provider may automatically record technical data
                  such as IP address, browser type, and access time for security and operation.
                </span>
                <span className="ko-only">
                  다른 웹서버와 마찬가지로 호스팅 제공자가 보안과 운영을 위해 IP 주소, 브라우저 종류,
                  접속 시각 같은 기술 정보를 자동으로 기록할 수 있습니다.
                </span>
              </p>
              <p>
                <span className="en-only">
                  The site stores your language preference in your browser&apos;s local storage. This data stays on your device and is not sent to us.
                </span>
                <span className="ko-only">
                  웹사이트는 언어 설정을 브라우저의 로컬 저장소(localStorage)에 저장합니다. 이 정보는 이용자의 기기에만 남으며 저희에게 전송되지 않습니다.
                </span>
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <section className="mb-6">
            <h2 className="t-h3 mb-4">
              <span className="en-only">2. Third-Party Services</span>
              <span className="ko-only">2. 제3자 서비스</span>
            </h2>
            <div className="card space-y-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                <span className="en-only">
                  The Contact page embeds a Google Maps map. Google may set cookies and process data
                  under its own privacy policy (policies.google.com/privacy).
                </span>
                <span className="ko-only">
                  연락처 페이지에는 Google 지도가 포함되어 있습니다. Google은 자체 개인정보처리방침
                  (policies.google.com/privacy)에 따라 쿠키를 설정하거나 데이터를 처리할 수 있습니다.
                </span>
              </p>
              <p>
                <span className="en-only">
                  The site is hosted on Vercel, which may process technical access logs as described
                  in its own privacy policy.
                </span>
                <span className="ko-only">
                  이 사이트는 Vercel에서 호스팅되며, Vercel은 자체 개인정보처리방침에 따라 접속 기록을
                  처리할 수 있습니다.
                </span>
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <section className="mb-6">
            <h2 className="t-h3 mb-4">
              <span className="en-only">3. Use, Sharing, and Retention</span>
              <span className="ko-only">3. 이용, 제공 및 보관</span>
            </h2>
            <div className="card space-y-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                <span className="en-only">
                  We do not sell or rent personal information. Technical logs are kept only as long
                  as the hosting provider retains them, and are used solely for security and
                  operation.
                </span>
                <span className="ko-only">
                  저희는 개인정보를 판매하거나 임대하지 않습니다. 기술 로그는 호스팅 제공자가 보관하는
                  기간 동안만 남으며, 보안과 운영 목적으로만 사용합니다.
                </span>
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <section className="mb-6">
            <h2 className="t-h3 mb-4">
              <span className="en-only">4. Your Rights and Contact</span>
              <span className="ko-only">4. 이용자의 권리와 문의</span>
            </h2>
            <div className="card space-y-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                <span className="en-only">
                  For questions about this policy or your personal information, email
                  joonanlab@gmail.com.
                </span>
                <span className="ko-only">
                  이 방침이나 개인정보에 관한 문의는 joonanlab@gmail.com으로 보내 주세요.
                </span>
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <section>
            <h2 className="t-h3 mb-4">
              <span className="en-only">5. Changes to This Policy</span>
              <span className="ko-only">5. 방침의 변경</span>
            </h2>
            <div className="card leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                <span className="en-only">
                  If this policy changes, the revised version will be posted on this page with a new
                  effective date.
                </span>
                <span className="ko-only">
                  방침이 바뀌면 이 페이지에 개정본을 게시하고 시행일을 새로 적겠습니다.
                </span>
              </p>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
    </>
  )
}
