/**
 * Price Alerts – set target BDT price thresholds for tracked products.
 *
 * NOTICE: Alerts are stored in localStorage only. All prices are simulated
 * demonstration data in BDT and do not represent live market data.
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  BellOff,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  X,
  Search,
  ChevronDown,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import { PRODUCT_CATALOG } from '../data/productCatalog'

const STORAGE_KEY = 'pcpulse_price_alerts'

const fmt = (n) => `৳${n.toLocaleString('en-BD')}`

function loadAlerts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}
function saveAlerts(alerts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts))
}

// ─── Status badge ─────────────────────────────────────────────────────────
function AlertStatusBadge({ product, targetPrice }) {
  const current = product.lowestPrice
  const triggered = current <= targetPrice
  const diff = current - targetPrice
  const pct = ((diff / targetPrice) * 100).toFixed(1)

  if (triggered) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ade80' }}
      >
        <CheckCircle2 size={11} /> Target reached!
      </span>
    )
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
      style={{ backgroundColor: 'rgba(148,163,184,0.1)', color: 'var(--color-slate-400)' }}
    >
      {fmt(Math.abs(diff))} above target ({Math.abs(pct)}% away)
    </span>
  )
}

// ─── Add Alert modal ──────────────────────────────────────────────────────
function AddAlertModal({ onAdd, onClose, existingProductIds }) {
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [targetInput, setTargetInput] = useState('')
  const [step, setStep] = useState('pick') // 'pick' | 'set'

  const filtered = useMemo(
    () =>
      PRODUCT_CATALOG.filter(
        (p) =>
          !existingProductIds.includes(p.id) &&
          (search === '' ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.model.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())),
      ).slice(0, 20),
    [search, existingProductIds],
  )

  const handlePick = (p) => {
    setSelectedProduct(p)
    setTargetInput(String(Math.floor(p.lowestPrice * 0.95)))
    setStep('set')
  }

  const handleAdd = () => {
    const target = parseInt(targetInput.replace(/[^0-9]/g, ''), 10)
    if (!selectedProduct || isNaN(target) || target <= 0) return
    onAdd({ productId: selectedProduct.id, targetPrice: target, createdAt: new Date().toISOString() })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div
        className="w-full max-w-lg rounded-2xl border shadow-2xl flex flex-col max-h-[85vh]"
        style={{ backgroundColor: 'var(--color-navy-800)', borderColor: 'var(--color-slate-700)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--color-slate-700)' }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-slate-100)' }}>
            {step === 'pick' ? 'Select a product' : 'Set target price'}
          </h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10 transition-colors">
            <X size={16} style={{ color: 'var(--color-slate-400)' }} />
          </button>
        </div>

        {step === 'pick' ? (
          <>
            {/* Search */}
            <div className="px-5 pt-4 pb-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-slate-500)' }} />
                <input
                  type="text"
                  placeholder="Search product name or category…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg text-sm border outline-none"
                  style={{
                    backgroundColor: 'var(--color-navy-900)',
                    borderColor: 'var(--color-slate-700)',
                    color: 'var(--color-slate-100)',
                  }}
                  autoFocus
                />
              </div>
            </div>

            {/* Product list */}
            <div className="overflow-y-auto flex-1 px-5 pb-4 space-y-1.5">
              {filtered.length === 0 ? (
                <p className="text-sm text-center py-6" style={{ color: 'var(--color-slate-500)' }}>
                  No products found (already tracked products are excluded)
                </p>
              ) : (
                filtered.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePick(p)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-150 hover:border-accent"
                    style={{
                      backgroundColor: 'var(--color-navy-900)',
                      borderColor: 'var(--color-slate-700)',
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--color-slate-100)' }}>{p.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-slate-400)' }}>
                        {p.category} · Lowest: {fmt(p.lowestPrice)}
                      </p>
                    </div>
                    <ChevronDown size={14} style={{ color: 'var(--color-slate-500)', transform: 'rotate(-90deg)' }} />
                  </button>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="px-5 py-4 space-y-4">
            {/* Selected product summary */}
            <div
              className="rounded-lg p-3 border"
              style={{ backgroundColor: 'var(--color-navy-900)', borderColor: 'var(--color-slate-700)' }}
            >
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-slate-100)' }}>{selectedProduct.name}</p>
              <div className="flex items-center gap-4 mt-1 text-xs" style={{ color: 'var(--color-slate-400)' }}>
                <span>Current lowest: <strong style={{ color: '#4ade80' }}>{fmt(selectedProduct.lowestPrice)}</strong></span>
                <span>Avg: {fmt(selectedProduct.avgPrice)}</span>
              </div>
            </div>

            {/* Target price input */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-slate-300)' }}>
                Alert me when price drops to or below (BDT)
              </label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold"
                  style={{ color: 'var(--color-slate-400)' }}
                >৳</span>
                <input
                  type="number"
                  min="1"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  className="w-full pl-7 pr-3 py-2.5 rounded-lg text-sm border outline-none"
                  style={{
                    backgroundColor: 'var(--color-navy-900)',
                    borderColor: 'var(--color-slate-700)',
                    color: 'var(--color-slate-100)',
                  }}
                  autoFocus
                />
              </div>
              {targetInput && !isNaN(parseInt(targetInput)) && parseInt(targetInput) >= selectedProduct.lowestPrice && (
                <p className="text-xs mt-1.5" style={{ color: '#4ade80' }}>
                  ✓ This alert would trigger immediately — current lowest is already at or below your target.
                </p>
              )}
              {targetInput && !isNaN(parseInt(targetInput)) && parseInt(targetInput) < selectedProduct.lowestPrice && (
                <p className="text-xs mt-1.5" style={{ color: 'var(--color-slate-400)' }}>
                  Waiting for price to drop {fmt(selectedProduct.lowestPrice - parseInt(targetInput))} more.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setStep('pick')}
                className="flex-1 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-white/5"
                style={{ borderColor: 'var(--color-slate-700)', color: 'var(--color-slate-300)' }}
              >
                Back
              </button>
              <button
                onClick={handleAdd}
                disabled={!targetInput || isNaN(parseInt(targetInput)) || parseInt(targetInput) <= 0}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-opacity"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                  opacity: !targetInput || isNaN(parseInt(targetInput)) || parseInt(targetInput) <= 0 ? 0.5 : 1,
                  cursor: !targetInput || isNaN(parseInt(targetInput)) || parseInt(targetInput) <= 0 ? 'not-allowed' : 'pointer',
                }}
              >
                Set Alert
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Alert card ───────────────────────────────────────────────────────────
function AlertCard({ alert, onDelete, onToggle }) {
  const product = PRODUCT_CATALOG.find((p) => p.id === alert.productId)
  if (!product) return null

  const triggered = product.lowestPrice <= alert.targetPrice
  const change = product.change30d

  return (
    <Card hoverable style={triggered ? { borderColor: 'rgba(74,222,128,0.4)' } : {}}>
      <CardBody>
        <div className="flex items-start gap-3">
          {/* Bell icon */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{
              backgroundColor: triggered
                ? 'rgba(74,222,128,0.1)'
                : alert.active
                ? 'rgba(var(--color-accent-rgb, 99,102,241),0.1)'
                : 'var(--color-navy-900)',
            }}
          >
            {alert.active ? (
              <Bell size={16} style={{ color: triggered ? '#4ade80' : 'var(--color-accent)' }} />
            ) : (
              <BellOff size={16} style={{ color: 'var(--color-slate-500)' }} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link
                  to={`/products/${product.id}`}
                  className="text-sm font-semibold hover:underline line-clamp-1"
                  style={{ color: 'var(--color-slate-100)' }}
                >
                  {product.name}
                </Link>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-slate-400)' }}>
                  {product.category} · Added {new Date(alert.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onToggle(alert.id)}
                  className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  title={alert.active ? 'Pause alert' : 'Activate alert'}
                >
                  {alert.active ? (
                    <BellOff size={14} style={{ color: 'var(--color-slate-400)' }} />
                  ) : (
                    <Bell size={14} style={{ color: 'var(--color-accent)' }} />
                  )}
                </button>
                <button
                  onClick={() => onDelete(alert.id)}
                  className="p-1.5 rounded hover:bg-red-900/40 transition-colors"
                  title="Delete alert"
                >
                  <Trash2 size={14} style={{ color: '#f87171' }} />
                </button>
              </div>
            </div>

            {/* Price info */}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
              <div>
                <span className="text-xs" style={{ color: 'var(--color-slate-500)' }}>Target </span>
                <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{fmt(alert.targetPrice)}</span>
              </div>
              <div>
                <span className="text-xs" style={{ color: 'var(--color-slate-500)' }}>Current lowest </span>
                <span className="font-semibold" style={{ color: triggered ? '#4ade80' : 'var(--color-slate-200)' }}>
                  {fmt(product.lowestPrice)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {change <= 0 ? (
                  <TrendingDown size={12} style={{ color: '#4ade80' }} />
                ) : (
                  <TrendingUp size={12} style={{ color: '#f87171' }} />
                )}
                <span
                  className="text-xs font-medium"
                  style={{ color: change <= 0 ? '#4ade80' : '#f87171' }}
                >
                  {change > 0 ? '+' : ''}{change}% (30d)
                </span>
              </div>
            </div>

            {/* Status badge */}
            <div className="mt-2">
              {alert.active ? (
                <AlertStatusBadge product={product} targetPrice={alert.targetPrice} />
              ) : (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: 'rgba(148,163,184,0.1)', color: 'var(--color-slate-500)' }}
                >
                  <BellOff size={10} /> Paused
                </span>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

// ─── Main component ───────────────────────────────────────────────────────
export default function PriceAlerts() {
  const [alerts, setAlerts] = useState(() =>
    loadAlerts().map((a) => ({ active: true, ...a })),
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [filter, setFilter] = useState('all') // 'all' | 'triggered' | 'active' | 'paused'

  const existingProductIds = alerts.map((a) => a.productId)

  const handleAdd = (alert) => {
    const newAlert = { id: Date.now().toString(), active: true, ...alert }
    const updated = [newAlert, ...alerts]
    setAlerts(updated)
    saveAlerts(updated)
  }

  const handleDelete = (id) => {
    const updated = alerts.filter((a) => a.id !== id)
    setAlerts(updated)
    saveAlerts(updated)
  }

  const handleToggle = (id) => {
    const updated = alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    setAlerts(updated)
    saveAlerts(updated)
  }

  const triggered = alerts.filter((a) => {
    const p = PRODUCT_CATALOG.find((p) => p.id === a.productId)
    return a.active && p && p.lowestPrice <= a.targetPrice
  })

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      const p = PRODUCT_CATALOG.find((p) => p.id === a.productId)
      if (!p) return false
      if (filter === 'triggered') return a.active && p.lowestPrice <= a.targetPrice
      if (filter === 'active') return a.active && p.lowestPrice > a.targetPrice
      if (filter === 'paused') return !a.active
      return true
    })
  }, [alerts, filter])

  return (
    <div>
      <PageHeader
        title="Price Alerts"
        subtitle="Set target prices — get notified when any product drops below your threshold. Demo data only."
        actions={
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
          >
            <Plus size={14} /> Add Alert
          </button>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Alerts', value: alerts.length, color: 'var(--color-slate-100)' },
          { label: 'Active', value: alerts.filter((a) => a.active).length, color: 'var(--color-accent)' },
          { label: 'Triggered', value: triggered.length, color: '#4ade80' },
          { label: 'Paused', value: alerts.filter((a) => !a.active).length, color: 'var(--color-slate-400)' },
        ].map((s) => (
          <Card key={s.label}>
            <CardBody className="py-3">
              <p className="text-xs" style={{ color: 'var(--color-slate-400)' }}>{s.label}</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: s.color }}>{s.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Triggered banner */}
      {triggered.length > 0 && (
        <div
          className="rounded-xl p-4 mb-5 border flex items-start gap-3"
          style={{
            backgroundColor: 'rgba(74,222,128,0.07)',
            borderColor: 'rgba(74,222,128,0.35)',
          }}
        >
          <CheckCircle2 size={18} style={{ color: '#4ade80' }} className="shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold" style={{ color: '#4ade80' }}>
              {triggered.length} alert{triggered.length > 1 ? 's' : ''} triggered!
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-slate-400)' }}>
              The following products are at or below your target price.
            </p>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      {alerts.length > 0 && (
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {[
            { key: 'all', label: `All (${alerts.length})` },
            { key: 'triggered', label: `Triggered (${triggered.length})` },
            { key: 'active', label: `Watching (${alerts.filter((a) => a.active && PRODUCT_CATALOG.find((p)=>p.id===a.productId)?.lowestPrice > a.targetPrice).length})` },
            { key: 'paused', label: `Paused (${alerts.filter((a) => !a.active).length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
              style={{
                backgroundColor: filter === tab.key ? 'var(--color-accent)' : 'var(--color-navy-800)',
                borderColor: filter === tab.key ? 'var(--color-accent)' : 'var(--color-slate-700)',
                color: filter === tab.key ? '#fff' : 'var(--color-slate-300)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Alert list */}
      {alerts.length === 0 ? (
        <Card>
          <CardBody>
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <Bell size={40} style={{ color: 'var(--color-slate-600)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--color-slate-300)' }}>
                No price alerts yet
              </p>
              <p className="text-xs max-w-xs" style={{ color: 'var(--color-slate-500)' }}>
                Add an alert to track when a product drops below your target price. Alerts are stored in your browser.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium mt-2 transition-colors"
                style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
              >
                <Plus size={14} /> Add your first alert
              </button>
            </div>
          </CardBody>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-sm text-center py-8" style={{ color: 'var(--color-slate-500)' }}>
              No alerts match this filter.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {/* Add alert modal */}
      {modalOpen && (
        <AddAlertModal
          onAdd={handleAdd}
          onClose={() => setModalOpen(false)}
          existingProductIds={existingProductIds}
        />
      )}
    </div>
  )
}
