import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Helper to derive return/complaint trust sentence (varying per product)
function getReturnTrustInfo(product) {
  if (!product) return { months: 6, complaints: 0, text: 'This product has 0 returns / complaints in the last 6 months.' }

  if (product.trustSentence) {
    return { months: product.returnMonths || 6, complaints: product.complaintCount || 0, text: product.trustSentence }
  }

  // Deterministic variations based on product ID or name
  const monthsList = [6, 3, 12, 6, 9, 6]
  const complaintsList = [0, 0, 0, 0, 0]

  let hash = 0
  const str = product.id || product.name || 'default'
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  const positiveHash = Math.abs(hash)

  const months = product.returnMonths || monthsList[positiveHash % monthsList.length]
  const complaints = product.complaintCount !== undefined ? product.complaintCount : complaintsList[positiveHash % complaintsList.length]

  const text = `This product has ${complaints} returns / complaints in the last ${months} months.`
  return { months, complaints, text }
}

// Screen 6 — Trust transparency: "Why this" bottom sheet
export default function WhyThisSheet({ product, open, onClose }) {
  const [showOptOutPopup, setShowOptOutPopup] = useState(false)

  const handleCloseAll = () => {
    setShowOptOutPopup(false)
    onClose()
  }

  const trustInfo = getReturnTrustInfo(product)

  return (
    <AnimatePresence>
      {open && product && (
        <>
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
              className="relative bg-surface rounded-t-[20px] overflow-hidden z-40"
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
                      icon: '🛡️',
                      title: `${trustInfo.complaints} returns & complaints record`,
                      desc: trustInfo.text,
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
                  className="w-full h-12 rounded-[10px] bg-brand-green text-white text-sm font-bold shadow-sm"
                >
                  Got it
                </motion.button>
                <button
                  onClick={() => setShowOptOutPopup(true)}
                  className="w-full py-2.5 text-xs text-ink-soft font-medium hover:text-ink transition-colors cursor-pointer"
                >
                  Don't show me new-category suggestions
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Opt-out Confirmation Popup Modal */}
          <AnimatePresence>
            {showOptOutPopup && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                  onClick={handleCloseAll}
                />

                {/* Dialog Content */}
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
                    onClick={handleCloseAll}
                    className="w-full py-2.5 bg-brand-green text-white rounded-[10px] text-xs font-bold shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    Got it
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

