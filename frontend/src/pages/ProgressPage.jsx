import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ProgressPage() {
  return (
    <div style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
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
          borderRadius: '24px', padding: 'clamp(3rem, 8vw, 5rem) 2rem',
        }}>
          {/* Illustration */}
          <div style={{ fontSize: '5rem', lineHeight: 1 }}>🌱</div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Your journey starts here
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '440px', margin: '0 auto 2rem' }}>
              You haven't completed any lessons yet. Start your first session with the AI Tutor and your progress will be tracked here automatically.
            </p>
          </div>

          {/* Stat boxes (empty/zero state) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full" style={{ maxWidth: '600px' }}>
            {[
              { icon: '📝', label: 'Words Learned', value: '0' },
              { icon: '📖', label: 'Lessons Done', value: '0' },
              { icon: '🔥', label: 'Day Streak', value: '0' },
              { icon: '⚡', label: 'XP Earned', value: '0' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'var(--color-card)', border: '1px solid rgba(163,35,142,0.1)',
                borderRadius: '14px', padding: '1.25rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              }}>
                <div style={{ fontSize: '1.75rem' }}>{stat.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-muted)' }}>{stat.value}</div>
                <div style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/chat" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--color-primary)', color: '#fff',
              padding: '12px 28px', borderRadius: '12px', fontWeight: 700,
              textDecoration: 'none', fontSize: '0.95rem',
              boxShadow: '0 8px 20px rgba(163,35,142,0.3)',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              🤖 Start with AI Tutor
            </Link>
            <Link to="/lessons" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'transparent', color: 'var(--color-primary)',
              padding: '12px 28px', borderRadius: '12px', fontWeight: 700,
              textDecoration: 'none', fontSize: '0.95rem',
              border: '1px solid rgba(163,35,142,0.35)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(163,35,142,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              📚 Browse Lessons
            </Link>
          </div>

          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Progress tracking with charts and achievements will unlock after your first lesson.
          </p>
        </div>
      </div>
    </div>
  )
}
