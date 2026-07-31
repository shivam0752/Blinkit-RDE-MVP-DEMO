import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Screen 6 — Trust transparency: "Why this" bottom sheet
export default function WhyThisSheet({ product, open, onClose }) {
  return (
    <AnimatePresence>
      {open && product && (
        <motion.div
          className="absolute inset-0 z-40 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="relative bg-surface rounded-t-[20px] overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.5 }}
            onDragEnd={(_, info) => { if (info.offset.y > 80) onClose() }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-line-strong" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-2 pb-4 border-b border-line">
              <div>
                <h2 className="text-base font-bold text-ink">Why we suggested this</h2>
                <p className="text-xs text-ink-soft mt-0.5 line-clamp-1">{product.name}</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center -mt-0.5 flex-shrink-0"
              >
                <X size={16} className="text-ink-soft" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 pt-4 pb-2">
              <ul className="flex flex-col gap-4">
                {[
                  {
                    icon: '🧺',
                    title: 'Based on baskets like yours',
                    desc: `Shoppers who buy whole wheat bread, milk, and eggs often add this within their next few orders.`,
                  },
                  {
                    icon: '⭐',
                    title: `Rated ${product.rating}★ by ${product.ratingCount} buyers`,
                    desc: `We only surface items with strong ratings from verified shoppers: never untested products.`,
                  },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <div className="w-9 h-9 rounded-full bg-surface-alt flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{item.title}</p>
                      <p className="text-[12px] text-ink-soft leading-snug mt-0.5">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="px-5 pt-4 pb-6 flex flex-col gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full h-12 rounded-[10px] bg-brand-green text-white text-sm font-bold"
              >
                Got it
              </motion.button>
              <button
                onClick={onClose}
                className="w-full py-2 text-xs text-ink-soft font-medium"
              >
                Don't show me new-category suggestions
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
