import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'

const skillColors = {
  'Speaking':   'var(--color-primary)',
  'Listening':  'var(--color-secondary)',
  'Grammar':    'var(--color-accent)',
  'Vocabulary': '#A78BFA',
  'Writing':    '#FC8181',
}

export default function StatsWidget({ stats }) {
  return (
    <Card hover={false}>
      <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>📊 Skill Breakdown</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {stats.map(({ skill, value }) => (
          <div key={skill}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{skill}</span>
              <span style={{ color: skillColors[skill] ?? 'var(--color-primary)', fontWeight: 700 }}>{value}%</span>
            </div>
            <ProgressBar value={value} color={skillColors[skill] ?? 'var(--color-primary)'} height={6} />
          </div>
        ))}
      </div>
    </Card>
  )
}
