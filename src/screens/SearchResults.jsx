// Screen 1 — Search results with RDE suggestions inserted directly into the product grid.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Mic, SlidersHorizontal, ArrowUpDown, ShieldCheck } from 'lucide-react'
import { SEARCH_PRODUCTS, getProduct } from '../data/products.js'
import { SEARCH_CATEGORY_MAP } from '../rde/rde.js'
import { useRde } from '../context/RdeContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

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
  const { searchQuery, getZeroHistoryOccasionPool, lineFor, isNewCategory } = useRde()
  const { items } = useCart()
  const [activeCat, setActiveCat] = useState('all')
  const [activeFilter, setActiveFilter] = useState(null)

  const normQuery = searchQuery.toLowerCase().trim()
  const searchCategory = SEARCH_CATEGORY_MAP[normQuery] ?? 'Groceries'
  const isZeroHistCategory = isNewCategory(searchCategory)

  const cartCategories = Object.keys(items)
    .map((id) => getProduct(id)?.category)
    .filter(Boolean)

  // Section 2c: Get ALL zero-history occasion suggestions for this query (no truncation)
  const zeroHistoryPool = getZeroHistoryOccasionPool(cartCategories)
  const searchSuggestions = zeroHistoryPool

  // Base products for current query
  const baseProducts = SEARCH_PRODUCTS[normQuery] ?? SEARCH_PRODUCTS.bread

  // Interleave ALL suggested products directly into the 2-col product grid
  const gridItems = []
  let baseIdx = 0
  let sugIdx = 0

  while (baseIdx < baseProducts.length || sugIdx < searchSuggestions.length) {
    if (baseIdx < baseProducts.length) {
      gridItems.push({ type: 'base', product: baseProducts[baseIdx++] })
    }
    if (sugIdx < searchSuggestions.length) {
      gridItems.push({ type: 'suggested', product: searchSuggestions[sugIdx++] })
    }
  }

  const subCats = SUB_CATS[normQuery] ?? SUB_CATS.bread

  return (
    <div className="flex flex-col min-h-full bg-surface-alt pb-24">
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
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all border ${
                  isSelected
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
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold flex-shrink-0 transition-colors ${
                activeFilter === f
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

      {/* ── Category-level reassurance banner if zero-history ── */}
      {isZeroHistCategory && lineFor(searchCategory) && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-3 mt-3 bg-brand-green-tint border border-brand-green/30 rounded-[12px] p-2.5 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-brand-green flex-shrink-0" />
            <div>
              <p className="text-[11.5px] font-extrabold text-brand-green">
                First time in {searchCategory}?
              </p>
              <p className="text-[11px] text-ink-mid leading-snug mt-0.5 font-medium">
                {lineFor(searchCategory)}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Product Grid with ALL zero-history suggestions interleaved ── */}
      <div className="grid grid-cols-2 gap-2.5 p-3 pt-3">
        {gridItems.map(({ type, product }, idx) => (
          <motion.div
            key={`${product.id}-${idx}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03, duration: 0.2 }}
          >
            <ProductCard
              product={product}
              inserted={type === 'suggested'}
              teaser={type === 'suggested' ? lineFor(product.category) : undefined}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
