import { motion } from 'framer-motion'
import { Smartphone, Layers, Sparkles, Code2 } from 'lucide-react'

export default function SectionNavRail({ activeSection, setActiveSection }) {
  return (
    <div className="w-[68px] lg:w-[220px] bg-surface border-r border-line shadow-card flex flex-col justify-between p-3 flex-shrink-0 z-40">
      <div className="flex flex-col gap-4">
        {/* Logo / Header */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-9 h-9 rounded-[10px] bg-brand-yellow flex items-center justify-center text-lg font-bold text-ink shadow-sm flex-shrink-0">
            ⚡
          </div>
          <div className="hidden lg:flex flex-col min-w-0">
            <span className="text-[14px] font-extrabold text-ink leading-none truncate">Blinkit Scout</span>
            <span className="text-[10px] font-bold text-brand-green mt-0.5">Engine Suite</span>
          </div>
        </div>

        {/* Section Navigation Buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t border-line">
          {/* Section 1: MVP Prototype */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('section-1')}
            className={`flex items-center gap-3 p-2.5 rounded-[12px] border text-left transition-all ${
              activeSection === 'section-1'
                ? 'bg-brand-green-tint border-brand-green text-brand-green shadow-xs font-bold'
                : 'bg-surface-alt border-transparent text-ink-mid hover:bg-surface'
            }`}
          >
            <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 ${
              activeSection === 'section-1' ? 'bg-brand-green text-white' : 'bg-surface border border-line text-ink-soft'
            }`}>
              <Smartphone size={18} />
            </div>
            <div className="hidden lg:flex flex-col min-w-0">
              <span className="text-[12.5px] leading-tight truncate">Section 1: MVP</span>
              <span className="text-[9.5px] font-medium text-ink-soft truncate">Live Phone & Insights</span>
            </div>
          </motion.button>

          {/* Section 2: Architecture & Specs */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('section-2')}
            className={`flex items-center gap-3 p-2.5 rounded-[12px] border text-left transition-all ${
              activeSection === 'section-2'
                ? 'bg-accent-blue-tint border-accent-blue text-accent-blue shadow-xs font-bold'
                : 'bg-surface-alt border-transparent text-ink-mid hover:bg-surface'
            }`}
          >
            <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 ${
              activeSection === 'section-2' ? 'bg-accent-blue text-white' : 'bg-surface border border-line text-ink-soft'
            }`}>
              <Layers size={18} />
            </div>
            <div className="hidden lg:flex flex-col min-w-0">
              <span className="text-[12.5px] leading-tight truncate">Section 2: Architecture</span>
              <span className="text-[9.5px] font-medium text-ink-soft truncate">Mermaid & Specs</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="hidden lg:flex flex-col gap-1 p-2.5 bg-surface-alt rounded-[10px] border border-line text-[10px] text-ink-soft leading-tight">
        <div className="flex items-center gap-1 font-bold text-ink">
          <Sparkles size={12} className="text-brand-yellow-deep" />
          <span>Scout Spec v2.0</span>
        </div>
        <p>Switch sections anytime using the left navigation rail.</p>
      </div>
    </div>
  )
}
