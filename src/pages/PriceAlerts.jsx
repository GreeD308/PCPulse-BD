import PageHeader from '../components/ui/PageHeader'
import Card, { CardBody } from '../components/ui/Card'
import { Bell } from 'lucide-react'

export default function PriceAlerts() {
  return (
    <div>
      <PageHeader title="Price Alerts" subtitle="Get notified when prices drop below your target in BDT" />
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Bell size={40} style={{ color: 'var(--color-slate-600)' }} />
            <p className="text-sm" style={{ color: 'var(--color-slate-400)' }}>
              Price alert manager coming soon — set targets and receive notifications.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
