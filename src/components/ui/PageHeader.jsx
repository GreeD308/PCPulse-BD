/**
 * PageHeader – consistent title bar at the top of every page.
 *
 * @param {string} props.title          – main heading
 * @param {string} [props.subtitle]     – supporting description
 * @param {React.ReactNode} [props.actions] – right-aligned CTAs
 */
export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--color-slate-100)' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-slate-400)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  )
}
