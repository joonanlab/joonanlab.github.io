import type { Metadata } from 'next'
import { Inter, Noto_Sans_KR, Inter_Tight, JetBrains_Mono, Source_Serif_4 } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { LangProvider } from '@/contexts/LangContext'
import { LegacyChrome } from '@/components/layout/LegacyChrome'
import '@/styles/globals.css'

// The site theme is time-based only: light 07:00–18:59, dark otherwise.
// There is deliberately no user-facing light/dark toggle, so this script
// and TimeThemeSync in ThemeProvider are the only writers of 'theme'.
const initialPreferencesScript = `
(function () {
  function timeTheme() {
    var hour = new Date().getHours();
    return hour >= 7 && hour < 19 ? 'light' : 'dark';
  }

  function primaryLanguage() {
    var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    return /^ko(?:-|$)/i.test(String(languages[0] || '')) ? 'ko' : 'en';
  }

  function applyBodyLang(lang) {
    if (!document.body) return;
    document.body.classList.toggle('lang-ko', lang === 'ko');
  }

  try {
    var theme = timeTheme();
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-kr',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initialPreferencesScript }} />
      </head>
      <body className={`${inter.variable} ${notoSansKR.variable} ${interTight.variable} ${jetBrainsMono.variable} ${sourceSerif.variable} font-sans min-h-screen`}>
        <ThemeProvider>
          <LangProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <LegacyChrome>{children}</LegacyChrome>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
