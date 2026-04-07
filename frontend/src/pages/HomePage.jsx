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
        background: 'linear-gradient(145deg, var(--color-dark) 0%, #18091a 60%, var(--color-surface) 100%)',
        padding: 'clamp(4rem, 8vw, 8rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(163,35,142,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,213,79,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center" style={{ position: 'relative', zIndex: 1 }}>

          {/* ────── Hero Text (Left) ────── */}
          <div style={{ maxWidth: '600px' }} className="text-center lg:text-left mx-auto lg:mx-0 px-4 sm:px-0">
            <span style={{
              display: 'inline-block', background: 'rgba(163,35,142,0.12)', border: '1px solid rgba(163,35,142,0.3)',
              borderRadius: '100px', padding: '6px 18px', fontSize: '0.85rem', color: '#E477C8',
              fontWeight: 600, marginBottom: '1.5rem', sm: { marginBottom: '2rem' }, letterSpacing: '0.04em',
            }} className="animate-in">
              ✨ Next-Gen AI English Tutor
            </span>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 8vw, 4.5rem)',
              fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem',
              letterSpacing: '-1px'
            }}>
              Master English with<br />
              <span style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Total Confidence
              </span>
            </h1>

            <p style={{ color: 'var(--color-muted)', fontSize: 'clamp(1rem, 3vw, 1.15rem)', marginBottom: '2.5rem', lineHeight: 1.75 }}>
              Yimaru blends advanced language AI with personalized learning to correct your grammar, perfect your pronunciation, and get you fluent—in just minutes a day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button as={Link} to="/chat" size="lg" className="w-full sm:w-auto" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
                🚀 Start for Free
              </Button>
              <Button as={Link} to="/lessons" variant="outline" size="lg" className="w-full sm:w-auto" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
                Explore Features ▶
              </Button>
            </div>

            {/* Social proof */}
            <div style={{ marginTop: '3.5rem', display: 'flex', gap: '2.5rem', justifyContent: 'center', lg: { justifyContent: 'flex-start' }, flexWrap: 'wrap' }} className="justify-center lg:justify-start">
              {[['50K+', 'Learners'], ['4.9★', 'App Review'], ['100+', 'Languages']].map(([val, lbl]) => (
                <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)' }}>{val}</div>
                  <div style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ────── Hero Graphic (Right) ────── */}
          <div className="hidden lg:flex" style={{ position: 'relative', height: '540px', alignItems: 'center', justifyContent: 'center' }}>

            {/* Background Decorative Element */}
            <div style={{ position: 'absolute', right: '0', width: '380px', height: '480px', background: 'linear-gradient(135deg, rgba(163,35,142,0.1), rgba(255,213,79,0.05))', borderRadius: '30px', transform: 'rotate(6deg)', border: '1px solid rgba(255,255,255,0.03)' }} />

            {/* Main Chat Card (Glassmorphism) */}
            <div style={{
              position: 'absolute',
              right: '40px',
              top: '50px',
              width: '340px',
              background: 'rgba(32, 20, 39, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '1.5rem',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
              zIndex: 2
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FC8181' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-accent)' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-secondary)' }} />
                <span style={{ marginLeft: '10px', fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 600 }}>Yimaru Tutor</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px 16px', borderRadius: '4px 16px 16px 16px', fontSize: '0.85rem', width: '85%' }}>
                  Hi there! 👋 How is your English practice going today?
                </div>
                <div style={{ background: 'var(--color-primary)', padding: '12px 16px', borderRadius: '16px 4px 16px 16px', fontSize: '0.85rem', width: '80%', alignSelf: 'flex-end', color: '#fff', boxShadow: '0 8px 20px rgba(163,35,142,0.3)' }}>
                  I want to learn how to order coffee in English!
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px 16px', borderRadius: '4px 16px 16px 16px', fontSize: '0.85rem', width: '90%' }}>
                  Perfect. You can say: "I would like a large cappuccino, please." Try saying it out loud! 🎙️
                </div>
              </div>
            </div>

            {/* Floating Grammar Correction Card */}
            <div style={{
              position: 'absolute',
              left: '0',
              bottom: '90px',
              width: '240px',
              background: 'rgba(26, 17, 31, 0.85)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(163,35,142,0.3)',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              zIndex: 3,
              animation: 'fadeSlideIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 700, marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span>✨ AI Correction</span>
              </div>
              <div style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: '#FC8181', marginBottom: '4px' }}>
                I go to market yesterday.
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-secondary)', fontWeight: 600 }}>
                I <strong style={{ color: '#fff' }}>went</strong> to <strong style={{ color: '#fff' }}>the</strong> market yesterday.
              </div>
            </div>

            {/* Floating Progress Pill */}
            <div style={{
              position: 'absolute',
              right: '25px',
              bottom: '40px',
              background: 'linear-gradient(135deg, var(--color-surface), var(--color-card))',
              border: '1px solid rgba(255,213,79,0.2)',
              borderRadius: '100px',
              padding: '8px 16px',
              display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
              zIndex: 4
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,213,79,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', fontSize: '0.9rem' }}>🔥</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>14 Day Streak!</div>
            </div>

          </div>

        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="section" style={{ background: 'var(--color-dark)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 5vw, 2.4rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
              Everything You Need to Succeed
            </h2>
            <p style={{ color: 'var(--color-muted)', maxWidth: '500px', margin: '0 auto' }}>
              A complete AI-powered toolkit designed for rapid, lasting English fluency.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map(({ icon, title, desc }) => (
              <Card key={title} style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.93rem', lineHeight: 1.7 }}>{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 5vw, 2.2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
            What Learners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, flag, text, level }) => (
              <Card key={name} hover={false} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem' }}>
                <p style={{ color: 'var(--color-text)', lineHeight: 1.75, fontStyle: 'italic', fontSize: '0.93rem' }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{flag} {name}</span>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(108,99,255,0.12)', padding: '3px 10px', borderRadius: '100px' }}>{level}</span>
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
