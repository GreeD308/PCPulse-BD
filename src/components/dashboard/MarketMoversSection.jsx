import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingDown,
  TrendingUp,
  Store,
  ArrowRight,
  Filter
} from 'lucide-react'
import Card, { CardHeader, CardBody } from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatBDT } from '../../utils/format'
import { MARKET_MOVERS } from '../../data/dashboardData'

export default function MarketMoversSection() {
  const [filter, setFilter] = useState('ALL') // 'ALL' | 'DROPS' | 'INCREASES'

  const filteredMovers = MARKET_MOVERS.filter(m => {
    if (filter === 'DROPS') return m.direction === 'down'
    if (filter === 'INCREASES') return m.direction === 'up'
    return true
  })

  const dropCount = MARKET_MOVERS.filter(m => m.direction === 'down').length
  const increaseCount = MARKET_MOVERS.filter(m => m.direction === 'up').length

  return (
    <Card className="w-full">
      <CardHeader
        title="Market Movers"
        subtitle="Hardware components with notable price shifts across Dhaka stores"
        action={
          <div className="flex items-center gap-1.5">
            <Link to="/market-trends">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={13} />}>
                Trend Analysis
              </Button>
            </Link>
          </div>
        }
      />

      <CardBody>
        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Filter size={13} /> Filter:
            </span>
            <button
              type="button"
              onClick={() => setFilter('ALL')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${filter === 'ALL'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              All ({MARKET_MOVERS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('DROPS')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${filter === 'DROPS'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
                }`}
            >
              <TrendingDown size={13} /> Price Drops ({dropCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('INCREASES')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${filter === 'INCREASES'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-rose-400 hover:bg-slate-700'
                }`}
            >
              <TrendingUp size={13} /> Price Hikes ({increaseCount})
            </button>
          </div>

          <span className="text-xs text-slate-400">
            Showing <strong className="text-slate-200">{filteredMovers.length}</strong> components
          </span>
        </div>

        {/* Movers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredMovers.map(item => {
            const isDrop = item.direction === 'down'

            return (
              <div
                key={item.id}
                className="group p-4 rounded-xl border border-slate-700/70 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-850/80 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top line: Category and Delta Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="info" size="sm">
                        {item.category}
                      </Badge>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Store size={12} className="text-slate-500" />
                        {item.shop}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${isDrop
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                    >
                      {isDrop ? <TrendingDown size={13} /> : <TrendingUp size={13} />}
                      {isDrop ? '' : '+'}
                      {formatBDT(item.changeBDT)} ({item.changePct > 0 ? `+${item.changePct}` : item.changePct}%)
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-sm font-semibold text-slate-100 group-hover:text-blue-300 transition-colors line-clamp-1 mb-1">
                    {item.name}
                  </h3>

                  {/* Contextual Market Note */}
                  <p className="text-xs text-slate-400 line-clamp-1 mb-3">
                    {item.note}
                  </p>
                </div>

                {/* Bottom line: Prices and Action */}
                <div className="pt-2 border-t border-slate-700/50 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 line-through mr-2 font-mono">
                      {formatBDT(item.previousPrice)}
                    </span>
                    <span className="text-base font-bold text-slate-100 font-mono">
                      {formatBDT(item.currentPrice)}
                    </span>
                  </div>

                  <Link
                    to="/price-comparison"
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
                  >
                    Compare prices <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}
