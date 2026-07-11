---
name: GEODRIV
description: AI-powered competitive intelligence consultancy for manufacturing
colors:
  primary: "#1a6fb5"
  primary-deep: "#155d99"
  primary-hover: "#2b8fd4"
  accent-warm: "#D85A30"
  dark-bg-root: "#081525"
  dark-bg-card: "#0d2137"
  dark-bg-nav: "rgba(8,21,37,0.75)"
  dark-bg-hover: "#14375a"
  dark-text-primary: "#f8fafc"
  dark-text-accent: "#1a6fb5"
  light-bg-root: "#f4f7fa"
  light-bg-card: "#ffffff"
  light-bg-nav: "rgba(244,247,250,0.75)"
  light-bg-hover: "#d6dfe8"
  light-text-primary: "#0d2137"
  light-text-accent: "#155d99"
  ink-light: "#f8fafc"
  ink-dark: "#0d2137"
typography:
  display:
    fontFamily: "Lexend, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Lexend, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "Lexend, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "'Source Sans 3', 'Noto Sans SC', -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Source Sans 3', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  ds-0: 0
  ds-4: 4px
  ds-8: 8px
  ds-12: 12px
  ds-16: 16px
  ds-20: 20px
  ds-24: 24px
  ds-32: 32px
  ds-40: 40px
  ds-48: 48px
  ds-56: 56px
  ds-64: 64px
  ds-80: 80px
---

# Design System: GEODRIV

## 1. Overview

**Creative North Star: "The Industrial Brief"**

A signal in noise. Like a well-architected control room — dark, quiet, every element purposeful. GEODRIV communicates authority through restraint: the interface steps back so the intelligence speaks first. Nothing decorative, nothing that doesn't earn its place.

This system explicitly rejects SaaS landing-page conventions (big numbers, purple gradients, Inter font, stock illustrations), McKinsey corporate sterility, and AI-tool visual clichés (glassmorphism, neon dark mode, gradient text). The goal is not "beautiful" — it is **credible**. Precision over polish. Substance over surface.

