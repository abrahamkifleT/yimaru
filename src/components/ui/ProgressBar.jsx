export default function ProgressBar({ value = 0, max = 100, color = 'var(--color-primary)', height = 8, showLabel = false }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
          <span>Progress</span>
          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{pct}%</span>
        </div>
      )}
      <div style={{ background: 'rgba(108,99,255,0.12)', borderRadius: '100px', height, overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: color,
          borderRadius: '100px',
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  )
}
