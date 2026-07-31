// Screen 2 — Engagement: product detail with the reassurance-line box.
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, Share2, Star, Clock3, ShieldCheck } from 'lucide-react'
import { getProduct } from '../data/products.js'
import { useRde } from '../context/RdeContext.jsx'
import AddButton from '../components/AddButton.jsx'
import WhyThisSheet from '../components/WhyThisSheet.jsx'

const DOT_COUNT = 3

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [dot, setDot] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)
  const { lineFor, isNewCategory } = useRde()
  const p = getProduct(id)

  if (!p) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-sm text-ink-soft">Product not found.</p>
    </div>
  )

  const reassuranceLine = isNewCategory(p.category) ? lineFor(p.category) : null
  const discountPct = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : null

  return (
    <div className="flex flex-col min-h-full bg-surface-alt pb-8 relative">
      {/* ── Sticky header ── */}
      <div className="sticky top-0 bg-surface z-20 px-3 py-2.5 flex items-center gap-2 border-b border-line">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-alt"
        >
          <ArrowLeft size={20} strokeWidth={2} className="text-ink" />
        </motion.button>
        <span className="text-[14px] font-semibold text-ink flex-1 truncate">{p.name}</span>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setWishlisted((v) => !v)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-alt"
        >
          <Heart
            size={18}
            strokeWidth={2}
            className={wishlisted ? 'text-accent-red fill-accent-red' : 'text-ink-soft'}
          />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-alt"
        >
          <Share2 size={17} strokeWidth={2} className="text-ink-soft" />
        </motion.button>
      </div>

      {/* ── Hero image area ── */}
      <div
        className="h-60 flex items-center justify-center relative flex-shrink-0"
        style={{ background: p.tint }}
      >
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="text-[110px] select-none"
        >
          {p.emoji}
        </motion.span>

        {/* Carousel dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {Array.from({ length: DOT_COUNT }, (_, i) => (
            <button
              key={i}
              onClick={() => setDot(i)}
              className={`rounded-full transition-all ${
                i === dot ? 'w-4 h-2 bg-ink-mid' : 'w-2 h-2 bg-ink-mid/30'
              }`}
            />
          ))}
        </div>

        {/* Discount badge */}
        {discountPct && (
          <div className="absolute top-3 right-3 bg-accent-red text-white text-[11px] font-bold px-2 py-1 rounded-[6px]">
            {discountPct}% OFF
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="bg-surface mx-0 px-4 pt-4 pb-4 flex flex-col gap-3">
        {/* Delivery badge */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-brand-green-tint text-brand-green text-[11px] font-semibold px-2 py-1 rounded-[6px]">
            <Clock3 size={11} strokeWidth={2.5} />
            <span>{p.deliveryMins} MINS</span>
          </div>
          <span className="text-[11px] text-ink-soft">Express delivery</span>
        </div>

        {/* Name + qty */}
        <div>
          <h1 className="text-[16px] font-bold text-ink leading-snug">{p.name}</h1>
          <p className="text-[13px] text-ink-soft mt-0.5">{p.qty}</p>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 bg-brand-green text-white text-[11px] font-bold px-1.5 py-0.5 rounded-[4px]">
            <Star size={9} fill="white" strokeWidth={0} />
            <span>{p.rating}</span>
          </div>
          <span className="text-[12px] text-ink-soft">{p.ratingCount} ratings</span>
          <span className="text-line-strong">|</span>
          <span className="text-[12px] text-accent-blue font-medium">See all reviews</span>
        </div>

        {/* Price + ADD */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <p className="text-[20px] font-bold text-ink">₹{p.price}</p>
              {p.mrp > p.price && (
                <p className="text-[14px] text-ink-soft line-through">₹{p.mrp}</p>
              )}
            </div>
            <p className="text-[11px] text-ink-soft">Inclusive of all taxes</p>
          </div>
          <AddButton productId={p.id} className="h-11 min-w-28 text-base" />
        </div>
      </div>

      {/* ── Reassurance box ── */}
      <AnimatePresence>
        {reassuranceLine && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mx-3 mt-2"
          >
            <div className="bg-brand-green-tint border border-brand-green/30 rounded-[10px] p-3.5 animate-pulse-ring">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck size={15} className="text-brand-green flex-shrink-0" />
                <p className="text-[12px] font-bold text-brand-green">Trying this for the first time?</p>
              </div>
              <p className="text-[13px] leading-snug text-ink-mid">{reassuranceLine}</p>
              <button
                onClick={() => setSheetOpen(true)}
                className="text-[12px] text-accent-blue font-semibold mt-2 flex items-center gap-0.5"
              >
                Why am I seeing this? ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Highlights ── */}
      {p.highlights && (
        <div className="bg-surface mx-0 mt-2 px-4 py-4">
          <h2 className="text-[14px] font-bold mb-3 text-ink">Highlights</h2>
          <ul className="flex flex-col gap-2.5">
            {p.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-2.5 items-start"
              >
                <div className="w-4 h-4 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-[9px] font-bold">✓</span>
                </div>
                <span className="text-[13px] text-ink-mid leading-snug">{h}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      <WhyThisSheet product={p} open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  )
}
