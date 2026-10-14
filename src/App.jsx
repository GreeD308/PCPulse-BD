import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import PriceComparison from './pages/PriceComparison'
import MarketTrends from './pages/MarketTrends'
import BestDeals from './pages/BestDeals'
import PcBuilder from './pages/PcBuilder'
import PriceAlerts from './pages/PriceAlerts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/price-comparison" element={<PriceComparison />} />
          <Route path="/market-trends" element={<MarketTrends />} />
          <Route path="/best-deals" element={<BestDeals />} />
          <Route path="/pc-builder" element={<PcBuilder />} />
          <Route path="/price-alerts" element={<PriceAlerts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
