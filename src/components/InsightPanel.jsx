// InsightPanel — Right Sidebar for Real-Time Live Scout Reasoning Trace (Section 5)
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, CheckCircle2, XCircle, AlertTriangle, ShoppingCart, MousePointerClick, Home, Compass } from 'lucide-react'
import { useRde } from '../context/RdeContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function InsightPanel() {
  const location = useLocation()
  const { activePersona, searchQuery, getTrace, clickedItemIds } = useRde()
  const { items, count } = useCart()

  // Get active cart categories
  const cartCategories = Object.keys(items).map(id => id)

  // Compute live trace
  const trace = getTrace(cartCategories)

  const isHomeScreen = location.pathname === '/'
  const isSearchPickScreen = location.pathname === '/search-pick'

  return (
    <div className="w-[300px] h-[720px] max-h-[calc(100vh-48px)] bg-surface rounded-[20px] p-3.5 border border-line shadow-card flex flex-col gap-2.5 flex-shrink-0 self-center overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-accent-blue-tint flex items-center justify-center text-accent-blue">
            <Brain size={16} />
          </div>
          <h2 className="text-[14px] font-bold text-ink">Live Scout Insights</h2>
        </div>
        <p className="text-[10.5px] text-ink-soft mt-0.5 leading-snug">
          Real-time decision trace explaining why suggestions appear or get filtered.
        </p>
      </div>

      {/* ── Active Persona Snapshot ── */}
      <div className="bg-surface-alt rounded-[12px] p-2.5 border border-line">
        <p className="text-[9.5px] font-bold text-ink-soft uppercase tracking-wider mb-1">Active Buyer</p>
        <div className="flex items-center gap-2">
          <span className="text-xl">{activePersona.avatar}</span>
          <div>
            <p className="text-[12.5px] font-bold text-ink">{activePersona.name}</p>
            <p className="text-[9.5px] text-ink-soft">{activePersona.subtitle}</p>
          </div>
        </div>
      </div>

      {/* ── Dynamic Real-Time Screen State Banner ── */}
      <AnimatePresence mode="wait">
        {isHomeScreen ? (
          <motion.div
            key="home-state"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="bg-surface-alt rounded-[12px] p-2.5 border border-line"
          >
            <div className="flex items-center gap-1.5 mb-1 text-ink-soft">
              <Home size={13} />
              <p className="text-[9.5px] font-bold uppercase tracking-wider">Home Screen</p>
            </div>
            <p className="text-[12px] font-bold text-ink leading-snug">Browsing Catalog</p>
            <p className="text-[10px] text-ink-soft mt-1 leading-snug">
              Tap the search bar or pick a category in the phone to test Scout occasion detection.
            </p>
          </motion.div>
        ) : isSearchPickScreen ? (
          <motion.div
            key="search-pick-state"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="bg-accent-blue-tint/50 rounded-[12px] p-2.5 border border-accent-blue/30"
          >
            <div className="flex items-center gap-1.5 mb-1 text-accent-blue">
              <Compass size={13} />
              <p className="text-[9.5px] font-bold uppercase tracking-wider">Search Surface</p>
            </div>
            <p className="text-[12px] font-bold text-ink leading-snug">Selecting Search Query</p>
          </motion.div>
        ) : (
          <motion.div
            key="active-occasion-state"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="bg-brand-green-tint/50 rounded-[12px] p-2.5 border border-brand-green/30"
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles size={13} className="text-brand-green" />
              <p className="text-[9.5px] font-bold text-brand-green uppercase tracking-wider">Detected Occasion</p>
            </div>
            <p className="text-[12.5px] font-bold text-ink">
              "{searchQuery}" → <span className="text-brand-green">{trace.occasionName}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Reasoning Trace / Candidate Pool (Active Search) ── */}
      {!isHomeScreen && !isSearchPickScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-1.5 flex-1 min-h-0"
        >
          <p className="text-[10.5px] font-bold text-ink">Occasion Pool & Filtering Trace:</p>
          <div className="flex flex-col gap-1.5 overflow-y-auto pr-1 flex-1 scrollbar-hide">
            {trace.candidates.map((c, i) => (
              <motion.div
                key={`${c.id}-${i}`}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`p-2 rounded-[8px] border text-[10.5px] flex items-start gap-2 ${
                  c.status === 'shown'
                    ? 'bg-surface border-brand-green/40 shadow-sm'
                    : 'bg-surface-alt border-line opacity-65'
                }`}
              >
                {c.status === 'shown' ? (
                  <CheckCircle2 size={14} className="text-brand-green flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={14} className="text-accent-red flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-ink truncate">{c.item}</p>
                    <span
                      className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded ${
                        c.status === 'shown'
                          ? 'bg-brand-green-tint text-brand-green'
                          : 'bg-accent-red-tint text-accent-red'
                      }`}
                    >
                      {c.status === 'shown' ? 'SHOWN' : 'FILTERED'}
                    </span>
                  </div>
                  <p className="text-[9.5px] text-ink-soft mt-0.5 leading-tight">{c.reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Fallback Notice if triggered ── */}
      <AnimatePresence>
        {!isHomeScreen && trace.fallbackFired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-accent-orange/10 border border-accent-orange/40 rounded-[10px] p-2"
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <AlertTriangle size={13} className="text-accent-orange" />
              <p className="text-[10px] font-bold text-accent-orange">Section 2a Fallback Triggered</p>
            </div>
            <p className="text-[10px] text-ink-mid leading-snug">{trace.fallbackDetails}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Live Interactivity Counters ── */}
      <div className="pt-2 border-t border-line grid grid-cols-2 gap-2 mt-auto flex-shrink-0">
        <div className="bg-surface-alt p-1.5 rounded-[8px] border border-line text-center">
          <div className="flex items-center justify-center gap-1 text-[9.5px] text-ink-soft mb-0.5">
            <MousePointerClick size={11} />
            <span>Items Clicked</span>
          </div>
          <p className="text-base font-bold text-ink">{clickedItemIds.size}</p>
        </div>
        <div className="bg-surface-alt p-1.5 rounded-[8px] border border-line text-center">
          <div className="flex items-center justify-center gap-1 text-[9.5px] text-ink-soft mb-0.5">
            <ShoppingCart size={11} />
            <span>Cart Items</span>
          </div>
          <p className="text-base font-bold text-brand-green">{count}</p>
        </div>
      </div>
    </div>
  )
}
