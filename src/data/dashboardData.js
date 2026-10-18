/**
 * Mock data for PCPulse BD Dashboard.
 * 
 * NOTICE: All price figures and market metrics in this file are simulated
 * demonstration data in Bangladeshi Taka (BDT) created for application 
 * prototyping and UI evaluation. They do not represent official live market quotes.
 */

export const DEMO_DISCLAIMER = {
  title: 'Demonstration Data Notice',
  message: 'All PC hardware prices and market statistics displayed are simulated demonstration figures in Bangladeshi Taka (BDT) for UI preview. They do not reflect live distributor or retail store quotes.',
  lastUpdated: '11 Nov 2026, 10:45 AM BST',
  retailersTracked: ['Star Tech', 'Ryans Computers', 'Tech Land BD', 'UltraTech BD', 'Skyland Computer BD', 'UCC BD']
}

// 1. Four Summary Cards
export const SUMMARY_STATS = [
  {
    id: 'stat-tracked-products',
    title: 'Tracked Products',
    value: '4,850',
    change: '+138 new models this month',
    changeType: 'increase',
    description: 'Cataloged across 6 top Bangladesh retailers',
    iconName: 'Package',
    accentColor: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.12)'
  },
  {
    id: 'stat-avg-price-change',
    title: 'Average Price Change',
    value: '-3.4%',
    change: '30-day overall market shift',
    changeType: 'favorable', // price drop is favorable for buyers
    description: 'DDR5 memory & PCIe Gen4 SSDs leading decline',
    iconName: 'TrendingDown',
    accentColor: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)'
  },
  {
    id: 'stat-active-deals',
    title: 'Active Deals',
    value: '58',
    change: '14 flash discounts ending soon',
    changeType: 'neutral',
    description: 'Discounts ranging from 8% to 18% off list',
    iconName: 'Tag',
    accentColor: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)'
  },
  {
    id: 'stat-price-reports',
    title: 'Price Reports',
    value: '1,420',
    change: '+86 verified today',
    changeType: 'increase',
    description: 'Daily automated crawler & community submissions',
    iconName: 'FileCheck2',
    accentColor: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.12)'
  }
]

// 2. Six-month market overview chart data (June 2026 to November 2026)
// Provides category average indexes in BDT and normalized trend figures.
export const SIX_MONTH_TRENDS = [
  {
    month: 'Jun 2026',
    label: 'Jun',
    GPU: 66500,
    CPU: 32800,
    RAM: 11800,
    SSD: 13900,
    Motherboard: 22400,
    marketIndex: 104.2
  },
  {
    month: 'Jul 2026',
    label: 'Jul',
    GPU: 64900,
    CPU: 32100,
    RAM: 11400,
    SSD: 13200,
    Motherboard: 22100,
    marketIndex: 102.6
  },
  {
    month: 'Aug 2026',
    label: 'Aug',
    GPU: 63200,
    CPU: 31400,
    RAM: 10900,
    SSD: 12600,
    Motherboard: 21800,
    marketIndex: 100.0
  },
  {
    month: 'Sep 2026',
    label: 'Sep',
    GPU: 61800,
    CPU: 30700,
    RAM: 10200,
    SSD: 12100,
    Motherboard: 21400,
    marketIndex: 97.8
  },
  {
    month: 'Oct 2026',
    label: 'Oct',
    GPU: 60200,
    CPU: 29900,
    RAM: 9700,
    SSD: 11500,
    Motherboard: 21000,
    marketIndex: 95.4
  },
  {
    month: 'Nov 2026',
    label: 'Nov',
    GPU: 58900,
    CPU: 29200,
    RAM: 9200,
    SSD: 10900,
    Motherboard: 20600,
    marketIndex: 93.7
  }
]

// Category metadata for chart series
export const CHART_CATEGORIES = [
  { key: 'GPU', name: 'GPU Avg', color: '#3b82f6', strokeWidth: 2.5 },
  { key: 'CPU', name: 'CPU Avg', color: '#10b981', strokeWidth: 2 },
  { key: 'Motherboard', name: 'Motherboard Avg', color: '#f59e0b', strokeWidth: 2 },
  { key: 'SSD', name: 'SSD Avg', color: '#ec4899', strokeWidth: 2 },
  { key: 'RAM', name: 'RAM (32GB) Avg', color: '#8b5cf6', strokeWidth: 2 }
]

