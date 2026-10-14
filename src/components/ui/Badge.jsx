/**
 * Badge – inline status/label chip.
 *
 * @param {'default'|'success'|'warning'|'danger'|'info'} [variant='default']
 * @param {'sm'|'md'} [size='md']
 */

const variantStyles = {
  default: { bg: 'var(--color-slate-700)', color: 'var(--color-slate-200)' },
  success: { bg: 'rgba(16,185,129,0.15)', color: '#34d399' },
  warning: { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24' },
  danger:  { bg: 'rgba(239,68,68,0.15)',  color: '#f87171' },
  info:    { bg: 'rgba(59,130,246,0.15)', color: 'var(--color-blue-300)' },
}

const sizeClasses = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-xs px-2.5 py-1',
}

export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const vs = variantStyles[variant] ?? variantStyles.default
  const sc = sizeClasses[size] ?? sizeClasses.md

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sc} ${className}`}
      style={{ backgroundColor: vs.bg, color: vs.color }}
    >
      {children}
    </span>
  )
}
