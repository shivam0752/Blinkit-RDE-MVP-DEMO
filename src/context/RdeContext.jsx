// RdeContext — Persona State & Live RDE Reasoning Tracer
import { createContext, useContext, useState, useMemo } from 'react'
import {
  PERSONAS,
  BARRIER_LINES,
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
  const [clickedItemIds, setClickedItemIds] = useState(new Set())

  // Get active persona object
  const activePersona = useMemo(() => {
    return PERSONAS.find((p) => p.id === activePersonaId) ?? PERSONAS[0]
  }, [activePersonaId])

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
    return traceRdeReasoning(searchQuery, activePersona, activeCartCategories, completedOrders)
  }

  // Get zero-history occasion pool for search or checkout
  const getZeroHistoryOccasionPool = (activeCartCategories = []) => {
    const trace = getTrace(activeCartCategories)
    return trace.candidates
      .filter((c) => c.status === 'shown')
      .map((c) => getProduct(c.id))
      .filter(Boolean)
  }

  const recordOrderCompletion = (cartProductIds) => {
    const newCategories = cartProductIds
      .map((id) => getProduct(id)?.category)
      .filter(Boolean)

    setCompletedOrders((prev) => Array.from(new Set([...prev, ...newCategories])))
  }

  const recordItemClick = (id) => {
    setClickedItemIds((prev) => new Set([...prev, id]))
  }

  const lineFor = (category) => BARRIER_LINES[category]?.template ?? null

  return (
    <RdeContext.Provider
      value={{
        personas: PERSONAS,
        activePersona,
        setActivePersonaId,
        searchQuery,
        setSearchQuery,
        completedOrders,
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
