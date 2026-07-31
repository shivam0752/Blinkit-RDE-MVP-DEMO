import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Clock3 } from 'lucide-react'
import AddButton from './AddButton.jsx'
import { useRde } from '../context/RdeContext.jsx'

const DOT_COUNT = 3

function DiscountBadge({ price, mrp }) {
  if (!mrp || mrp <= price) return null
  const pct = Math.round(((mrp - price) / mrp) * 100)
  return (
    <span className="text-[10px] font-semibold text-brand-green bg-brand-green-tint px-1.5 py-0.5 rounded">
      {pct}% OFF
    </span>
  )
}

function Stars({ rating, count }) {
  const full = Math.floor(rating)
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 1l1.12 2.27L9 3.64 7 5.59l.47 2.74L5 7l-2.47 1.33L3 5.59 1 3.64l2.88-.37L5 1z"
              fill={i < full ? '#ffc907' : '#e0e0e0'}
            />
          </svg>
        ))}
      </div>
      <span className="text-[10px] text-ink-soft">{count}</span>
    </div>
  )
}

export default function ProductCard({ product, inserted = false, teaser }) {
  const navigate = useNavigate()
  const { recordItemClick } = useRde()
  const [dot, setDot] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)
  const p = product

  if (!p) return null

  const handleCardClick = () => {
    if (recordItemClick) recordItemClick(p.id)
    navigate(`/product/${p.id}`)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      onClick={handleCardClick}
      className={`relative bg-surface rounded-[12px] border cursor-pointer flex flex-col overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow ${
        inserted ? 'border-brand-green ring-1 ring-brand-green/20' : 'border-line'
      }`}
    >
      {/* Suggested For You (New) badge */}
      {inserted && (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.05 }}
          className="absolute top-2 left-2 bg-brand-green text-white text-[8.5px] font-bold px-1.5 py-0.5 rounded-[4px] z-10 tracking-wide uppercase shadow-sm"
        >
          Suggested For You (New)
        </motion.span>
      )}

      {/* Wishlist button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setWishlisted((v) => !v)
        }}
        className="absolute top-2 right-2 z-10 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
      >
        <Heart
          size={12}
          strokeWidth={2}
          className={wishlisted ? 'text-accent-red fill-accent-red' : 'text-ink-soft'}
        />
      </button>

      {/* Image area */}
      <div
        className="h-32 flex items-center justify-center relative flex-shrink-0"
        style={{ background: p.tint }}
      >
        <span className="text-6xl select-none">{p.emoji}</span>

        {/* Carousel dots */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
          {Array.from({ length: DOT_COUNT }, (_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                setDot(i)
              }}
              className={`rounded-full transition-all ${
                i === dot ? 'w-3 h-1.5 bg-ink-mid' : 'w-1.5 h-1.5 bg-line-strong'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col gap-1 flex-1">
        {/* Delivery Badge per design.md: Light blue bg (#ebf8ff) with tertiary blue text (#0061a5) */}
        <div className="flex items-center gap-1">
          <span className="badge-delivery flex items-center gap-1">
            <Clock3 size={10} strokeWidth={2.5} />
            <span>{p.deliveryMins} MINS</span>
          </span>
        </div>

        <p className="text-[12.5px] font-bold text-ink leading-snug line-clamp-2 mt-0.5">{p.name}</p>

        <p className="text-[11px] text-ink-soft">{p.qty}</p>

        {/* Honest Reassurance teaser */}
        {inserted && teaser && (
          <p className="text-[9.5px] leading-tight text-brand-green bg-brand-green-tint rounded-[4px] px-1.5 py-1 mt-0.5">
            {teaser}
          </p>
        )}

        <Stars rating={p.rating} count={p.ratingCount} />

        {/* Price row */}
        <div className="mt-auto pt-1.5 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1 flex-wrap">
              <p className="text-[13.5px] font-extrabold text-ink">₹{p.price}</p>
              {p.mrp > p.price && (
                <p className="text-[11px] text-ink-soft line-through">₹{p.mrp}</p>
              )}
            </div>
            <DiscountBadge price={p.price} mrp={p.mrp} />
          </div>
          <AddButton productId={p.id} />
        </div>
      </div>
    </motion.div>
  )
}
