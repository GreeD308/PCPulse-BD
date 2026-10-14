import PageHeader from '../components/ui/PageHeader'
import Card, { CardBody } from '../components/ui/Card'
import { TrendingUp } from 'lucide-react'

export default function MarketTrends() {
  return (
    <div>
      <PageHeader title="Market Trends" subtitle="Historical price trends and market analysis charts" />
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <TrendingUp size={40} style={{ color: 'var(--color-slate-600)' }} />
            <p className="text-sm" style={{ color: 'var(--color-slate-400)' }}>
              Market trends charts coming soon — powered by Recharts.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
