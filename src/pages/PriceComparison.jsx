import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Store,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Search,
  TrendingDown,
  TrendingUp,
  Info,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { formatBDT, formatPct } from '../utils/format'
import { PRODUCT_CATALOG, getShopById } from '../data/productCatalog'
import DemoDisclaimerBanner from '../components/dashboard/DemoDisclaimerBanner'

export default function PriceComparison() {
  const [searchParams] = useSearchParams()
  const preselectedId = searchParams.get('product')

  const [selectedId, setSelectedId] = useState(
    preselectedId && PRODUCT_CATALOG.find(p => p.id === preselectedId)
      ? preselectedId
      : PRODUCT_CATALOG[0].id
  )
  const [searchTerm, setSearchTerm] = useState('')

  const activeProduct = PRODUCT_CATALOG.find(p => p.id === selectedId) || PRODUCT_CATALOG[0]

  // Filter product list for selector dropdown
  const productOptions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return PRODUCT_CATALOG
    return PRODUCT_CATALOG.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [searchTerm])

  // Sort shop prices lowest first
  const sortedPrices = [...activeProduct.shopPrices].sort((a, b) => a.price - b.price)
  const bestPrice = sortedPrices[0]?.price ?? activeProduct.avgPrice
  const worstPrice = sortedPrices[sortedPrices.length - 1]?.price ?? activeProduct.avgPrice
  const priceDiff = worstPrice - bestPrice
  const priceDiffPct = ((priceDiff / bestPrice) * 100).toFixed(1)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Price Comparison"
        subtitle="Compare verified retail pricing for the same hardware product across top Bangladesh shops (Demonstration Data)"
        actions={
          <div className="flex items-center gap-2">
            <Link to="/products">
              <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={14} />}>
                Products
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        }
      />

      <DemoDisclaimerBanner />

      {/* ── Product Selector ── */}
      <Card>
        <CardHeader
          title="Select a Product to Compare"
          subtitle="Choose from tracked hardware items in the catalog"
        />
        <CardBody>
          {/* Search box */}
          <div className="relative w-full mb-4">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search products by name, model or category…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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

          {/* Product pill grid */}
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-thin pr-1">
            {productOptions.map(p => {
              const isActive = selectedId === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={`px-3 py-2 text-xs rounded-lg font-medium transition-all cursor-pointer text-left flex flex-col gap-0.5 min-w-[200px] max-w-[280px] ${
                    isActive
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400/50 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  <span className="font-semibold line-clamp-1">{p.name}</span>
                  <span className={`text-[10px] ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                    {p.category} • {formatBDT(p.avgPrice)} avg
                  </span>
                </button>
              )
            })}

            {productOptions.length === 0 && (
              <p className="text-xs text-slate-400 py-4 w-full text-center">
                No products match your search.
              </p>
            )}
          </div>
        </CardBody>
      </Card>

      {/* ── Comparison Summary ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryMetric
          label="Lowest Price"
          value={formatBDT(bestPrice)}
          sub={getShopById(sortedPrices[0]?.shopId)?.name || '—'}
          accent="#10b981"
        />
        <SummaryMetric
          label="Highest Price"
          value={formatBDT(worstPrice)}
          sub={getShopById(sortedPrices[sortedPrices.length - 1]?.shopId)?.name || '—'}
          accent="#f59e0b"
        />
        <SummaryMetric
          label="Price Spread (BDT)"
          value={formatBDT(priceDiff)}
          sub={`${priceDiffPct}% gap across shops`}
          accent="var(--color-blue-400)"
        />
        <SummaryMetric
          label="30-Day Trend"
          value={formatPct(activeProduct.change30d)}
          sub={activeProduct.change30d < 0 ? 'Market cooling' : activeProduct.change30d > 0 ? 'Price rising' : 'Stable'}
          accent={activeProduct.change30d < 0 ? '#10b981' : activeProduct.change30d > 0 ? '#ef4444' : '#64748b'}
        />
      </div>

      {/* ── Full Comparison Table ── */}
      <Card>
        <CardHeader
          title={activeProduct.name}
          subtitle={`${activeProduct.brand} • ${activeProduct.category} • Market Avg: ${formatBDT(activeProduct.avgPrice)}`}
          action={
            <div className="flex items-center gap-2">
              <Badge variant="info">
                {activeProduct.shopPrices.length} Retailers
              </Badge>
              <Link to={`/products/${activeProduct.id}`}>
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={12} />}>
                  Product Details
                </Button>
              </Link>
            </div>
          }
        />

        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3">Store Name</th>
                  <th className="px-4 py-3">Price (BDT)</th>
                  <th className="px-4 py-3">Diff vs Avg (BDT)</th>
                  <th className="px-4 py-3">Diff (%)</th>
                  <th className="px-4 py-3">Availability</th>
                  <th className="px-4 py-3">Warranty</th>
                  <th className="px-4 py-3">Report Date</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {sortedPrices.map((sp, idx) => {
                  const shop = getShopById(sp.shopId)
                  const diff = sp.price - activeProduct.avgPrice
                  const diffPct = ((diff / activeProduct.avgPrice) * 100).toFixed(1)
                  const isBest = idx === 0

                  return (
                    <tr
                      key={sp.shopId}
                      className={`transition-colors group ${
                        isBest ? 'bg-emerald-500/5 hover:bg-emerald-500/10' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      {/* Store */}
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-2 font-medium text-slate-200">
                          <Store size={14} className="text-blue-400" />
                          {shop.name}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3.5 font-mono font-bold text-slate-100 whitespace-nowrap">
                        {formatBDT(sp.price)}
                      </td>

                      {/* Diff (BDT) */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {diff < 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                            <TrendingDown size={12} />
                            {formatBDT(diff)}
                          </span>
                        ) : diff > 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400">
                            <TrendingUp size={12} />
                            +{formatBDT(diff)}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">At Average</span>
                        )}
                      </td>

                      {/* Diff (%) */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`text-xs font-semibold ${
                            diff < 0 ? 'text-emerald-400' : diff > 0 ? 'text-rose-400' : 'text-slate-400'
                          }`}
                        >
                          {diff < 0 ? `${diffPct}%` : diff > 0 ? `+${diffPct}%` : '0%'}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-3.5 text-xs text-slate-300">{sp.stock}</td>

                      {/* Warranty */}
                      <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">{sp.warranty}</td>

                      {/* Report Date */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={12} className="text-slate-500" />
                          {sp.reportDate}
                        </span>
                      </td>

                      {/* Verified + Best badge */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {sp.verified ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                              <ShieldCheck size={11} /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-400 border border-amber-500/25">
                              <ShieldAlert size={11} /> Unverified
                            </span>
                          )}
                          {isBest && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle2 size={11} /> Best
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-3 mt-3 border-t border-slate-700/50 gap-2">
            <span className="flex items-center gap-1.5">
              <Info size={13} className="text-slate-500" />
              All prices are simulated demo figures in BDT. Report dates reflect crawler sample timestamps.
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              {sortedPrices.filter(sp => sp.verified).length}/{sortedPrices.length} reports verified
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function SummaryMetric({ label, value, sub, accent }) {
  return (
    <Card className="p-4">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-xl font-bold font-mono" style={{ color: accent }}>
        {value}
      </p>
      {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
    </Card>
  )
}
