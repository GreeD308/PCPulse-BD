import { Package, TrendingDown, Tag, ShieldCheck, ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { SUMMARY_STATS } from '../../data/dashboardData'

export default function DashboardStats() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Package':
        return <Package size={20} className="text-blue-400" />
      case 'TrendingDown':
        return <TrendingDown size={20} className="text-emerald-400" />
      case 'Tag':
        return <Tag size={20} className="text-amber-400" />
      case 'FileCheck2':
      case 'ShieldCheck':
      default:
        return <ShieldCheck size={20} className="text-purple-400" />
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {SUMMARY_STATS.map(stat => {
        return (
          <Card
            key={stat.id}
            id={stat.id}
            hoverable
            className="p-4 sm:p-5 relative overflow-hidden group border-slate-700/80 hover:border-slate-600 transition-all"
          >
            {/* Top row: icon and status badge */}
            <div className="flex items-center justify-between mb-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: stat.bgColor }}
              >
                {getIcon(stat.iconName)}
              </div>
              <Badge
                variant={stat.changeType === 'favorable' ? 'success' : stat.changeType === 'increase' ? 'info' : 'warning'}
                size="sm"
                className="flex items-center gap-1 font-medium"
              >
                {stat.changeType === 'favorable' ? (
                  <ArrowDownRight size={12} />
                ) : (
                  <ArrowUpRight size={12} />
                )}
                {stat.title === 'Average Price Change' ? 'Cooling' : 'Active'}
              </Badge>
            </div>

            {/* Metric Value & Label */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 font-mono">
                  {stat.value}
                </span>
              </div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
                {stat.title}
              </h2>
            </div>

            {/* Context / Change description */}
            <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-col gap-0.5">
              <span className={`text-xs font-medium flex items-center gap-1 ${
                stat.changeType === 'favorable' ? 'text-emerald-400' : 'text-blue-300'
              }`}>
                {stat.change}
              </span>
              <span className="text-[11px] text-slate-500 line-clamp-1">
                {stat.description}
              </span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
