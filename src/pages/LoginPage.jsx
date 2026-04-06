import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [email, setEmail]       = useState('abraham@yimaru.com')
  const [password, setPassword] = useState('demo123')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--color-card)',
    border: '1.5px solid rgba(108,99,255,0.25)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 65px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: 'radial-gradient(ellipse at 30% 40%, rgba(108,99,255,0.1) 0%, transparent 60%), var(--color-dark)',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🌐</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--color-primary)' }}>
              Yimaru
            </span>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', marginTop: '1rem', marginBottom: '0.4rem' }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid rgba(108,99,255,0.2)',
          borderRadius: '18px',
          padding: '2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>

          {/* Demo hint */}
          <div style={{
            background: 'rgba(72,187,120,0.1)',
            border: '1px solid rgba(72,187,120,0.25)',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            color: 'var(--color-secondary)',
          }}>
            🧪 <strong>Demo credentials pre-filled</strong> — just click Sign In.
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--color-text)' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.target.style.borderColor = 'rgba(108,99,255,0.25)'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--color-text)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.target.style.borderColor = 'rgba(108,99,255,0.25)'}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(252,129,129,0.12)',
                border: '1px solid rgba(252,129,129,0.35)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FC8181',
                fontSize: '0.875rem',
              }}>
                ⚠️ {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              style={{ width: '100%', marginTop: '0.25rem', justifyContent: 'center' }}
            >
              {loading ? '⏳ Signing in…' : '🚀 Sign In'}
            </Button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            Don't have an account?{' '}
            <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Start for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
