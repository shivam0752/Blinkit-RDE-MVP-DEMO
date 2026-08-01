// Demo Metrics Panel — Section 5 of Scout Specification
// Floating togglable panel showing live EXPOSURE/ENGAGEMENT/CONVERSION/NSM_HIT counts
// This makes the funnel from Slide 7 visibly provable inside the MVP itself.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, X, RotateCcw } from 'lucide-react'
import { useMetrics } from '../context/MetricsContext.jsx'

const EVENT_CONFIG = [
  { key: 'EXPOSURE',   label: 'Exposure',   color: '#256fef', bg: '#e8effc', desc: 'Item rendered in results' },
  { key: 'ENGAGEMENT', label: 'Engagement', color: '#f8841a', bg: '#fff3e8', desc: 'User tapped suggested item' },
  { key: 'CONVERSION', label: 'Conversion', color: '#0c831f', bg: '#e8f5e9', desc: 'Added to cart' },
  { key: 'NSM_HIT',   label: 'NSM Hit',    color: '#e23744', bg: '#fef0f1', desc: 'Zero-history category won' },
]

export default function MetricsPanel() {
  const [open, setOpen] = useState(false)
  const { metrics, reset } = useMetrics()

  const total = Object.values(metrics).reduce((a, b) => a + b, 0)
  const convRate = metrics.EXPOSURE > 0
    ? Math.round((metrics.CONVERSION / metrics.EXPOSURE) * 100)
    : 0

  return (
    <>
      {/* Toggle button — fixed to bottom-right of phone frame */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(v => !v)}
        className="absolute bottom-20 right-3 z-50 w-11 h-11 rounded-full bg-ink text-white flex items-center justify-center shadow-lg"
        style={{ boxShadow: '0 4px 16px rgb(0 0 0 / 0.3)' }}
      >
        {open
          ? <X size={16} />
          : (
            <div className="relative">
              <BarChart3 size={16} />
              {total > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent-red text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {total > 9 ? '9+' : total}
                </span>
              )}
            </div>
          )
        }
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute bottom-[84px] right-3 left-3 z-50 bg-ink rounded-[14px] p-4 overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgb(0 0 0 / 0.4)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white text-[13px] font-bold">🔬 Demo Metrics</p>
                <p className="text-white/50 text-[10px]">Scout Funnel — Live Counters</p>
              </div>
              <button onClick={reset} className="flex items-center gap-1 text-white/40 text-[10px]">
                <RotateCcw size={10} />
                Reset
              </button>
            </div>

            {/* Event counters */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {EVENT_CONFIG.map(({ key, label, color, bg, desc }) => (
                <div key={key} className="rounded-[8px] p-2.5" style={{ background: `${color}20` }}>
                  <p className="text-[10px] font-bold mb-0.5" style={{ color }}>{label}</p>
                  <p className="text-2xl font-black text-white leading-none">{metrics[key]}</p>
                  <p className="text-[9px] text-white/40 mt-0.5 leading-tight">{desc}</p>
                </div>
              ))}
            </div>

            {/* Funnel arrow */}
            <div className="bg-white/5 rounded-[8px] p-2.5">
              <div className="flex items-center gap-1 text-[10px] text-white/60 mb-1.5">
                <span className="font-semibold text-white/80">Conversion rate</span>
                <span className="ml-auto font-bold text-brand-green text-[13px]">{convRate}%</span>
              </div>
              {/* Mini funnel visualization */}
              <div className="flex items-end gap-1 h-8">
                {EVENT_CONFIG.map(({ key, color }) => {
                  const maxVal = Math.max(...Object.values(metrics), 1)
                  const h = metrics[key] > 0 ? Math.max((metrics[key] / maxVal) * 32, 4) : 2
                  return (
                    <div key={key} className="flex-1 rounded-t-sm transition-all duration-500" style={{ height: h, background: color }} />
                  )
                })}
              </div>
              <div className="flex gap-1 mt-1">
                {EVENT_CONFIG.map(({ key, label, color }) => (
                  <p key={key} className="flex-1 text-[8px] text-center leading-tight" style={{ color }}>
                    {label.split(' ')[0]}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
