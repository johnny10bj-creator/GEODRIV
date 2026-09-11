---
name: GEODRIV-STYLE-EVIDENCE
description: Evidence-backed GEODRIV brand style reference, extracted live from geodriv.com with StyleJuicer. The authoritative token source for the dark "Industrial Brief" design system. Complements DESIGN.md (which states the system) with proof (which is observed in the shipped site). Cross-referenced from taste-skill references/geodriv-brand-style.md.
source:
  tool: StyleJuicer v0.1.0-beta.2
  url: https://geodriv.com/
  capturedAt: 2026-08-21T11:43:21.239Z
  status: complete
  viewports: [desktop 1440x900, narrow 390x844]
  evidencePackage: D:/Hermes-agent/repos-tmp/stylejuicer/work/geodriv-style/
---

# GEODRIV Style Evidence (live capture)

> Authoritative, **observed** GEODRIV style tokens, extracted from the live site on
> 2026-08-21. Every value below is bound to real captured screenshots + rendered DOM/CSS.
> Cross-checks 1:1 with `DESIGN.md`. This file is the *evidence*; DESIGN.md is the *system*
> they jointly prove.

---

## One-line design language

> Dark, precise, industrial-intelligence consultancy aesthetic: a near-black navy ground, one
> signal-blue action color, a single burnt-orange attention accent, glass UI surfaces, and
> evidence-first copy speaking to decision-makers.

## Tokens (use exactly)

### Colors
| role | value |
|---|---|
| surface root | `#081525` |
| surface card | `#0d2137` |
| surface hover | `#14375a` |
| surface nav (glass) | `rgba(8,21,37,0.75)` |
| surface input | `#0a1a2e` |
| modal overlay | `rgba(0,0,0,0.65)` |
| text primary | `#f8fafc` |
| text secondary | `rgba(248,250,252,0.55)` |
| text muted | `rgba(248,250,252,0.60)` |
| text on-brand | `#FFFFFF` |
| accent brand blue | `#1a6fb5` |
| accent brand blue bright (hover) | `#2b8fd4` |
| **accent brand orange** | `#D85A30` |
| border card | `rgba(255,255,255,0.08)` |
| border input | `rgba(255,255,255,0.10)` |
| border strong | `rgba(255,255,255,0.14)` |
| border subtle | `rgba(255,255,255,0.06)` |

### Typography
| role | value |
|---|---|
| display font | `Lexend` |
| body font | `'Source Sans 3', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif` |
| hero title | Lexend `44.8px / 700` |
| section heading | Lexend `32px / 600` |
| logo wordmark | Lexend `18px / 600` |
| nav link | `14px / 500` |
| body | `16px / 400` |
| card body | `15px / 400` |

### Spacing & radius
- Spacing: 8px base scale `--ds-*` (4/8/12/16/20/24/32/40/48/56/64/80)
- Radius: sm `6px` / md `8px` / lg `12px` / xl `16px`

## Layout grammar
- Navigation: fixed glass bar (blur 32px), ~65px tall, hairline bottom border, logo left + links/actions right
- Hero: full-width, white headline with blue/orange `<em>` phrase highlights, dotted constellation + radar on the right
- Content sections: centered max-width ~1100px; capabilities as 3-col grid
- Breakpoints: `<=768px` mobile stack; `769-1100px` tablet band
- Cards: one navy step + hairline border + 12px radius

## Component grammar
| component | spec |
|---|---|
| primary button | brand-blue fill `#1a6fb5`, white text, 8px radius, weight 500; THE single interaction affordance |
| ghost / outline button | transparent, `1px solid rgba(255,255,255,0.45)`, 8px radius |
| card | `#0d2137` + hairline border + 12px radius |
| CTA card | `#0d2137` + hairline + 16px radius |
| phrase highlight | `.hl-blue` (rgb(43,143,212)) / `.hl-red` (rgb(216,90,48)), inline `<em>` in display type |
| pulse dot | orange rgba(216,90,48,0.38) glow, border-radius 50% |

## Motion grammar
- Radar: keyframes `radarFloat / radarSpin / blipRing / blipCore / coreRing / pulse-dot`, linear easing
- Modal: `modalIn` fade
- **ALL animation gated behind `prefers-reduced-motion: reduce`** (a11y - non-negotiable)

## Evidence-backed design decisions (the WHY)
1. **Dark layered surfaces** (not pure black): root -> card = one navy step, hairlines not heavy shadows. Reads premium/technical, keeps sparse accents distinct.
2. **One signal-blue owns all interaction**: train-the-eye instantly; outline buttons for secondary. Discipline over multi-color CTAs.
3. **Orange = phrase-level signal only**: `<em>.hl-red` + tiny pulse dots, never page fills. A second accent alongside the blue action grid.
4. **Glass nav + hairline**: translucent (blur 32px) keeps surface continuous, hairline preserves crisp edge on dark.
5. **CSS/SVG radar = the brand signature**: rotating sweep + blip pulses = "monitoring/scanning"; dependency-free; reduced-motion gated.

## Rules that must survive a new site/feature
- One signal-blue = sole interaction color; every CTA on it, outline buttons for secondary
- Near-black navy ground; orange only phrase-level (`<em>`) + tiny dots, never fills
- Surfaces via one navy step + hairline, not drop shadows
- Fixed translucent glass nav, logo left
- All animation gated behind `prefers-reduced-motion`
- Keep a technical scanning/instrument motif (radar, constellation, pulse) central, not decoration

## Do NOT copy (identity, not system)
- GEODRIV wordmark/logo + typographic lockup
- The radar illustration's literal geometry + CI/manufacturing-specific copy
- Proprietary screenshots / client research / brand assets
- The exact hero headline text

## Unknowns / verification gaps
- Light-theme palette not captured (site ships a sun toggle; observed is the dark tab)
- Exact hover/focus curves beyond bright-blue `#2b8fd4`
- Radar animation exact loop offsets / framerates

---

*Extracted with StyleJuicer v0.1.0-beta.2 on 2026-08-21. Evidence package:
`D:/Hermes-agent/repos-tmp/stylejuicer/work/geodriv-style/`. Synced to taste-skill
`references/geodriv-brand-style.md`.*