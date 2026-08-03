// Screen 3 — Checkout Review with Free Delivery Rule & Section 2c Occasion Display Split
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, Share2, Clock3, MapPin, CreditCard, ChevronRight, Truck, Sparkles } from 'lucide-react'
import { getProduct } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useRde } from '../context/RdeContext.jsx'
import AddButton from '../components/AddButton.jsx'

const FREE_DELIVERY_THRESHOLD = 170
const DELIVERY_FEE = 25
const HANDLING_FEE = 4

function CartRow({ id, qty }) {
  const p = getProduct(id)
  if (!p) return null
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8, height: 0 }}
      className="flex items-center gap-3 py-3 border-b border-line last:border-0"
    >
      <div
        className="w-14 h-14 rounded-[8px] flex items-center justify-center text-3xl flex-shrink-0"
        style={{ background: p.tint }}
      >
        {p.emoji}
      </div>
      <div className="min-w-0 grow">
        <p className="text-[13px] font-semibold text-ink leading-snug line-clamp-2">{p.name}</p>
        <p className="text-[11px] text-ink-soft mt-0.5">{p.qty}</p>
        <button className="text-[11px] text-accent-blue font-medium mt-0.5">Move to wishlist</button>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <AddButton productId={id} />
        <p className="text-[13px] font-bold text-ink">₹{p.price * qty}</p>
      </div>
    </motion.div>
  )
}

