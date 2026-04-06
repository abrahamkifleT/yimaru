import { useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import Button from '../ui/Button'

const levelColor = { Beginner: 'green', Intermediate: 'yellow', Advanced: 'red' }

export default function LessonCard({ lesson }) {
  const { icon, title, desc, level, duration, xp, progress = 0 } = lesson
  const navigate = useNavigate()

  const handleStart = () => {
    // Navigate to AI Tutor with the lesson topic pre-seeded
    navigate('/chat', { state: { lessonTopic: title } })
  }

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontSize: '2rem' }}>{icon}</span>
        <Badge color={levelColor[level]}>{level}</Badge>
      </div>

      <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{title}</h3>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.1rem' }}>{desc}</p>

      <ProgressBar value={progress} showLabel />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
        <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>⏱ {duration}</span>
        <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem' }}>+{xp} XP</span>
      </div>

      <Button onClick={handleStart} style={{ width: '100%', marginTop: '1rem' }} size="sm">
        {progress > 0 ? '▶ Continue' : '🚀 Start Lesson'}
      </Button>
    </Card>
  )
}
