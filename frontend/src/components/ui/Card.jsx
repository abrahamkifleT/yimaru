export default function Card({ children, style = {}, hover = true, glass = false, className = '', ...props }) {
  const base = {
    background: glass 
      ? 'rgba(32, 20, 39, 0.6)' 
      : 'var(--color-card)',
    border: glass 
      ? '1px solid rgba(255,255,255,0.07)' 
      : '1px solid rgba(163,35,142,0.12)',
    backdropFilter: glass ? 'blur(20px)' : undefined,
    borderRadius: '16px',
    padding: 'clamp(1rem, 4vw, 1.5rem)',
    transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
  }

  const onEnter = (e) => {
    if (!hover) return
    e.currentTarget.style.transform = 'translateY(-4px)'
    e.currentTarget.style.borderColor = 'rgba(163,35,142,0.4)'
    e.currentTarget.style.boxShadow = '0 12px 35px rgba(163,35,142,0.1)'
  }
  const onLeave = (e) => {
    if (!hover) return
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.borderColor = glass ? 'rgba(255,255,255,0.07)' : 'rgba(163,35,142,0.12)'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <div className={className} style={{ ...base, ...style }} onMouseEnter={onEnter} onMouseLeave={onLeave} {...props}>
      {children}
    </div>
  )
}
