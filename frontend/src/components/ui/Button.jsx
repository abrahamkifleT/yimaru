export default function Button({ children, variant = 'primary', size = 'md', style: extra = {}, as: Tag = 'button', className = '', ...props }) {
  const variants = {
    primary: { background: 'var(--color-primary)', color: '#fff', boxShadow: '0 4px 15px rgba(163,35,142,0.35)' },
    secondary: { background: 'var(--color-secondary)', color: '#fff', boxShadow: '0 4px 15px rgba(72,187,120,0.35)' },
    outline: { background: 'transparent', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)' },
    ghost: { background: 'rgba(163,35,142,0.1)', color: 'var(--color-primary)' },
    accent: { background: 'var(--color-accent)', color: '#1a0a00', boxShadow: '0 4px 15px rgba(255,213,79,0.3)' },
    danger: { background: '#FC8181', color: '#fff' },
  }
  const sizes = {
    xs: { padding: '5px 12px', fontSize: '0.78rem', borderRadius: '8px' },
    sm: { padding: '8px 18px', fontSize: '0.875rem' },
    md: { padding: '12px 26px', fontSize: '0.95rem' },
    lg: { padding: '15px 38px', fontSize: '1.05rem' },
  }

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    fontWeight: 700, borderRadius: '10px', cursor: 'pointer', border: 'none',
    textDecoration: 'none', transition: 'all 0.2s ease', fontFamily: 'var(--font-sans)',
    whiteSpace: 'nowrap',
    ...sizes[size], ...variants[variant], ...extra,
  }

  const onEnter = (e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }
  const onLeave = (e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }

  return (
    <Tag className={className} style={base} onMouseEnter={onEnter} onMouseLeave={onLeave} {...props}>
      {children}
    </Tag>
  )
}
