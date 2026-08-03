// ══════════════════════════════════════════════════════════════════
// SCOUT — Full Persona & Occasion Spec
// Source of truth: RDE Specification.md (Updated Sections 2, 7, 7a, 7b)
// ══════════════════════════════════════════════════════════════════

import { occasionSuggestions, bakeryProducts } from '../data/products.js'

export const CATEGORIES = [
  'Groceries',
  'Snacks & Beverages',
  'Household Essentials',
  'Pet Supplies',
  'Personal Care & Beauty',
  'Baby Products',
  'Gourmet & Imported Food',
  'Electronics & Accessories',
]

// ── Section 7: Personas (Daily Essentials Stockers segment) ──────
export const PERSONAS = [
  {
    id: 'persona_a',
    name: 'The Habitual Stocker',
    subtitle: 'Persona A',
    lifestyle: '25F, working professional, Mumbai',
    avatar: '👩‍💼',
    purchaseHistory: ['Groceries', 'Snacks & Beverages', 'Household Essentials'],
  },
  {
    id: 'persona_b',
    name: 'The Cautious Explorer',
    subtitle: 'Persona B',
    lifestyle: '20M, hosteler, Delhi',
    avatar: '👨‍🎓',
    purchaseHistory: ['Groceries', 'Snacks & Beverages', 'Personal Care & Beauty', 'Electronics & Accessories'],
  },
  {
    id: 'persona_c',
    name: 'The Growing Family Shopper',
    subtitle: 'Persona C',
    lifestyle: '34F, homemaker, Bengaluru',
    avatar: '👩‍👦',
    purchaseHistory: ['Groceries', 'Household Essentials', 'Baby Products'],
  },
]

