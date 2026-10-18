import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag, Store, Check, ArrowRight, Filter, ArrowLeft } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ProductPlaceholder from '../components/ProductPlaceholder'
import { formatBDT } from '../utils/format'
import { BEST_DEALS } from '../data/dashboardData'

export default function BestDeals() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const categories = ['ALL', 'GPU', 'CPU', 'RAM', 'SSD', 'Motherboard']

  const filteredDeals = BEST_DEALS.filter(
    deal => selectedCategory === 'ALL' || deal.category === selectedCategory
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Best Deals"
        subtitle="Curated discounts and special promotions from verified BD hardware retailers (Demonstration Data)"
        actions={
          <Link to="/">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={14} />}>
              Back to Dashboard
            </Button>
          </Link>
        }
      />

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-slate-400 flex items-center gap-1 mr-1 shrink-0">
          <Filter size={13} /> Filter:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            {cat === 'ALL' ? 'All Hardware Deals' : cat}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDeals.map(deal => (
          <Card
            key={deal.id}
            hoverable
            className="flex flex-col overflow-hidden border-slate-700/80 bg-slate-900/70"
          >
            {/* Top Placeholder Visual */}
            <div className="relative">
              <ProductPlaceholder
                type={deal.iconType}
                category={deal.category}
                specs={deal.specs}
              />
              <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                  <Tag size={11} className="fill-slate-950" />
                  {deal.discountPct}% OFF
                </span>
                {deal.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/90 text-blue-300 border border-blue-500/30">
                    {deal.badge}
                  </span>
                )}
              </div>
              <div className="absolute top-2.5 right-2.5 z-20">
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Check size={10} />
                  {deal.stockStatus}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Store size={13} className="text-blue-400" />
                    {deal.shop}
                  </span>
                  <Badge variant="info" size="sm">
                    {deal.category}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold text-slate-100 line-clamp-2 min-h-[2.5rem]">
                  {deal.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Avg: <span className="line-through font-mono">{formatBDT(deal.averagePrice)}</span>
                    </span>
                    <span className="text-lg font-bold font-mono text-blue-400">
                      {formatBDT(deal.currentPrice)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-emerald-400 block">
                      Save {formatBDT(deal.savingsBDT)}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Simulated Deal
                    </span>
                  </div>
                </div>

                <Link
                  to="/price-comparison"
                  className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  Compare All Retailers <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