// 3. Market Movers (Rising and Falling prices)
export const MARKET_MOVERS = [
  // Price Drops (Falling prices)
  {
    id: 'mover-1',
    name: 'ZOTAC Gaming GeForce RTX 4070 Twin Edge 12GB',
    category: 'GPU',
    direction: 'down',
    currentPrice: 67500,
    previousPrice: 72500,
    changeBDT: -5000,
    changePct: -6.9,
    shop: 'Star Tech',
    note: 'Fresh shipment clearance promotion'
  },
  {
    id: 'mover-2',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
    category: 'SSD',
    direction: 'down',
    currentPrice: 15400,
    previousPrice: 17200,
    changeBDT: -1800,
    changePct: -10.5,
    shop: 'Tech Land BD',
    note: 'NAND flash spot price reduction'
  },
  {
    id: 'mover-3',
    name: 'Kingston Fury Beast 32GB (2x16GB) DDR5 6000MHz',
    category: 'RAM',
    direction: 'down',
    currentPrice: 9800,
    previousPrice: 11000,
    changeBDT: -1200,
    changePct: -10.9,
    shop: 'Ryans Computers',
    note: 'DDR5 production scale stabilization'
  },
  {
    id: 'mover-4',
    name: 'AMD Ryzen 5 7600 6-Core Gaming Processor',
    category: 'CPU',
    direction: 'down',
    currentPrice: 19400,
    previousPrice: 20900,
    changeBDT: -1500,
    changePct: -7.2,
    shop: 'UltraTech BD',
    note: 'AM5 budget tier market competition'
  },
  {
    id: 'mover-5',
    name: 'MSI MAG B650 TOMAHAWK WIFI AM5 Motherboard',
    category: 'Motherboard',
    direction: 'down',
    currentPrice: 24500,
    previousPrice: 26000,
    changeBDT: -1500,
    changePct: -5.8,
    shop: 'Skyland Computer BD',
    note: 'Weekend bundle promotion'
  },
  // Price Increases (Rising prices)
  {
    id: 'mover-6',
    name: 'Intel Core i7-14700K 20-Core Raptor Lake Refresh',
    category: 'CPU',
    direction: 'up',
    currentPrice: 46500,
    previousPrice: 44200,
    changeBDT: 2300,
    changePct: 5.2,
    shop: 'Star Tech',
    note: 'High enterprise demand & constrained supply'
  },
  {
    id: 'mover-7',
    name: 'ASUS ROG Strix GeForce RTX 4070 Ti SUPER 16GB',
    category: 'GPU',
    direction: 'up',
    currentPrice: 114000,
    previousPrice: 109500,
    changeBDT: 4500,
    changePct: 4.1,
    shop: 'Ryans Computers',
    note: 'Import tariff & exchange rate adjustment'
  },
  {
    id: 'mover-8',
    name: 'Corsair RM850x 850W 80 PLUS Gold Fully Modular PSU',
    category: 'PSU',
    direction: 'up',
    currentPrice: 16200,
    previousPrice: 15300,
    changeBDT: 900,
    changePct: 5.9,
    shop: 'Tech Land BD',
    note: 'Copper raw material freight cost increase'
  }
]

