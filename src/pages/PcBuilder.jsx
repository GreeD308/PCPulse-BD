/**
 * PC Builder – interactive part picker for assembling a custom PC.
 *
 * NOTICE: All prices and stock information are simulated demonstration
 * data in Bangladeshi Taka (BDT). Not actual retailer quotes.
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  Zap,
  Box,
  Server,
  Layers,
  CircuitBoard,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card, { CardHeader, CardBody } from '../components/ui/Card'
import { PRODUCT_CATALOG } from '../data/productCatalog'

// ─── Category meta ──────────────────────────────────────────────────────────
const PART_SLOTS = [
  { key: 'CPU',         label: 'CPU',         icon: Cpu,          required: true },
  { key: 'GPU',         label: 'GPU',         icon: Layers,       required: false },
  { key: 'Motherboard', label: 'Motherboard', icon: CircuitBoard, required: true },
  { key: 'RAM',         label: 'RAM',         icon: MemoryStick,  required: true },
  { key: 'SSD',         label: 'SSD',         icon: Zap,          required: false },
  { key: 'HDD',         label: 'HDD',         icon: HardDrive,    required: false },
  { key: 'PSU',         label: 'PSU',         icon: Server,       required: true },
  { key: 'Monitor',     label: 'Monitor',     icon: Monitor,      required: false },
  { key: 'Case',        label: 'Case',        icon: Box,          required: false },
]

// Simple compatibility rules (illustrative / demo only)
function getCompatibilityWarnings(selected) {
  const warnings = []
  const cpu  = selected['CPU']
  const mb   = selected['Motherboard']
  const ram  = selected['RAM']

  if (cpu && mb) {
    const cpuAmd = cpu.name.toLowerCase().includes('ryzen')
    const mbAmd  = mb.name.toLowerCase().includes('b650') || mb.name.toLowerCase().includes('x570') || mb.name.toLowerCase().includes('am5')
    const cpuIntel = cpu.name.toLowerCase().includes('core i')
    const mbIntel  = mb.name.toLowerCase().includes('z790') || mb.name.toLowerCase().includes('b760') || mb.name.toLowerCase().includes('lga1700')

    if (cpuAmd && mbIntel) warnings.push('AMD CPU may not be compatible with Intel chipset motherboard.')
    if (cpuIntel && mbAmd) warnings.push('Intel CPU may not be compatible with AMD chipset motherboard.')
  }

  if (ram) {
    const isDdr5 = ram.name.toLowerCase().includes('ddr5')
    const isDdr4 = ram.name.toLowerCase().includes('ddr4')
    if (mb) {
      const mbDdr5 = mb.specs?.toLowerCase().includes('ddr5')
      const mbDdr4 = mb.specs?.toLowerCase().includes('ddr4')
      if (isDdr5 && mbDdr4) warnings.push('DDR5 RAM may not fit this motherboard (DDR4 only).')
      if (isDdr4 && mbDdr5) warnings.push('DDR4 RAM may not fit this motherboard (DDR5 only).')
    }
  }

  return warnings
}

const fmt = (n) => `৳${n.toLocaleString('en-BD')}`

// ─── Slot row component ───────────────────────────────────────────────────
function SlotRow({ slot, selected, onOpen, onRemove }) {
  const product = selected[slot.key]
  const IconComp = slot.icon

  return (
    <div
      className="flex items-center gap-4 py-3 px-4 rounded-lg border transition-all duration-150"
      style={{
        backgroundColor: product ? 'var(--color-navy-700)' : 'var(--color-navy-800)',
        borderColor: product ? 'var(--color-accent)' : 'var(--color-slate-700)',
      }}
    >
      {/* Category icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: 'var(--color-navy-900)' }}
      >
        <IconComp size={18} style={{ color: 'var(--color-accent)' }} />
      </div>

      {/* Label / product info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-slate-400)' }}>
          {slot.label}{slot.required && <span className="ml-1" style={{ color: 'var(--color-accent)' }}>*</span>}
        </p>
        {product ? (
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-slate-100)' }}>
              {product.name}
            </p>
            <Link
              to={`/products/${product.id}`}
              className="text-xs underline shrink-0"
              style={{ color: 'var(--color-accent)' }}
            >
              Details
            </Link>
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--color-slate-500)' }}>
            No {slot.label} selected
          </p>
        )}
      </div>

      {/* Price */}
      <div className="text-right shrink-0 w-28">
        {product ? (
          <p className="text-sm font-semibold" style={{ color: 'var(--color-slate-100)' }}>
            {fmt(product.lowestPrice)}
          </p>
        ) : (
          <p className="text-xs" style={{ color: 'var(--color-slate-600)' }}>—</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {product ? (
          <button
            onClick={() => onRemove(slot.key)}
            className="p-1.5 rounded hover:bg-red-900/40 transition-colors"
            title="Remove"
          >
            <Trash2 size={15} style={{ color: '#f87171' }} />
          </button>
        ) : (
          <button
            onClick={() => onOpen(slot.key)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
          >
            <Plus size={13} /> Choose
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Part picker modal ────────────────────────────────────────────────────
function PartPicker({ category, selected, onSelect, onClose }) {
  const [search, setSearch] = useState('')
  const products = useMemo(
    () =>
      PRODUCT_CATALOG.filter(
        (p) =>
          p.category === category &&
          (search === '' ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.model.toLowerCase().includes(search.toLowerCase())),
      ),
    [category, search],
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div
        className="w-full max-w-xl rounded-2xl border shadow-2xl flex flex-col max-h-[80vh]"
        style={{ backgroundColor: 'var(--color-navy-800)', borderColor: 'var(--color-slate-700)' }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--color-slate-700)' }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-slate-100)' }}>
            Choose {category}
          </h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10 transition-colors">
            <X size={16} style={{ color: 'var(--color-slate-400)' }} />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pt-4 pb-3">
          <input
            type="text"
            placeholder={`Search ${category}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
            style={{
              backgroundColor: 'var(--color-navy-900)',
              borderColor: 'var(--color-slate-700)',
              color: 'var(--color-slate-100)',
            }}
            autoFocus
          />
        </div>

        {/* Product list */}
        <div className="overflow-y-auto flex-1 px-5 pb-4 space-y-2">
          {products.length === 0 ? (
            <p className="text-sm text-center py-6" style={{ color: 'var(--color-slate-500)' }}>
              No {category} products found
            </p>
          ) : (
            products.map((p) => {
              const isSelected = selected[category]?.id === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => { onSelect(category, p); onClose() }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-150"
                  style={{
                    backgroundColor: isSelected ? 'var(--color-navy-700)' : 'var(--color-navy-900)',
                    borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-slate-700)',
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--color-slate-100)' }}>{p.name}</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-slate-400)' }}>{p.specs}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>{fmt(p.lowestPrice)}</p>
                    <p className="text-xs" style={{ color: 'var(--color-slate-500)' }}>lowest</p>
                  </div>
                  {isSelected && <CheckCircle2 size={16} style={{ color: 'var(--color-accent)' }} className="shrink-0" />}
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────
export default function PcBuilder() {
  const [selected, setSelected]       = useState({})
  const [pickerOpen, setPickerOpen]   = useState(null)   // category key or null
  const [showSummary, setShowSummary] = useState(false)

  const warnings = useMemo(() => getCompatibilityWarnings(selected), [selected])

  const totalLowest = useMemo(
    () => Object.values(selected).reduce((sum, p) => sum + (p?.lowestPrice ?? 0), 0),
    [selected],
  )
  const totalAvg = useMemo(
    () => Object.values(selected).reduce((sum, p) => sum + (p?.avgPrice ?? 0), 0),
    [selected],
  )

  const partCount  = Object.keys(selected).length
  const missingRequired = PART_SLOTS.filter((s) => s.required && !selected[s.key])

  const handleSelect = (cat, product) => {
    setSelected((prev) => ({ ...prev, [cat]: product }))
  }
  const handleRemove = (cat) => {
    setSelected((prev) => {
      const next = { ...prev }
      delete next[cat]
      return next
    })
  }
  const handleClearAll = () => setSelected({})

  return (
    <div>
      <PageHeader
        title="PC Builder"
        subtitle="Pick parts by category — estimated total price updates in BDT as you select. Demo data only."
        actions={
          partCount > 0 ? (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors hover:bg-red-900/30"
              style={{ borderColor: '#f87171', color: '#f87171' }}
            >
              <Trash2 size={13} /> Clear All
            </button>
          ) : null
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* ── Left: slot list ── */}
        <div className="xl:col-span-2 space-y-3">
          <Card>
            <CardHeader
              title="Part Selection"
              subtitle={`${partCount} of ${PART_SLOTS.length} slots filled · * = required`}
            />
            <CardBody className="space-y-2">
              {PART_SLOTS.map((slot) => (
                <SlotRow
                  key={slot.key}
                  slot={slot}
                  selected={selected}
                  onOpen={(cat) => setPickerOpen(cat)}
                  onRemove={handleRemove}
                />
              ))}
            </CardBody>
          </Card>

          {/* Compatibility warnings */}
          {warnings.length > 0 && (
            <Card style={{ borderColor: '#f59e0b' }}>
              <CardBody>
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} style={{ color: '#f59e0b' }} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: '#f59e0b' }}>
                      Compatibility Notices
                    </p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {warnings.map((w, i) => (
                        <li key={i} className="text-xs" style={{ color: 'var(--color-slate-300)' }}>{w}</li>
                      ))}
                    </ul>
                    <p className="text-xs mt-2" style={{ color: 'var(--color-slate-500)' }}>
                      Compatibility checks are illustrative demo logic. Always verify before purchasing.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* ── Right: summary panel ── */}
        <div className="space-y-4">
          {/* Price summary */}
          <Card>
            <CardHeader title="Build Summary" subtitle="Estimated prices (demo data)" />
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--color-slate-700)' }}>
                <span className="text-sm" style={{ color: 'var(--color-slate-400)' }}>Parts selected</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-slate-100)' }}>{partCount} / {PART_SLOTS.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-slate-400)' }}>Lowest total</span>
                <span className="text-base font-bold" style={{ color: '#4ade80' }}>
                  {totalLowest > 0 ? fmt(totalLowest) : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--color-slate-400)' }}>Average total</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-slate-200)' }}>
                  {totalAvg > 0 ? fmt(totalAvg) : '—'}
                </span>
              </div>

              {totalLowest > 0 && totalAvg > totalLowest && (
                <div
                  className="rounded-lg px-3 py-2 text-xs"
                  style={{ backgroundColor: 'rgba(74,222,128,0.08)', color: '#4ade80' }}
                >
                  Potential savings: {fmt(totalAvg - totalLowest)} by buying at lowest prices
                </div>
              )}

              {/* Required missing alert */}
              {missingRequired.length > 0 && (
                <div
                  className="rounded-lg px-3 py-2 text-xs space-y-0.5"
                  style={{ backgroundColor: 'rgba(251,146,60,0.1)', color: '#fb923c' }}
                >
                  <p className="font-semibold">Missing required parts:</p>
                  {missingRequired.map((s) => (
                    <p key={s.key}>• {s.label}</p>
                  ))}
                </div>
              )}

              <button
                onClick={() => setShowSummary(!showSummary)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-colors hover:bg-white/5"
                style={{ borderColor: 'var(--color-slate-700)', color: 'var(--color-slate-300)' }}
              >
                {showSummary ? 'Hide' : 'Show'} itemised list
                {showSummary ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>

              {showSummary && (
                <div className="space-y-1.5">
                  {PART_SLOTS.map((slot) => {
                    const p = selected[slot.key]
                    if (!p) return null
                    return (
                      <div key={slot.key} className="flex items-center justify-between gap-2">
                        <span className="text-xs truncate" style={{ color: 'var(--color-slate-400)' }}>
                          {slot.label}
                        </span>
                        <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--color-slate-200)' }}>
                          {fmt(p.lowestPrice)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              <button
                disabled={missingRequired.length > 0 || partCount === 0}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-opacity"
                style={{
                  backgroundColor: missingRequired.length > 0 || partCount === 0 ? 'var(--color-slate-700)' : 'var(--color-accent)',
                  color: missingRequired.length > 0 || partCount === 0 ? 'var(--color-slate-400)' : '#fff',
                  cursor: missingRequired.length > 0 || partCount === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                <ShoppingCart size={15} />
                Save Build
              </button>
              <p className="text-xs text-center" style={{ color: 'var(--color-slate-500)' }}>
                Save is a demo placeholder — no data stored.
              </p>
            </CardBody>
          </Card>

          {/* Quick tips */}
          <Card>
            <CardHeader title="Builder Tips" />
            <CardBody>
              <ul className="space-y-2">
                {[
                  'CPU and motherboard socket must match.',
                  'RAM generation (DDR4/DDR5) must match your motherboard.',
                  'PSU wattage should exceed GPU + CPU TDP by ≥20%.',
                  'Check case clearance for GPU length and CPU cooler height.',
                  'All prices shown are lowest reported — verify before buying.',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-slate-400)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>•</span> {tip}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Part picker modal */}
      {pickerOpen && (
        <PartPicker
          category={pickerOpen}
          selected={selected}
          onSelect={handleSelect}
          onClose={() => setPickerOpen(null)}
        />
      )}
    </div>
  )
}
