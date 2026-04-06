import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '6rem', marginBottom: '1.5rem' }}>🧭</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-primary)' }}>
        404 - Page Not Found
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: '1.15rem', maxWidth: '480px', marginBottom: '2.5rem', lineHeight: 1.8 }}>
        Oops! It looks like you've wandered into uncharted territory. Let's get you back on track to your English learning journey.
      </p>
      <Link to="/"
        style={{ background: 'var(--color-primary)', color: '#fff', padding: '14px 36px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', transition: 'opacity 0.2s', boxShadow: '0 4px 14px 0 rgba(108,99,255,0.39)' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        Go Back Home
      </Link>
    </div>
  )
}
