import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const publicLinks = [
  { to: '/',        label: 'Home',     exact: true },
  { to: '/lessons', label: 'Lessons',  exact: false },
  { to: '/practice',label: 'Practice', exact: false },
]

const protectedLinks = [
  { to: '/dashboard', label: 'Dashboard', exact: false },
  { to: '/chat',      label: 'AI Tutor',  exact: false },
  { to: '/progress',  label: 'Progress',  exact: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  const allLinks = isAuthenticated
    ? [...publicLinks, ...protectedLinks]
    : publicLinks

  const linkStyle = (isActive) => ({
    color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
    fontWeight: isActive ? 600 : 400,
    textDecoration: 'none',
    fontSize: '0.93rem',
    transition: 'color 0.2s',
    paddingBottom: '2px',
    borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
  })

  return (
    <header style={{
      background: 'rgba(26,26,46,0.88)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
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

        {/* Desktop nav links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
          className="hidden md:flex">
          {allLinks.map(({ to, label, exact }) => (
            <li key={to}>
              <NavLink to={to} end={exact} style={({ isActive }) => linkStyle(isActive)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* User chip */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(108,99,255,0.12)',
                border: '1px solid rgba(108,99,255,0.25)',
                borderRadius: '100px',
                padding: '6px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}>
                <span>{user?.avatar ?? '👤'}</span>
                <span style={{ color: 'var(--color-text)' }}>{user?.name?.split(' ')[0]}</span>
              </div>
              {/* Logout */}
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1.5px solid rgba(252,129,129,0.4)',
                  color: '#FC8181',
                  padding: '8px 16px',
                  borderRadius: '9px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(252,129,129,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                style={{
                  color: 'var(--color-muted)', fontWeight: 600,
                  textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
              >
                Sign In
              </Link>
              <Link to="/login"
                style={{
                  background: 'var(--color-primary)', color: '#fff',
                  padding: '9px 20px', borderRadius: '9px',
                  fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(108,99,255,0.35)',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                🚀 Get Started
              </Link>
            </>
          )}
        </div>

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
          background: 'var(--color-card)',
          borderTop: '1px solid rgba(108,99,255,0.15)',
          padding: '1.25rem 1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {allLinks.map(({ to, label, exact }) => (
            <NavLink key={to} to={to} end={exact} onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: isActive ? 700 : 400,
                textDecoration: 'none', fontSize: '1rem',
              })}
            >
              {label}
            </NavLink>
          ))}

          <div style={{ borderTop: '1px solid rgba(108,99,255,0.1)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {isAuthenticated ? (
              <>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                  Signed in as <strong style={{ color: 'var(--color-text)' }}>{user?.name}</strong>
                </div>
                <button onClick={handleLogout}
                  style={{ background: 'rgba(252,129,129,0.1)', border: '1px solid rgba(252,129,129,0.35)', color: '#FC8181', borderRadius: '9px', padding: '11px 20px', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}
                style={{ background: 'var(--color-primary)', color: '#fff', padding: '11px 20px', borderRadius: '9px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                🚀 Sign In / Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
