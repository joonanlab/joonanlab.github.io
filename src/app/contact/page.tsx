import type { Metadata } from 'next'
import { L } from '@/components/site/L'
import { PageHeader } from '@/components/site/PageHeader'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information for AN Lab at Korea University.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title={<L en="Contact" ko="연락처" />}
        lead={
          <L
            en="Hana Science Hall, building B, Korea University Seoul Campus"
            ko="고려대학교 서울캠퍼스 하나과학관 B동"
          />
        }
      />

      <section className="container" style={{ paddingBottom: 'clamp(40px, 5vw, 72px)' }}>
        <div className="updates-grid" style={{ alignItems: 'start' }}>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6753.665754951503!2d127.02423323623839!3d37.58720923707466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6afc180e52280672!2z6rOg66Ck64yA7ZWZ6rWQIO2VmOuCmOqzvO2Vmeq0gA!5e0!3m2!1sen!2sus!4v1549979941407"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps - Korea University Hana Science Hall"
            />
          </div>

          <dl className="rule-list">
            <div className="news-row">
              <dt className="t-meta">
                <L en="Office" ko="사무실" />
              </dt>
              <dd>
                <L en="Room 168, Floor 1, Hana Science Hall building B" ko="하나과학관 B동 1층 168호" />
              </dd>
            </div>
            <div className="news-row">
              <dt className="t-meta">
                <L en="Lab" ko="실험실" />
              </dt>
              <dd>
                <L en="Room 259, Floor 2, Hana Science Hall building B" ko="하나과학관 B동 2층 259호" />
              </dd>
            </div>
            <div className="news-row">
              <dt className="t-meta">
                <L en="Address" ko="주소" />
              </dt>
              <dd>
                <L
                  en="126-15 Anamdong 5(o)-ga, Seongbuk-gu, Seoul, South Korea"
                  ko="대한민국 서울특별시 성북구 안암동5가 126-15"
                />
              </dd>
            </div>
            <div className="news-row">
              <dt className="t-meta">
                <L en="Email" ko="이메일" />
              </dt>
              <dd>
                <a href="mailto:joonanlab@gmail.com" className="text-link">
                  joonanlab@gmail.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
