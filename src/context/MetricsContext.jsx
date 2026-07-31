// MetricsContext — tracks the 4 funnel events defined in RDE spec Section 5
// EXPOSURE   → suggested item rendered on screen
// ENGAGEMENT → user taps the suggested item
// CONVERSION → user adds suggested item to cart
// NSM_HIT   → CONVERSION in a zero-history category
import { createContext, useContext, useState, useCallback } from 'react'

const MetricsContext = createContext(null)

export function MetricsProvider({ children }) {
  const [metrics, setMetrics] = useState({
    EXPOSURE: 0,
    ENGAGEMENT: 0,
    CONVERSION: 0,
    NSM_HIT: 0,
  })

  const fire = useCallback((event) => {
    setMetrics(prev => ({ ...prev, [event]: prev[event] + 1 }))
    // Also log to console for demo
    console.log(`[RDE] ${event} fired at ${new Date().toISOString()}`)
  }, [])

  const reset = useCallback(() => {
    setMetrics({ EXPOSURE: 0, ENGAGEMENT: 0, CONVERSION: 0, NSM_HIT: 0 })
  }, [])

  return (
    <MetricsContext.Provider value={{ metrics, fire, reset }}>
      {children}
    </MetricsContext.Provider>
  )
}

export const useMetrics = () => useContext(MetricsContext)
