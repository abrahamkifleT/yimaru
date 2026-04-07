import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const modules = [
  {
    id: 1, title: 'AI Speaking Partner', icon: '🤖',
    desc: 'Have a real-time conversation with your AI tutor to improve your fluency, grammar, and natural expression.',
    color: 'var(--color-primary)',
    available: true,
    action: '/chat',
    tag: 'Live',
  },
  {
    id: 2, title: 'Listening Lab', icon: '🎧',
    desc: 'Listen to native speakers and answer comprehension questions to sharpen your listening skills.',
    color: 'var(--color-secondary)',
    available: false,
    tag: 'Coming Soon',
  },
  {
    id: 3, title: 'Speed Reading', icon: '📖',
    desc: 'Improve your reading speed and retention with timed passages and comprehension challenges.',
    color: 'var(--color-accent)',
    available: false,
    tag: 'Coming Soon',
  },
  {
    id: 4, title: 'Vocabulary Flashcards', icon: '🗂️',
    desc: 'Master new words with intelligent spaced-repetition flashcards tailored to your level.',
    color: '#A78BFA',
    available: false,
    tag: 'Coming Soon',
  },
]

export default function PracticePage() {
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)

  const handleStart = (mod) => {
    if (mod.available && mod.action) {
      navigate(mod.action, { state: { lessonTopic: 'Free conversation practice' } })
    } else {
      setToast(mod.title)
      setTimeout(() => setToast(null), 3000)
    }
  }

  return (
    <div className="section" style={{ minHeight: '80vh', position: 'relative' }}>

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--color-card)', border: '1px solid rgba(163,35,142,0.3)',
          borderRadius: '12px', padding: '12px 24px', fontSize: '0.9rem', fontWeight: 600,
          boxShadow: '0 12px 30px rgba(0,0,0,0.4)', zIndex: 999, color: 'var(--color-text)',
          animation: 'fadeSlideIn 0.2s ease',
          width: 'calc(100% - 3rem)', maxWidth: '400px', textAlign: 'center'
        }}>
          🚧 <strong>{toast}</strong> is coming soon. Stay tuned!
        </div>
      )}

      <div className="container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 'clamp(2rem, 8vw, 3.5rem)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem, 5vw, 2.7rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
            🎯 Practice
          </h1>
          <p style={{ color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto' }}>
            Interactive tools to sharpen your English through immersion and repetition.
          </p>
        </div>

        {/* Practice Module Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {modules.map((mod) => (
            <div key={mod.id} style={{
              background: 'var(--color-card)',
              border: `1.5px solid ${mod.available ? mod.color + '33' : 'rgba(255,255,255,0.05)'}`,
              borderRadius: '20px', padding: '1.5rem sm:2rem',
              transition: 'all 0.2s', opacity: mod.available ? 1 : 0.75,
              cursor: mod.available ? 'pointer' : 'default',
            }}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 animate-in"
              onMouseEnter={e => { if (mod.available) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)' } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              onClick={() => handleStart(mod)}
            >
              {/* Icon */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '20px', flexShrink: 0,
                background: mod.color + '18', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '2.4rem',
                border: `1.5px solid ${mod.color}30`,
              }}>
                {mod.icon}
              </div>

              {/* Text Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column-reverse sm:row', alignItems: 'center sm:center', gap: '0.5rem', marginBottom: '0.6rem' }} className="sm:flex-row">
                  <h3 style={{ fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>{mod.title}</h3>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 800, padding: '3px 12px', borderRadius: '100px',
                    background: mod.available ? mod.color + '22' : 'rgba(255,255,255,0.06)',
                    color: mod.available ? mod.color : 'var(--color-muted)',
                    border: `1px solid ${mod.available ? mod.color + '44' : 'rgba(255,255,255,0.1)'}`,
                    textTransform: 'uppercase', letterSpacing: '0.04em'
                  }}>
                    {mod.tag}
                  </span>
                </div>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.93rem', lineHeight: 1.65, marginBottom: 0 }}>{mod.desc}</p>
              </div>

              {/* CTA Button */}
              <div style={{ flexShrink: 0, width: '100%', sm: 'auto' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleStart(mod) }}
                  style={{
                    width: '100%', sm: 'auto', padding: '11px 26px', borderRadius: '12px', fontWeight: 700, fontSize: '0.92rem',
                    cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'var(--font-sans)',
                    background: mod.available ? mod.color : 'rgba(255,255,255,0.08)',
                    color: mod.available ? '#fff' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                  }}
                >
                  {mod.available ? '▶ Start Now' : '🔒 Locked'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
