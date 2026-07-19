---
name: Artisan Foundry
colors:
  surface: '#fff8f4'
  surface-dim: '#e1d8d2'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2eb'
  surface-container: '#f5ece5'
  surface-container-high: '#f0e7df'
  surface-container-highest: '#eae1da'
  on-surface: '#1f1b17'
  on-surface-variant: '#434843'
  inverse-surface: '#34302b'
  inverse-on-surface: '#f8efe8'
  outline: '#747873'
  outline-variant: '#c3c8c2'
  surface-tint: '#556157'
  primary: '#18241b'
  on-primary: '#ffffff'
  primary-container: '#2d3930'
  on-primary-container: '#95a397'
  inverse-primary: '#bccabd'
  secondary: '#974723'
  on-secondary: '#ffffff'
  secondary-container: '#ff996e'
  on-secondary-container: '#772f0c'
  tertiary: '#21211e'
  on-tertiary: '#ffffff'
  tertiary-container: '#363633'
  on-tertiary-container: '#a09f9a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e6d9'
  primary-fixed-dim: '#bccabd'
  on-primary-fixed: '#131e16'
  on-primary-fixed-variant: '#3d4a40'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#79300e'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#fff8f4'
  on-background: '#1f1b17'
  surface-variant: '#eae1da'
typography:
  display-lg:
    fontFamily: Literata
    fontSize: 56px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Literata
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.2'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system is centered on the concept of "Premium Craft meets Tech Innovation." It bridges the gap between high-precision 3D engineering and the tactile warmth of a boutique workshop. The personality is sophisticated, knowledgeable, and inviting—aiming to make advanced manufacturing feel like an accessible art form.

The visual style is **Minimalism** with **Tactile** influences. It utilizes generous whitespace and a refined grid to let the intricate details of 3D-printed textures breathe. Subtle depth is used not for decoration, but to suggest the three-dimensional nature of the product itself.

## Colors
The palette is rooted in earth-toned neutrals that mirror natural filament materials. 
- **Primary (Deep Forest Green):** Used for primary navigation, high-level headers, and main CTAs. It provides a sense of established quality and "studious" innovation.
- **Secondary (Terracotta):** A warm accent used sparingly for interaction highlights, "New" badges, and links. It draws the eye to the material quality.
- **Background (Soft Cream/Tan):** `#F8F5F0` serves as the primary canvas, reducing the harshness of pure white and feeling more like a curated gallery.
- **Neutral:** A warm grey-brown used for body text and subtle UI borders to maintain softness.

## Typography
The system uses a pairing of **Literata** and **Hanken Grotesk**. 
- **Literata** (Serif) is used for headlines to convey the "Artisan" side of the brand. Its slightly bookish, characterful strokes make technical descriptions feel like curated stories.
- **Hanken Grotesk** (Sans-Serif) handles the "Innovation" side. It is clean, sharp, and highly legible, used for all UI elements, body copy, and technical specs.
- Large display type should use tighter letter spacing for a more premium, editorial feel.

## Layout & Spacing
This design system utilizes a **fixed grid** approach for desktop to create a centered, gallery-like experience. 
- **Desktop:** 12-column grid with a 1280px max-width. Margins are intentionally wide (64px) to emphasize a premium feel.
- **Mobile:** Single column with 20px side margins. 
- **Rhythm:** An 8px baseline grid drives all spacing. Component padding should favor vertical breathing room (e.g., 16px top/bottom for list items) to avoid a "cluttered tech" look.

## Elevation & Depth
Elevation is communicated through **Tonal Layers** and extremely **Ambient Shadows**.
- **Surface 1:** The Cream background.
- **Surface 2:** A slightly lighter cream or pure white used for cards and modals.
- **Shadows:** Use a "soft-press" effect. Shadows should have a large blur (24px+) and very low opacity (4-6%) with a slight tint of the Primary color to keep the shadows from feeling "dirty" on the warm background.
- **Outlines:** Subtle 1px borders in a muted version of the neutral color are preferred over heavy shadows for input fields and secondary containers.

## Shapes
The shape language is **Soft**. 
- Standard components (buttons, inputs) use a 4px (0.25rem) radius. This provides just enough softness to feel approachable without losing the precision associated with 3D printing and engineering. 
- Product cards can utilize a larger 8px radius to feel more like physical objects.
- Icons should use a medium stroke weight (1.5px) with slightly rounded terminals.

## Components
- **Buttons:** Primary buttons are solid Deep Forest Green with white Hanken Grotesk text. Secondary buttons use the Terracotta color for the label with a "ghost" style or a very subtle Cream fill.
- **Cards:** Product cards are the centerpiece. They use Surface 2 (White) with an Ambient Shadow. Images should have a subtle warm-toned overlay to unify different print photography.
- **Inputs:** Clean, 1px bordered boxes. On focus, the border transitions to Deep Forest Green. Labels are always positioned above the field in `label-sm` style.
- **Chips:** Used for material types (e.g., "Resin", "PLA"). These should be pill-shaped with a background color that matches the material's aesthetic, using low-saturation versions of the brand colors.
- **Spec Lists:** Technical data (print time, layer height) should be presented in a clean, two-column list with Hanken Grotesk, using dividers that are only 10% opacity of the Neutral color.