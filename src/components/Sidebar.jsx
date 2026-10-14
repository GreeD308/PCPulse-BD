import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  TrendingUp,
  Tag,
  Cpu,
  Bell,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/price-comparison', label: 'Price Comparison', icon: ArrowLeftRight },
  { to: '/market-trends', label: 'Market Trends', icon: TrendingUp },
  { to: '/best-deals', label: 'Best Deals', icon: Tag },
  { to: '/pc-builder', label: 'PC Builder', icon: Cpu },
  { to: '/price-alerts', label: 'Price Alerts', icon: Bell },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 border-r"
        style={{
          backgroundColor: 'var(--color-navy-900)',
          borderColor: 'var(--color-slate-700)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col w-60 transform transition-transform duration-200 lg:hidden border-r ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--color-navy-900)',
          borderColor: 'var(--color-slate-700)',
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--color-slate-700)' }}>
          <Logo />
          <button
            onClick={onClose}
            className="p-1 rounded-md transition-colors hover:bg-white/10"
            style={{ color: 'var(--color-slate-400)' }}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <NavItems />
        </nav>
      </aside>
    </>
  )
}

function SidebarContent() {
  return (
    <>
      <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--color-slate-700)' }}>
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <NavItems />
      </nav>
      <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--color-slate-700)' }}>
        <p className="text-xs" style={{ color: 'var(--color-slate-400)' }}>
          © 2026 PCPulse BD
        </p>
      </div>
    </>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        <Zap size={16} color="white" />
      </div>
      <div>
        <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--color-slate-100)' }}>
          PCPulse
        </span>
        <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--color-accent)' }}>
          {' '}BD
        </span>
      </div>
    </div>
  )
}

function NavItems() {
  return (
    <ul className="space-y-0.5">
      {navItems.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'text-white'
                  : 'hover:bg-white/5'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: 'var(--color-accent-muted)',
                    color: 'var(--color-blue-300)',
                  }
                : { color: 'var(--color-slate-300)' }
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={17}
                  color={isActive ? 'var(--color-blue-300)' : 'var(--color-slate-400)'}
                />
                {label}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
