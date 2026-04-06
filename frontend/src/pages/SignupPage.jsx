import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const FEATURES = [
  { icon: '🤖', text: 'AI-powered conversation tutor' },
  { icon: '🔊', text: 'Real-time pronunciation feedback' },
  { icon: '📈', text: 'Personalized progress tracking' },
  { icon: '🏆', text: 'Gamified XP and streak system' },
]

export default function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(name, email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputBase = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(163,35,142,0.2)', borderRadius: '10px',
    padding: '12px 16px', color: 'var(--color-text)', fontSize: '0.95rem',
    outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 65px)',
      display: 'flex',
    }}>

      {/* ── Left panel (brand) — hidden on mobile ── */}
      <div style={{
        flex: '0 0 45%', display: 'none',
        background: 'linear-gradient(155deg, #18091a 0%, #2d0530 50%, #1a0d20 100%)',
        position: 'relative', overflow: 'hidden',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
        padding: '4rem 3.5rem',
      }} className="hidden lg:flex">

        {/* Glow */}
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(163,35,142,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,213,79,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '4rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden' }}>
            <img src="/logo.png" alt="Yimaru" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: '#fff', letterSpacing: '-0.5px' }}>
            Yimaru
          </span>
        </Link>

        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.4rem', lineHeight: 1.2, marginBottom: '1.5rem', color: '#fff' }}>
          Start learning<br />
          <span style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            today.
          </span>
        </h2>

        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '340px' }}>
          Join 50,000+ learners who are transforming their English fluency with Yimaru's AI-powered platform.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FEATURES.map(f => (
            <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(163,35,142,0.2)', border: '1px solid rgba(163,35,142,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                {f.icon}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: 'var(--color-dark)',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* Mobile-only logo */}
          <div className="lg:hidden" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden' }}>
                <img src="/logo.png" alt="Yimaru" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--color-primary)' }}>
                Yimaru
              </span>
            </Link>
          </div>

          {/* Headings */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', marginBottom: '0.4rem' }}>
              Create an account ✨
            </h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              Sign up to start your learning journey
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid rgba(163,35,142,0.15)',
            borderRadius: '20px', padding: '2rem',
            boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
          }}>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name
                </label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  style={inputBase}
                  onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(163,35,142,0.2)'}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Email address
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  style={inputBase}
                  onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(163,35,142,0.2)'}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Password
                </label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  style={inputBase}
                  onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(163,35,142,0.2)'}
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div style={{
                  background: 'rgba(252,129,129,0.08)', border: '1px solid rgba(252,129,129,0.3)',
                  borderRadius: '10px', padding: '10px 14px', color: '#FC8181', fontSize: '0.875rem',
                }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '13px', borderRadius: '12px',
                  background: loading ? 'rgba(163,35,142,0.5)' : 'var(--color-primary)',
                  color: '#fff', border: 'none', fontWeight: 700, fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)',
                  boxShadow: '0 6px 20px rgba(163,35,142,0.35)', transition: 'all 0.2s',
                  marginTop: '0.25rem',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {loading ? '⏳ Signing up…' : '🚀 Sign Up'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
