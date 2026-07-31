import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { getProduct } from '../data/products.js'
import { useRde } from './RdeContext.jsx'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { isNewCategory } = useRde()

  // { [productId]: quantity }
  const [items, setItems] = useState({})
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  const add = useCallback(
    (id) => {
      setItems((prev) => {
        const isFirstAdd = !prev[id]
        const p = getProduct(id)
        if (isFirstAdd && p && isNewCategory(p.category)) {
          clearTimeout(toastTimer.current)
          setToast(`${p.brand} added: first pick from ${p.category} 🎉`)
          toastTimer.current = setTimeout(() => setToast(null), 2600)
        }
        return { ...prev, [id]: (prev[id] ?? 0) + 1 }
      })
    },
    [isNewCategory],
  )

  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = { ...prev }
      if (next[id] > 1) next[id] -= 1
      else delete next[id]
      return next
    })
  }, [])

  const count = Object.values(items).reduce((a, b) => a + b, 0)
  const total = Object.entries(items).reduce(
    (sum, [id, qty]) => sum + (getProduct(id)?.price ?? 0) * qty,
    0,
  )

  return (
    <CartContext.Provider value={{ items, add, remove, count, total, toast }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
