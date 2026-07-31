// Screen 5 — NSM realized: order confirmation with new-category badge.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock3, Package, ChevronRight } from 'lucide-react'
import { getProduct } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useRde } from '../context/RdeContext.jsx'
import WhyThisSheet from '../components/WhyThisSheet.jsx'

// Confetti pieces
const CONFETTI = [
  { color: '#f8cb46', x: -30, delay: 0   },
  { color: '#0c831f', x:  10, delay: 0.1 },
  { color: '#256fef', x: -10, delay: 0.2 },
  { color: '#e23744', x:  30, delay: 0.05},
  { color: '#f8841a', x:  -5, delay: 0.15},
  { color: '#f8cb46', x:  20, delay: 0.25},
]

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const { items, total } = useCart()
  const { isNewCategory } = useRde()
  const [sheetProduct, setSheetProduct] = useState(null)

  const ids = Object.keys(items)
  const newCategoryIds = ids.filter((id) => {
    const p = getProduct(id)
    return p && isNewCategory(p.category)
  })

  return (
    <div className="flex flex-col min-h-full bg-surface-alt relative overflow-hidden">
      {/* ── Confetti ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        {CONFETTI.map((c, i) => (
          <motion.div
            key={i}
            style={{ background: c.color, left: `${50 + c.x}%`, top: 60, width: 8, height: 8, borderRadius: 2, position: 'absolute' }}
            initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ y: 200, opacity: 0, rotate: 540 + i * 60, scale: 0.5 }}
            transition={{ delay: c.delay, duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        ))}
      </div>

      {/* ── Success hero ── */}
      <div className="bg-brand-green px-4 pt-12 pb-10 flex flex-col items-center relative overflow-hidden">
        {/* Background rings */}
        <motion.div
          className="absolute w-48 h-48 rounded-full border border-white/10"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full border border-white/5"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, duration: 0.9 }}
        />

        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
          className="relative z-10"
        >
          <CheckCircle2 size={64} strokeWidth={1.5} className="text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-[22px] font-bold text-white mt-4 relative z-10"
        >
          Order placed! 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-white/80 text-[14px] mt-1 relative z-10"
        >
          Arriving in 8 minutes
        </motion.p>

        {/* Delivery progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="w-full mt-5 relative z-10"
        >
          <div className="flex items-center justify-between text-white/60 text-[11px] mb-1.5">
            <span>Order confirmed</span>
            <span>Packed</span>
            <span>Out for delivery</span>
            <span>Delivered</span>
          </div>
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '25%' }}
              transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            {[Clock3, Package, Package, Package].map((Icon, i) => (
              <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center ${i === 0 ? 'bg-white' : 'bg-white/20'}`}>
                <Icon size={13} className={i === 0 ? 'text-brand-green' : 'text-white/50'} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="p-3 flex flex-col gap-2.5">
        {/* ── New-category badge card ── */}
        {newCategoryIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 22 }}
            className="bg-surface rounded-[10px] p-3.5 shadow-card-md border-l-4 border-brand-yellow"
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-2xl"
              >
                🏅
              </motion.span>
              <div>
                <p className="text-[14px] font-bold text-ink">
                  New aisle unlocked{newCategoryIds.length > 1 ? 's' : ''}!
                </p>
                <p className="text-[11px] text-ink-soft">You're exploring something new</p>
              </div>
            </div>

            {newCategoryIds.map((id, i) => {
              const p = getProduct(id)
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="flex items-center gap-3 py-2 border-t border-line"
                >
                  <div
                    className="w-10 h-10 rounded-[8px] flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: p.tint }}
                  >
                    {p.emoji}
                  </div>
                  <div className="min-w-0 grow">
                    <p className="text-[13px] font-semibold text-ink leading-snug line-clamp-1">{p.name}</p>
                    <p className="text-[11px] text-brand-green font-medium">Your first order from this category ✨</p>
                  </div>
                  <button
                    onClick={() => setSheetProduct(p)}
                    className="flex items-center gap-0.5 text-[11px] text-accent-blue font-semibold flex-shrink-0 bg-accent-blue-tint px-2 py-1 rounded-full"
                  >
                    Why? <ChevronRight size={10} />
                  </button>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* ── Order summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-surface rounded-[10px] p-3.5 shadow-card"
        >
          <p className="text-[14px] font-bold text-ink mb-3">Order summary</p>
          {ids.map((id) => {
            const p = getProduct(id)
            return (
              <div key={id} className="flex items-center gap-2.5 py-2 border-b border-line last:border-0">
                <div
                  className="w-9 h-9 rounded-[6px] flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: p.tint }}
                >
                  {p.emoji}
                </div>
                <p className="text-[12px] text-ink-mid flex-1 leading-snug line-clamp-1">
                  {p.name} × {items[id]}
                </p>
                <p className="text-[13px] font-semibold text-ink flex-shrink-0">₹{p.price * items[id]}</p>
              </div>
            )
          })}
          <div className="flex justify-between items-center pt-2.5 mt-1 border-t-2 border-line">
            <p className="text-[13px] font-bold text-ink">Total paid</p>
            <p className="text-[13px] font-bold text-ink">₹{total + 4}</p>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/search')}
          className="w-full h-12 rounded-[10px] border-2 border-brand-green text-brand-green text-[14px] font-bold bg-surface"
        >
          Continue shopping
        </motion.button>
      </div>

      <WhyThisSheet
        product={sheetProduct}
        open={!!sheetProduct}
        onClose={() => setSheetProduct(null)}
      />
    </div>
  )
}
