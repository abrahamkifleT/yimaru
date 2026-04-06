const lessons = [
  { id: 1, level: 'Beginner', title: 'Greetings & Introductions', desc: 'Learn essential phrases to introduce yourself and greet others.', duration: '15 min', xp: 50, icon: '👋' },
  { id: 2, level: 'Beginner', title: 'Numbers & Time', desc: 'Master counting, telling time, and describing schedules.', duration: '20 min', xp: 60, icon: '🕐' },
  { id: 3, level: 'Intermediate', title: 'Everyday Conversations', desc: 'Practice natural daily dialogue with AI speaking partners.', duration: '25 min', xp: 80, icon: '💬' },
  { id: 4, level: 'Intermediate', title: 'Business English', desc: 'Professional vocabulary for meetings, emails, and presentations.', duration: '30 min', xp: 100, icon: '💼' },
  { id: 5, level: 'Advanced', title: 'Idiomatic Expressions', desc: 'Sound like a native with common idioms and phrasal verbs.', duration: '35 min', xp: 120, icon: '🎭' },
  { id: 6, level: 'Advanced', title: 'Academic Writing', desc: 'Structure essays and reports with precision and clarity.', duration: '40 min', xp: 150, icon: '✍️' },
]

const levelColor = { Beginner: '#48BB78', Intermediate: '#F6AD55', Advanced: '#FC8181' }

export default function LessonsPage() {
  return (
    <div style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
            📚 Lessons
          </h1>
          <p style={{ color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto' }}>
            Structured, AI-powered lessons for every proficiency level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.id}
              style={{ background: 'var(--color-card)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: '12px', padding: '1.5rem', transition: 'transform 0.2s, border-color 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.15)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: '2rem' }}>{lesson.icon}</span>
                <span style={{ background: levelColor[lesson.level] + '22', color: levelColor[lesson.level], borderRadius: '100px', padding: '3px 12px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {lesson.level}
                </span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{lesson.title}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>{lesson.desc}</p>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>⏱ {lesson.duration}</span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.85rem' }}>+{lesson.xp} XP</span>
              </div>
              <button style={{ width: '100%', marginTop: '1rem', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.target.style.opacity = '0.85'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                Start Lesson
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