// 4. Best Deals Section
export const BEST_DEALS = [
  {
    id: 'deal-1',
    name: 'Sapphire Pure AMD Radeon RX 7800 XT 16GB OC',
    category: 'GPU',
    badge: 'Staff Pick',
    shop: 'Star Tech',
    currentPrice: 63900,
    averagePrice: 71500,
    discountPct: 10.6,
    savingsBDT: 7600,
    stockStatus: 'In Stock',
    specs: '16GB GDDR6 • 256-bit • Triple Fan FrostBlade',
    placeholderTheme: 'from-blue-600/30 via-cyan-600/20 to-slate-900',
    iconType: 'gpu'
  },
  {
    id: 'deal-2',
    name: 'AMD Ryzen 7 7800X3D 8-Core 3D V-Cache Processor',
    category: 'CPU',
    badge: 'Best Gaming CPU',
    shop: 'Ryans Computers',
    currentPrice: 42500,
    averagePrice: 47900,
    discountPct: 11.3,
    savingsBDT: 5400,
    stockStatus: 'Limited Stock',
    specs: '8 Cores / 16 Threads • 104MB Cache • 5.0GHz Boost',
    placeholderTheme: 'from-emerald-600/30 via-teal-600/20 to-slate-900',
    iconType: 'cpu'
  },
  {
    id: 'deal-3',
    name: 'Lexar NM790 2TB PCIe Gen4 NVMe M.2 2280 SSD',
    category: 'SSD',
    badge: '16% Off',
    shop: 'Tech Land BD',
    currentPrice: 13900,
    averagePrice: 16500,
    discountPct: 15.8,
    savingsBDT: 2600,
    stockStatus: 'In Stock',
    specs: 'Read up to 7400 MB/s • Write 6500 MB/s • SLC Dynamic Cache',
    placeholderTheme: 'from-pink-600/30 via-rose-600/20 to-slate-900',
    iconType: 'ssd'
  },
  {
    id: 'deal-4',
    name: 'G.Skill Ripjaws S5 32GB (2x16GB) DDR5 6000MHz CL30',
    category: 'RAM',
    badge: 'Hot Seller',
    shop: 'UltraTech BD',
    currentPrice: 10400,
    averagePrice: 12200,
    discountPct: 14.8,
    savingsBDT: 1800,
    stockStatus: 'In Stock',
    specs: 'DDR5 6000MT/s • CL30-40-40-96 • Low Profile 33mm',
    placeholderTheme: 'from-purple-600/30 via-indigo-600/20 to-slate-900',
    iconType: 'ram'
  },
  {
    id: 'deal-5',
    name: 'MSI B650 GAMING PLUS WIFI AM5 Motherboard',
    category: 'Motherboard',
    badge: 'Value AM5',
    shop: 'Skyland Computer BD',
    currentPrice: 19800,
    averagePrice: 22500,
    discountPct: 12.0,
    savingsBDT: 2700,
    stockStatus: 'In Stock',
    specs: 'DDR5 PCIe 4.0 • Wi-Fi 6E & 2.5G LAN • Extended Heatsink',
    placeholderTheme: 'from-amber-600/30 via-yellow-600/20 to-slate-900',
    iconType: 'motherboard'
  },
  {
    id: 'deal-6',
    name: 'Gigabyte GeForce RTX 4060 EAGLE OC 8GB',
    category: 'GPU',
    badge: '1080p Champ',
    shop: 'Star Tech',
    currentPrice: 36500,
    averagePrice: 40500,
    discountPct: 9.9,
    savingsBDT: 4000,
    stockStatus: 'In Stock',
    specs: '8GB GDDR6 • WINDFORCE 3X Cooling • Dual BIOS',
    placeholderTheme: 'from-blue-600/30 via-indigo-600/20 to-slate-900',
    iconType: 'gpu'
  }
]

