// Screen 1 — Search results with Scout suggestions inserted in the immediate row below the added item.
import { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Mic, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { SEARCH_PRODUCTS, getProduct } from '../data/products.js'
import { SEARCH_CATEGORY_MAP } from '../rde/rde.js'
import { useRde } from '../context/RdeContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import AddButton from '../components/AddButton.jsx'

const SUB_CATS = {
  bread: [
    { id: 'all', label: 'All', emoji: '🍞' },
    { id: 'brown', label: 'Brown', emoji: '🥖' },
    { id: 'white', label: 'White', emoji: '🍔' },
    { id: 'multigrain', label: 'Multigrain', emoji: '🥪' },
    { id: 'highpro', label: 'High protein', emoji: '💪' },
    { id: 'sourdough', label: 'Sourdough', emoji: '🫓' },
  ],
  'dog food': [
    { id: 'all', label: 'All', emoji: '🐾' },
    { id: 'dry', label: 'Dry food', emoji: '🦴' },
    { id: 'wet', label: 'Wet food', emoji: '🥩' },
    { id: 'puppy', label: 'Puppy', emoji: '🐶' },
  ],
  diapers: [
    { id: 'all', label: 'All', emoji: '👶' },
    { id: 'nb', label: 'Newborn', emoji: '🍼' },
    { id: 'pants', label: 'Pants', emoji: '👖' },
  ],
  'swiss knife': [
    { id: 'all', label: 'All', emoji: '🔪' },
    { id: 'multi', label: 'Multi-tools', emoji: '🛠️' },
    { id: 'pocket', label: 'Pocket knives', emoji: '✂️' },
  ],
  chips: [
    { id: 'all', label: 'All', emoji: '🍿' },
    { id: 'potato', label: 'Potato', emoji: '🥔' },
    { id: 'nachos', label: 'Nachos', emoji: '📐' },
  ],
  shampoo: [
    { id: 'all', label: 'All', emoji: '🧴' },
    { id: 'moisture', label: 'Moisture', emoji: '💧' },
    { id: 'keratin', label: 'Keratin', emoji: '✨' },
  ],
  'phone charger': [
    { id: 'all', label: 'All', emoji: '🔌' },
    { id: 'fast', label: 'Fast Charge', emoji: '⚡' },
  ],
}

const FILTER_LABELS = ['Filters', 'Sort', 'Diet Pref', 'Brand']

export default function SearchResults() {
  const navigate = useNavigate()
  const { searchQuery, getZeroHistoryOccasionPool, lineFor, getTrace, recordItemClick } = useRde()
  const { items } = useCart()
  const [activeCat, setActiveCat] = useState('all')
  const [activeFilter, setActiveFilter] = useState(null)

  const normQuery = searchQuery.toLowerCase().trim()

  const cartCategories = Object.keys(items)
    .map((id) => getProduct(id)?.category)
    .filter(Boolean)

  const trace = getTrace(cartCategories)
  const searchSuggestions = getZeroHistoryOccasionPool(cartCategories)

  // Base products for current query ONLY (Scout suggestions do NOT appear on initial render)
  const baseProducts = SEARCH_PRODUCTS[normQuery] ?? SEARCH_PRODUCTS.bread

  // Find index of the last added item in baseProducts
  const addedIndices = baseProducts
    .map((p, i) => ((items[p.id] ?? 0) > 0 ? i : -1))
    .filter((i) => i !== -1)

  const hasAddedSearchItems = addedIndices.length > 0
  const hasAnyCartItems = Object.keys(items).some((id) => (items[id] ?? 0) > 0)
  const showPostAddSuggestions = hasAnyCartItems && searchSuggestions.length > 0

  // Target row index for inserting the recommendation card in the immediate row below
  const lastAddedIdx = hasAddedSearchItems ? addedIndices[addedIndices.length - 1] : 0
  const targetRowIdx = Math.floor(lastAddedIdx / 2)

  const subCats = SUB_CATS[normQuery] ?? SUB_CATS.bread

  return (
    <div className="flex flex-col min-h-full bg-surface-alt pb-28">
      {/* ── Compact Sticky Search Header ── */}
      <div className="sticky top-0 bg-surface z-30 border-b border-line shadow-sm">
        {/* Search input row */}
        <div className="flex items-center gap-2 px-3 pt-2.5 pb-2">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => navigate('/search-pick')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-alt"
          >
            <ArrowLeft size={18} strokeWidth={2.2} className="text-ink" />
          </motion.button>

          <div className="flex-1 flex items-center gap-2 h-9 px-3 rounded-[10px] bg-[#f6f3f2] border-[1.5px] border-brand-yellow">
            <span className="text-ink-soft text-sm">🔍</span>
            <span className="text-ink text-[13px] font-bold flex-1 truncate">{searchQuery}</span>
            <button
              onClick={() => navigate('/search-pick')}
              className="text-ink-soft text-xs px-1 py-0.5 bg-line-strong rounded font-bold"
            >
              ✕
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.88 }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-alt border border-line"
          >
            <Mic size={15} className="text-ink-soft" />
          </motion.button>
        </div>

        {/* Subcategory Pills Strip */}
        <div className="flex gap-1.5 px-3 pb-2 overflow-x-auto scrollbar-hide">
          {subCats.map((cat) => {
            const isSelected = activeCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all border ${isSelected
                    ? 'bg-brand-green-tint text-brand-green border-brand-green'
                    : 'bg-surface-alt text-ink-mid border-line'
                  }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Filter Badges Bar */}
        <div className="flex gap-1.5 px-3 pb-2 overflow-x-auto scrollbar-hide border-t border-line/50 pt-1.5">
          {FILTER_LABELS.map((f, i) => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveFilter(activeFilter === f ? null : f)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold flex-shrink-0 transition-colors ${activeFilter === f
                  ? 'border-brand-green bg-brand-green-tint text-brand-green'
                  : 'border-line bg-surface text-ink-mid'
                }`}
            >
              {i === 0 && <SlidersHorizontal size={10} />}
              {i === 1 && <ArrowUpDown size={10} />}
              {f}
              <span className="text-[9px]">▾</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Product Grid: Scout recommendation inserted in the immediate row below added item ── */}
      <div className="grid grid-cols-2 gap-2.5 p-3 pt-3">
        {baseProducts.map((product, idx) => {
          const isRowEnd = idx % 2 === 1 || idx === baseProducts.length - 1
          const rowIdx = Math.floor(idx / 2)
          const isTargetRow = rowIdx === targetRowIdx

          return (
            <Fragment key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.2 }}
              >
                <ProductCard product={product} inserted={false} />
              </motion.div>

              {/* ── Scout Recommendation Card: Inserted directly in the immediate row below! ── */}
              {isRowEnd && isTargetRow && (
                <AnimatePresence>
                  {showPostAddSuggestions && (
                    <motion.div
                      key="scout-inline-row-card"
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                      className={`col-span-2 my-1 bg-surface border-2 rounded-[16px] p-3.5 shadow-lg flex flex-col gap-3 z-20 overflow-hidden ${trace.isRestockFallback
                          ? 'border-amber-500/60 bg-amber-500/5'
                          : 'border-brand-green'
                        }`}
                    >
                      {/* Header / Badge */}
                      <div className="flex items-center justify-between pb-2 border-b border-line">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-full text-white flex items-center justify-center text-[13px] font-bold shadow-xs ${trace.isRestockFallback ? 'bg-amber-600' : 'bg-brand-green'
                              }`}
                          >
                            {trace.isRestockFallback ? '🔄' : '⚡'}
                          </div>
                          <div>
                            <p className="text-[13px] font-extrabold text-ink leading-none">
                              {trace.isRestockFallback
                                ? 'Running low on this?'
                                : 'Item Added! Scout Recommendations'}
                            </p>
                            <p
                              className={`text-[10px] font-extrabold mt-0.5 ${trace.isRestockFallback ? 'text-amber-700' : 'text-brand-green'
                                }`}
                            >
                              {trace.isRestockFallback
                                ? 'Habitual Category Restock'
                                : `Occasion: ${trace.occasionName}`}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-[9.5px] font-bold border px-2.5 py-0.5 rounded-full uppercase tracking-wider ${trace.isRestockFallback
                              ? 'bg-amber-500/10 text-amber-700 border-amber-500/30'
                              : 'bg-brand-green-tint text-brand-green border-brand-green/30'
                            }`}
                        >
                          {trace.isRestockFallback ? 'Restock State' : 'Immediate Row Suggestion'}
                        </span>
                      </div>

                      <p className="text-[11.5px] text-ink-mid font-medium leading-snug">
                        {trace.isRestockFallback
                          ? 'Re-order from your habitual purchases (excluded from discovery metrics):'
                          : 'Complete your basket with zero-history picks from relevant unexplored categories:'}
                      </p>

                      {/* Horizontal suggestion strip */}
                      <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-hide">
                        {searchSuggestions.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              if (recordItemClick) recordItemClick(p.id)
                              navigate(`/product/${p.id}`)
                            }}
                            className={`w-[155px] flex-shrink-0 bg-surface-alt rounded-[12px] p-2.5 border flex flex-col justify-between shadow-xs cursor-pointer hover:shadow-md transition-shadow ${p.isRestock ? 'border-amber-500/30' : 'border-brand-green/30'
                              }`}
                          >
                            <div>
                              <div
                                className="h-16 rounded-[8px] flex items-center justify-center text-3xl mb-1.5"
                                style={{ background: p.tint }}
                              >
                                {p.emoji}
                              </div>
                              <span
                                className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${p.isRestock
                                    ? 'bg-amber-500/15 text-amber-800'
                                    : 'bg-brand-green-tint text-brand-green'
                                  }`}
                              >
                                {p.badgeLabel ?? (p.isRestock ? 'Running low on this?' : 'Zero-History')}
                              </span>
                              <p className="text-[11.5px] font-bold text-ink leading-tight line-clamp-2 mt-1">
                                {p.name}
                              </p>
                              <p className="text-[10px] text-ink-soft mt-0.5">{p.qty}</p>

                              {/* No trust line for restock items */}
                              {!p.noTrustLine && lineFor(p.category, p) && (
                                <p className="text-[9px] text-brand-green font-semibold leading-tight mt-1.5 bg-brand-green-tint p-1 rounded-[6px] border border-brand-green/20">
                                  🛡️ {lineFor(p.category, p)}
                                </p>
                              )}
                            </div>

                            <div className="mt-2.5 flex items-center justify-between pt-1.5 border-t border-line/60">
                              <span className="text-[12px] font-bold text-ink">₹{p.price}</span>
                              <AddButton productId={p.id} className="h-7 px-2 text-[10px]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
