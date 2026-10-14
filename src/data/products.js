/**
 * Placeholder product data for development.
 * Replace with real API calls in production.
 */
export const CATEGORIES = [
  'GPU',
  'CPU',
  'Motherboard',
  'RAM',
  'SSD',
  'HDD',
  'PSU',
  'Case',
  'Cooler',
  'Monitor',
]

/** @type {Array<{id: number, name: string, category: string, price: number, vendor: string, change30d: number}>} */
export const SAMPLE_PRODUCTS = [
  { id: 1, name: 'RTX 4070 Super 12GB', category: 'GPU',          price: 72000, vendor: 'Ryans', change30d: -3.1 },
  { id: 2, name: 'RTX 4060 8GB',         category: 'GPU',          price: 38500, vendor: 'Star Tech', change30d: -1.8 },
  { id: 3, name: 'Ryzen 7 7700X',         category: 'CPU',          price: 32500, vendor: 'Ryans', change30d: 1.4 },
  { id: 4, name: 'Core i5-14600K',        category: 'CPU',          price: 26800, vendor: 'Ultratech', change30d: 0.9 },
  { id: 5, name: 'Samsung 990 Pro 2TB',   category: 'SSD',          price: 14800, vendor: 'Star Tech', change30d: -5.2 },
  { id: 6, name: 'Corsair Vengeance 32GB DDR5', category: 'RAM',   price: 9200,  vendor: 'Ryans', change30d: 0.0 },
  { id: 7, name: 'ASUS ROG B650-F',       category: 'Motherboard', price: 28000, vendor: 'Global Brand', change30d: 2.1 },
  { id: 8, name: 'Seasonic Focus GX 850W',category: 'PSU',          price: 14500, vendor: 'Ultratech', change30d: -0.5 },
]
