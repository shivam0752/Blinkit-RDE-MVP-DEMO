import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { RdeProvider } from './context/RdeContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import StatusBar from './components/StatusBar.jsx'
import CartBar from './components/CartBar.jsx'
import BottomNav from './components/BottomNav.jsx'
import PersonaSidebar from './components/PersonaSidebar.jsx'
import InsightPanel from './components/InsightPanel.jsx'
import SectionNavRail from './components/SectionNavRail.jsx'
import Toast from './components/Toast.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import SearchPicker from './screens/SearchPicker.jsx'
import SearchResults from './screens/SearchResults.jsx'
import ProductDetail from './screens/ProductDetail.jsx'
import CartReview from './screens/CartReview.jsx'
import OrderConfirmation from './screens/OrderConfirmation.jsx'
import ArchitectureScreen from './screens/ArchitectureScreen.jsx'

// Page-slide transition variants
const pageVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-25%', opacity: 0 },
}
const pageTransition = {
  type: 'tween',
  duration: 0.26,
  ease: [0.25, 0.46, 0.45, 0.94],
}

// Screens that should NOT show StatusBar + BottomNav
const HIDE_CHROME = ['/order-confirmed']

function DashboardLayout() {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('section-1') // 'section-1' | 'section-2'
  const hideChrome = HIDE_CHROME.some((s) => location.pathname.startsWith(s))

  return (
    <div className="min-h-screen flex bg-[#e6e8ec] overflow-x-hidden">
      {/* ── Leftmost Global Navigation Rail (Section 1 vs Section 2 Switcher) ── */}
      <SectionNavRail activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* ── Main Workspace Area ── */}
      <div className="flex-1 flex items-center justify-center p-3 lg:p-5 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeSection === 'section-1' ? (
            /* ── Section 1: 3-Column MVP Prototype Dashboard ── */
            <motion.div
              key="section-1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-5 max-w-[1150px] w-full my-auto flex-wrap lg:flex-nowrap"
            >
              {/* 1. Left Sidebar: Persona Selector */}
              <PersonaSidebar />

              {/* 2. Center Column: Phone Frame */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="phone-frame flex flex-col shadow-2xl">
                  {!hideChrome && <StatusBar />}

                  {/* Scrollable screen content area */}
                  <div className="flex-1 relative overflow-hidden bg-surface-alt">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={location.pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="absolute inset-0 overflow-y-auto scrollbar-hide"
                      >
                        <Routes location={location}>
                          <Route path="/" element={<HomeScreen />} />
                          <Route path="/search-pick" element={<SearchPicker />} />
                          <Route path="/search" element={<SearchResults />} />
                          <Route path="/product/:id" element={<ProductDetail />} />
                          <Route path="/cart" element={<CartReview />} />
                          <Route path="/order-confirmed" element={<OrderConfirmation />} />
                          {/* Bottom nav placeholder routes */}
                          <Route path="/orders" element={<Navigate to="/" replace />} />
                          <Route path="/cats" element={<Navigate to="/" replace />} />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </motion.div>
                    </AnimatePresence>

                    <Toast />
                  </div>

                  {/* Fixed CartBar right above BottomNav */}
                  {!hideChrome && <CartBar />}

                  {!hideChrome && <BottomNav />}
                </div>

                <p className="mt-2 text-black/40 text-[10.5px] font-semibold tracking-wide">
                  Blinkit · Section 1: Scout MVP Engine
                </p>
              </div>

              {/* 3. Right Sidebar: Live Scout Insight Panel */}
              <InsightPanel />
            </motion.div>
          ) : (
            /* ── Section 2: System Architecture & Roadmap Workspace ── */
            <motion.div
              key="section-2"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full flex-1"
            >
              <ArchitectureScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <RdeProvider>
      <CartProvider>
        <DashboardLayout />
      </CartProvider>
    </RdeProvider>
  )
}
