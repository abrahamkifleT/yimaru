import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid rgba(108,99,255,0.15)', padding: '2.5rem 1.5rem' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.4rem' }}>🌐</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-primary)' }}>Yimaru</span>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>— AI English Learning</span>
        </div>

        <nav className="flex gap-6">
          {[['/', 'Home'], ['/lessons', 'Lessons'], ['/practice', 'Practice'], ['/progress', 'Progress']].map(([to, label]) => (
            <Link key={to} to={to}
              style={{ color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}
            >
              {label}
            </Link>
          ))}
        </nav>

        <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Yimaru. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
