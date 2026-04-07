import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ProgressPage() {
  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 'clamp(2rem, 8vw, 4rem)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
            📊 Your Progress
          </h1>
          <p style={{ color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto' }}>
            Track your journey and visualize your path to English mastery.
          </p>
        </div>

        {/* Empty State */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '2rem', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(163,35,142,0.06), rgba(255,213,79,0.03))',
          border: '1px dashed rgba(163,35,142,0.2)',
          borderRadius: '24px', padding: 'clamp(2.5rem, 8vw, 5rem) 1.5rem',
        }} className="animate-in">
          {/* Illustration */}
          <div style={{ fontSize: 'clamp(4rem, 10vw, 5rem)', lineHeight: 1 }}>🌱</div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 4vw, 1.6rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
              Your journey starts here
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '440px', margin: '0 auto 2rem' }}>
              You haven't completed any lessons yet. Start your first session with the AI Tutor and your progress will be tracked here automatically.
            </p>
          </div>

          {/* Stat boxes (empty/zero state) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full" style={{ maxWidth: '600px' }}>
            {[
              { icon: '📝', label: 'Words', value: '0' },
              { icon: '📖', label: 'Lessons', value: '0' },
              { icon: '🔥', label: 'Streak', value: '0' },
              { icon: '⚡', label: 'XP', value: '0' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'var(--color-card)', border: '1px solid rgba(163,35,142,0.1)',
                borderRadius: '14px', padding: '1rem sm:1.25rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              }}>
                <div style={{ fontSize: '1.5rem' }}>{stat.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-muted)' }}>{stat.value}</div>
                <div style={{ color: 'var(--color-muted)', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '500px' }}>
            <Link to="/chat" style={{
              flex: 1, minWidth: '200px', display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
              background: 'var(--color-primary)', color: '#fff',
              padding: '13px 28px', borderRadius: '12px', fontWeight: 700,
              textDecoration: 'none', fontSize: '0.95rem',
              boxShadow: '0 8px 20px rgba(163,35,142,0.3)',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              🤖 Start Learning
            </Link>
            <Link to="/lessons" style={{
              flex: 1, minWidth: '200px', display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
              background: 'transparent', color: 'var(--color-primary)',
              padding: '13px 28px', borderRadius: '12px', fontWeight: 700,
              textDecoration: 'none', fontSize: '0.95rem',
              border: '1.5px solid rgba(163,35,142,0.35)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(163,35,142,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              📚 Browse Lessons
            </Link>
          </div>

          <p style={{ color: 'var(--color-muted)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
            Detailed charts and achievements will unlock after your first session.
          </p>
        </div>
      </div>
    </div>
  )
}
