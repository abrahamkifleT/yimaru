import React from 'react'

const stats = [
  { label: 'Words Learned', value: '1,248', icon: '📝', color: 'var(--color-primary)' },
  { label: 'Lessons Completed', value: '42', icon: '📖', color: 'var(--color-secondary)' },
  { label: 'Fluency Score', value: '78%', icon: '📈', color: 'var(--color-accent)' },
  { label: 'Study Streak', value: '12 Days', icon: '🔥', color: '#FC8181' },
]

export default function ProgressPage() {
  return (
    <div style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
            📊 Progress
          </h1>
          <p style={{ color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto' }}>
            Track your journey and visualize your path to English mastery.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label}
              style={{ background: 'var(--color-card)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{stat.icon}</div>
              <div style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Charts Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div style={{ background: 'var(--color-card)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: '16px', padding: '2rem', flex: 2, lgGridColumn: 'span 2' }} className="lg:col-span-2">
            <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Weekly Activity</h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px' }}>
              {[60, 45, 80, 55, 90, 70, 100].map((height, i) => (
                <div key={i} style={{ flex: 1, position: 'relative' }}>
                  <div style={{ background: 'var(--color-primary)', opacity: 0.8, height: `${height}%`, borderRadius: '4px 4px 0 0', transition: 'height 0.5s ease' }}></div>
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '8px' }}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--color-card)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: '16px', padding: '2rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Recent Achievements</h3>
            <div className="space-y-4">
              {[
                { icon: '🥉', title: 'Early Bird', desc: 'Study 5 days before 9 AM.' },
                { icon: '🥈', title: 'Bookworm', desc: 'Finish 10 reading modules.' },
                { icon: '🥇', title: 'Chatterbox', desc: '1 hour of AI conversation.' },
                { icon: '🏆', title: 'Top 10%', desc: 'Climb to the Silver League.' },
              ].map((achievement, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: i < 3 ? '1px solid rgba(108,99,255,0.1)' : 'none' }}>
                   <div style={{ fontSize: '1.5rem' }}>{achievement.icon}</div>
                   <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{achievement.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{achievement.desc}</div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
