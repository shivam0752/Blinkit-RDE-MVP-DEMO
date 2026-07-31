import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext.jsx'
import { CheckCircle } from 'lucide-react'

export default function Toast() {
  const { toast } = useCart()

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast}
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0,  opacity: 1, scale: 1 }}
          exit={{    y: 10, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          className="absolute bottom-[72px] inset-x-3 z-50 rounded-[10px] overflow-hidden"
          style={{ boxShadow: '0 8px 28px rgb(0 0 0 / 0.18)' }}
        >
          <div className="bg-[#1f1f1f] px-4 py-3 flex items-center gap-3">
            <CheckCircle size={18} className="text-brand-green flex-shrink-0" />
            <p className="text-white text-[13px] font-medium leading-snug flex-1">{toast}</p>
          </div>
          {/* Auto-dismiss progress bar */}
          <motion.div
            className="h-0.5 bg-brand-green origin-left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 2.6, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