function SuggestCard({ p, teaser }) {
  const navigate = useNavigate()
  const { recordItemClick } = useRde()

  const handleCardClick = () => {
    if (recordItemClick) recordItemClick(p.id)
    navigate(`/product/${p.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="flex-shrink-0 w-36 bg-surface rounded-[10px] border border-line overflow-hidden flex flex-col shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <div
        className="h-24 flex items-center justify-center text-4xl"
        style={{ background: p.tint }}
      >
        {p.emoji}
      </div>
      <div className="p-2 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-ink line-clamp-2 leading-snug">{p.name}</p>
        <p className="text-[10px] text-ink-soft mt-0.5">{p.qty}</p>
        {teaser && (
          <p className="text-[9px] text-brand-green bg-brand-green-tint rounded px-1.5 py-1 mt-1 leading-tight line-clamp-2">
            {teaser}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2">
          <p className="text-[12px] font-bold text-ink">₹{p.price}</p>
          <AddButton productId={p.id} />
        </div>
      </div>
    </div>
  )
}

export default function CartReview() {
  const navigate = useNavigate()
  const { items, total, count } = useCart()
  const { getZeroHistoryOccasionPool, lineFor, recordOrderCompletion } = useRde()
  const ids = Object.keys(items)

  // Categories currently in cart
  const cartCategories = ids
    .map((id) => getProduct(id)?.category)
    .filter(Boolean)

  // Section 2c: Get zero-history occasion pool for checkout
  // Automatically updates if items are added or removed from cart!
  const checkoutPool = getZeroHistoryOccasionPool(cartCategories)
  const checkoutSuggestions = checkoutPool.filter((p) => !items[p.id]).slice(0, 3)

  // Free delivery calculation
  const isFreeDelivery = total >= FREE_DELIVERY_THRESHOLD
  const deliveryCharge = isFreeDelivery ? 0 : DELIVERY_FEE
  const amountNeededForFree = FREE_DELIVERY_THRESHOLD - total
  const grandTotal = total > 0 ? total + deliveryCharge + HANDLING_FEE : 0

  const handlePlaceOrder = () => {
    recordOrderCompletion(ids)
    navigate('/order-confirmed')
  }

  return (
    <div className="flex flex-col min-h-full bg-surface-alt pb-28 relative">
      {/* ── Header ── */}
      <div className="sticky top-0 bg-surface z-20 px-3 py-2.5 flex items-center gap-2 border-b border-line">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full"
        >
          <ArrowLeft size={20} strokeWidth={2} className="text-ink" />
        </motion.button>
        <span className="text-[15px] font-bold text-ink flex-1">Checkout</span>
        <button className="w-8 h-8 flex items-center justify-center rounded-full">
          <Search size={18} className="text-ink-soft" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full">
          <Share2 size={17} className="text-ink-soft" />
        </button>
      </div>

      {count === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 p-8 my-auto">
          <span className="text-6xl">🛒</span>
          <p className="text-[15px] font-semibold text-ink">Your cart is empty</p>
          <p className="text-[13px] text-ink-soft text-center">Add items to get started</p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/')}
            className="mt-2 px-6 py-3 rounded-[10px] bg-brand-green text-white text-[13px] font-bold"
          >
            Browse products
          </motion.button>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 p-3">
          {/* ── Free Delivery Progress Banner ── */}
          {!isFreeDelivery ? (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-yellow-light border border-brand-yellow/60 rounded-[10px] p-3 shadow-card"
            >
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-brand-green flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-ink">
                    Add ₹{amountNeededForFree} more for <span className="text-brand-green">FREE delivery</span>!
                  </p>
                  <p className="text-[11px] text-ink-soft mt-0.5">
                    Check out our Scout suggestions below to reach free delivery
                  </p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-line rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-brand-green rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((total / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }}
                />
              </div>
            </motion.div>
          ) : (
            <div className="bg-brand-green-tint border border-brand-green/30 rounded-[10px] px-3 py-2 flex items-center gap-2">
              <Truck size={16} className="text-brand-green" />
              <p className="text-[12px] font-bold text-brand-green">
                🎉 You've unlocked FREE Delivery on this order!
              </p>
            </div>
          )}

          {/* ── Order for ── */}
          <div className="bg-surface rounded-[10px] px-3 py-2.5 flex items-center justify-between shadow-card">
            <p className="text-[12px] text-ink-soft">
              Order for <span className="text-ink font-semibold">Shivam Raturi, 7340870043</span>
            </p>
            <button className="text-[12px] text-brand-green font-semibold">Change</button>
          </div>

          {/* ── Delivery banner ── */}
          <div className="bg-surface rounded-[10px] px-3 py-3 flex items-center gap-3 shadow-card">
            <div className="w-10 h-10 rounded-full bg-brand-green-tint flex items-center justify-center flex-shrink-0">
              <Clock3 size={18} className="text-brand-green" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-ink">Delivery in 8 minutes</p>
              <p className="text-[12px] text-ink-soft">Shipment of {count} item{count > 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* ── Cart items ── */}
          <div className="bg-surface rounded-[10px] px-3 shadow-card">
            <AnimatePresence>
              {ids.map((id) => (
                <CartRow key={id} id={id} qty={items[id]} />
              ))}
            </AnimatePresence>
          </div>

          {/* ── Section 2c Checkout Suggestions Pool ── */}
          {checkoutSuggestions.length > 0 && (
            <div className="bg-surface rounded-[10px] p-3 shadow-card border border-brand-green/20">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Sparkles size={15} className="text-brand-green" />
                <p className="text-[13px] font-bold text-ink">Suggested For You (New)</p>
              </div>
              <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
                {checkoutSuggestions.map((p) => (
                  <SuggestCard key={p.id} p={p} teaser={lineFor(p.category)} />
                ))}
              </div>
            </div>
          )}

          {/* ── Bill details ── */}
          <div className="bg-surface rounded-[10px] p-3 shadow-card">
            <p className="text-[14px] font-bold text-ink mb-3">Bill details</p>
            <div className="flex justify-between items-center py-1.5 border-b border-line">
              <span className="text-[13px] text-ink-mid">Items total</span>
              <span className="text-[13px] font-medium text-ink">₹{total}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-line">
              <div>
                <span className="text-[13px] text-ink-mid">Delivery charge</span>
                {!isFreeDelivery && (
                  <p className="text-[10px] text-ink-soft">Free delivery on orders ₹170+</p>
                )}
              </div>
              <span className={`text-[13px] font-medium ${isFreeDelivery ? 'text-brand-green' : 'text-ink'}`}>
                {isFreeDelivery ? 'FREE' : `₹${DELIVERY_FEE}`}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-line">
              <span className="text-[13px] text-ink-mid">Handling charge</span>
              <span className="text-[13px] font-medium text-ink">₹{HANDLING_FEE}</span>
            </div>
            <div className="flex justify-between items-center pt-2.5 mt-1 border-t-2 border-line">
              <p className="text-[14px] font-bold text-ink">Grand total</p>
              <p className="text-[14px] font-bold text-ink">₹{grandTotal}</p>
            </div>
          </div>

          {/* ── Delivery address ── */}
          <div className="bg-surface rounded-[10px] px-3 py-3 flex items-center gap-2.5 shadow-card">
            <MapPin size={16} className="text-ink-soft flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-ink-soft">Delivering to <span className="font-semibold text-ink">Work</span></p>
              <p className="text-[11px] text-ink-soft line-clamp-1">Sector 34 Chandigarh Library, Ground floor…</p>
            </div>
            <button className="text-[12px] text-brand-green font-semibold flex-shrink-0">Change</button>
          </div>
        </div>
      )}

      {/* ── Fixed Pay Bar ── */}
      {count > 0 && (
        <div className="sticky bottom-0 left-0 right-0 bg-surface border-t border-line px-3 py-3 flex items-center gap-3 z-30 shadow-sheet">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <CreditCard size={14} className="text-ink-soft" />
            <p className="text-[11px] text-ink-soft">PAY USING <span className="font-semibold text-ink">slice UPI</span></p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handlePlaceOrder}
            className="flex-1 h-[48px] rounded-[10px] bg-brand-green flex items-center justify-between px-4"
            style={{ boxShadow: '0 4px 16px rgb(12 131 31 / 0.35)' }}
          >
            <div className="text-left">
              <p className="text-white text-[10px] opacity-80">TOTAL</p>
              <p className="text-white text-[15px] font-bold leading-none">₹{grandTotal}</p>
            </div>
            <div className="flex items-center gap-1 text-white">
              <span className="text-[13px] font-bold">Place Order</span>
              <ChevronRight size={16} strokeWidth={2.5} />
            </div>
          </motion.button>
        </div>
      )}
    </div>
  )
}
