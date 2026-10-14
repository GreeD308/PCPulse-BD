/**
 * Card – standard surface container.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {boolean} [props.hoverable]  adds subtle hover lift
 * @param {React.CSSProperties} [props.style]
 */
export default function Card({ children, className = '', hoverable = false, style = {}, id }) {
  return (
    <div
      id={id}
      className={`rounded-xl border transition-all duration-200 ${
        hoverable ? 'hover:-translate-y-0.5 hover:shadow-lg' : ''
      } ${className}`}
      style={{
        backgroundColor: 'var(--color-navy-800)',
        borderColor: 'var(--color-slate-700)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/**
 * CardHeader – top section of a Card with optional action slot.
 */
export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between px-5 pt-5 pb-4 border-b ${className}`}
      style={{ borderColor: 'var(--color-slate-700)' }}
    >
      <div>
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-slate-100)' }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-slate-400)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="ml-3 shrink-0">{action}</div>}
    </div>
  )
}

/**
 * CardBody – padded content area.
 */
export function CardBody({ children, className = '' }) {
  return (
    <div className={`px-5 py-4 ${className}`}>
      {children}
    </div>
  )
}