// ── Section 2: Occasion-Based Suggestion Model ────────────────────
export const OCCASION_MAP = {
  bread: {
    occasion: 'Breakfast & Pantry',
    category: 'Groceries',
    suggestions: [
      { id: 'gf-1', item: 'Epigamia Greek Yogurt', category: 'Gourmet & Imported Food', subcategory: 'Dairy' },
      { id: 'sn-1', item: 'Real Fruit Juice', category: 'Snacks & Beverages', subcategory: 'Juices' },
      { id: 'gf-2', item: 'Fruit Spread / Jam', category: 'Gourmet & Imported Food', subcategory: 'Spreads' },
      { id: 'gf-3', item: 'Muesli & Granola Pack', category: 'Gourmet & Imported Food', subcategory: 'Breakfast Cereals' },
      { id: 'sn-2', item: 'Herbal Green Tea Box', category: 'Snacks & Beverages', subcategory: 'Beverages' },
    ],
  },
  'dog food': {
    occasion: 'Pet Care',
    category: 'Pet Supplies',
    suggestions: [
      { id: 'ps-1', item: 'Rubber Chew Ball', category: 'Pet Supplies', subcategory: 'Toys' },
      { id: 'ps-2', item: 'Pet Grooming Wipes', category: 'Pet Supplies', subcategory: 'Grooming' },
      { id: 'ps-3', item: 'Soft Pet Bed Cushion', category: 'Pet Supplies', subcategory: 'Bedding' },
      { id: 'ps-4', item: 'Pet Multivitamin Chews', category: 'Pet Supplies', subcategory: 'Health' },
    ],
  },
  diapers: {
    occasion: 'New Parent Essentials',
    category: 'Baby Products',
    suggestions: [
      { id: 'bb-1', item: 'Corner & Edge Guards', category: 'Baby Products', subcategory: 'Safety' },
      { id: 'bb-2', item: 'Soft Rattle Toy Set', category: 'Baby Products', subcategory: 'Toys' },
      { id: 'bb-3', item: 'Baby Sunscreen & Skincare', category: 'Baby Products', subcategory: 'Skincare' },
      { id: 'el-3', item: 'Compact Baby Monitor', category: 'Electronics & Accessories', subcategory: 'Baby Tech' },
    ],
  },
  'swiss knife': {
    occasion: 'Travel & Camping',
    category: 'Household Essentials',
    suggestions: [
      { id: 'el-1', item: '10000mAh Power Bank', category: 'Electronics & Accessories', subcategory: 'Power' },
      { id: 'el-2', item: 'Braided USB-C Cable', category: 'Electronics & Accessories', subcategory: 'Cables' },
      { id: 'pc-2', item: 'Travel-Size Toiletries Kit', category: 'Personal Care & Beauty', subcategory: 'Travel' },
      { id: 'sn-3', item: 'Energy Bars Multi-Pack', category: 'Snacks & Beverages', subcategory: 'Energy Food' },
      { id: 'he-6', item: 'Insulated Steel Travel Cup', category: 'Household Essentials', subcategory: 'Camping Gear' },
      { id: 'he-7', item: 'Small Butane Cylinder', category: 'Household Essentials', subcategory: 'Camping Gear' },
      { id: 'he-8', item: 'Portable Camping Stove', category: 'Household Essentials', subcategory: 'Camping Gear' },
      { id: 'he-9', item: 'Poncho / Rain Jacket', category: 'Household Essentials', subcategory: 'Weather Gear' },
    ],
  },
  chips: {
    occasion: 'Snacking & Home Entertainment',
    category: 'Snacks & Beverages',
    suggestions: [
      { id: 'gf-4', item: 'Gourmet Frozen Popcorn', category: 'Gourmet & Imported Food', subcategory: 'Frozen Snacks' },
      { id: 'gf-5', item: 'Belgian Chocolate Ice Cream', category: 'Gourmet & Imported Food', subcategory: 'Desserts' },
      { id: 'el-4', item: 'Portable Bluetooth Speaker', category: 'Electronics & Accessories', subcategory: 'Audio' },
      { id: 'he-2', item: 'Paper Napkins & Plates Pack', category: 'Household Essentials', subcategory: 'Party Supplies' },
    ],
  },
  shampoo: {
    occasion: 'Self-Care & Relaxation',
    category: 'Personal Care & Beauty',
    suggestions: [
      { id: 'he-3', item: 'Soft Cotton Bath Towel', category: 'Household Essentials', subcategory: 'Bath' },
      { id: 'he-4', item: 'Scented Aromatherapy Candle', category: 'Household Essentials', subcategory: 'Home Fragrance' },
      { id: 'sn-2', item: 'Herbal Green Tea Box', category: 'Snacks & Beverages', subcategory: 'Beverages' },
      { id: 'el-5', item: 'True Wireless Earbuds', category: 'Electronics & Accessories', subcategory: 'Audio' },
    ],
  },
  'phone charger': {
    occasion: 'Work-From-Home & Desk Setup',
    category: 'Electronics & Accessories',
    suggestions: [
      { id: 'gf-6', item: 'Premium Instant Coffee Granules', category: 'Gourmet & Imported Food', subcategory: 'Coffee' },
      { id: 'he-5', item: 'Bamboo Desk Organizer Tray', category: 'Household Essentials', subcategory: 'Organization' },
      { id: 'pc-2', item: 'Travel-Size Toiletries Kit', category: 'Personal Care & Beauty', subcategory: 'Travel' },
      { id: 'sn-2', item: 'Herbal Green Tea Box', category: 'Snacks & Beverages', subcategory: 'Beverages' },
    ],
  },
}

// ── Section 2a: Fallback Pairing Table ─────────────────────────────
export const FALLBACK_PAIRINGS = {
  Groceries: ['Gourmet & Imported Food', 'Household Essentials'],
  'Snacks & Beverages': ['Gourmet & Imported Food', 'Personal Care & Beauty'],
  'Household Essentials': ['Personal Care & Beauty', 'Baby Products'],
  'Pet Supplies': ['Household Essentials', 'Gourmet & Imported Food'],
  'Personal Care & Beauty': ['Household Essentials', 'Gourmet & Imported Food'],
  'Baby Products': ['Personal Care & Beauty', 'Household Essentials'],
  'Gourmet & Imported Food': ['Snacks & Beverages', 'Groceries'],
  'Electronics & Accessories': ['Household Essentials', 'Groceries'],
}

// Fallback product items per category
export const FALLBACK_ITEMS = {
  'Baby Products': 'bb-1',
  'Gourmet & Imported Food': 'gf-1',
  'Household Essentials': 'he-1',
  'Personal Care & Beauty': 'pc-1',
  'Pet Supplies': 'ps-1',
  'Snacks & Beverages': 'sn-1',
  'Electronics & Accessories': 'el-1',
  Groceries: 'br-1',
}

