import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const features = [
  { icon: '🤖', title: 'AI Conversations', desc: 'Chat with an AI tutor that adapts to your level and corrects you in real time.' },
  { icon: '📚', title: 'Smart Lessons', desc: 'Personalized lesson plans built around your weak spots and learning style.' },
  { icon: '🎯', title: 'Adaptive Quizzes', desc: 'Dynamic exercises that evolve as you level up.' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Beautiful dashboards showing your growth and streaks.' },
  { icon: '🔊', title: 'Pronunciation AI', desc: 'Real-time speech analysis to perfect your accent.' },
  { icon: '🏆', title: 'Gamified XP', desc: 'Earn points, unlock badges, and climb leaderboards.' },
]

const testimonials = [
  { name: 'Sara M.', flag: '🇪🇹', text: 'Yimaru helped me go from basic to fluent in 4 months. The AI chat is incredible!', level: 'Advanced' },
  { name: 'Daniel K.', flag: '🇰🇪', text: 'I use it 20 mins a day. My IELTS score jumped by 1.5 bands in just 6 weeks.', level: 'Intermediate' },
  { name: 'Amira T.', flag: '🇸🇩', text: 'The pronunciation feedback is something I couldn\'t find anywhere else. Worth it.', level: 'Beginner' },
]

export default function HomePage() {
  return (
    <div>
      {/* ───── HERO ───── */}
      <section style={{
        background: 'linear-gradient(145deg, var(--color-dark) 0%, #1a1333 50%, var(--color-surface) 100%)',
        padding: 'clamp(4rem, 10vw, 7rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-4xl mx-auto text-center" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block', background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.4)',
            borderRadius: '100px', padding: '6px 18px', fontSize: '0.8rem', color: 'var(--color-primary)',
            fontWeight: 600, marginBottom: '2rem', letterSpacing: '0.06em',
          }}>
            ✨ AI-Powered · Adaptive · Free to Start
          </span>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            fontWeight: 800, lineHeight: 1.12, marginBottom: '1.5rem',
          }}>
            Speak English{' '}
            <span style={{ background: 'linear-gradient(90deg, var(--color-primary), #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Fluently
            </span>
            <br />with Your AI Tutor
          </h1>

          <p style={{ color: 'var(--color-muted)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', maxWidth: '580px', margin: '0 auto 3rem', lineHeight: 1.8 }}>
            Yimaru combines cutting-edge AI with proven language science to give you a truly personalized path to English fluency — in minutes a day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button as={Link} to="/chat" size="lg">
              🤖 Chat with AI Tutor
            </Button>
            <Button as={Link} to="/dashboard" variant="outline" size="lg">
              📊 Go to Dashboard
            </Button>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: '3rem', display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['50K+', 'Learners'], ['4.9★', 'Rating'], ['200+', 'Lessons']].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>{val}</div>
                <div style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.5rem', background: 'var(--color-dark)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
              Everything You Need to Succeed
            </h2>
            <p style={{ color: 'var(--color-muted)', maxWidth: '500px', margin: '0 auto' }}>
              A complete AI-powered toolkit designed for rapid, lasting English fluency.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc }) => (
              <Card key={title}>
                <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.5rem', background: 'var(--color-surface)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 4vw, 2.2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
            What Learners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, flag, text, level }) => (
              <Card key={name} hover={false} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ color: 'var(--color-text)', lineHeight: 1.75, fontStyle: 'italic', fontSize: '0.95rem' }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{flag} {name}</span>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 600, background: 'rgba(108,99,255,0.12)', padding: '3px 10px', borderRadius: '100px' }}>{level}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.5rem', background: 'var(--color-dark)' }}>
        <div style={{
          maxWidth: '760px', margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(108,99,255,0.22), rgba(167,139,250,0.1))',
          border: '1px solid rgba(108,99,255,0.25)', borderRadius: '20px', padding: 'clamp(2.5rem, 6vw, 4rem) 2rem',
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to become fluent?
          </h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Join 50,000+ learners already transforming their English with Yimaru AI.
          </p>
          <Button as={Link} to="/chat" size="lg">
            🚀 Start for Free — No Credit Card
          </Button>
        </div>
      </section>
    </div>
  )
}
