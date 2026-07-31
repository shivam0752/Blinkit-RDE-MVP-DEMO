---
name: Hyper-Speed Commerce
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1b1c'
  on-surface-variant: '#4d4632'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#7e775f'
  outline-variant: '#d0c6ab'
  surface-tint: '#705d00'
  primary: '#705d00'
  on-primary: '#ffffff'
  primary-container: '#f7d000'
  on-primary-container: '#6b5900'
  inverse-primary: '#e9c400'
  secondary: '#006e16'
  on-secondary: '#ffffff'
  secondary-container: '#8ffb87'
  on-secondary-container: '#007518'
  tertiary: '#0061a5'
  on-tertiary: '#ffffff'
  tertiary-container: '#b6d5ff'
  on-tertiary-container: '#005d9e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe16d'
  primary-fixed-dim: '#e9c400'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#544600'
  secondary-fixed: '#8ffb87'
  secondary-fixed-dim: '#74dd6e'
  on-secondary-fixed: '#002203'
  on-secondary-fixed-variant: '#00530e'
  tertiary-fixed: '#d2e4ff'
  tertiary-fixed-dim: '#9fcaff'
  on-tertiary-fixed: '#001d37'
  on-tertiary-fixed-variant: '#00497e'
  background: '#fcf9f8'
  on-background: '#1b1b1c'
  surface-variant: '#e5e2e1'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 22px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 1rem
  gutter: 0.75rem
  stack-xs: 0.25rem
  stack-sm: 0.5rem
  stack-md: 1rem
  card-padding: 0.75rem
---

## Brand & Style
The design system is engineered for high-velocity, high-frequency commerce. It prioritizes clarity, urgency, and approachability to facilitate "blink of an eye" decision making. The aesthetic follows a **Corporate Modern** approach with **High-Contrast** accents, utilizing a clean white canvas to make product imagery and vibrant call-to-actions (CTAs) pop.

The brand personality is energetic, dependable, and ultra-convenient. It aims to evoke a sense of relief and efficiency, ensuring that the interface feels helpful rather than overwhelming despite the dense variety of information.

## Colors
The palette is built around high-visibility signaling. 
- **Primary (Vibrant Yellow):** Used for key brand moments, search bars, and urgent action outlines. It signifies energy and speed.
- **Secondary (Forest Green):** Reserved for "Success" states, pricing, and "Add" actions to create a psychological link with value and completion.
- **Tertiary (Delivery Blue):** Used for logistics-related information like distance and delivery badges.
- **Neutral:** A deep carbon black for high-legibility text and a range of cool greys for structural boundaries.

## Typography
The system uses **Plus Jakarta Sans** as the primary typeface to balance professional structure with friendly, rounded apertures. Typography is treated as a hierarchy of importance, using heavy weights (700-800) for time-sensitive info like "8 minutes" and lighter Inter weights for utilitarian metadata.

Spacing is tight to accommodate high-density information architecture, but letter-spacing is slightly reduced on headlines to maintain a modern, "tucked" look.

## Layout & Spacing
This design system utilizes a **Fluid Grid** model optimized for mobile-first consumption. 
- **Margins:** Standard 16px (1rem) side margins for the main container.
- **Grid:** A flexible 2-column or 3-column layout for product listings, with 12px (0.75rem) gutters to maximize screen real estate.
- **Density:** High density is preferred. Vertical spacing between logical sections (e.g., "Frequently Bought" vs "Categories") uses 24px-32px, while internal card elements use tight 4px-8px increments.

## Elevation & Depth
Depth is conveyed primarily through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. 
- **Surfaces:** Cards use a subtle 1px border (#E5E7EB) or very soft ambient shadows (4px blur, 5% opacity) to separate from the white background.
- **Floating Elements:** Global navigation bars and "View Cart" triggers use a more pronounced elevation with a 12px blur and 10% black tint to denote priority over the scrollable content.
- **Active States:** Subtle scale-down transforms (98%) are used on pressable cards to provide tactile feedback.

## Shapes
The shape language is consistently **Rounded**. 
- **Small Elements (Chips, Badges):** 4px to 6px radius.
- **Main Cards & Input Fields:** 12px (0.75rem) radius to feel modern and accessible.
- **Promotional Banners:** Larger 16px radius.
- **Full-Width Action Buttons:** Can use "Pill" (999px) or match card roundedness (12px) depending on the context of the container.

## Components

### Product Cards
Cards should have a fixed-width container in grids. They feature a top-aligned image area (aspect ratio 1:1), followed by title, weight/quantity, price, and the "Add" button. Use a 1px #F3F4F6 border to define the card boundary on white backgrounds.

### 'Add' Buttons
These are signature components.
- **Style:** White background with a 1px or 1.5px border of `primary_color_hex` (Yellow).
- **Typography:** `label-bold` in `secondary_color_hex` (Green) to indicate the "Go" signal.
- **Hover/Active:** Fills with a light yellow tint (#FEF9C3).

### Delivery Badges
Utilize a light blue background (#EBF8FF) with `tertiary_color_hex` (Blue) text. These should be compact, using `label-sm` typography, often placed near distance or time indicators.

### Search Bar
A prominent, full-width component with a `primary_color_hex` border or accent. It must include a leading search icon and a trailing microphone icon to emphasize ease of use.

### Category Icons
Circular or softly rounded squares with a subtle background tint and high-quality iconography or photography, paired with `label-sm` text centered underneath.