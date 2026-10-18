import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftRight, Store, ArrowLeft, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { formatBDT } from '../utils/format'
import DemoDisclaimerBanner from '../components/dashboard/DemoDisclaimerBanner'

const COMPARISON_PRODUCTS = [
  {
    id: 'comp-1',
    name: 'Sapphire Pure AMD Radeon RX 7800 XT 16GB OC',
    category: 'GPU',
    baselineAvg: 68500,
    retailers: [
      { shop: 'Star Tech', price: 63900, stock: 'In Stock', warranty: '3 Years', isBest: true },
      { shop: 'Ryans Computers', price: 65500, stock: 'In Stock', warranty: '3 Years', isBest: false },
      { shop: 'Tech Land BD', price: 64800, stock: 'Limited Stock', warranty: '3 Years', isBest: false },
      { shop: 'UltraTech BD', price: 66200, stock: 'In Stock', warranty: '3 Years', isBest: false },
      { shop: 'Skyland Computer BD', price: 65900, stock: 'In Stock', warranty: '3 Years', isBest: false },
    ]
  },
  {
    id: 'comp-2',
    name: 'AMD Ryzen 7 7800X3D Gaming Processor',
    category: 'CPU',
    baselineAvg: 45000,
    retailers: [
      { shop: 'Ryans Computers', price: 42500, stock: 'In Stock', warranty: '3 Years', isBest: true },
      { shop: 'Star Tech', price: 42900, stock: 'In Stock', warranty: '3 Years', isBest: false },
      { shop: 'Tech Land BD', price: 43200, stock: 'In Stock', warranty: '3 Years', isBest: false },
      { shop: 'UltraTech BD', price: 43500, stock: 'In Stock', warranty: '3 Years', isBest: false },
      { shop: 'Skyland Computer BD', price: 43800, stock: 'Limited Stock', warranty: '3 Years', isBest: false },
    ]
  },
  {
    id: 'comp-3',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
    category: 'SSD',
    baselineAvg: 16500,
    retailers: [
      { shop: 'Tech Land BD', price: 15400, stock: 'In Stock', warranty: '5 Years', isBest: true },
      { shop: 'Star Tech', price: 15800, stock: 'In Stock', warranty: '5 Years', isBest: false },
      { shop: 'Ryans Computers', price: 16200, stock: 'In Stock', warranty: '5 Years', isBest: false },
      { shop: 'UltraTech BD', price: 15600, stock: 'In Stock', warranty: '5 Years', isBest: false },
      { shop: 'Skyland Computer BD', price: 15900, stock: 'In Stock', warranty: '5 Years', isBest: false },
    ]
  },
  {
    id: 'comp-4',
    name: 'Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz',
    category: 'RAM',
    baselineAvg: 11500,
    retailers: [
      { shop: 'UltraTech BD', price: 10400, stock: 'In Stock', warranty: 'Lifetime', isBest: true },
      { shop: 'Star Tech', price: 10800, stock: 'In Stock', warranty: 'Lifetime', isBest: false },
      { shop: 'Ryans Computers', price: 10900, stock: 'In Stock', warranty: 'Lifetime', isBest: false },
      { shop: 'Tech Land BD', price: 10600, stock: 'In Stock', warranty: 'Lifetime', isBest: false },
      { shop: 'Skyland Computer BD', price: 10800, stock: 'In Stock', warranty: 'Lifetime', isBest: false },
    ]
  }
]

export default function PriceComparison() {
  const [selectedId, setSelectedId] = useState(COMPARISON_PRODUCTS[0].id)

  const activeProduct = COMPARISON_PRODUCTS.find(p => p.id === selectedId) || COMPARISON_PRODUCTS[0]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Price Comparison"
        subtitle="Compare verified retail pricing for identical PC hardware models across top Dhaka shops (Demonstration Data)"
        actions={
          <Link to="/">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={14} />}>
              Back to Dashboard
            </Button>
          </Link>
        }
      />

      <DemoDisclaimerBanner />

      {/* Product Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-slate-400 flex items-center gap-1 mr-1 shrink-0">
          <ArrowLeftRight size={13} /> Select Component:
        </span>
        {COMPARISON_PRODUCTS.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedId(p.id)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              selectedId === p.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            {p.name.split(' ').slice(0, 4).join(' ')}...
          </button>
        ))}
      </div>

      {/* Comparison Detail Card */}
      <Card>
        <CardHeader
          title={activeProduct.name}
          subtitle={`Category: ${activeProduct.category} • Market Baseline Avg: ${formatBDT(activeProduct.baselineAvg)}`}
          action={
            <Badge variant="info">
              {activeProduct.retailers.length} Retailers Compared
            </Badge>
          }
        />

        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3">Store Name</th>
                  <th className="px-4 py-3">Price (BDT)</th>
                  <th className="px-4 py-3">Diff vs Market Avg</th>
                  <th className="px-4 py-3">Availability</th>
                  <th className="px-4 py-3">Official Warranty</th>
                  <th className="px-4 py-3 text-right">Offer Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {activeProduct.retailers.map((r, idx) => {
                  const diff = r.price - activeProduct.baselineAvg
                  return (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        r.isBest ? 'bg-emerald-500/5 hover:bg-emerald-500/10' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-2 font-medium text-slate-200">
                          <Store size={14} className="text-blue-400" />
                          {r.shop}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 font-mono font-bold text-slate-100">
                        {formatBDT(r.price)}
                      </td>

                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-semibold ${diff < 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {diff < 0 ? formatBDT(diff) : `+${formatBDT(diff)}`}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-xs text-slate-300">
                        {r.stock}
                      </td>

                      <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">
                        {r.warranty}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        {r.isBest ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 size={12} /> Lowest Price
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500">
                            Standard
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
