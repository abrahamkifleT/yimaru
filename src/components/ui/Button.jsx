import React from 'react'

const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    borderRadius: '10px',
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--font-sans)',
  },
  size: {
    sm: { padding: '8px 16px', fontSize: '0.85rem' },
    md: { padding: '12px 24px', fontSize: '0.95rem' },
    lg: { padding: '15px 36px', fontSize: '1.05rem' },
  },
  variant: {
    primary: { background: 'var(--color-primary)', color: '#fff', boxShadow: '0 4px 15px rgba(108,99,255,0.35)' },
    secondary: { background: 'var(--color-secondary)', color: '#fff', boxShadow: '0 4px 15px rgba(72,187,120,0.35)' },
    outline: { background: 'transparent', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)' },
    ghost: { background: 'rgba(108,99,255,0.1)', color: 'var(--color-primary)' },
    danger: { background: '#FC8181', color: '#fff' },
  },
}

export default function Button({ children, variant = 'primary', size = 'md', style: extra = {}, as: Tag = 'button', ...props }) {
  const base = { ...styles.base, ...styles.size[size], ...styles.variant[variant], ...extra }

  const onEnter = (e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }
  const onLeave = (e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }

  return (
    <Tag style={base} onMouseEnter={onEnter} onMouseLeave={onLeave} {...props}>
      {children}
    </Tag>
  )
}
