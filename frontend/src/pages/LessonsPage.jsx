import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const lessons = [
  { id: 1, level: 'Beginner',     title: 'Greetings & Introductions', desc: 'Learn essential phrases to introduce yourself and greet others.', duration: '15 min', xp: 50,  icon: '👋' },
  { id: 2, level: 'Beginner',     title: 'Numbers & Time',             desc: 'Master counting, telling time, and describing schedules.',     duration: '20 min', xp: 60,  icon: '🕐' },
  { id: 3, level: 'Intermediate', title: 'Everyday Conversations',     desc: 'Practice natural daily dialogue with AI speaking partners.',   duration: '25 min', xp: 80,  icon: '💬' },
  { id: 4, level: 'Intermediate', title: 'Business English',           desc: 'Professional vocabulary for meetings, emails, and presentations.', duration: '30 min', xp: 100, icon: '💼' },
  { id: 5, level: 'Advanced',     title: 'Idiomatic Expressions',      desc: 'Sound like a native with common idioms and phrasal verbs.',    duration: '35 min', xp: 120, icon: '🎭' },
  { id: 6, level: 'Advanced',     title: 'Academic Writing',           desc: 'Structure essays and reports with precision and clarity.',     duration: '40 min', xp: 150, icon: '✍️' },
]

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced']
const levelColor = { Beginner: '#48BB78', Intermediate: '#FFD54F', Advanced: '#FC8181' }

export default function LessonsPage() {
  const [activeLevel, setActiveLevel] = useState('All')
  const navigate = useNavigate()

  const filtered = activeLevel === 'All' ? lessons : lessons.filter(l => l.level === activeLevel)

  const handleStart = (lesson) => {
    navigate('/chat', { state: { lessonTopic: lesson.title } })
  }

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">

        {/* Header */}
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem, 5vw, 2.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
            📚 Lessons
          </h1>
          <p style={{ color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Structured, AI-powered lessons for every proficiency level.
          </p>

          {/* Level filter tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }} className="animate-in">
            {LEVELS.map(lvl => (
              <button key={lvl} onClick={() => setActiveLevel(lvl)} style={{
                borderRadius: '100px', fontWeight: 600, fontSize: '0.85rem',
                cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'var(--font-sans)',
                background: activeLevel === lvl ? 'var(--color-primary)' : 'rgba(163,35,142,0.06)',
                color: activeLevel === lvl ? '#fff' : 'var(--color-muted)',
                border: activeLevel === lvl ? 'none' : '1.5px solid rgba(163,35,142,0.15)',
              }}
              className="px-4.5 py-1.75 sm:px-5.5 sm:py-1.75"
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((lesson) => (
            <div key={lesson.id}
              style={{
                background: 'var(--color-card)',
                border: '1px solid rgba(163,35,142,0.15)',
                borderRadius: '16px',
                transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
              }}
              className="animate-in p-5 sm:p-6"
              onClick={() => handleStart(lesson)}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(163,35,142,0.4)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(163,35,142,0.15)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Icon + Level badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2.2rem', lineHeight: 1 }}>{lesson.icon}</div>
                <span style={{
                  background: levelColor[lesson.level] + '22', color: levelColor[lesson.level],
                  borderRadius: '100px', padding: '3px 12px', fontSize: '0.75rem', fontWeight: 700,
                }}>
                  {lesson.level}
                </span>
              </div>

              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{lesson.title}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.65, flex: 1, marginBottom: '1.25rem' }}>{lesson.desc}</p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>⏱ {lesson.duration}</span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem' }}>+{lesson.xp} XP</span>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleStart(lesson) }}
                style={{
                  width: '100%', padding: '11px', borderRadius: '10px',
                  background: 'var(--color-primary)', color: '#fff', border: 'none',
                  fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                  transition: 'opacity 0.2s, transform 0.1s', fontFamily: 'var(--font-sans)',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(0.99)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                🚀 Start Lesson
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
