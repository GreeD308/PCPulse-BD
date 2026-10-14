/**
 * Format a number as BDT currency (e.g. ৳38,500).
 * @param {number} amount
 * @param {boolean} [compact] – e.g. ৳38.5K
 */
export function formatBDT(amount, compact = false) {
  if (compact && amount >= 1000) {
    return `৳${(amount / 1000).toFixed(1)}K`
  }
  return `৳${amount.toLocaleString('en-BD')}`
}

/**
 * Format a percentage change with sign.
 * @param {number} pct
 */
export function formatPct(pct) {
  if (pct === 0) return '0%'
  return `${pct > 0 ? '+' : ''}${pct.toFixed(1)}%`
}

/**
 * Returns 'up', 'down', or 'flat' for a numeric delta.
 * @param {number} delta
 */
export function priceDirection(delta) {
  if (delta > 0) return 'up'
  if (delta < 0) return 'down'
  return 'flat'
}