// ── Section 3: Honest Barrier / Reassurance Line table (No Em-dashes) ──────
export const BARRIER_LINES = {
  'Pet Supplies': {
    barrier: 'trust_deficit',
    template: 'Zero complaints in past 6 months: 7-day return policy for unopened items.',
  },
  'Snacks & Beverages': {
    barrier: 'quality_assurance',
    template: 'Zero complaints in past 3 months: fresh stock & express 8-min delivery.',
  },
  'Baby Products': {
    barrier: 'authenticity_concern',
    template: 'Sealed & verified at source: zero complaints in past 6 months.',
  },
  'Gourmet & Imported Food': {
    barrier: 'assortment_uncertainty',
    template: 'Zero complaints in past 3 months: small-batch fresh quality guarantee.',
  },
  'Household Essentials': {
    barrier: 'quality_assurance',
    template: 'Zero complaints in past 6 months: authentic quality & 3-day return policy.',
  },
  'Electronics & Accessories': {
    barrier: 'authenticity_concern',
    template: 'Tamper-proof sealed: zero complaints & 7-day replacement guarantee.',
  },
  'Personal Care & Beauty': {
    barrier: 'authenticity_concern',
    template: 'Zero complaints in past 6 months: 100% authentic brand warranty included.',
  },
  Groceries: {
    barrier: 'quality_doubt',
    template: 'Zero complaints in past 6 months: freshness guaranteed with instant replacement.',
  },
}

export const SEARCH_CATEGORY_MAP = {
  bread: 'Groceries',
  'dog food': 'Pet Supplies',
  diapers: 'Baby Products',
  'swiss knife': 'Household Essentials',
  chips: 'Snacks & Beverages',
  shampoo: 'Personal Care & Beauty',
  'phone charger': 'Electronics & Accessories',
}

export function isZeroHistory(category, purchaseHistory) {
  return !purchaseHistory.includes(category)
}

