import { Info, Clock } from 'lucide-react'
import { DEMO_DISCLAIMER } from '../../data/dashboardData'

export default function DemoDisclaimerBanner() {
  return (
    <div className="mb-6 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-900 p-4 shadow-sm backdrop-blur-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
            <Info size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                {DEMO_DISCLAIMER.title}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Sample BDT Pricing
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {DEMO_DISCLAIMER.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-center shrink-0 border-t md:border-t-0 md:border-l border-slate-700/60 pt-2 md:pt-0 md:pl-4 text-xs text-slate-400">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono text-slate-400">Sample Sync</span>
            <span className="font-mono text-slate-200 text-xs font-medium flex items-center gap-1">
              <Clock size={11} className="text-blue-400" />
              {DEMO_DISCLAIMER.lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
