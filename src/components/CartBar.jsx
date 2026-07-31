import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { ShoppingCart, ChevronRight } from 'lucide-react'

export default function CartBar() {
  const { count, total } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  // Hide on Cart page, Order Confirmed, or when cart is empty
  if (
    count === 0 ||
    location.pathname === '/cart' ||
    location.pathname === '/order-confirmed'
  ) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        className="bg-surface border-t border-line px-3 py-2 flex-shrink-0 z-30"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/cart')}
          className="w-full h-[48px] rounded-[10px] bg-brand-green flex items-center justify-between px-4"
          style={{ boxShadow: '0 2px 10px rgb(12 131 31 / 0.3)' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="bg-brand-green-dark rounded-[6px] p-1">
              <ShoppingCart size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-white text-[13px] font-semibold leading-none">
                {count} item{count > 1 ? 's' : ''}
              </p>
              <p className="text-white/80 text-[11px] leading-none mt-0.5">₹{total}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-white">
            <span className="text-[13px] font-bold">View Cart</span>
            <ChevronRight size={16} strokeWidth={2.5} />
          </div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
