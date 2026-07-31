// SearchPicker — Quick Search Options per Section 2 & 7 of RDE Spec (No Em-Dashes)
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Mic, Search, Sparkles } from 'lucide-react'
import { useRde } from '../context/RdeContext.jsx'

const DEMO_SEARCHES = [
  {
    query: 'bread',
    label: 'bread',
    emoji: '🍞',
    color: '#fdf3e0',
    category: 'Groceries',
    targetCategory: 'Breakfast & Pantry',
    badgeBg: '#e8f5e9',
    badgeColor: '#0c831f',
  },
  {
    query: 'dog food',
    label: 'dog food',
    emoji: '🐕',
    color: '#fde8c8',
    category: 'Pet Supplies',
    targetCategory: 'Pet Care',
    badgeBg: '#e8effc',
    badgeColor: '#256fef',
  },
  {
    query: 'diapers',
    label: 'diapers',
    emoji: '👶',
    color: '#e8f5fd',
    category: 'Baby Products',
    targetCategory: 'New Parent Essentials',
    badgeBg: '#fef0f1',
    badgeColor: '#e23744',
  },
  {
    query: 'swiss knife',
    label: 'swiss knife',
    emoji: '🔪',
    color: '#fef0f1',
    category: 'Household Essentials',
    targetCategory: 'Travel & Camping',
    badgeBg: '#f0e8ff',
    badgeColor: '#7c3aed',
  },
  {
    query: 'chips',
    label: 'chips',
    emoji: '🍿',
    color: '#fff0e8',
    category: 'Snacks & Beverages',
    targetCategory: 'Home Entertainment',
    badgeBg: '#fff9e0',
    badgeColor: '#d97706',
  },
  {
    query: 'shampoo',
    label: 'shampoo',
    emoji: '🧴',
    color: '#ffe8f5',
    category: 'Personal Care & Beauty',
    targetCategory: 'Self-Care & Relaxation',
    badgeBg: '#ffe8f5',
    badgeColor: '#db2777',
  },
]

const RECENT = ['bread', 'milk', 'eggs', 'peanut butter']

export default function SearchPicker() {
  const navigate = useNavigate()
  const { setSearchQuery } = useRde()

  const handlePick = (query) => {
    setSearchQuery(query)
    navigate('/search')
  }

  return (
    <div className="flex flex-col min-h-full bg-surface-alt pb-8">
      {/* Header */}
      <div className="bg-surface border-b border-line px-3 pt-2.5 pb-3">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => navigate('/')}
            className="w-8 h-8 flex items-center justify-center rounded-full"
          >
            <ArrowLeft size={20} className="text-ink" strokeWidth={2} />
          </motion.button>

          {/* Search bar */}
          <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-[10px] bg-[#f4f4f4] border border-brand-green ring-1 ring-brand-green/30">
            <Search size={16} className="text-ink-soft" />
            <span className="text-ink-soft text-[14px] flex-1 text-left">Search products...</span>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full">
            <Mic size={16} className="text-ink-soft" />
          </button>
        </div>
      </div>

      {/* Demo search options */}
      <div className="px-3 pt-4 pb-2">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles size={15} className="text-brand-green" />
          <p className="text-[13px] font-bold text-ink">Try a demo search</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {DEMO_SEARCHES.map(({ query, label, emoji, color, category, targetCategory, badgeBg, badgeColor }, i) => (
            <motion.button
              key={query}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handlePick(query)}
              className="bg-surface rounded-[12px] border border-line p-3 text-left shadow-card flex flex-col items-start gap-2"
            >
              <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-2xl" style={{ background: color }}>
                {emoji}
              </div>
              <div>
                <p className="text-[14px] font-bold text-ink">"{label}"</p>
                <p className="text-[11px] text-ink-soft mt-0.5">{category}</p>
              </div>
              <span
                className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full mt-auto"
                style={{ background: badgeBg, color: badgeColor }}
              >
                {targetCategory}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent searches */}
      <div className="px-3 pt-3">
        <p className="text-[12px] font-bold text-ink mb-2">Recent searches</p>
        <div className="flex flex-wrap gap-2">
          {RECENT.map((r) => (
            <motion.button
              key={r}
              whileTap={{ scale: 0.94 }}
              onClick={() => handlePick(r === 'bread' ? 'bread' : 'bread')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-line rounded-full"
            >
              <Search size={11} className="text-ink-soft" />
              <span className="text-[12px] text-ink-mid">{r}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
