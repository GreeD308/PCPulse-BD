import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Cpu,
  Layers,
  MemoryStick,
  HardDrive,
  CircuitBoard,
  ArrowRight,
  TrendingDown,
  Store,
  Star
} from 'lucide-react'
import Card, { CardHeader, CardBody } from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatBDT } from '../../utils/format'
import { POPULAR_COMPONENTS } from '../../data/dashboardData'

export default function PopularComponentsSection() {
  const [selectedCategory, setSelectedCategory] = useState('CPU')

  const getCategoryIcon = (cat, size = 18) => {
    switch (cat) {
      case 'CPU':
        return <Cpu size={size} className="text-emerald-400" />
      case 'GPU':
        return <Layers size={size} className="text-blue-400" />
      case 'RAM':
        return <MemoryStick size={size} className="text-purple-400" />
      case 'SSD':
        return <HardDrive size={size} className="text-pink-400" />
      case 'Motherboard':
        return <CircuitBoard size={size} className="text-amber-400" />
      default:
        return <Cpu size={size} className="text-blue-400" />
    }
  }

  const activeCategoryData = POPULAR_COMPONENTS.find(c => c.category === selectedCategory) || POPULAR_COMPONENTS[0]

  return (
    <Card className="w-full">
      <CardHeader
        title="Popular Components by Category"
        subtitle="Benchmark leaders and highest searched hardware in Bangladesh across CPU, GPU, RAM, SSD, and Motherboard"
        action={
          <Link to="/products">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={13} />}>
              Explore All Categories
            </Button>
          </Link>
        }
      />

      <CardBody>
        {/* Category Selection Tabs (CPU, GPU, RAM, SSD, Motherboard) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pb-4 mb-4 border-b border-slate-700/60">
          {POPULAR_COMPONENTS.map(cat => {
            const isActive = selectedCategory === cat.category
            return (
              <button
                key={cat.category}
                type="button"
                onClick={() => setSelectedCategory(cat.category)}
                className={`p-3 rounded-xl border transition-all text-left flex flex-col gap-1 cursor-pointer ${
                  isActive
                    ? 'border-blue-500 bg-blue-500/10 shadow-sm shadow-blue-500/10'
                    : 'border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {getCategoryIcon(cat.category, 16)}
                  </div>
                  <Badge variant={isActive ? 'info' : 'default'} size="sm">
                    {cat.trackedCount} tracked
                  </Badge>
                </div>
                <div className="mt-1">
                  <span className={`text-xs font-semibold block ${isActive ? 'text-blue-300' : 'text-slate-200'}`}>
                    {cat.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {cat.priceRange}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Category Header Context */}
        <div className="bg-slate-900/80 rounded-xl p-3.5 mb-4 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
              {getCategoryIcon(activeCategoryData.category, 20)}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                {activeCategoryData.title}
              </h3>
              <p className="text-xs text-slate-400">
                {activeCategoryData.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400">Standard:</span>
            <span className="font-mono text-slate-200 font-medium">
              {activeCategoryData.dominantSocket}
            </span>
          </div>
        </div>

        {/* Grid of Top 4 Models in Active Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {activeCategoryData.topItems.map((item, idx) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-700/70 bg-slate-900/50 hover:border-slate-500/70 hover:bg-slate-850/70 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with rank badge and rating */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                    #{idx + 1} Popular
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400">
                    <Star size={11} className="fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Model Title */}
                <h4 className="text-sm font-semibold text-slate-100 hover:text-blue-300 transition-colors line-clamp-2 min-h-[2.5rem]">
                  {item.model}
                </h4>

                {/* Benchmark Tag */}
                <p className="text-[11px] text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded mt-1.5 inline-block">
                  {item.benchmark}
                </p>
              </div>

              {/* Price and Store Availability */}
              <div className="mt-3 pt-3 border-t border-slate-700/50">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-base font-bold text-slate-100 font-mono">
                    {formatBDT(item.price)}
                  </span>
                  {item.trend !== 0 && (
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5">
                      <TrendingDown size={11} />
                      {item.trend}% (30d)
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Store size={11} className="text-slate-500" />
                    {item.storesAvailable} shops selling
                  </span>
                  <Link
                    to="/price-comparison"
                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-0.5"
                  >
                    Compare <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
