import { Link } from 'react-router-dom'
import LessonCard from '../components/lessons/LessonCard'
import StatsWidget from '../components/dashboard/StatsWidget'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const USER = { name: 'Abraham', level: 'Intermediate', xp: 1840, nextLevelXp: 2500, streak: 12, avatar: '👨‍💻' }

const lessons = [
  { id: 1, level: 'Beginner',     icon: '👋', title: 'Greetings & Introductions', desc: 'Master phrases to introduce yourself naturally.', duration: '15 min', xp: 50,  progress: 100 },
  { id: 2, level: 'Beginner',     icon: '🕐', title: 'Numbers & Time',              desc: 'Count, tell time, and describe schedules.',          duration: '20 min', xp: 60,  progress: 75  },
  { id: 3, level: 'Intermediate', icon: '💬', title: 'Everyday Conversations',       desc: 'Practice natural dialogue with your AI partner.',    duration: '25 min', xp: 80,  progress: 40  },
  { id: 4, level: 'Intermediate', icon: '💼', title: 'Business English',             desc: 'Professional vocab for meetings and emails.',        duration: '30 min', xp: 100, progress: 0   },
  { id: 5, level: 'Advanced',     icon: '🎭', title: 'Idiomatic Expressions',        desc: 'Sound like a native with common idioms.',            duration: '35 min', xp: 120, progress: 0   },
  { id: 6, level: 'Advanced',     icon: '✍️', title: 'Academic Writing',             desc: 'Structure essays with precision and clarity.',       duration: '40 min', xp: 150, progress: 0   },
]

const skills = [
  { skill: 'Speaking',   value: 72 },
  { skill: 'Listening',  value: 85 },
  { skill: 'Grammar',    value: 61 },
  { skill: 'Vocabulary', value: 78 },
  { skill: 'Writing',    value: 54 },
]

const activity = [60, 45, 80, 55, 90, 70, 100]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const achievements = [
  { icon: '🔥', title: '12-Day Streak', desc: 'Studied 12 days in a row' },
  { icon: '🏆', title: 'Silver League', desc: 'Top 10% this week' },
  { icon: '📖', title: 'Bookworm', desc: 'Finished 10 reading modules' },
]

export default function DashboardPage() {
  const xpPct = Math.round((USER.xp / USER.nextLevelXp) * 100)

  return (
    <div style={{ background: 'var(--color-dark)', minHeight: '100vh', padding: 'clamp(1.5rem, 4vw, 2.5rem) 1.5rem' }}>
      <div className="max-w-6xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* ── Top bar ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 700 }}>
              {USER.avatar} Welcome back, {USER.name}!
            </h1>
            <p style={{ color: 'var(--color-muted)', marginTop: '4px' }}>
              You're on a <strong style={{ color: '#FC8181' }}>🔥 {USER.streak}-day streak</strong> — keep it up!
            </p>
          </div>
          <Button as={Link} to="/chat" size="md">🤖 Open AI Tutor</Button>
        </div>

        {/* ── XP bar + quick stats ── */}
        <Card hover={false} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>Level Progress</span>
                <Badge color="purple" style={{ marginLeft: '10px' }}>{USER.level}</Badge>
              </div>
              <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{USER.xp} / {USER.nextLevelXp} XP</span>
            </div>
            <div style={{ background: 'rgba(108,99,255,0.12)', borderRadius: '100px', height: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${xpPct}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-primary), #A78BFA)', borderRadius: '100px', transition: 'width 0.8s ease' }} />
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', marginTop: '6px' }}>{USER.nextLevelXp - USER.xp} XP to next level</p>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[['📝', '1,248', 'Words Learned'], ['📚', '42', 'Lessons Done'], ['⏱', '36h', 'Study Time']].map(([icon, val, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem' }}>{icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--color-text)' }}>{val}</div>
                <div style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Main grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="lg:grid-cols-3">

          {/* Lessons — spans 2 cols */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="lg:col-span-2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem' }}>📚 Your Lessons</h2>
              <Button as={Link} to="/lessons" variant="ghost" size="sm">View All →</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {lessons.slice(0, 4).map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Skills */}
            <StatsWidget stats={skills} />

            {/* Weekly Activity */}
            <Card hover={false}>
              <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>📅 Weekly Activity</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '6px', height: '100px' }}>
                {activity.map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '100%', height: `${h}%`, background: i === 6 ? 'var(--color-primary)' : 'rgba(108,99,255,0.35)', borderRadius: '4px 4px 0 0', transition: 'height 0.5s ease' }} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{days[i]}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card hover={false}>
              <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>🏅 Achievements</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {achievements.map(({ icon, title, desc }, i) => (
                  <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: i < achievements.length - 1 ? '1px solid rgba(108,99,255,0.1)' : 'none' }}>
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{title}</div>
                      <div style={{ color: 'var(--color-muted)', fontSize: '0.78rem' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
