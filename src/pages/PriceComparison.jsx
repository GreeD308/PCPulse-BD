import PageHeader from '../components/ui/PageHeader'
import Card, { CardBody } from '../components/ui/Card'
import { ArrowLeftRight } from 'lucide-react'

export default function PriceComparison() {
  return (
    <div>
      <PageHeader title="Price Comparison" subtitle="Compare the same product across multiple Dhaka vendors" />
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <ArrowLeftRight size={40} style={{ color: 'var(--color-slate-600)' }} />
            <p className="text-sm" style={{ color: 'var(--color-slate-400)' }}>
              Price comparison tool coming soon — side-by-side vendor pricing.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
