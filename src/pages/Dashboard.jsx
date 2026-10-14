import { TrendingUp, TrendingDown, Package, Tag, Bell, ArrowRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { formatBDT } from '../utils/format'

const stats = [
  {
    id: 'stat-products',
    label: 'Tracked Products',
    value: '4,820',
    change: '+142 this week',
    up: true,
    icon: Package,
    iconBg: 'rgba(59,130,246,0.15)',
    iconColor: 'var(--color-blue-300)',
  },
  {
    id: 'stat-avg-price',
    label: 'Avg GPU Price',
    value: formatBDT(38500),
    change: '-2.3% vs last month',
    up: false,
    icon: TrendingDown,
    iconBg: 'rgba(16,185,129,0.12)',
    iconColor: '#34d399',
  },
  {
    id: 'stat-deals',
    label: 'Active Deals',
    value: '317',
    change: '+28 today',
    up: true,
    icon: Tag,
    iconBg: 'rgba(245,158,11,0.12)',
    iconColor: '#fbbf24',
  },
  {
    id: 'stat-alerts',
    label: 'Price Alerts',
    value: '92',
    change: '11 triggered today',
    up: true,
    icon: Bell,
    iconBg: 'rgba(239,68,68,0.12)',
    iconColor: '#f87171',
  },
]

const recentProducts = [
  { id: 1, name: 'RTX 4070 Super 12GB', category: 'GPU', price: 72000, change: -3.1, badge: 'success' },
  { id: 2, name: 'Ryzen 7 7700X', category: 'CPU', price: 32500, change: 1.4, badge: 'warning' },
  { id: 3, name: 'Samsung 990 Pro 2TB', category: 'SSD', price: 14800, change: -5.2, badge: 'success' },
  { id: 4, name: 'Corsair Vengeance 32GB DDR5', category: 'RAM', price: 9200, change: 0.0, badge: 'default' },
  { id: 5, name: 'ASUS ROG B650-F', category: 'Motherboard', price: 28000, change: 2.1, badge: 'warning' },
]

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Market Dashboard"
        subtitle="Bangladesh PC hardware price intelligence — updated hourly"
        actions={
          <Button size="sm" rightIcon={<ArrowRight size={14} />}>
            View All Products
          </Button>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent products table */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recently Updated Prices"
            subtitle="Live BDT pricing from verified Dhaka retailers"
            action={
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={13} />}>
                See all
              </Button>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-slate-700)' }}>
                  {['Product', 'Category', 'Price (BDT)', '30d Change'].map(h => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-medium"
                      style={{ color: 'var(--color-slate-400)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((p, i) => (
                  <tr
                    key={p.id}
                    className="transition-colors hover:bg-white/[0.03]"
                    style={{
                      borderBottom:
                        i < recentProducts.length - 1
                          ? '1px solid var(--color-slate-700)'
                          : undefined,
                    }}
                  >
                    <td className="px-5 py-3 font-medium" style={{ color: 'var(--color-slate-100)' }}>
                      {p.name}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant="info">{p.category}</Badge>
                    </td>
                    <td className="px-5 py-3 font-mono" style={{ color: 'var(--color-slate-200)' }}>
                      {formatBDT(p.price)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="flex items-center gap-1 text-xs font-medium"
                        style={{
                          color:
                            p.change < 0
                              ? '#34d399'
                              : p.change > 0
                              ? '#f87171'
                              : 'var(--color-slate-400)',
                        }}
                      >
                        {p.change < 0 ? (
                          <TrendingDown size={13} />
                        ) : p.change > 0 ? (
                          <TrendingUp size={13} />
                        ) : null}
                        {p.change === 0 ? '—' : `${Math.abs(p.change)}%`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick info column */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Market Pulse" subtitle="Top movers today" />
            <CardBody>
              <ul className="space-y-3">
                {[
                  { name: 'RTX 4060', delta: '-৳1,200', dir: 'down' },
                  { name: 'Core i5-14600K', delta: '+৳800', dir: 'up' },
                  { name: 'WD Black 1TB', delta: '-৳450', dir: 'down' },
                  { name: 'B550 Tomahawk', delta: '-৳300', dir: 'down' },
                ].map(item => (
                  <li key={item.name} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--color-slate-200)' }}>
                      {item.name}
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: item.dir === 'down' ? '#34d399' : '#f87171' }}
                    >
                      {item.delta}
                    </span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Popular Categories" />
            <CardBody>
              <ul className="space-y-2.5">
                {[
                  { label: 'GPUs', pct: 84 },
                  { label: 'CPUs', pct: 71 },
                  { label: 'RAM', pct: 58 },
                  { label: 'SSDs', pct: 45 },
                  { label: 'Motherboards', pct: 37 },
                ].map(cat => (
                  <li key={cat.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: 'var(--color-slate-300)' }}>{cat.label}</span>
                      <span style={{ color: 'var(--color-slate-400)' }}>{cat.pct}%</span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--color-slate-700)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${cat.pct}%`,
                          backgroundColor: 'var(--color-accent)',
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({ id, label, value, change, up, icon: Icon, iconBg, iconColor }) {
  return (
    <Card id={id} className="p-4 sm:p-5">
      <div className="flex items-start justify-between mb-3">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={18} color={iconColor} />
        </div>
        <Badge variant={up ? 'success' : 'danger'} size="sm">
          {up ? '↑' : '↓'}
        </Badge>
      </div>
      <p className="text-xl font-bold mb-0.5" style={{ color: 'var(--color-slate-100)' }}>
        {value}
      </p>
      <p className="text-xs" style={{ color: 'var(--color-slate-400)' }}>
        {label}
      </p>
      <p className="text-xs mt-1" style={{ color: up ? '#34d399' : '#f87171' }}>
        {change}
      </p>
    </Card>
  )
}
