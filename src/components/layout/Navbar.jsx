import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/lessons', label: 'Lessons' },
  { to: '/practice', label: 'Practice' },
  { to: '/progress', label: 'Progress' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ background: 'var(--color-surface)', borderBottom: '1px solid rgba(108,99,255,0.2)' }}
      className="sticky top-0 z-50 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span style={{ fontSize: '1.6rem' }}>🌐</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-primary)' }}>
            Yimaru
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/lessons"
            style={{ background: 'var(--color-primary)', borderRadius: '8px', padding: '8px 20px', color: '#fff', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)', fontSize: '1.5rem' }}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: 'var(--color-card)', borderTop: '1px solid rgba(108,99,255,0.15)', padding: '1rem 1.5rem' }}
          className="md:hidden flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: isActive ? 600 : 400,
                textDecoration: 'none',
                fontSize: '1rem',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
