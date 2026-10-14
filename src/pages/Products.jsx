import PageHeader from '../components/ui/PageHeader'
import Card, { CardBody } from '../components/ui/Card'
import { Package } from 'lucide-react'

export default function Products() {
  return (
    <div>
      <PageHeader title="Products" subtitle="Browse and search all tracked hardware products" />
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Package size={40} style={{ color: 'var(--color-slate-600)' }} />
            <p className="text-sm" style={{ color: 'var(--color-slate-400)' }}>
              Products page coming soon — search, filter and compare hardware.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
