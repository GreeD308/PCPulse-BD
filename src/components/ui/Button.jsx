/**
 * Button – primary, secondary, ghost, danger variants.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'ghost'|'danger'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.disabled]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 */

const variants = {
  primary: {
    backgroundColor: 'var(--color-accent)',
    color: '#fff',
    border: 'none',
    '--hover-bg': 'var(--color-accent-hover)',
  },
  secondary: {
    backgroundColor: 'var(--color-slate-800)',
    color: 'var(--color-slate-200)',
    border: '1px solid var(--color-slate-600)',
    '--hover-bg': 'var(--color-slate-700)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-slate-300)',
    border: 'none',
    '--hover-bg': 'rgba(255,255,255,0.07)',
  },
  danger: {
    backgroundColor: 'var(--color-danger)',
    color: '#fff',
    border: 'none',
    '--hover-bg': '#dc2626',
  },
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  id,
}) {
  const variantStyle = variants[variant] ?? variants.primary
  const sizeClass = sizes[size] ?? sizes.md

  function handleMouseEnter(e) {
    if (!disabled) e.currentTarget.style.backgroundColor = variantStyle['--hover-bg']
  }
  function handleMouseLeave(e) {
    if (!disabled) e.currentTarget.style.backgroundColor = variantStyle.backgroundColor
  }

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClass} ${className}`}
      style={{
        backgroundColor: variantStyle.backgroundColor,
        color: variantStyle.color,
        border: variantStyle.border,
      }}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  )
}