**Key Characteristics:**
- Dark-by-default, with light mode as a secondary option
- Deep navy base (#081525) anchors authority; Signal Blue (#1a6fb5) provides directional accent without dominating
- Typography drives hierarchy: Lexend for headings (architectural, confident), Source Sans 3 for body (readable, neutral)
- Borders are micro-thin (0.5–1px) — presence without weight
- Shadow is reserved for interactive state (hover/focus), not ambient decoration
- Transparent outline buttons — no filled gradient, no glossy surfaces

## 2. Colors

The palette is restrained by design. Two roles: **Signal** (directional, accent) and **Surface** (foundational). A warm accent (Rust Signal) exists as a rare emphasis tool.

### Primary
- **Signal Blue** (#1a6fb5 / dark: #155d99): The primary accent. Used for links, active states, badge indicators, and the CTA button outline. Appears on ≤10% of any given surface — its scarcity is its power.
- **Signal Blue Hover** (#2b8fd4): Brighter variant for hover/focus states on interactive elements.

### Neutral (Dark)
- **Deep Navy** (#081525): Root background. The sensory floor.
- **Card Surface** (#0d2137): Raised surface one step above root. Blog cards, containers, sections.
- **Nav Glass** (rgba(8,21,37,0.75)): Translucent nav with backdrop-filter blur (32px). Layered on top of content.
- **Hover State** (#14375a): Surface hover fill for clickable cards, list items, nav links.

### Neutral (Light)
- **Atmospheric Silver** (#f4f7fa): Light root background. Cool, not warm.
- **White** (#ffffff): Light card surface.
- **Soft Slate** (#d6dfe8): Light hover state.

### Accent
- **Rust Signal** (#D85A30): Warm accent reserved for emphasis — data callouts, highlight badges, selective use in hero depth gradients. Never overused.

### Named Rules

**The Signal Scarcity Rule.** Signal Blue occupies ≤10% of any screen. Its rarity communicates what matters: the CTA, the active link, the badge that says "new". Overuse destroys the signal.

**The Tinted Neutral Rule.** Neither pure white (#fff) nor pure black (#000) appear in the palette. Dark neutrals are deep navy; light neutrals are cool silver. Every surface carries a tint.

**The One Warm Point Rule.** Rust Signal exists as a single warm counterpoint to the cool navy system. Used once per page at most — a data highlight, a subtle depth gradient. Two warm points collapse into clutter.

## 3. Typography

**Display Font:** Lexend (geometric sans-serif, low-contrast, architectural)
**Body Font:** Source Sans 3 (humanist sans-serif, legible, neutral)
**Label Font:** Source Sans 3, 500 weight, 0.01em tracking

**Character:** The pairing is deliberate — Lexend carries authority through structure (tight spacing, geometric forms), while Source Sans 3 provides readability at body sizes. Cool, precise, no serif warmth.

### Hierarchy
- **Display** (600, clamp(2rem, 5vw, 3.5rem), 1.15): Hero and section-intro headings only. Max ceiling 3.5rem; never larger. `text-wrap: balance` required.
- **Headline** (600, clamp(1.5rem, 3vw, 2.25rem), 1.25): Major section headings, article titles.
- **Title** (600, 1.125rem, 1.4): Card titles, blog post titles in listing, sub-section headings.
- **Body** (400, 1rem, 1.6): All running text. Max line length 65–75ch. `text-wrap: pretty` for orphans.
- **Label** (500, 0.875rem, 1.4, letter-spacing 0.01em): Navigation links, tag labels, button text, metadata.

### Named Rules

**The Lexend Display Rule.** Lexend at display sizes carries -0.02em letter-spacing minimum. Anything tighter than -0.04em is prohibited — letters must not touch.

**The One Display Per Viewport Rule.** A single display-level heading per viewport on brand surfaces. Multiple display headings compete; only one should claim attention. Article content uses headline at most.

## 4. Elevation

Layered depth via tonal surface shifts, not shadows. The root surface (Deep Navy / Atmospheric Silver) is the ground; card surfaces (one tone lighter/darker) hover just above. Shadows appear only as a response to interactive state — hover and focus on buttons and cards.

This is not a flat system — depth exists — but it communicates structure through color, not projected shadows. The effect is architectural: like layers of an engineering drawing.

### Shadow Vocabulary (Interactive Only)
- **Button Glow** (`0 0 0 1px rgba(26,111,181,0.2), 0 4px 14px rgba(26,111,181,0.12)`): Default state on primary CTA button. A subtle halo, not a drop shadow.
- **Button Glow Hover** (`0 0 0 1px rgba(26,111,181,0.3), 0 4px 12px rgba(26,111,181,0.15)`): Brightened glow on button hover.
- **Cards have no default shadow.** The card surface shift (one tone from root) is sufficient elevation. Shadow on hover is permissible for clickable article cards.

### Named Rules

**The Flat-by-Default Rule.** Surfaces are flat at rest. Shadows are state responses, not default decoration. A card does not float — it sits one layer above the root, identified by its color, not by a shadow.

## 5. Components

### Navigation
Architecturally precise: 64px fixed height, edge-to-edge glass bar with backdrop-filter blur. Logo (GEODRIV | CI) left-aligned, nav links (Home, Insights, 中文, 🌙) right-aligned, no center element. Links in Secondary text color, hover to primary. Language toggle as minimal outline pill.

**Character:** "A fixed datum — read from above, not from the side."

- **Shape:** full-width bar, 64px height, 0.5px bottom border (border-card)
- **Logo:** Lexend 600, 1.0625rem, gap 4px, letter-spacing 0, white (text-primary). Never blue.
- **Links:** Source Sans 3, 0.875rem, 500 weight, text-secondary → text-primary on hover
- **Mobile:** font-size and padding reduce; nav remains horizontal

### Buttons
Transparent outline — no fill, no gradient, no glossy surface. Structure from a micro-thin border (0.5–1px) and text color.

**Character:** "An invitation, not a demand. The outline says 'available'; the glow on hover says 'ready.'"

- **Shape:** 8px radius (--r-md), consistent internal padding (--ds-16 horizontal, --ds-8 vertical)
- **Primary CTA:** 0.5px Signal Blue border, white text, shadow button-glow. Hover: brighter glow + border, no fill.
- **Secondary:** 0.5px border-card border, text-secondary color. Hover: bg-hover fill, text-primary.
- **Ghost / Theme toggle:** No border, text-secondary, 38×38px square. Hover: bg-hover fill.
- **Transitions:** All button transitions 0.2s ease, color + background + box-shadow only (no width/height animation).

### Cards
Tonal surface containers. No default shadow, no side-stripe borders, no gradient overlays. The card's background (--bg-card, one tone from root) IS the elevation signal.

**Character:** "A container that does not call attention to itself."

- **Corner:** 12px radius (--r-lg)
- **Background:** --bg-card (one tone from root)
- **Border:** 0.5–1px --border-card for definition. No thick borders.
- **Shadow:** None at rest. Permitted on hover for clickable article cards: subtle elevation through shadow shift.
- **Internal padding:** --ds-24 default

### Tags / Badges
Transparent background, no fill pill. Text directly on surface with a border outline. The badge is not a container — it's a typographic label with a thin boundary.

**Character:** "A label, not a sticker."

- **Shape:** 6px radius (--r-sm), padding 4px 10px
- **Style:** Transparent background, --text-secondary text, 0.5px --border-card border
- **Hover (clickable):** --text-primary text, --border-strong border

### Share Buttons (Blog Articles)
Three equal-width square buttons in a row: LinkedIn, X, Copy Link. No card background — bare icon+text on the article surface. Centered below article content.

**Character:** "Utility, not decoration. They share the content, not attention."

- **Layout:** Equal-width flex row, centered, gap 8px
- **Button shape:** 8px radius outline, 0.5px border-card border
- **Text:** Label style (0.8125rem, 500 weight, secondary text)
- **Hover:** bg-hover fill

### Category Cards (Blog Listing)
Two-column vertical grid of large clickable cards, each representing a content category. Card background transitions on hover from bg-card to bg-hover.

**Character:** "A directory, not a gallery."

- **Layout:** 2-column grid (compact), gap 16px, responsive to single column on mobile
- **Background:** --bg-card, hover → --bg-hover
- **Border:** 0.5px --border-card
- **Radius:** 12px (--r-lg)
- **Padding:** --ds-24
- **Tag badge:** Transparent outline badge (see Tags section), text-white on dark, semantic label

## 6. Do's and Don'ts

### Do:
- **Do** use Signal Blue sparingly — ≤10% of any surface. Scarcity gives it meaning.
- **Do** lead with Lexend for headings and Source Sans 3 for body. This pairing is deliberate.
- **Do** use outline buttons with transparent backgrounds. Fill only on hover.
- **Do** layer depth through tonal surface shifts (--bg-root → --bg-card) rather than shadows.
- **Do** keep body text at ≥4.5:1 contrast ratio. The text-primary value is already contrast-safe; do not lighten it.
- **Do** cap display headings at 3.5rem (clamp max). Above that reads as shouting.
- **Do** use `text-wrap: balance` on h1–h3 for even line lengths.
- **Do** use translucent nav bar (backdrop-filter blur) — it should feel like glass over content.
- **Do** keep GEODRIV | CI logo in white (var(--text-primary)), never in Signal Blue.
- **Do** align logo left, nav links right — no centered layout.
- **Do** respect the 8px spacing grid. All margins and padding should align to --ds-* values.

### Don't:
- **Don't** use Inter, Roboto, Arial, or system default sans-serif fonts. The Lexend + Source Sans 3 pairing is the system.
- **Don't** use gradient text (`background-clip: text`). Text emphasis comes from weight and size, not color gradients.
- **Don't** use side-stripe borders (border-left > 1px as a colored accent on cards or sections).
- **Don't** use glassmorphism or blurred backgrounds as decorative elements. The only glass element is the nav.
- **Don't** use the "hero metric" template (big number + small label + supporting stats + gradient accent) — SaaS cliché.
- **Don't** use identical card grids (same-size cards with icon + heading + text, repeated).
- **Don't** put tiny uppercase tracked "eyebrow" text above every section (ABOUT / PROCESS / PRICING). That is a saturated AI tell.
- **Don't** number sections with 01 / 02 / 03 as default scaffolding — numbers earn their place when the order carries information.
- **Don't** use pure black (#000) or pure white (#fff). Every neutral is tinted.
- **Don't** animate width, height, or padding. Use transform and opacity for motion.
- **Don't** use bounce or elastic easing curves. Smooth deceleration only.
- **Don't** wrap everything in cards. Use open surfaces when a card container is not needed.
- **Don't** center everything — prefer left-aligned text with asymmetric layouts.
