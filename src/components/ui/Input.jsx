import { forwardRef } from 'react'

/**
 * Input – styled text input with optional leading icon and error state.
 */
const Input = forwardRef(function Input(
  {
    id,
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    leftIcon,
    rightIcon,
    className = '',
    disabled = false,
    ...rest
  },
  ref,
) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium"
          style={{ color: 'var(--color-slate-300)' }}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span
            className="absolute left-3 pointer-events-none"
            style={{ color: 'var(--color-slate-500)' }}
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full py-2 text-sm rounded-lg border outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            paddingLeft: leftIcon ? '2.25rem' : '0.875rem',
            paddingRight: rightIcon ? '2.25rem' : '0.875rem',
            backgroundColor: 'var(--color-navy-800)',
            borderColor: error ? 'var(--color-danger)' : 'var(--color-slate-700)',
            color: 'var(--color-slate-200)',
          }}
          onFocus={e => {
            if (!error) e.target.style.borderColor = 'var(--color-accent)'
          }}
          onBlur={e => {
            e.target.style.borderColor = error
              ? 'var(--color-danger)'
              : 'var(--color-slate-700)'
          }}
          {...rest}
        />

        {rightIcon && (
          <span
            className="absolute right-3 pointer-events-none"
            style={{ color: 'var(--color-slate-500)' }}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="text-xs" style={{ color: 'var(--color-danger)' }}>
          {error}
        </p>
      )}
    </div>
  )
})

export default Input
