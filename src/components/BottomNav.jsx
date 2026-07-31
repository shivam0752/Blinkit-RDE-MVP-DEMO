import { NavLink } from 'react-router-dom'
import { Home, ShoppingBag, LayoutGrid, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const tabs = [
  { to: '/',       icon: Home,         label: 'Home' },
  { to: '/orders', icon: ShoppingBag,  label: 'Orders' },
  { to: '/cats',   icon: LayoutGrid,   label: 'Categories' },
  { to: '/cart',   icon: ShoppingCart, label: 'Cart' },
]

export default function BottomNav() {
  const { count } = useCart()

  return (
    <div className="flex flex-row items-center justify-around w-full h-[56px] bg-white border-t border-line flex-shrink-0 z-30">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center h-full relative ${
              isActive ? 'text-brand-green' : 'text-ink-soft'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                {label === 'Cart' && count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-accent-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold mt-0.5">{label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-brand-green rounded-t-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}
