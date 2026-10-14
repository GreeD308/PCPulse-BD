import { useState } from 'react'
import { Menu, Search, Sun, Moon, User, Zap } from 'lucide-react'

export default function Navbar({ onMenuClick }) {
  const [dark, setDark] = useState(true)

  return (
    <header
      className="flex items-center gap-3 px-4 sm:px-6 h-14 shrink-0 border-b"
      style={{
        backgroundColor: 'var(--color-navy-900)',
        borderColor: 'var(--color-slate-700)',
      }}
    >
      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-1.5 rounded-md transition-colors hover:bg-white/10"
        style={{ color: 'var(--color-slate-400)' }}
        onClick={onMenuClick}
        aria-label="Open menu"
        id="nav-menu-btn"
      >
        <Menu size={20} />
      </button>

      {/* Desktop logo duplicate (visible only when sidebar hidden) */}
      <div className="hidden sm:flex lg:hidden items-center gap-2 mr-2">
        <div
          className="flex items-center justify-center w-7 h-7 rounded-md"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <Zap size={14} color="white" />
        </div>
        <span className="text-sm font-bold" style={{ color: 'var(--color-slate-100)' }}>
          PCPulse <span style={{ color: 'var(--color-accent)' }}>BD</span>
        </span>
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--color-slate-500)' }}
        />
        <input
          id="global-search"
          type="search"
          placeholder="Search products, brands…"
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border outline-none transition-colors"
          style={{
            backgroundColor: 'var(--color-navy-800)',
            borderColor: 'var(--color-slate-700)',
            color: 'var(--color-slate-200)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-slate-700)')}
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Theme toggle */}
        <button
          id="theme-toggle"
          onClick={() => setDark(d => !d)}
          className="p-2 rounded-md transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-slate-400)' }}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Profile */}
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full border cursor-pointer"
          style={{
            backgroundColor: 'var(--color-slate-800)',
            borderColor: 'var(--color-slate-600)',
            color: 'var(--color-slate-300)',
          }}
          id="profile-avatar"
          role="button"
          tabIndex={0}
          aria-label="Profile"
        >
          <User size={16} />
        </div>
      </div>
    </header>
  )
}
