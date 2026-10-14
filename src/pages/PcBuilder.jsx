import PageHeader from '../components/ui/PageHeader'
import Card, { CardBody } from '../components/ui/Card'
import { Cpu } from 'lucide-react'

export default function PcBuilder() {
  return (
    <div>
      <PageHeader title="PC Builder" subtitle="Configure a custom PC build and get live total pricing in BDT" />
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Cpu size={40} style={{ color: 'var(--color-slate-600)' }} />
            <p className="text-sm" style={{ color: 'var(--color-slate-400)' }}>
              PC Builder configurator coming soon — part picker with compatibility checks.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
