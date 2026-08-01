// Home Screen — Section 6 of Scout Specification
// Standard search bar (leads to SearchPicker) + category grid + "Your usual" row
// The 3 demo chips are on SearchPicker, not here
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Mic, ChevronRight } from 'lucide-react'
import { CATEGORY_GRID, USUAL_ITEMS } from '../data/products.js'
import { useRde } from '../context/RdeContext.jsx'

// Promo banner data
const PROMOS = [
  {
    emoji: '🎉',
    title: 'Celebrate Friendship Day',
    sub: 'Bands, Cards & Flowers from ₹49',
    color: '#ffc907',
    textColor: '#1f1f1f',
  },
  {
    emoji: '⚡',
    title: 'Flash Sale',
    sub: '50% off on electronics today',
    color: '#1a1a2e',
    textColor: '#ffffff',
  },
  {
    emoji: '🎁',
    title: 'New User Offer',
    sub: 'Free delivery on first 3 orders',
    color: '#e8f5e9',
    textColor: '#0c831f',
  },
]

// "Frequently bought" bundles
const FREQUENT_BUNDLES = [
  { label: 'Milk, Curd & Paneer', emoji: '🥛', color: '#e8f5e9', count: '+5 more' },
  { label: 'Drinks & Juices',      emoji: '🧃', color: '#fff9e0', count: '+3 more' },
  { label: 'Chocolates & Candies', emoji: '🍫', color: '#fde8c8', count: '+1 more' },
]

export default function HomeScreen() {
  const navigate = useNavigate()
  const { setSearchQuery } = useRde()
  const [promoIdx, setPromoIdx] = useState(0)

  const goToSearch = () => navigate('/search-pick')

  const handleCategoryTap = (cat) => {
    if (cat.name === 'Groceries') { setSearchQuery('bread'); navigate('/search') }
    else if (cat.name === 'Pet Supplies') { setSearchQuery('dog food'); navigate('/search') }
    else if (cat.name === 'Baby Products') { setSearchQuery('diapers'); navigate('/search') }
    else navigate('/search-pick')
  }

  return (
    <div className="flex flex-col min-h-full bg-surface-alt pb-6">
      {/* ── Yellow header with search bar ── */}
      <div className="bg-brand-yellow px-4 pt-3 pb-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={goToSearch}
          className="w-full flex items-center gap-2.5 h-12 bg-white rounded-[10px] px-4 shadow-card-md"
        >
          <Search size={18} className="text-ink-soft flex-shrink-0" />
          <span className="text-ink-soft text-[14px] flex-1 text-left">Search "stationery"</span>
          <Mic size={18} className="text-ink-soft flex-shrink-0" />
        </motion.button>
      </div>

      {/* ── Horizontal category scroll (Blinkit style) ── */}
      <div className="bg-surface border-b border-line">
        <div className="flex gap-1 px-1 py-2 overflow-x-auto scrollbar-hide">
          {CATEGORY_GRID.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryTap(cat)}
              className="flex flex-col items-center gap-1 flex-shrink-0 px-2 py-1"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: cat.color }}>
                {cat.emoji}
              </div>
              <span className="text-[9px] font-medium text-ink-mid text-center leading-tight w-14">
                {cat.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Promo banner ── */}
      <div className="px-3 pt-3 pb-2">
        <motion.div
          key={promoIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-[14px] px-4 py-5 flex items-center gap-3 overflow-hidden relative"
          style={{ background: PROMOS[promoIdx].color }}
        >
          <span className="text-4xl">{PROMOS[promoIdx].emoji}</span>
          <div className="flex-1">
            <p className="font-bold text-[15px] leading-tight" style={{ color: PROMOS[promoIdx].textColor }}>
              {PROMOS[promoIdx].title}
            </p>
            <p className="text-[12px] mt-0.5 opacity-80" style={{ color: PROMOS[promoIdx].textColor }}>
              {PROMOS[promoIdx].sub}
            </p>
          </div>
          <ChevronRight size={20} style={{ color: PROMOS[promoIdx].textColor, opacity: 0.7 }} />
        </motion.div>
        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-2.5">
          {PROMOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setPromoIdx(i)}
              className={`rounded-full transition-all duration-200 ${
                i === promoIdx ? 'w-4 h-1.5 bg-brand-green' : 'w-1.5 h-1.5 bg-line-strong'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Category grid (2×4) ── */}
      <div className="px-3 pb-3">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[14px] font-bold text-ink">All Categories</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORY_GRID.map((cat) => (
            <motion.button
              key={cat.name}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleCategoryTap(cat)}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-[10px] border border-line bg-surface"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl" style={{ background: cat.color }}>
                {cat.emoji}
              </div>
              <span className="text-[9px] font-medium text-ink-mid text-center leading-tight line-clamp-2 w-full">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Frequently bought ── */}
      <div className="px-3 pb-3">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[14px] font-bold text-ink">Frequently bought</p>
          <button className="text-[12px] text-accent-blue font-medium">See all</button>
        </div>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
          {FREQUENT_BUNDLES.map((bundle) => (
            <motion.button
              key={bundle.label}
              whileTap={{ scale: 0.95 }}
              onClick={goToSearch}
              className="flex-shrink-0 w-28 bg-surface rounded-[10px] border border-line overflow-hidden text-left"
            >
              <div className="h-24 flex items-center justify-center text-3xl relative" style={{ background: bundle.color }}>
                {bundle.emoji}
                <span className="absolute top-1.5 left-1.5 bg-white/80 text-ink text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                  {bundle.count}
                </span>
              </div>
              <p className="text-[10px] font-semibold text-ink px-2 py-2 leading-tight">{bundle.label}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Your usual ── */}
      <div className="px-3 pb-3">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[14px] font-bold text-ink">Your usual</p>
          <button className="text-[12px] text-accent-blue font-medium">See all</button>
        </div>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
          {USUAL_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSearchQuery('bread'); navigate('/search') }}
              className="flex-shrink-0 w-28 bg-surface rounded-[10px] border border-line p-2.5 text-left"
            >
              <div className="w-11 h-11 rounded-[8px] flex items-center justify-center text-2xl mb-2" style={{ background: item.color }}>
                {item.emoji}
              </div>
              <p className="text-[11px] font-semibold text-ink leading-snug line-clamp-2">{item.label}</p>
              <p className="text-[10px] text-accent-blue font-medium mt-1">Reorder ›</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
