import { Link } from 'react-router-dom'
import { ArrowRight, Tag, ArrowLeftRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import DemoDisclaimerBanner from '../components/dashboard/DemoDisclaimerBanner'
import DashboardStats from '../components/dashboard/DashboardStats'
import MarketOverviewChart from '../components/dashboard/MarketOverviewChart'
import MarketMoversSection from '../components/dashboard/MarketMoversSection'
import BestDealsSection from '../components/dashboard/BestDealsSection'
import PopularComponentsSection from '../components/dashboard/PopularComponentsSection'
import RecentPriceUpdatesSection from '../components/dashboard/RecentPriceUpdatesSection'

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* 1. Welcome Heading: "PC Market Overview" */}
      <PageHeader
        title="PC Market Overview"
        subtitle="Bangladesh PC Hardware Price Intelligence & Tracker — simulated market data in Bangladeshi Taka (BDT)"
        actions={
          <div className="flex items-center gap-2">
            <Link to="/price-comparison">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<ArrowLeftRight size={14} />}
              >
                Compare Prices
              </Button>
            </Link>
            <Link to="/best-deals">
              <Button
                size="sm"
                leftIcon={<Tag size={14} />}
                rightIcon={<ArrowRight size={13} />}
              >
                Explore Deals
              </Button>
            </Link>
          </div>
        }
      />

      {/* Demonstration Data Notice */}
      <DemoDisclaimerBanner />

      {/* 2. Four Summary Cards */}
      <DashboardStats />

      {/* 3. Large Market Overview Chart (Recharts 6-month historical movements) */}
      <MarketOverviewChart />

      {/* 4. Market Movers Section (Rising / Falling Prices) */}
      <MarketMoversSection />

      {/* 5. Best Deals Section (Image placeholders, model name, shop, prices, discount %) */}
      <BestDealsSection />

      {/* 6. Popular Components Section (CPU, GPU, RAM, SSD, Motherboard) */}
      <PopularComponentsSection />

      {/* 7. Recently Updated Prices List (Shop names & report timestamps) */}
      <RecentPriceUpdatesSection />
    </div>
  )
}
