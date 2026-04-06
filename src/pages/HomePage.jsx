import { Link } from 'react-router-dom'

const features = [
  { icon: '🤖', title: 'AI Conversations', desc: 'Practice real dialogue with an AI tutor that adapts to your level.' },
  { icon: '📚', title: 'Smart Lessons', desc: 'Personalized lesson plans generated from your weak areas.' },
  { icon: '🎯', title: 'Adaptive Quizzes', desc: 'Targeted exercises that evolve as you improve.' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Visualize your growth with detailed analytics and streak rewards.' },
  { icon: '🔊', title: 'Pronunciation AI', desc: 'Real-time speech analysis to perfect your accent.' },
  { icon: '🏆', title: 'Gamified XP', desc: 'Earn points, unlock badges, and compete on leaderboards.' },
]

const stats = [
  { value: '50K+', label: 'Active Learners' },
  { value: '200+', label: 'Lessons Available' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '4.9★', label: 'Average Rating' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-dark) 0%, var(--color-surface) 100%)', padding: '6rem 1.5rem 5rem' }}>
        <div className="max-w-4xl mx-auto text-center">
          <span style={{
            display: 'inline-block', background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.4)',
            borderRadius: '100px', padding: '6px 16px', fontSize: '0.8rem', color: 'var(--color-primary)',
            fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '0.05em'
          }}>
            ✨ Powered by AI
          </span>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Master English with{' '}
            <span style={{ background: 'linear-gradient(90deg, var(--color-primary), #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI-Powered
            </span>{' '}
            Learning
          </h1>

          <p style={{ color: 'var(--color-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Yimaru adapts to your learning style and pace, offering personalized lessons, real-time feedback, and immersive conversations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/lessons"
              style={{ background: 'var(--color-primary)', color: '#fff', padding: '14px 32px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', transition: 'transform 0.2s, opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🚀 Start Free Today
            </Link>
            <Link to="/practice"
              style={{ border: '1px solid rgba(108,99,255,0.5)', color: 'var(--color-text)', padding: '14px 32px', borderRadius: '10px', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'}
            >
              Try a Practice Session
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--color-surface)', padding: '3rem 1.5rem', borderTop: '1px solid rgba(108,99,255,0.1)', borderBottom: '1px solid rgba(108,99,255,0.1)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>{value}</div>
              <div style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-dark)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}>
              Everything You Need to Succeed
            </h2>
            <p style={{ color: 'var(--color-muted)', maxWidth: '520px', margin: '0 auto' }}>
              A complete AI-powered toolkit designed for rapid, lasting English fluency.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc }) => (
              <div key={title}
                style={{ background: 'var(--color-card)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: '12px', padding: '1.75rem', transition: 'transform 0.2s, border-color 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.15)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.25), rgba(167,139,250,0.1))', border: '1px solid rgba(108,99,255,0.2)', margin: '0 1.5rem 4rem', borderRadius: '16px', padding: '3.5rem 2rem', textAlign: 'center' }}>
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to speak English with confidence?
          </h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>Join thousands of learners already transforming their English skills with Yimaru.</p>
          <Link to="/lessons"
            style={{ background: 'var(--color-primary)', color: '#fff', padding: '14px 36px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Get Started — It's Free
          </Link>
        </div>
      </section>
    </div>
  )
}
