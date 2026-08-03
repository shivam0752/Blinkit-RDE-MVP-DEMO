// RdeContext — Persona State & Live Scout Reasoning Tracer
import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import {
  PERSONAS,
  BARRIER_LINES,
  getProductTrustLine,
  isZeroHistory,
  traceRdeReasoning,
  SEARCH_CATEGORY_MAP,
} from '../rde/rde.js'
import { getProduct } from '../data/products.js'

const RdeContext = createContext(null)

export function RdeProvider({ children }) {
  const [activePersonaId, setActivePersonaId] = useState(PERSONAS[0].id)
  const [searchQuery, setSearchQuery] = useState('bread')
  const [completedOrders, setCompletedOrders] = useState([])
  const [hasUnlockedNewCategoryThisMonth, setHasUnlockedNewCategoryThisMonth] = useState(false)
  const [clickedItemIds, setClickedItemIds] = useState(new Set())

  // Get active persona object
  const activePersona = useMemo(() => {
    return PERSONAS.find((p) => p.id === activePersonaId) ?? PERSONAS[0]
  }, [activePersonaId])

  const handleSetActivePersonaId = (id) => {
    setActivePersonaId(id)
    setCompletedOrders([])
    setHasUnlockedNewCategoryThisMonth(false)
  }

  // Mocked "new month" trigger for demo purposes: only the cadence flag resets.
  // completedOrders is kept, so the converted category stays non-zero-history and
  // the next suggestion is reasoned fresh from current purchase history.
  const simulateNewMonth = () => {
    setHasUnlockedNewCategoryThisMonth(false)
  }

  // Demo hook: no UI element exists for the mocked month reset, so expose it
  // on window for manual triggering from the console.
  useEffect(() => {
    window.scoutSimulateNewMonth = simulateNewMonth
    return () => {
      delete window.scoutSimulateNewMonth
    }
  }, [])

  // Helper for checking zero-history category against active persona + cart + completed orders
  const isNewCategoryFn = (category, activeCartCategories = []) => {
    const allPurchased = [
      ...activePersona.purchaseHistory,
      ...completedOrders,
      ...activeCartCategories,
    ]
    return isZeroHistory(category, allPurchased)
  }

  // Get trace reasoning for the Live Insight Panel (Section 5)
  const getTrace = (activeCartCategories = []) => {
    return traceRdeReasoning(
      searchQuery,
      activePersona,
      activeCartCategories,
      completedOrders,
      hasUnlockedNewCategoryThisMonth
    )
  }

  // Get zero-history occasion pool for search or checkout
  const getZeroHistoryOccasionPool = (activeCartCategories = []) => {
    const trace = getTrace(activeCartCategories)
    return trace.candidates
      .filter((c) => c.status === 'shown' || c.status === 'restock' || c.isRestock)
      .map((c) => {
        const prod = getProduct(c.id)
        if (!prod) return null
        return {
          ...prod,
          isRestock: c.isRestock ?? trace.isRestockFallback,
          badgeLabel: c.badgeLabel,
          noTrustLine: c.noTrustLine,
        }
      })
      .filter(Boolean)
  }

  const recordOrderCompletion = (cartProductIds) => {
    const orderCategories = cartProductIds
      .map((id) => getProduct(id)?.category)
      .filter(Boolean)

    // Check if any purchased item was from a new category BEFORE this order completion
    const userHistory = [...activePersona.purchaseHistory, ...completedOrders]
    const containsNewCategory = orderCategories.some((cat) => isZeroHistory(cat, userHistory))

    if (containsNewCategory) {
      setHasUnlockedNewCategoryThisMonth(true)
    }

    setCompletedOrders((prev) => Array.from(new Set([...prev, ...orderCategories])))
  }

  const recordItemClick = (id) => {
    setClickedItemIds((prev) => new Set([...prev, id]))
  }

  const lineFor = (category, productOrId) => getProductTrustLine(category, productOrId)

  return (
    <RdeContext.Provider
      value={{
        personas: PERSONAS,
        activePersona,
        setActivePersonaId: handleSetActivePersonaId,
        searchQuery,
        setSearchQuery,
        completedOrders,
        hasUnlockedNewCategoryThisMonth,
        simulateNewMonth,
        recordOrderCompletion,
        clickedItemIds,
        recordItemClick,
        getZeroHistoryOccasionPool,
        getTrace,
        isNewCategory: isNewCategoryFn,
        lineFor,
      }}
    >
      {children}
    </RdeContext.Provider>
  )
}

export const useRde = () => useContext(RdeContext)