// 5. Popular Components section covering CPU, GPU, RAM, SSD and Motherboard
export const POPULAR_COMPONENTS = [
  {
    category: 'CPU',
    title: 'Processors (CPU)',
    description: 'Most tracked desktop processors for gaming & productivity in BD',
    trackedCount: 142,
    priceRange: '৳11,500 – ৳64,000',
    dominantSocket: 'AM5 / LGA1700',
    topItems: [
      {
        id: 'cpu-pop-1',
        model: 'AMD Ryzen 7 7800X3D',
        price: 42500,
        storesAvailable: 5,
        rating: 4.9,
        trend: -4.5,
        benchmark: 'Top FPS Per Watt'
      },
      {
        id: 'cpu-pop-2',
        model: 'Intel Core i5-14600K',
        price: 31200,
        storesAvailable: 6,
        rating: 4.8,
        trend: -1.2,
        benchmark: 'All-Round Multitasking'
      },
      {
        id: 'cpu-pop-3',
        model: 'AMD Ryzen 5 7600',
        price: 19400,
        storesAvailable: 6,
        rating: 4.8,
        trend: -7.2,
        benchmark: 'Best Budget AM5 Choice'
      },
      {
        id: 'cpu-pop-4',
        model: 'Intel Core i5-13400F',
        price: 20800,
        storesAvailable: 5,
        rating: 4.7,
        trend: 0.0,
        benchmark: 'Entry 10-Core Gamer'
      }
    ]
  },
  {
    category: 'GPU',
    title: 'Graphics Cards (GPU)',
    description: 'Discrete graphics cards leading benchmark and price index searches',
    trackedCount: 215,
    priceRange: '৳24,500 – ৳245,000',
    dominantSocket: 'PCIe 4.0 x16',
    topItems: [
      {
        id: 'gpu-pop-1',
        model: 'NVIDIA GeForce RTX 4060 8GB',
        price: 36500,
        storesAvailable: 6,
        rating: 4.7,
        trend: -3.8,
        benchmark: 'Mainstream 1080p Ultra'
      },
      {
        id: 'gpu-pop-2',
        model: 'AMD Radeon RX 7800 XT 16GB',
        price: 63900,
        storesAvailable: 4,
        rating: 4.9,
        trend: -6.1,
        benchmark: '1440p High VRAM King'
      },
      {
        id: 'gpu-pop-3',
        model: 'NVIDIA GeForce RTX 4070 Super 12GB',
        price: 74500,
        storesAvailable: 5,
        rating: 4.9,
        trend: -2.6,
        benchmark: 'Competitive 1440p / DLSS 3'
      },
      {
        id: 'gpu-pop-4',
        model: 'Intel Arc A750 8GB Limited Edition',
        price: 24900,
        storesAvailable: 3,
        rating: 4.4,
        trend: -5.0,
        benchmark: 'Budget AV1 & 1080p Value'
      }
    ]
  },
  {
    category: 'RAM',
    title: 'Memory Modules (RAM)',
    description: 'DDR4 and high frequency DDR5 dual-channel memory kits',
    trackedCount: 168,
    priceRange: '৳3,400 – ৳22,500',
    dominantSocket: 'DDR5 6000 / DDR4 3200',
    topItems: [
      {
        id: 'ram-pop-1',
        model: 'Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz',
        price: 10800,
        storesAvailable: 6,
        rating: 4.8,
        trend: -8.5,
        benchmark: 'AMD EXPO / Intel XMP Ready'
      },
      {
        id: 'ram-pop-2',
        model: 'G.Skill Ripjaws S5 32GB DDR5 6000MHz CL30',
        price: 10400,
        storesAvailable: 5,
        rating: 4.9,
        trend: -10.2,
        benchmark: 'Ultra-Low Latency Timing'
      },
      {
        id: 'ram-pop-3',
        model: 'Kingston Fury Beast 16GB DDR5 5600MHz',
        price: 5200,
        storesAvailable: 6,
        rating: 4.7,
        trend: -4.0,
        benchmark: 'Budget DDR5 Single Stick'
      },
      {
        id: 'ram-pop-4',
        model: 'Team T-Force Delta RGB 32GB DDR5 6400MHz',
        price: 12500,
        storesAvailable: 4,
        rating: 4.8,
        trend: -2.3,
        benchmark: 'High Speed ARGB Accent'
      }
    ]
  },
  {
    category: 'SSD',
    title: 'Solid State Drives (SSD)',
    description: 'High-speed NVMe M.2 Gen4 and SATA drives for fast loading',
    trackedCount: 194,
    priceRange: '৳2,800 – ৳26,500',
    dominantSocket: 'M.2 2280 NVMe Gen4',
    topItems: [
      {
        id: 'ssd-pop-1',
        model: 'Samsung 990 PRO 2TB NVMe Gen4',
        price: 15400,
        storesAvailable: 6,
        rating: 4.9,
        trend: -10.5,
        benchmark: 'Flagship Speed 7450MB/s'
      },
      {
        id: 'ssd-pop-2',
        model: 'Lexar NM790 2TB PCIe Gen4x4 M.2',
        price: 13900,
        storesAvailable: 5,
        rating: 4.8,
        trend: -12.0,
        benchmark: 'Top Price-to-Performance'
      },
      {
        id: 'ssd-pop-3',
        model: 'Kingston KC3000 1TB PCIe 4.0 NVMe',
        price: 9400,
        storesAvailable: 6,
        rating: 4.8,
        trend: -5.1,
        benchmark: 'Reliable OS & Game Drive'
      },
      {
        id: 'ssd-pop-4',
        model: 'WD Black SN850X 1TB with Heatsink',
        price: 11200,
        storesAvailable: 4,
        rating: 4.9,
        trend: -1.8,
        benchmark: 'PS5 & PC Heavy Workload'
      }
    ]
  },
  {
    category: 'Motherboard',
    title: 'Motherboards',
    description: 'Mainboards supporting current generation AMD AM5 and Intel 1700/1851',
    trackedCount: 152,
    priceRange: '৳9,800 – ৳82,000',
    dominantSocket: 'AMD B650 / Intel B760',
    topItems: [
      {
        id: 'mb-pop-1',
        model: 'MSI B650 GAMING PLUS WIFI',
        price: 19800,
        storesAvailable: 6,
        rating: 4.8,
        trend: -5.8,
        benchmark: 'Top Value AM5 Platform'
      },
      {
        id: 'mb-pop-2',
        model: 'ASUS TUF GAMING B650-PLUS WIFI',
        price: 24800,
        storesAvailable: 5,
        rating: 4.9,
        trend: -2.4,
        benchmark: 'Heavy Duty Military VRMs'
      },
      {
        id: 'mb-pop-3',
        model: 'Gigabyte B760M DS3H AX DDR5',
        price: 16900,
        storesAvailable: 5,
        rating: 4.7,
        trend: 0.0,
        benchmark: 'Compact Intel 14th Gen DDR5'
      },
      {
        id: 'mb-pop-4',
        model: 'ASRock B650M-HDV/M.2 AM5',
        price: 13800,
        storesAvailable: 4,
        rating: 4.6,
        trend: -3.5,
        benchmark: 'Budget AM5 Starter'
      }
    ]
  }
]

