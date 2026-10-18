import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import MarketOverviewChart from '../components/dashboard/MarketOverviewChart'
import MarketMoversSection from '../components/dashboard/MarketMoversSection'
import DemoDisclaimerBanner from '../components/dashboard/DemoDisclaimerBanner'

export default function MarketTrends() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Market Trends & Price Index"
        subtitle="Historical hardware analytics, volatility metrics, and trend trajectories in Bangladesh"
        actions={
          <Link to="/">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={14} />}>
              Back to Dashboard
            </Button>
          </Link>
        }
      />

      <DemoDisclaimerBanner />

      <MarketOverviewChart />

      <MarketMoversSection />
    </div>
  )
}
