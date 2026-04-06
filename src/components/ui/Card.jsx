export default function Card({ children, style = {}, hover = true, ...props }) {
  const base = {
    background: 'var(--color-card)',
    border: '1px solid rgba(108,99,255,0.15)',
    borderRadius: '16px',
    padding: '1.5rem',
    transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
  }

  const onEnter = (e) => {
    if (!hover) return
    e.currentTarget.style.transform = 'translateY(-4px)'
    e.currentTarget.style.borderColor = 'rgba(108,99,255,0.45)'
    e.currentTarget.style.boxShadow = '0 8px 30px rgba(108,99,255,0.12)'
  }
  const onLeave = (e) => {
    if (!hover) return
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.borderColor = 'rgba(108,99,255,0.15)'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <div style={{ ...base, ...style }} onMouseEnter={onEnter} onMouseLeave={onLeave} {...props}>
      {children}
    </div>
  )
}
