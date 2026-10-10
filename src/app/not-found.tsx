import Link from 'next/link'
import { L } from '@/components/site/L'

export default function NotFound() {
  return (
    <div className="page-head" style={{ minHeight: '50vh' }}>
      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <p className="t-label">404</p>
        <h1 className="t-h1">
          <L en="Page not found" ko="페이지를 찾을 수 없음" />
        </h1>
        <p>
          <Link href="/" className="link-arrow">
            <L en="Home" ko="홈으로" />
          </Link>
        </p>
      </div>
    </div>
  )
}
