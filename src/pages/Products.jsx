import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  ArrowRight,
  ArrowUpDown,
  Store,
  TrendingDown,
  TrendingUp,
  SlidersHorizontal,
  Package,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { formatBDT, formatPct } from '../utils/format'
import { PRODUCT_CATALOG, FILTER_CATEGORIES, SORT_OPTIONS } from '../data/productCatalog'
import DemoDisclaimerBanner from '../components/dashboard/DemoDisclaimerBanner'

export default function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('price-asc')

  const filtered = useMemo(() => {
    let items = [...PRODUCT_CATALOG]

    // Category filter
    if (category !== 'All') {
      items = items.filter(p => p.category === category)
    }

    // Search filter
    const q = search.trim().toLowerCase()
    if (q) {
      items = items.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        items.sort((a, b) => a.avgPrice - b.avgPrice)
        break
      case 'price-desc':
        items.sort((a, b) => b.avgPrice - a.avgPrice)
        break
      case 'drop-desc':
        items.sort((a, b) => a.change30d - b.change30d) // most negative first
        break
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return items
  }, [search, category, sortBy])

  const categoryCounts = useMemo(() => {
    const counts = { All: PRODUCT_CATALOG.length }
    for (const p of PRODUCT_CATALOG) {
      counts[p.category] = (counts[p.category] || 0) + 1
    }
    return counts
  }, [])

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Products"
        subtitle="Browse, search and filter all tracked PC hardware with retail pricing across Bangladesh (Demonstration Data)"
        actions={
          <Link to="/">
            <Button variant="secondary" size="sm" leftIcon={<Package size={14} />}>
              Dashboard
            </Button>
          </Link>
        }
      />

      <DemoDisclaimerBanner />

      {/* ── Toolbar: Search + Sort ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by product name, model or brand…"
            value={search}
            onChange={e => setSearch(e.target.value)}
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

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown size={14} className="text-slate-400" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="text-xs rounded-lg px-3 py-2 border cursor-pointer font-medium"
            style={{
              backgroundColor: 'var(--color-navy-800)',
              borderColor: 'var(--color-slate-700)',
              color: 'var(--color-slate-200)',
            }}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-400 ml-1">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Category filter pills ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <SlidersHorizontal size={13} className="text-slate-500 shrink-0 mr-1" />
        {FILTER_CATEGORIES.map(cat => {
          const isActive = category === cat
          const count = categoryCounts[cat] || 0
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-blue-500/40' : 'bg-slate-700 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Product Grid ── */}
      {filtered.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center gap-3">
          <Package size={40} style={{ color: 'var(--color-slate-600)' }} />
          <p className="text-sm text-slate-400">
            No products match your search and filter criteria.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch('')
              setCategory('All')
            }}
          >
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProductCard({ product }) {
  const { id, name, brand, category, avgPrice, lowestPrice, change30d, shopPrices, specs } = product
  const shopCount = shopPrices.length
  const isDrop = change30d < 0

  return (
    <Link to={`/products/${id}`} className="block group">
      <Card hoverable className="p-4 flex flex-col justify-between h-full border-slate-700/80 bg-slate-900/60">
        <div>
          {/* Top row: Category + Shops count */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <Badge variant="info" size="sm">
              {category}
            </Badge>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Store size={11} className="text-slate-500" />
              {shopCount} shops
            </span>
          </div>

          {/* Product name */}
          <h3 className="text-sm font-semibold text-slate-100 group-hover:text-blue-300 transition-colors line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>

          {/* Brand tag */}
          <span className="text-[11px] text-slate-400 mt-1 block">{brand}</span>

          {/* Specs snippet */}
          <p className="text-[11px] text-blue-300/80 bg-blue-500/10 border border-blue-500/15 px-2 py-0.5 rounded mt-2 line-clamp-1">
            {specs}
          </p>
        </div>

        {/* Pricing footer */}
        <div className="mt-4 pt-3 border-t border-slate-700/50">
          <div className="flex items-baseline justify-between mb-1.5">
            <div>
              <span className="text-[10px] text-slate-500 block">Avg Price</span>
              <span className="text-base font-bold text-slate-100 font-mono">
                {formatBDT(avgPrice)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">From</span>
              <span className="text-sm font-semibold text-blue-400 font-mono">
                {formatBDT(lowestPrice)}
              </span>
            </div>
          </div>

          {/* 30-day trend */}
          <div className="flex items-center justify-between">
            {change30d !== 0 ? (
              <span
                className={`text-xs font-semibold flex items-center gap-0.5 ${
                  isDrop ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isDrop ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                {formatPct(change30d)} (30d)
              </span>
            ) : (
              <span className="text-xs text-slate-400">Stable (30d)</span>
            )}

            <span className="text-[11px] text-blue-400 group-hover:text-blue-300 font-medium flex items-center gap-0.5">
              Details <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
