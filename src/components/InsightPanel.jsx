// InsightPanel — Right Sidebar for Real-Time Live Scout Reasoning Trace (Section 5)
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShoppingCart,
  MousePointerClick,
  Home,
  Compass,
  ChevronDown,
  Minimize2,
} from 'lucide-react'
import { useRde } from '../context/RdeContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function InsightPanel() {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()
  const { activePersona, searchQuery, getTrace, clickedItemIds } = useRde()
  const { items, count } = useCart()

  // Get active cart categories
  const cartCategories = Object.keys(items).map((id) => id)

  // Compute live trace
  const trace = getTrace(cartCategories)

  const isHomeScreen = location.pathname === '/'
  const isSearchPickScreen = location.pathname === '/search-pick'

  return (
    <div className="self-start flex flex-col flex-shrink-0 z-30">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* ── Top-Right Compact Trigger Button (Collapsed State) ── */
          <motion.div
            key="collapsed-button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-[18px] bg-surface border-2 border-accent-blue/40 text-ink shadow-card hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-accent-blue-tint border border-accent-blue/30 flex items-center justify-center text-accent-blue flex-shrink-0 shadow-xs">
                <Brain size={17} strokeWidth={2.2} />
              </div>
              <div className="text-left flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-extrabold text-ink leading-tight">Live Scout Insights</span>
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                </div>
                <span className="text-[10.5px] font-bold text-accent-blue mt-0.5">
                  Click to view backend logic & trace ↓
                </span>
              </div>
              <ChevronDown size={16} className="text-accent-blue ml-1" />
            </motion.button>
          </motion.div>
        ) : (
          /* ── Full Expanded Panel Card (No Backdrop — Allows Simultaneous Phone Interaction) ── */
          <motion.div
            key="expanded-panel"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="w-[310px] h-[720px] max-h-[calc(100vh-48px)] bg-surface rounded-[22px] p-4.5 border border-line shadow-card flex flex-col gap-3.5 overflow-y-auto scrollbar-hide"
          >
            {/* Header with Collapse Button */}
            <div className="pb-1 border-b border-line/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-accent-blue-tint border border-accent-blue/30 flex items-center justify-center text-accent-blue flex-shrink-0 shadow-xs">
                  <Brain size={16} strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="text-[15px] font-extrabold text-ink leading-tight">Live Scout Insights</h2>
                  <p className="text-[10.5px] font-medium text-ink-soft mt-0.5 leading-snug">
                    Real-time decision trace for current query.
                  </p>
                </div>
              </div>

              {/* Collapse Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-surface-alt hover:bg-surface border border-line text-[10px] font-bold text-ink-mid hover:text-ink transition-all cursor-pointer flex-shrink-0"
              >
                <Minimize2 size={11} />
                <span>Collapse</span>
              </motion.button>
            </div>

            {/* ── Active Persona Snapshot ── */}
            <div className="bg-surface-alt rounded-[14px] p-3 border border-line shadow-xs">
              <p className="text-[9.5px] font-bold text-ink-soft uppercase tracking-wider mb-1">Active Buyer</p>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl select-none">{activePersona.avatar}</span>
                <div>
                  <p className="text-[13px] font-bold text-ink leading-tight">{activePersona.name}</p>
                  <p className="text-[10px] text-ink-soft font-semibold">{activePersona.subtitle}</p>
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
                  className="bg-surface-alt rounded-[14px] p-3 border border-line"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-ink-soft">
                    <Home size={13} />
                    <p className="text-[9.5px] font-bold uppercase tracking-wider">Home Screen</p>
                  </div>
                  <p className="text-[12.5px] font-bold text-ink leading-snug">Browsing Catalog</p>
                  <p className="text-[10.5px] text-ink-soft mt-1 leading-relaxed">
                    Tap the search bar or pick a category in the phone to test Scout occasion detection.
                  </p>
                </motion.div>
              ) : isSearchPickScreen ? (
                <motion.div
                  key="search-pick-state"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="bg-accent-blue-tint/50 rounded-[14px] p-3 border border-accent-blue/30"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-accent-blue">
                    <Compass size={13} />
                    <p className="text-[9.5px] font-bold uppercase tracking-wider">Search Surface</p>
                  </div>
                  <p className="text-[12.5px] font-bold text-ink leading-snug">Selecting Search Query</p>
                </motion.div>
              ) : (
                <motion.div
                  key="active-occasion-state"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="bg-brand-green-tint/50 rounded-[14px] p-3 border border-brand-green/30 shadow-xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles size={13} className="text-brand-green" />
                    <p className="text-[9.5px] font-bold text-brand-green uppercase tracking-wider">
                      Detected Occasion
                    </p>
                  </div>
                  <p className="text-[13px] font-extrabold text-ink">
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
                className="flex flex-col gap-2 flex-1 min-h-0"
              >
                <p className="text-[11px] font-bold text-ink">Occasion Pool & Filtering Trace:</p>
                <div className="flex flex-col gap-2 overflow-y-auto pr-1 flex-1 scrollbar-hide">
                  {trace.candidates.map((c, i) => (
                    <motion.div
                      key={`${c.id}-${i}`}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`p-2.5 rounded-[10px] border text-[11px] flex items-start gap-2.5 transition-all ${
                        c.isRestock
                          ? 'bg-amber-500/10 border-amber-500/40 shadow-xs'
                          : c.status === 'shown'
                          ? 'bg-surface border-brand-green/40 shadow-xs'
                          : 'bg-surface-alt border-line/80 opacity-70'
                      }`}
                    >
                      {c.isRestock ? (
                        <span className="text-sm flex-shrink-0 mt-0.5 select-none">🔄</span>
                      ) : c.status === 'shown' ? (
                        <CheckCircle2 size={15} className="text-brand-green flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={15} className="text-accent-red flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-bold text-ink truncate">{c.item}</p>
                          <span
                            className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 uppercase ${
                              c.isRestock
                                ? 'bg-amber-500/20 text-amber-800 border border-amber-500/30'
                                : c.status === 'shown'
                                ? 'bg-brand-green-tint text-brand-green border border-brand-green/30'
                                : 'bg-accent-red-tint text-accent-red border border-accent-red/20'
                            }`}
                          >
                            {c.isRestock ? 'RESTOCK' : c.status === 'shown' ? 'SHOWN' : 'FILTERED'}
                          </span>
                        </div>
                        <p className="text-[10px] text-ink-soft mt-0.5 leading-snug">{c.reason}</p>
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
                  className="bg-amber-500/10 border border-amber-500/40 rounded-[12px] p-2.5 shadow-xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle size={13} className="text-amber-700" />
                    <p className="text-[10px] font-bold text-amber-800">Fallback Logic Triggered</p>
                  </div>
                  <p className="text-[10px] text-ink-mid leading-relaxed">{trace.fallbackDetails}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Live Interactivity Counters ── */}
            <div className="pt-2 border-t border-line grid grid-cols-2 gap-2 mt-auto flex-shrink-0">
              <div className="bg-surface-alt p-2 rounded-[10px] border border-line text-center shadow-xs">
                <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-ink-soft mb-0.5">
                  <MousePointerClick size={11} />
                  <span>Items Clicked</span>
                </div>
                <p className="text-lg font-extrabold text-ink">{clickedItemIds.size}</p>
              </div>
              <div className="bg-surface-alt p-2 rounded-[10px] border border-line text-center shadow-xs">
                <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-ink-soft mb-0.5">
                  <ShoppingCart size={11} />
                  <span>Cart Items</span>
                </div>
                <p className="text-lg font-extrabold text-brand-green">{count}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
