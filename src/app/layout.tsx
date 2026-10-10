import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { LangProvider } from '@/contexts/LangContext'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '@/styles/globals.css'

// The site is always black. The theme is fixed here and in ThemeProvider;
// there is no light theme and no toggle.
const initialPreferencesScript = `
(function () {
  function primaryLanguage() {
    var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    return /^ko(?:-|$)/i.test(String(languages[0] || '')) ? 'ko' : 'en';
  }

  function applyBodyLang(lang) {
    if (!document.body) return;
    document.body.classList.toggle('lang-ko', lang === 'ko');
  }

  try {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.style.colorScheme = 'dark';
  } catch (error) {}

  try {
    var storedLang = localStorage.getItem('lang');
    var lang = storedLang === 'ko' || storedLang === 'en' ? storedLang : primaryLanguage();
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        applyBodyLang(lang);
      }, { once: true });
    } else {
      applyBodyLang(lang);
    }
  } catch (error) {}
})();
`

export const metadata: Metadata = {
  metadataBase: new URL('https://joonanlab.github.io'),
  title: {
    default: 'AN Lab - Genomics & AI for Understanding Human Disease',
    template: '%s - AN Lab',
  },
  description:
    'AN Lab at Korea University - Research in genomics, artificial intelligence, autism genetics, and multi-omics.',
  openGraph: {
    type: 'website',
    siteName: 'AN Lab',
    images: [{ url: '/images/logopic/Logo2025-AnLab.png' }],
  },
  icons: { icon: '/images/favicon.ico' },
}

export const viewport: Viewport = {
  themeColor: '#0e0e0f',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initialPreferencesScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
