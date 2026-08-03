// Screen 2 — Engagement: product detail with the reassurance-line box.
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, Share2, Star, Clock3, ShieldCheck } from 'lucide-react'
import { getProduct } from '../data/products.js'
import { useRde } from '../context/RdeContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import AddButton from '../components/AddButton.jsx'
import WhyThisSheet from '../components/WhyThisSheet.jsx'

const DOT_COUNT = 3

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showOptOutPopup, setShowOptOutPopup] = useState(false)
  const [dot, setDot] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)
  const { lineFor, isNewCategory } = useRde()
  const { items } = useCart()
  const p = getProduct(id)

  if (!p) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-sm text-ink-soft">Product not found.</p>
    </div>
  )

  const reassuranceLine = lineFor(p.category)
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

      {/* ── Scout Reasoning Box ── */}
      <AnimatePresence>
        {reassuranceLine && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="mx-3 mt-2"
          >
            <div className="bg-brand-green-tint border border-brand-green/30 rounded-[12px] p-3.5 shadow-sm">
              {/* Scout Trusted Header */}
              <div className="flex items-center justify-between pb-2 border-b border-brand-green/20">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-brand-green flex-shrink-0" />
                  <span className="text-[12.5px] font-extrabold text-brand-green">Scout Trusted Recommendation</span>
                </div>
                <span className="text-[9.5px] font-bold bg-brand-green text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {(items[p.id] ?? 0) > 0 ? 'Post-Add Verified' : 'Verified'}
                </span>
              </div>

              {/* 2 Reasons per Section 3a */}
              <div className="flex flex-col gap-2.5 my-2.5">
                {/* 1. Cohort pattern line */}
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">🧺</span>
                  <div>
                    <p className="text-[11.5px] font-bold text-ink leading-tight">Shoppers with baskets like yours</p>
                    <p className="text-[11px] text-ink-mid leading-snug mt-0.5">
                      Customers who buy your regular essentials often add this product within their next few orders.
                    </p>
                  </div>
                </div>

                {/* 2. Category trust stat */}
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">🛡️</span>
                  <div>
                    <p className="text-[11.5px] font-bold text-ink leading-tight">Category trust & quality record</p>
                    <p className="text-[11px] text-ink-mid leading-snug mt-0.5">
                      {reassuranceLine}
                    </p>
                  </div>
                </div>
              </div>

              {/* De-emphasized Opt-Out Option */}
              <div className="pt-2 border-t border-brand-green/20 text-center">
                <button
                  onClick={() => setShowOptOutPopup(true)}
                  className="text-[10px] text-ink-soft hover:text-ink font-medium transition-colors cursor-pointer"
                >
                  Don't show me new-category suggestions
                </button>
              </div>
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

      {/* Opt-out Confirmation Popup Modal */}
      <AnimatePresence>
        {showOptOutPopup && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setShowOptOutPopup(false)}
            />
            <motion.div
              className="relative bg-surface rounded-2xl p-5 max-w-[280px] w-full text-center shadow-2xl z-50 border border-line"
              initial={{ scale: 0.85, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <div className="w-11 h-11 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-3 text-xl">
                🚫
              </div>
              <h3 className="text-[14px] font-bold text-ink mb-1.5 leading-snug">
                You will not see any recommendations now
              </h3>
              <p className="text-[11px] text-ink-soft mb-4 leading-relaxed bg-surface-alt py-1.5 px-2 rounded-md">
                (This is just a demo text for the MVP)
              </p>
              <button
                onClick={() => setShowOptOutPopup(false)}
                className="w-full py-2.5 bg-brand-green text-white rounded-[10px] text-xs font-bold shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
