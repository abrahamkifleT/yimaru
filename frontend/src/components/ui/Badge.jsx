const colorMap = {
  purple: { bg: 'rgba(108,99,255,0.15)', text: 'var(--color-primary)' },
  green:  { bg: 'rgba(72,187,120,0.15)',  text: 'var(--color-secondary)' },
  yellow: { bg: 'rgba(246,173,85,0.15)',  text: 'var(--color-accent)' },
  red:    { bg: 'rgba(252,129,129,0.15)', text: '#FC8181' },
  violet: { bg: 'rgba(167,139,250,0.15)', text: '#A78BFA' },
}

export default function Badge({ children, color = 'purple', style = {}, className = '' }) {
  const { bg, text } = colorMap[color] ?? colorMap.purple
  return (
    <span className={className} style={{
      display: 'inline-block',
      background: bg,
      color: text,
      borderRadius: '100px',
      padding: '4px 12px',
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.03em',
      ...style,
    }}>
      {children}
    </span>
  )
}
