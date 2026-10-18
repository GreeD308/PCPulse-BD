import { Link } from 'react-router-dom'
import { Tag, Store, ArrowRight, Check } from 'lucide-react'
import Card, { CardHeader, CardBody } from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import ProductPlaceholder from '../ProductPlaceholder'
import { formatBDT } from '../../utils/format'
import { BEST_DEALS } from '../../data/dashboardData'

export default function BestDealsSection() {
  return (
    <Card className="w-full">
      <CardHeader
        title="Best Deals & Discounts"
        subtitle="Current retail prices significantly below the 30-day market average in Bangladesh"
        action={
          <Link to="/best-deals">
            <Button size="sm" rightIcon={<ArrowRight size={13} />}>
              View All Deals
            </Button>
          </Link>
        }
      />

      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BEST_DEALS.map(deal => (
            <div
              key={deal.id}
              className="group relative rounded-xl border border-slate-700/80 bg-slate-900/70 hover:border-slate-500/80 hover:bg-slate-850/90 transition-all duration-200 flex flex-col overflow-hidden"
            >
              {/* Top Image Placeholder */}
              <div className="relative">
                <ProductPlaceholder
                  type={deal.iconType}
                  category={deal.category}
                  specs={deal.specs}
                />

                {/* Floating Discount Badge */}
                <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md flex items-center gap-1">
                    <Tag size={11} className="fill-slate-950" />
                    {deal.discountPct}% OFF
                  </span>
                  {deal.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/90 text-blue-300 border border-blue-500/30 backdrop-blur-xs">
                      {deal.badge}
                    </span>
                  )}
                </div>

                {/* Stock badge */}
                <div className="absolute top-2.5 right-2.5 z-20">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 backdrop-blur-xs">
                    <Check size={10} />
                    {deal.stockStatus}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Shop & Category */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Store size={13} className="text-blue-400" />
                      {deal.shop}
                    </span>
                    <Badge variant="default" size="sm">
                      {deal.category}
                    </Badge>
                  </div>

                  {/* Model Name */}
                  <h3 className="text-sm font-semibold text-slate-100 group-hover:text-blue-300 transition-colors line-clamp-2 min-h-[2.5rem]">
                    {deal.name}
                  </h3>
                </div>

                {/* Pricing Block */}
                <div className="mt-3 pt-3 border-t border-slate-700/60">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400">
                        Avg Market: <span className="line-through font-mono">{formatBDT(deal.averagePrice)}</span>
                      </p>
                      <p className="text-lg font-bold text-slate-100 font-mono tracking-tight text-blue-400">
                        {formatBDT(deal.currentPrice)}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-emerald-400 block">
                        Save {formatBDT(deal.savingsBDT)}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Demo verified
                      </span>
                    </div>
                  </div>

                  {/* CTA link */}
                  <div className="mt-3">
                    <Link
                      to="/price-comparison"
                      className="w-full py-1.5 px-3 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                    >
                      Compare Across Stores <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
