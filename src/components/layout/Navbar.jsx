import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { to: '/',           label: 'Home',      exact: true },
  { to: '/dashboard',  label: 'Dashboard', exact: false },
  { to: '/lessons',    label: 'Lessons',   exact: false },
  { to: '/practice',   label: 'Practice',  exact: false },
  { to: '/progress',   label: 'Progress',  exact: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      background: 'rgba(26,26,46,0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(108,99,255,0.18)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.5rem' }}>🌐</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary)' }}>
            Yimaru
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }} className="hidden md:flex">
          {navLinks.map(({ to, label, exact }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={exact}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  fontSize: '0.93rem',
                  transition: 'color 0.2s',
                  paddingBottom: '2px',
                  borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/chat"
          className="hidden md:inline-flex"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--color-primary)', color: '#fff',
            padding: '9px 20px', borderRadius: '9px',
            fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(108,99,255,0.35)',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          🤖 AI Tutor
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)', fontSize: '1.5rem', padding: '4px' }}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          background: 'var(--color-card)', borderTop: '1px solid rgba(108,99,255,0.15)',
          padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: isActive ? 700 : 400,
                textDecoration: 'none',
                fontSize: '1rem',
              })}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/chat"
            onClick={() => setOpen(false)}
            style={{ background: 'var(--color-primary)', color: '#fff', padding: '11px 20px', borderRadius: '9px', fontWeight: 600, textDecoration: 'none', textAlign: 'center', marginTop: '0.5rem' }}
          >
            🤖 Chat with AI Tutor
          </Link>
        </div>
      )}
    </header>
  )
}
