import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function AddButton({ productId, className = '' }) {
  const { items, add, remove } = useCart()
  const qty = items[productId] ?? 0

  if (qty === 0) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation()
          add(productId)
        }}
        className={`h-8 px-4 bg-white border-[1.5px] border-brand-yellow text-brand-green font-bold text-[12px] rounded-[8px] flex items-center justify-center tracking-wide uppercase hover:bg-brand-yellow-tint transition-all shadow-sm ${className}`}
      >
        ADD
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`h-8 px-2 bg-brand-green rounded-[8px] flex items-center justify-between gap-2 shadow-sm text-white ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => remove(productId)}
        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/20"
      >
        <Minus size={13} strokeWidth={2.5} />
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.span
          key={qty}
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 6, opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="text-[12px] font-bold text-white min-w-3 text-center"
        >
          {qty}
        </motion.span>
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => add(productId)}
        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/20"
      >
        <Plus size={13} strokeWidth={2.5} />
      </motion.button>
    </motion.div>
  )
}
