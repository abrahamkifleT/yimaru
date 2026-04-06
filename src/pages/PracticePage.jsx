import React from 'react'

const practiceModules = [
  { id: 1, title: 'AI Speaking Partner', icon: '🤖', desc: 'Chat with our AI to improve your conversational fluency.', color: 'var(--color-primary)' },
  { id: 2, title: 'Listening Lab', icon: '🎧', desc: 'Listen to native speakers and answer comprehension questions.', color: 'var(--color-secondary)' },
  { id: 3, title: 'Speed Reading', icon: '📖', desc: 'Improve your reading speed and retention with timed exercises.', color: 'var(--color-accent)' },
  { id: 4, title: 'Vocabulary Flashcards', icon: '🗂️', desc: 'Master new words with our intelligent spaced-repetition system.', color: '#A78BFA' },
]

export default function PracticePage() {
  return (
    <div style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
            🎯 Practice
          </h1>
          <p style={{ color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto' }}>
            Interactive tools to sharpen your skills through immersion and repetition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceModules.map((module) => (
            <div key={module.id}
              style={{ background: 'var(--color-card)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: '16px', padding: '2rem', display: 'flex', gap: '1.5rem', transition: 'transform 0.2s, border-color 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.15)' }}
            >
              <div style={{ background: module.color + '22', color: module.color, width: '64px', height: '64px', borderRadius: '12px', display: 'flex', itemsCenter: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                {module.icon}
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>{module.title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{module.desc}</p>
                <button style={{ background: 'transparent', border: `1px solid ${module.color}`, color: module.color, borderRadius: '8px', padding: '8px 16px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.target.style.background = module.color; e.target.style.color = '#fff' }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = module.color }}
                >
                  Start Practice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
