// PersonaSidebar — Left Sidebar for Persona Selection (Section 7)
import { motion } from 'framer-motion'
import { UserCheck, Tag } from 'lucide-react'
import { useRde } from '../context/RdeContext.jsx'

export default function PersonaSidebar() {
  const { personas, activePersona, setActivePersonaId } = useRde()

  return (
    <div className="w-[290px] h-[720px] max-h-[calc(100vh-48px)] bg-surface rounded-[20px] p-3.5 border border-line shadow-card flex flex-col gap-2.5 flex-shrink-0 self-center overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-green-tint flex items-center justify-center text-brand-green">
            <UserCheck size={16} />
          </div>
          <h2 className="text-[14px] font-bold text-ink">Buyer Personas</h2>
        </div>
        <p className="text-[10.5px] text-ink-soft mt-0.5 leading-snug">
          Select a buyer profile to test how Scout adapts suggestions to their purchase history.
        </p>
      </div>

      {/* Cards list */}
      <div className="flex flex-col gap-2">
        {personas.map((p) => {
          const isActive = p.id === activePersona.id
          return (
            <motion.button
              key={p.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePersonaId(p.id)}
              className={`p-2.5 rounded-[12px] border text-left transition-all ${
                isActive
                  ? 'border-brand-green bg-brand-green-tint/40 ring-2 ring-brand-green/20 shadow-sm'
                  : 'border-line bg-surface-alt hover:bg-surface'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.avatar}</span>
                  <div>
                    <p className="text-[12.5px] font-bold text-ink leading-tight">{p.name}</p>
                    <span className="text-[9.5px] text-ink-soft font-medium">{p.subtitle}</span>
                  </div>
                </div>
                {isActive && (
                  <span className="text-[9px] font-bold bg-brand-green text-white px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>

              <p className="text-[10.5px] text-ink-mid mt-1.5 leading-tight">{p.lifestyle}</p>

              {/* Habitual categories tags */}
              <div className="mt-2 pt-1.5 border-t border-line/60">
                <div className="flex items-center gap-1 mb-1">
                  <Tag size={9} className="text-ink-soft" />
                  <span className="text-[9.5px] font-semibold text-ink-soft">Habitual categories:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.purchaseHistory.map((cat) => (
                    <span
                      key={cat}
                      className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-brand-green/15 text-brand-green'
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

      <div className="bg-surface-alt rounded-[10px] p-2 border border-line text-[10px] text-ink-soft leading-snug mt-auto">
        💡 <strong className="text-ink">Demo tip:</strong> Search <strong className="text-ink">"swiss knife"</strong> with <strong className="text-ink">Persona B</strong> to see Scout fallback logic fire!
      </div>
    </div>
  )
}
