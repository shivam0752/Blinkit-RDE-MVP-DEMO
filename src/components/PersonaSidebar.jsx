import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserCheck, Tag, CheckCircle2 } from 'lucide-react'
import { useRde } from '../context/RdeContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function PersonaSidebar() {
  const navigate = useNavigate()
  const { clear } = useCart()
  const { personas, activePersona, setActivePersonaId, setSearchQuery } = useRde()

  return (
    <div className="w-[300px] h-[720px] max-h-[calc(100vh-48px)] bg-surface rounded-[22px] p-4.5 border border-line shadow-card flex flex-col gap-4 flex-shrink-0 self-center overflow-y-auto scrollbar-hide">
      {/* ── Header ── */}
      <div className="pb-1 border-b border-line/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-green-tint border border-brand-green/30 flex items-center justify-center text-brand-green flex-shrink-0 shadow-xs">
            <UserCheck size={16} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-[15px] font-extrabold text-ink leading-tight">Buyer Personas</h2>
            <p className="text-[10.5px] font-medium text-ink-soft mt-0.5 leading-snug">
              Select a buyer to test Scout filtering.
            </p>
          </div>
        </div>
      </div>

      {/* ── Persona Cards List ── */}
      <div className="flex flex-col gap-3">
        {personas.map((p) => {
          const isActive = p.id === activePersona.id
          return (
            <motion.button
              key={p.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setActivePersonaId(p.id)
                clear()
                setSearchQuery('bread')
                navigate('/search')
              }}
              className={`p-3.5 rounded-[14px] border text-left transition-all relative overflow-hidden ${
                isActive
                  ? 'border-brand-green bg-brand-green-tint/30 ring-4 ring-brand-green/10 shadow-sm'
                  : 'border-line bg-surface-alt hover:bg-surface hover:border-line-strong'
              }`}
            >
              {/* Top Row: Avatar + Name + Active Pill */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl select-none">{p.avatar}</span>
                  <div>
                    <p className="text-[13px] font-extrabold text-ink leading-tight">{p.name}</p>
                    <span className="text-[10px] text-ink-soft font-semibold">{p.subtitle}</span>
                  </div>
                </div>
                {isActive && (
                  <span className="text-[9px] font-bold bg-brand-green text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs flex-shrink-0">
                    <CheckCircle2 size={10} /> Active
                  </span>
                )}
              </div>

              {/* Lifestyle Summary */}
              <p className="text-[11px] text-ink-mid font-medium mt-2 leading-relaxed">
                {p.lifestyle}
              </p>

              {/* Habitual Categories Pills */}
              <div className="mt-2.5 pt-2 border-t border-line/60">
                <div className="flex items-center gap-1 mb-1.5">
                  <Tag size={10} className="text-ink-soft" />
                  <span className="text-[9.5px] font-bold text-ink-soft uppercase tracking-wider">
                    Habitual Categories:
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.purchaseHistory.map((cat) => (
                    <span
                      key={cat}
                      className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-[6px] transition-colors ${
                        isActive
                          ? 'bg-brand-green/15 text-brand-green border border-brand-green/20'
                          : 'bg-surface border border-line text-ink-mid'
                      }`}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* ── Demo Tip Card ── */}
      <div className="bg-surface-alt rounded-[12px] p-3 border border-line text-[10.5px] text-ink-mid leading-relaxed mt-auto shadow-xs">
        💡 <strong className="text-ink font-bold">Demo tip:</strong> Search{' '}
        <strong className="text-ink font-bold">"swiss knife"</strong> with{' '}
        <strong className="text-brand-green font-bold">Persona B</strong> to see Scout fallback logic fire!
      </div>
    </div>
  )
}
