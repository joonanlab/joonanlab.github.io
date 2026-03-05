import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research at An Lab - deep learning for noncoding genome, AI-driven virtual cells, autism genetics, and integrative multi-omics.',
}

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