// 6. Recently Updated Prices List with shop names and report timestamps
export const RECENTLY_UPDATED_PRICES = [
  {
    id: 'rup-1',
    productName: 'Gigabyte GeForce RTX 4070 SUPER WINDFORCE OC 12GB',
    category: 'GPU',
    shop: 'Star Tech',
    currentPrice: 75200,
    previousPrice: 77500,
    delta: -2300,
    timestamp: '14 minutes ago',
    source: 'Automated Scraper',
    verified: true
  },
  {
    id: 'rup-2',
    productName: 'AMD Ryzen 7 7700X 8-Core 5.4GHz AM5 Processor',
    category: 'CPU',
    shop: 'Ryans Computers',
    currentPrice: 32200,
    previousPrice: 33500,
    delta: -1300,
    timestamp: '32 minutes ago',
    source: 'Store API Sync',
    verified: true
  },
  {
    id: 'rup-3',
    productName: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    category: 'RAM',
    shop: 'Tech Land BD',
    currentPrice: 11400,
    previousPrice: 11400,
    delta: 0,
    timestamp: '48 minutes ago',
    source: 'Verified Stock Check',
    verified: true
  },
  {
    id: 'rup-4',
    productName: 'Samsung 990 EVO Plus 1TB PCIe Gen 5x2 NVMe SSD',
    category: 'SSD',
    shop: 'UltraTech BD',
    currentPrice: 10900,
    previousPrice: 11800,
    delta: -900,
    timestamp: '1 hour ago',
    source: 'Price Match Submission',
    verified: true
  },
  {
    id: 'rup-5',
    productName: 'MSI PRO B650M-A WIFI DDR5 AM5 Motherboard',
    category: 'Motherboard',
    shop: 'Skyland Computer BD',
    currentPrice: 16900,
    previousPrice: 17500,
    delta: -600,
    timestamp: '2 hours ago',
    source: 'Store Crawler',
    verified: true
  },
  {
    id: 'rup-6',
    productName: 'Deepcool AK620 Digital Dual-Tower CPU Cooler',
    category: 'Cooler',
    shop: 'Star Tech',
    currentPrice: 6800,
    previousPrice: 6500,
    delta: 300,
    timestamp: '3 hours ago',
    source: 'Retail Price Alert',
    verified: false
  },
  {
    id: 'rup-7',
    productName: 'ASUS Dual GeForce RTX 4060 EVO OC 8GB',
    category: 'GPU',
    shop: 'UCC BD',
    currentPrice: 37200,
    previousPrice: 38500,
    delta: -1300,
    timestamp: '4 hours ago',
    source: 'Automated Scraper',
    verified: true
  },
  {
    id: 'rup-8',
    productName: 'Intel Core i5-14400F 10-Core LGA1700 Processor',
    category: 'CPU',
    shop: 'Ryans Computers',
    currentPrice: 22400,
    previousPrice: 22900,
    delta: -500,
    timestamp: '5 hours ago',
    source: 'Store API Sync',
    verified: true
  }
]

