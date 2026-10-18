import { Cpu, HardDrive, Layers, CircuitBoard, MemoryStick, Zap } from 'lucide-react'

/**
 * ProductPlaceholder – sleek SVG / CSS hardware placeholder
 * for components without live product photography.
 *
 * @param {object} props
 * @param {'gpu'|'cpu'|'ram'|'ssd'|'motherboard'|'other'} [props.type='gpu']
 * @param {string} [props.category]
 * @param {string} [props.className]
 * @param {string} [props.specs]
 */
export default function ProductPlaceholder({
  type = 'gpu',
  category = 'GPU',
  className = '',
  specs,
}) {
  const normalized = (type || category || 'gpu').toLowerCase()

  const getIcon = () => {
    switch (normalized) {
      case 'cpu':
        return <Cpu size={44} className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
      case 'gpu':
        return <Layers size={44} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
      case 'ram':
        return <MemoryStick size={44} className="text-purple-400 group-hover:scale-110 transition-transform duration-300" />
      case 'ssd':
        return <HardDrive size={44} className="text-pink-400 group-hover:scale-110 transition-transform duration-300" />
      case 'motherboard':
        return <CircuitBoard size={44} className="text-amber-400 group-hover:scale-110 transition-transform duration-300" />
      default:
        return <Zap size={44} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
    }
  }

  const getGradient = () => {
    switch (normalized) {
      case 'cpu':
        return 'from-emerald-950/70 via-slate-900 to-navy-900 border-emerald-500/20'
      case 'gpu':
        return 'from-blue-950/70 via-slate-900 to-navy-900 border-blue-500/20'
      case 'ram':
        return 'from-purple-950/70 via-slate-900 to-navy-900 border-purple-500/20'
      case 'ssd':
        return 'from-rose-950/70 via-slate-900 to-navy-900 border-rose-500/20'
      case 'motherboard':
        return 'from-amber-950/70 via-slate-900 to-navy-900 border-amber-500/20'
      default:
        return 'from-slate-850 via-slate-900 to-navy-900 border-slate-700/50'
    }
  }

  return (
    <div
      className={`relative group w-full h-44 rounded-lg overflow-hidden border bg-gradient-to-br ${getGradient()} flex flex-col items-center justify-center p-4 select-none ${className}`}
    >
      {/* Background decorative grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" 
      />

      {/* Decorative ambient glow */}
      <div className="absolute w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none" />

      {/* Central hardware icon */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-700/60 shadow-inner mb-2">
          {getIcon()}
        </div>
        <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
          {category} Hardware
        </span>
      </div>

      {/* Subtle specs badge at bottom */}
      {specs && (
        <div className="absolute bottom-2 left-2 right-2 z-10 text-center truncate">
          <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-300 font-mono border border-white/5 backdrop-blur-xs">
            {specs}
          </span>
        </div>
      )}
    </div>
  )
}
