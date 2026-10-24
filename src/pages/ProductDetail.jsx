import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import {
  ArrowLeft,
  Store,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Cpu,
  Bell,
  ArrowRight,
  Info,
  Calendar,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { formatBDT, formatPct } from '../utils/format'
import { getProductById, getShopById } from '../data/productCatalog'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  const [addedToBuilder, setAddedToBuilder] = useState(false)
  const [alertSet, setAlertSet] = useState(false)

  if (!product) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <PageHeader title="Product Not Found" />
        <Card className="p-12 flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-slate-400">
            The product you are looking for does not exist in our demo catalog.
          </p>
          <Link to="/products">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={14} />}>
              Back to Products
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  const {
    name,
    brand,
    model,
    category,
    specs,
    avgPrice,
    lowestPrice,
    highestPrice,
    change30d,
    shopPrices,
    priceHistory,
  } = product

  const isDrop = change30d < 0
  const isRise = change30d > 0
  const sortedShopPrices = [...shopPrices].sort((a, b) => a.price - b.price)
  const bestShop = sortedShopPrices[0] ? getShopById(sortedShopPrices[0].shopId) : null

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <PageHeader
        title={name}
        subtitle={`${brand} • ${model} • ${category}`}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<ArrowLeft size={14} />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Link to={`/price-comparison?product=${id}`}>
              <Button size="sm" rightIcon={<ArrowRight size={13} />}>
                Full Comparison
              </Button>
            </Link>
          </div>
        }
      />

      {/* Demo notice */}
      <div className="rounded-lg border border-blue-500/20 bg-blue-950/30 px-4 py-2.5 flex items-center gap-2 text-xs text-blue-300">
        <Info size={14} className="shrink-0" />
        All prices and reports on this page are simulated demonstration data in BDT.
      </div>

      {/* ── Key Metrics Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Current Avg Price"
          value={formatBDT(avgPrice)}
          sub="Across all tracked retailers"
          accent="var(--color-blue-400)"
        />
        <MetricCard
          label="Lowest Reported"
          value={formatBDT(lowestPrice)}
          sub={bestShop ? `at ${bestShop.name}` : ''}
          accent="#10b981"
        />
        <MetricCard
          label="Highest Reported"
          value={formatBDT(highestPrice)}
          sub="Most expensive retailer"
          accent="#f59e0b"
        />
        <MetricCard
          label="30-Day Change"
          value={formatPct(change30d)}
          sub={isDrop ? 'Price declining' : isRise ? 'Price increasing' : 'Price stable'}
          accent={isDrop ? '#10b981' : isRise ? '#ef4444' : '#64748b'}
        />
      </div>

      {/* ── Specs + Actions Row ── */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Specs Card */}
        <Card className="lg:col-span-2">
          <CardHeader title="Specifications" subtitle={`${brand} ${model}`} />
          <CardBody>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="info">{category}</Badge>
              <Badge variant="default">{brand}</Badge>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{specs}</p>
          </CardBody>
        </Card>

        {/* Actions Card */}
        <Card>
          <CardHeader title="Quick Actions" />
          <CardBody className="flex flex-col gap-3">
            <Button
              variant={addedToBuilder ? 'secondary' : 'primary'}
              size="md"
              leftIcon={<Cpu size={15} />}
              className="w-full"
              onClick={() => setAddedToBuilder(prev => !prev)}
            >
              {addedToBuilder ? 'Added to PC Builder ✓' : 'Add to PC Builder'}
            </Button>
            <Button
              variant={alertSet ? 'secondary' : 'ghost'}
              size="md"
              leftIcon={<Bell size={15} />}
              className="w-full"
              onClick={() => setAlertSet(prev => !prev)}
              style={
                !alertSet
                  ? {
                      border: '1px solid var(--color-slate-600)',
                      backgroundColor: 'var(--color-slate-800)',
                    }
                  : undefined
              }
            >
              {alertSet ? 'Price Alert Active ✓' : 'Set Target Price Alert'}
            </Button>

            <div className="pt-2 border-t border-slate-700/50 mt-1">
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <Info size={11} />
                Builder and alerts are demo buttons — backend integration is planned.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ── Historical Price Chart ── */}
      <Card>
        <CardHeader
          title="Price History (6-Month Trend)"
          subtitle="Simulated monthly average prices in Bangladeshi Taka (BDT)"
          action={
            <Badge variant="info" size="sm">
              <Calendar size={11} className="mr-1" />
              Monthly
            </Badge>
          }
        />
        <CardBody>
          <div className="w-full min-h-[280px]">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={priceHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickLine={{ stroke: '#334155' }}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickFormatter={v => formatBDT(v, true)}
                  tickLine={{ stroke: '#334155' }}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                />
                <Tooltip content={<PriceTooltip />} />
                <Area
                  type="monotone"
                  dataKey="avg"
                  name="Average Price"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#priceGrad)"
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      {/* ── Shop-by-Shop Price Table ── */}
      <Card>
        <CardHeader
          title="Shop-by-Shop Price Comparison"
          subtitle={`${shopPrices.length} retailers with verified pricing for this product`}
          action={
            <Link to={`/price-comparison?product=${id}`}>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={13} />}>
                Full Comparison View
              </Button>
            </Link>
          }
        />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3">Retailer</th>
                  <th className="px-4 py-3">Price (BDT)</th>
                  <th className="px-4 py-3">Diff vs Avg</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Warranty</th>
                  <th className="px-4 py-3">Report Date</th>
                  <th className="px-4 py-3 text-right">Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {sortedShopPrices.map((sp, idx) => {
                  const shop = getShopById(sp.shopId)
                  const diff = sp.price - avgPrice
                  const isBest = idx === 0

                  return (
                    <tr
                      key={sp.shopId}
                      className={`transition-colors ${
                        isBest ? 'bg-emerald-500/5 hover:bg-emerald-500/10' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-2 font-medium text-slate-200">
                          <Store size={14} className="text-blue-400" />
                          {shop.name}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-slate-100">
                        {formatBDT(sp.price)}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-xs font-semibold ${
                            diff < 0 ? 'text-emerald-400' : diff > 0 ? 'text-rose-400' : 'text-slate-400'
                          }`}
                        >
                          {diff < 0 ? formatBDT(diff) : diff > 0 ? `+${formatBDT(diff)}` : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-300">{sp.stock}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">{sp.warranty}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={12} className="text-slate-500" />
                          {sp.reportDate}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {sp.verified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            <ShieldCheck size={12} /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/25">
                            <ShieldAlert size={12} /> Unverified
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function MetricCard({ label, value, sub, accent }) {
  return (
    <Card className="p-4">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-bold font-mono" style={{ color: accent }}>
        {value}
      </p>
      {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
    </Card>
  )
}

function PriceTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md">
      <p className="text-xs font-semibold text-slate-200 mb-1">{label}</p>
      <p className="text-base font-bold font-mono text-blue-400">{formatBDT(payload[0].value)}</p>
      <p className="text-[11px] text-slate-400 mt-0.5">Simulated monthly average</p>
    </div>
  )
}
