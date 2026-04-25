import type { Metadata } from 'next'
import { Inter, Noto_Sans_KR, Inter_Tight, JetBrains_Mono, Source_Serif_4 } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { LangProvider } from '@/contexts/LangContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/layout/BackToTop'
import '@/styles/globals.css'

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
    default: 'An Lab - Genomics & AI for Understanding Human Disease',
    template: '%s - An Lab',
  },
  description:
    'An Lab at Korea University - Research in genomics, artificial intelligence, autism genetics, and multi-omics.',
  openGraph: {
    type: 'website',
    siteName: 'An Lab',
    images: [{ url: '/images/logopic/Logo2025-AnLab.png' }],
  },
  icons: { icon: '/images/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansKR.variable} ${interTight.variable} ${jetBrainsMono.variable} ${sourceSerif.variable} font-sans min-h-screen`}>
        <ThemeProvider>
          <LangProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <BackToTop />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
