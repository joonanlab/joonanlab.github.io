import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { BilingualText } from '@/components/shared/BilingualText'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { RedesignChrome } from '@/components/redesign/RedesignChrome'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information for AN Lab at Korea University.',
}

export default function ContactPage() {
  return (
    <RedesignChrome>
    <div className="pt-16 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <BilingualText
          en="Contact"
          ko="연락처"
          as="h1"
          className="section-header mb-8"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
                <span className="en-only">Lab Location</span>
                <span className="ko-only">연구실 위치</span>
              </h2>
              <div className="card">
                <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>
                  <span className="en-only">
                    AN Lab is in Hana Science Hall (building B) of the Korea University, Seoul Campus.
                  </span>
                  <span className="ko-only">
                    AN Lab은 고려대학교 서울캠퍼스 하나과학관 B동에 있습니다.
                  </span>
                </p>
                <div className="space-y-2 text-base" style={{ color: 'var(--text-secondary)' }}>
                  <p>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      <span className="en-only">Office:</span>
                      <span className="ko-only">사무실:</span>
                    </strong>{' '}
                    <span className="en-only">Room 168, Floor 1, Hana Science Hall building B</span>
                    <span className="ko-only">하나과학관 B동 1층 168호</span>
                  </p>
                  <p>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      <span className="en-only">Lab:</span>
                      <span className="ko-only">실험실:</span>
                    </strong>{' '}
                    <span className="en-only">Room 259, Floor 2, Hana Science Hall building B</span>
                    <span className="ko-only">하나과학관 B동 2층 259호</span>
                  </p>
                  <p className="mt-3">
                    <span className="en-only">
                      126-15 Anamdong 5(o)-ga, Seongbuk-gu, Seoul, South Korea
                    </span>
                    <span className="ko-only">대한민국 서울특별시 성북구 안암동5가 126-15</span>
                  </p>
                </div>
              </div>

              <div className="card mt-4">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  <span className="en-only">Email</span>
                  <span className="ko-only">이메일</span>
                </h3>
                <p className="text-base" style={{ color: 'var(--accent)' }}>
                  joonanlab at gmail dot com
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
                <span className="en-only">Map</span>
                <span className="ko-only">지도</span>
              </h2>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6753.665754951503!2d127.02423323623839!3d37.58720923707466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6afc180e52280672!2z6rOg66Ck64yA7ZWZ6rWQIO2VmOuCmOqzvO2Vmeq0gA!5e0!3m2!1sen!2sus!4v1549979941407"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - Korea University Hana Science Hall"
                ></iframe>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
    </RedesignChrome>
  )
}
