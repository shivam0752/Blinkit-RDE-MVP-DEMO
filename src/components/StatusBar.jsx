// StatusBar — mimics a real phone status bar + Blinkit delivery header
export default function StatusBar() {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes().toString().padStart(2, '0')
  const time = `${h}:${m}`

  return (
    <div className="flex-shrink-0 z-30 relative bg-surface border-b border-line">
      {/* OS status bar */}
      <div className="flex items-center justify-between px-5 pt-2 pb-0 h-9 bg-surface">
        <span className="text-[13px] font-semibold text-ink">{time}</span>
        <div className="flex items-center gap-1.5">
          {/* Signal bars */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#1f1f1f"/>
            <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="#1f1f1f"/>
            <rect x="9" y="2" width="3" height="10" rx="0.5" fill="#1f1f1f"/>
            <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="#d0d0d0"/>
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 9.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" fill="#1f1f1f"/>
            <path d="M3.5 6.5C5 5 6.4 4.25 8 4.25c1.6 0 3 .75 4.5 2.25" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M1 3.5C3.2 1.3 5.5 0 8 0c2.5 0 4.8 1.3 7 3.5" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
          {/* Battery (Crisp & Solid 80% Fill) */}
          <div className="flex items-center gap-0.5">
            <div className="w-5 h-2.5 border border-[#1f1f1f] rounded-[2px] p-[1px] flex items-center bg-white">
              <div className="h-full w-[80%] bg-[#1f1f1f] rounded-[1px]" />
            </div>
            <div className="w-0.5 h-1 bg-[#1f1f1f] rounded-r-[1px]" />
          </div>
        </div>
      </div>

      {/* Blinkit delivery header */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-surface">
        <div>
          <p className="text-[10px] text-ink-soft font-medium">Blinkit in</p>
          <div className="flex items-center gap-1.5">
            <p className="text-lg font-bold text-ink leading-none">8 minutes</p>
            <span className="bg-[#e8f5e9] text-brand-green text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              840 m away
            </span>
          </div>
          <p className="text-[11px] text-ink-soft mt-0.5">WORK · Sector 34, Chandigarh ▾</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-green-tint flex items-center justify-center text-sm">
            💰
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-alt border border-line flex items-center justify-center text-sm">
            👤
          </div>
        </div>
      </div>
    </div>
  )
}
