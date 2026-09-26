# A Primeira Dependência Design System

## Direction

Operational editorial system built around the movement from a recurring dependency to a clear operational design. The visual anchor is a decision map with connected responsibilities, standards, limits, and follow-up.

Design dials: variance 6/10, motion 5/10, density 4/10.

## Palette

| Role | Value | Token |
| --- | --- | --- |
| Primary dark surface | `#1D2A24` | `--forest` |
| Raised dark surface | `#293B32` | `--forest-raised` |
| Main foreground | `#17211C` | `--ink` |
| Secondary foreground | `#2F3C35` | `--ink-soft` |
| Warm page background | `#F5F0E8` | `--cream` |
| Elevated paper surface | `#FFFDF8` | `--paper` |
| Warm paper surface | `#EEE4D5` | `--paper-warm` |
| Primary CTA | `#95472F` | `--clay-dark` |
| Accent | `#B85F3F` | `--clay` |
| Highlight | `#E0AD4F` | `--amber` |
| Supporting green | `#9EB5A6` | `--sage` |

Primary CTA uses white text on `#95472F`. Focus uses a 3px `#E0AD4F` ring with a 4px offset.

## Typography

- Headings: Sora, 500 to 700.
- Body: Manrope, 400 to 800.
- Desktop hero: fluid 48 to 76px.
- Mobile hero: fluid 41 to 58px.
- Section titles: fluid 34 to 60px.
- Body: 16 to 20px with 1.6 to 1.72 line height.
- Long headings use a maximum width and shrink before mobile overflow.

## Layout

- Main container: 1180px with 24px desktop and 16px mobile gutters.
- Section rhythm: 88 to 150px desktop, 78px mobile.
- Radius language: 12px controls, 24px cards, 36px feature surfaces.
- Borders: low-contrast 1px rules. Depth comes from paper layering and restrained shadow.
- Alternate editorial splits, dense operational grids, dark demonstration bands, and calm reading intervals.
- The route map must anchor every marker directly to its path. Mobile switches to a single-column sequence when needed.

## Imagery and visual language

- Prefer code-native diagrams and operational artifacts derived from the approved workshop content.
- Do not depict a person while the supplied portrait identity conflicts with the approved copy identity.
- No generic retail stock imagery, fake dashboards, testimonials, or invented documents.
- SVG icons use one consistent outlined stroke family.

## Motion

Purpose: hierarchy and explanation.

- Hero entrance: CSS opacity and translateY, 620ms, strong ease-out, 60ms stagger.
- Section reveal: CSS opacity and translateY, 420ms, strong ease-out.
- Button feedback: 140 to 180ms transform, color, and shadow only.
- Signature map: linear stroke-dash flow that runs only while the map is visible.
- Maximum two active focal clusters per viewport.
- `prefers-reduced-motion` removes positional motion and renders the map as a static solid route.
- Hover motion is gated to fine pointers.

## Accessibility and responsive rules

- Visible skip link and focus rings.
- Minimum 44px interactive targets.
- Semantic headings, links, lists, details, and landmarks.
- No essential content depends on animation or hover.
- Validate 375px, 768px, 1024px, and 1440px widths.
- Prevent horizontal overflow and avoid sticky media on narrow screens.
- Countdown is supplementary; the written official date remains visible.
