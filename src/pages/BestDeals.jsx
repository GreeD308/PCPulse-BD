import PageHeader from '../components/ui/PageHeader'
import Card, { CardBody } from '../components/ui/Card'
import { Tag } from 'lucide-react'

export default function BestDeals() {
  return (
    <div>
      <PageHeader title="Best Deals" subtitle="Curated discounts and flash sales from BD retailers" />
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Tag size={40} style={{ color: 'var(--color-slate-600)' }} />
            <p className="text-sm" style={{ color: 'var(--color-slate-400)' }}>
              Best deals aggregator coming soon — daily updated offers.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