// Trace reasoning for the right-side Live Scout Insight Panel (Section 5)
export function traceRdeReasoning(query, persona, cartCategories = [], completedOrders = [], hasUnlockedNewCategoryThisMonth = false) {
  const norm = query.toLowerCase().trim()
  const occ = OCCASION_MAP[norm]
  // Cart contents are deliberately EXCLUDED from history here: adding a suggested
  // item must not flip it to "filtered" (which would exhaust the pool and cascade
  // into a fresh, often irrelevant zero-history pick). Only completed purchases count.
  const userHistory = [...persona.purchaseHistory, ...completedOrders]

  // Least-recently-reordered habitual category from user purchase history
  const habitualCategory = persona.purchaseHistory[0] ?? 'Groceries'

  // Helper to build a habitual restock candidate
  const getRestockCandidate = (cat) => {
    const restockProduct =
      occasionSuggestions.find((s) => s.category === cat) ??
      bakeryProducts.find((s) => s.category === cat) ?? {
        id: 'br-2',
        name: 'Britannia Brown Bread',
        category: 'Groceries',
        price: 55,
        qty: '400 g',
        emoji: '🥖',
        tint: '#f7ead8',
      }

    return {
      id: restockProduct.id,
      item: restockProduct.name,
      category: cat,
      status: 'restock',
      isRestock: true,
      badgeLabel: 'Running low on this?',
      reason: `Habitual restock for ${cat} (Excluded from Scout discovery metrics)`,
      noTrustLine: true,
      excludeFromMetrics: true,
    }
  }

  // Monthly cadence cap: 1 new-category unlock per user per mocked month.
  // Fires only once a new-category purchase has been COMPLETED this mocked month.
  // Items merely sitting in the cart do not trip the cap — the recommendation
  // card keeps showing the same suggestions even after they are added.
  if (hasUnlockedNewCategoryThisMonth) {
    const restockCand = getRestockCandidate(habitualCategory)
    return {
      query: norm,
      occasionName: occ ? occ.occasion : `General Search (${norm})`,
      candidates: [restockCand],
      fallbackFired: true,
      isRestockFallback: true,
      monthlyCapReached: true,
      fallbackDetails: `Monthly cadence cap active: 1 new-category purchase already completed this mocked month. Suppressing further zero-history recommendations and surfacing habitual restock ("Running low on this?") for ${habitualCategory}.`,
    }
  }

  if (!occ) {
    // Search query outside explicit occasion map -> trigger Fallback (Section 2a)
    const detectedCategory = SEARCH_CATEGORY_MAP[norm] ?? 'Groceries'
    const pairings = FALLBACK_PAIRINGS[detectedCategory] ?? ['Household Essentials', 'Groceries']
    const validFallbackCategory =
      pairings.find((c) => isZeroHistory(c, userHistory)) ??
      CATEGORIES.find((c) => isZeroHistory(c, userHistory))

    if (validFallbackCategory) {
      return {
        query: norm,
        occasionName: `General Search (${detectedCategory})`,
        candidates: [
          {
            id: FALLBACK_ITEMS[validFallbackCategory],
            item: `Bestseller in ${validFallbackCategory}`,
            category: validFallbackCategory,
            status: 'shown',
            isRestock: false,
            badgeLabel: 'Zero-History',
            reason: 'Selected via Section 2a Fallback Rule',
          },
        ],
        fallbackFired: true,
        isRestockFallback: false,
        fallbackDetails: `Main pool exhausted or unspecified query. Section 2a Fallback selected zero-history category ${validFallbackCategory}.`,
      }
    } else {
      // Both main pool and Section 2a fallback produced NO zero-history item
      // -> Surface "Running low on this?" habitual restock card
      const restockCand = getRestockCandidate(habitualCategory)
      return {
        query: norm,
        occasionName: `General Search (${detectedCategory})`,
        candidates: [restockCand],
        fallbackFired: true,
        isRestockFallback: true,
        fallbackDetails: `Main pool and Section 2a fallback produced no zero-history items. Surfacing habitual restock ("Running low on this?") for ${habitualCategory} — excluded from discovery metrics.`,
      }
    }
  }

  // Evaluate candidate pool for explicit occasion
  const candidates = occ.suggestions.map((s) => {
    const isZero = isZeroHistory(s.category, userHistory)
    return {
      ...s,
      status: isZero ? 'shown' : 'filtered',
      isRestock: false,
      badgeLabel: 'Zero-History',
      reason: isZero ? 'Zero-history for active persona' : `Already habitual (${s.category})`,
    }
  })

  const shownCount = candidates.filter((c) => c.status === 'shown').length
  let fallbackFired = false
  let isRestockFallback = false
  let fallbackDetails = null

  // Check if main occasion pool was completely filtered out
  if (shownCount === 0) {
    fallbackFired = true
    const detectedCategory = occ.category
    const pairings = FALLBACK_PAIRINGS[detectedCategory] ?? ['Household Essentials', 'Groceries']
    const validFallbackCategory =
      pairings.find((c) => isZeroHistory(c, userHistory)) ??
      CATEGORIES.find((c) => isZeroHistory(c, userHistory))

    if (validFallbackCategory) {
      const fallbackItemId = FALLBACK_ITEMS[validFallbackCategory] ?? 'bb-1'
      fallbackDetails = `All ${occ.suggestions.length} items in ${occ.occasion} pool were filtered out (already habitual for ${persona.name}). Section 2a Fallback triggered -> zero-history category ${validFallbackCategory} selected.`

      candidates.push({
        id: fallbackItemId,
        item: `Fallback Item (${validFallbackCategory})`,
        category: validFallbackCategory,
        status: 'shown',
        isRestock: false,
        badgeLabel: 'Zero-History',
        reason: `Fallback selection (${validFallbackCategory})`,
      })
    } else {
      // BOTH main occasion pool AND Section 2a fallback produced NO zero-history item!
      // Surface "Running low on this?" habitual restock card
      isRestockFallback = true
      const restockCand = getRestockCandidate(habitualCategory)
      fallbackDetails = `All occasion & Section 2a fallback categories are in ${persona.name}'s purchase history. Surfacing habitual restock ("Running low on this?") for ${habitualCategory} — excluded from discovery metrics.`

      candidates.push(restockCand)
    }
  }

  return {
    query: norm,
    occasionName: occ.occasion,
    candidates,
    fallbackFired,
    isRestockFallback,
    fallbackDetails,
  }
}
