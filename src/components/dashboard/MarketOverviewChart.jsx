import { useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import { TrendingDown, Calendar, Info } from 'lucide-react'
import Card, { CardHeader, CardBody } from '../ui/Card'
import Badge from '../ui/Badge'
import { formatBDT } from '../../utils/format'
import { SIX_MONTH_TRENDS, CHART_CATEGORIES } from '../../data/dashboardData'

export default function MarketOverviewChart() {
  const [activeCategory, setActiveCategory] = useState('ALL')

  const categoryOptions = [
    { key: 'ALL', label: 'All Categories' },
    { key: 'GPU', label: 'GPU' },
    { key: 'CPU', label: 'CPU' },
    { key: 'Motherboard', label: 'Motherboard' },
    { key: 'SSD', label: 'SSD' },
    { key: 'RAM', label: 'RAM' }
  ]

  // Calculate stats for active selection
  const selectedConfig = CHART_CATEGORIES.find(c => c.key === activeCategory)
  const isSingle = activeCategory !== 'ALL'

  let statsDisplay = null
  if (isSingle) {
    const startVal = SIX_MONTH_TRENDS[0][activeCategory]
    const endVal = SIX_MONTH_TRENDS[SIX_MONTH_TRENDS.length - 1][activeCategory]
    const diff = endVal - startVal
    const pct = ((diff / startVal) * 100).toFixed(1)
    statsDisplay = {
      startVal,
      endVal,
      diff,
      pct,
      color: selectedConfig?.color || '#3b82f6'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader
        title="6-Month Market Overview (Jun – Nov 2026)"
        subtitle="Simulated hardware price index movements across Bangladesh retailers (Demonstration Data)"
        action={
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              <Calendar size={12} className="text-blue-400" />
              Monthly Sampling
            </span>
            <Badge variant="info" size="sm">
              Demo BDT Figures
            </Badge>
          </div>
        }
      />

      <CardBody>
        {/* Category switcher pills and contextual metrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categoryOptions.map(opt => {
              const isActive = activeCategory === opt.key
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setActiveCategory(opt.key)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* Quick metric callout */}
          <div className="flex items-center gap-3 text-xs">
            {isSingle && statsDisplay ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Current Avg:</span>
                <span className="font-semibold text-slate-100 font-mono">
                  {formatBDT(statsDisplay.endVal)}
                </span>
                <span
                  className={`font-semibold flex items-center gap-0.5 ${
                    statsDisplay.diff <= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  <TrendingDown size={13} />
                  {statsDisplay.pct}% ({formatBDT(Math.abs(statsDisplay.diff))})
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <TrendingDown size={13} /> Market cooled -8.4%
                </span>
                <span className="hidden md:inline text-slate-500">•</span>
                <span className="hidden md:inline text-slate-400">Memory & Storage leading decreases</span>
              </div>
            )}
          </div>
        </div>

        {/* Recharts visualization container */}
        <div className="w-full min-h-[330px] sm:min-h-[360px] pt-2">
          <ResponsiveContainer width="100%" height={340}>
            {isSingle ? (
              <AreaChart data={SIX_MONTH_TRENDS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="categoryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={statsDisplay?.color || '#3b82f6'} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={statsDisplay?.color || '#3b82f6'} stopOpacity={0.0} />
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
                  tickFormatter={val => formatBDT(val, true)}
                  tickLine={{ stroke: '#334155' }}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                />
                <Tooltip content={<CustomSingleTooltip categoryName={activeCategory} color={statsDisplay?.color} />} />
                <Area
                  type="monotone"
                  dataKey={activeCategory}
                  name={`${activeCategory} Average`}
                  stroke={statsDisplay?.color || '#3b82f6'}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#categoryGradient)"
                  activeDot={{ r: 6, fill: statsDisplay?.color, stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            ) : (
              <LineChart data={SIX_MONTH_TRENDS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                  tickFormatter={val => formatBDT(val, true)}
                  tickLine={{ stroke: '#334155' }}
                />
                <Tooltip content={<CustomMultiTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }}
                  formatter={value => <span style={{ color: '#cbd5e1' }}>{value}</span>}
                />
                {CHART_CATEGORIES.map(cat => (
                  <Line
                    key={cat.key}
                    type="monotone"
                    dataKey={cat.key}
                    name={cat.name}
                    stroke={cat.color}
                    strokeWidth={cat.strokeWidth}
                    dot={{ r: 3, fill: cat.color }}
                    activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Context footer */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 mt-3 border-t border-slate-700/50">
          <div className="flex items-center gap-1.5">
            <Info size={13} className="text-slate-500" />
            <span>Sample trends weighted across benchmark mid-to-high tier hardware in Dhaka.</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
            Base index: Aug 2026 = 100.0
          </span>
        </div>
      </CardBody>
    </Card>
  )
}

function CustomMultiTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md">
      <p className="text-xs font-semibold text-slate-200 mb-2 border-b border-slate-700/80 pb-1">
        {label} (Simulated Avg BDT)
      </p>
      <div className="space-y-1.5">
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-300">{entry.name}:</span>
            </span>
            <span className="font-mono font-semibold text-slate-100">
              {formatBDT(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomSingleTooltip({ active, payload, label, categoryName, color }) {
  if (!active || !payload || !payload.length) return null
  const data = payload[0]

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md">
      <p className="text-xs font-semibold text-slate-200 mb-1">
        {label} • {categoryName} Price Index
      </p>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-lg font-bold font-mono" style={{ color: color || '#3b82f6' }}>
          {formatBDT(data.value)}
        </span>
        <span className="text-[11px] text-slate-400">sampled average</span>
      </div>
    </div>
  )
}
