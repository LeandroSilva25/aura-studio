---
name: Aura Noir
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d1c5b4'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#9a8f80'
  outline-variant: '#4e4639'
  surface-tint: '#e9c176'
  primary: '#e9c176'
  on-primary: '#412d00'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#775a19'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c9c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#a7a5a4'
  on-tertiary-container: '#3c3b3b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

This design system is anchored in the concept of "discreet luxury," a philosophy that prioritizes substance, silence, and sophisticated materiality over overt branding. The visual language is inspired by the curated stillness of high-end art galleries and the immersive, moody atmosphere of boutique hotels. 

The aesthetic is a refined mix of **Minimalism** and **Modern Elegance**. It utilizes expansive whitespace (or "dark space") to create a sense of architectural breathing room, ensuring every portfolio piece is treated as a singular work of art. Interactions are characterized by subtle, low-velocity transitions that mimic the quiet grace of a premium physical environment. The emotional goal is to evoke a sense of exclusivity, calm, and meticulous craftsmanship.

## Colors

The palette is rooted in a monochromatic spectrum of blacks and charcoals to establish depth and weight. **Midnight Black** serves as the foundational canvas, while **Onyx** and **Deep Charcoal** provide tonal layering for containers and structural elements.

**Champagne Gold** (the primary accent) is used sparingly—as a "metallic thread" throughout the interface—to highlight key actions and denote premium status. For text, **Off-White** and **Light Grey** are utilized to maintain high readability while avoiding the harshness of pure white, preserving the "discreet" nature of the luxury aesthetic.

## Typography

The typographic strategy balances heritage with modernity. **Bodoni Moda** is the core display face; its high-contrast strokes and vertical stress bring a fashion-forward, editorial elegance to headlines. It should be typeset with tight tracking for a confident, architectural appearance.

**Hanken Grotesk** provides a functional counterpoint. As a clean, geometric sans-serif, it handles body copy and technical metadata with precision. Labels are frequently set in uppercase with increased letter spacing to emulate the engraved signage found in luxury environments.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy for large-screen experiences to maintain controlled, gallery-like compositions, transitioning to a flexible fluid model for mobile.

The "breathable" nature of the brand is achieved through a generous 8px-base spacing scale. Section gaps are intentionally large (120px+) to isolate content and prevent visual clutter. On desktop, a 12-column grid is used with wide 64px margins, often leaving 2-3 columns empty to create asymmetrical, sophisticated layouts reminiscent of a luxury lookbook.

## Elevation & Depth

In a "discreet luxury" context, depth is conveyed through **Tonal Layers** and **Refined Borders** rather than aggressive shadows. Surfaces are stacked using slight variations in black values (e.g., a charcoal card on a midnight background).

When borders are used, they are "hairline" width (1px) with low-opacity gold or grey tints. For high-engagement moments, a subtle **Backdrop Blur** (Glassmorphism) is applied to overlays, simulating the look of smoked glass. Shadows, if used, are extremely soft, diffused, and tinted with the background hue to remain nearly imperceptible.

## Shapes

To reinforce the architectural and modern feel of this design system, a **Sharp** shape language is used. 0px corner radii on all buttons, cards, and input fields create a sense of precision, discipline, and permanence. This sharpness reflects the clean lines of luxury interior architecture and avoids the "friendly" softness typical of consumer SaaS, positioning the brand as an authoritative studio.

## Components

### Buttons
Primary buttons are solid charcoal with champagne gold text or a fine 1px gold border. Hover states involve a slow, cinematic color transition or a slight expansion of the letter spacing. All buttons are rectangular with sharp 0px corners.

### Input Fields
Inputs are minimalist, consisting of a single bottom border (hairline) that turns gold upon focus. Labels float above in uppercase, high-tracking sans-serif.

### Cards
Cards do not use shadows. They are defined by their background color (a step lighter than the page) or a subtle 1px border. They prioritize large, high-resolution imagery with minimal text overlays.

### Navigation
The navigation is sparse, often utilizing a "hidden" menu or a very simple horizontal list with ample spacing. Transitions between pages should be soft fades to maintain the "quiet" atmosphere.

### Additional Elements
- **Image Frames:** Generous padding around images to simulate museum matting.
- **Dividers:** Extremely faint, 1px horizontal lines used to separate distinct conceptual sections without breaking the visual flow.