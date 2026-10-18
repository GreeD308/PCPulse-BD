import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, ArrowLeft, Store, TrendingDown } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { formatBDT } from '../utils/format'
import { POPULAR_COMPONENTS } from '../data/dashboardData'
import DemoDisclaimerBanner from '../components/dashboard/DemoDisclaimerBanner'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [search, setSearch] = useState('')

  const allItems = POPULAR_COMPONENTS.flatMap(c =>
    c.topItems.map(item => ({
      ...item,
      category: c.category
    }))
  )

  const categories = ['ALL', 'GPU', 'CPU', 'RAM', 'SSD', 'Motherboard']

  const filteredItems = allItems.filter(item => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory
    const matchesSearch =
      search.trim() === '' ||
      item.model.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Hardware Catalog"
        subtitle="Explore tracked PC components, benchmarks, and retail prices in Bangladesh (Demonstration Data)"
        actions={
          <Link to="/">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={14} />}>
              Back to Dashboard
            </Button>
          </Link>
        }
      />

      <DemoDisclaimerBanner />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat === 'ALL' ? 'All Hardware' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search catalog models..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-850 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <Card key={item.id} hoverable className="p-4 flex flex-col justify-between border-slate-700/80 bg-slate-900/60">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="info" size="sm">
                  {item.category}
                </Badge>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Store size={11} className="text-slate-500" />
                  {item.storesAvailable} shops
                </span>
              </div>

              <h3 className="text-sm font-semibold text-slate-100 hover:text-blue-300 transition-colors line-clamp-2 min-h-[2.5rem]">
                {item.model}
              </h3>

              <p className="text-[11px] text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded mt-2 inline-block">
                {item.benchmark}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/50">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-base font-bold text-slate-100 font-mono">
                  {formatBDT(item.price)}
                </span>
                {item.trend !== 0 && (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                    <TrendingDown size={12} />
                    {item.trend}%
                  </span>
                )}
              </div>

              <Link
                to="/price-comparison"
                className="w-full py-1.5 px-3 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors flex items-center justify-center gap-1"
              >
                Compare Retailers <ArrowRight size={11} />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
