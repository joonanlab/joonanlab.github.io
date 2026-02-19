export function Footer() {
  return (
    <footer
      className="py-8 px-6"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto text-center text-base" style={{ color: 'var(--text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} An Lab, Korea University. All rights reserved.</p>
      </div>
    </footer>
  )
}
