import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock,
  Store,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Search
} from 'lucide-react'
import Card, { CardHeader, CardBody } from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatBDT } from '../../utils/format'
import { RECENTLY_UPDATED_PRICES } from '../../data/dashboardData'

export default function RecentPriceUpdatesSection() {
  const [selectedShop, setSelectedShop] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  const shops = ['ALL', 'Star Tech', 'Ryans Computers', 'Tech Land BD', 'UltraTech BD', 'Skyland Computer BD', 'UCC BD']

  const filteredUpdates = RECENTLY_UPDATED_PRICES.filter(item => {
    const matchesShop = selectedShop === 'ALL' || item.shop === selectedShop
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesShop && matchesSearch
  })

  return (
    <Card className="w-full">
      <CardHeader
        title="Recently Updated Prices"
        subtitle="Live feed of retailer price verifications, crawler updates, and catalog adjustments"
        action={
          <Link to="/products">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={13} />}>
              View All Tracked
            </Button>
          </Link>
        }
      />

      <CardBody>
        {/* Controls: Shop Filter Pills & Quick Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-700/60">
          {/* Shop pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1 shrink-0">
              <Store size={12} /> Retailer:
            </span>
            {shops.map(shop => {
              const isActive = selectedShop === shop
              return (
                <button
                  key={shop}
                  type="button"
                  onClick={() => setSelectedShop(shop)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  {shop === 'ALL' ? 'All Retailers' : shop}
                </button>
              )
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-56 shrink-0">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by product..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-850 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Price Updates Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Retailer</th>
                <th className="px-4 py-3">Price (BDT)</th>
                <th className="px-4 py-3">Price Change</th>
                <th className="px-4 py-3">Reported Time</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredUpdates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-xs text-slate-400">
                    No price updates found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUpdates.map(row => {
                  const isDrop = row.delta < 0
                  const isHike = row.delta > 0

                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Product Name */}
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-slate-200 group-hover:text-blue-300 transition-colors max-w-xs md:max-w-sm truncate">
                          {row.productName}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <ShieldCheck size={11} className={row.verified ? 'text-emerald-400' : 'text-slate-500'} />
                            {row.source}
                          </span>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="px-4 py-3.5">
                        <Badge variant="info" size="sm">
                          {row.category}
                        </Badge>
                      </td>

                      {/* Retailer / Shop */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/60">
                          <Store size={12} className="text-blue-400" />
                          {row.shop}
                        </span>
                      </td>

                      {/* Current Price */}
                      <td className="px-4 py-3.5 font-mono font-semibold text-slate-100 whitespace-nowrap">
                        {formatBDT(row.currentPrice)}
                      </td>

                      {/* Price Delta */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {isDrop && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            <TrendingDown size={12} />
                            {formatBDT(row.delta)}
                          </span>
                        )}
                        {isHike && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            <TrendingUp size={12} />
                            +{formatBDT(row.delta)}
                          </span>
                        )}
                        {!isDrop && !isHike && (
                          <span className="text-xs text-slate-400">
                            Unchanged
                          </span>
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={12} className="text-slate-500" />
                          {row.timestamp}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <Link
                          to="/price-comparison"
                          className="text-xs font-medium text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                        >
                          Compare <ArrowRight size={11} />
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info note */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-3 mt-3 border-t border-slate-700/50 gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Crawlers monitor Star Tech, Ryans, Tech Land & partners every 30 minutes.
          </span>
          <span className="font-mono text-[11px] text-slate-500">
            Prices verified in Bangladeshi Taka (BDT)
          </span>
        </div>
      </CardBody>
    </Card>
  )
}
