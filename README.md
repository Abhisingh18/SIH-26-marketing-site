# Sovereign AI — Marketing Site

Public marketing / landing website for **Sovereign AI**, an on-premise agentic AI
workbench for confidential industrial workflows.

> This repo is the **website only**. It explains the product, builds trust and
> collects demo requests. The actual product is a **desktop application** that runs
> inside the customer's own infrastructure — no confidential document is ever
> uploaded to this site.

## Stack

| Layer      | Choice                                 |
| ---------- | -------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)     |
| UI         | React 19 + TypeScript                  |
| Styling    | Tailwind CSS v4 (`@theme` tokens)      |
| Motion     | `motion` (Framer Motion 13)            |
| Scrolling  | Lenis smooth scroll                    |
| Icons      | lucide-react                           |

Everything is statically prerendered — the whole page is one static route.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Design system

Design tokens live in [`app/globals.css`](app/globals.css) under `@theme`.
The look is deliberately light, minimal and typography-led (Sarvam-style),
*not* dark cyberpunk — the audience is refineries, PSUs and regulated industry.

| Token                 | Value     | Use                          |
| --------------------- | --------- | ---------------------------- |
| `--color-paper`       | `#fbfaf7` | page background              |
| `--color-surface`     | `#ffffff` | cards, panels                |
| `--color-sand`        | `#f4f2ec` | window chrome, subtle fills  |
| `--color-ink`         | `#0c0c0d` | primary text, inverted slabs |
| `--color-muted`       | `#76767d` | secondary text               |
| `--color-line`        | `#e7e4dc` | hairline borders             |
| `--color-accent`      | `#2340e0` | single accent                |
| `--color-signal`      | `#11a05a` | live / online status         |

Type: **Inter** for prose, **JetBrains Mono** for technical labels, diagram nodes
and status readouts.

Utility classes: `.display` (tight headline tracking), `.eyebrow` (mono section
label), `.grid-paper` (blueprint grid), `.lift` (card hover).

## Structure

```
app/
  layout.tsx            fonts, metadata, nav + footer shell
  page.tsx              section order for the whole landing page
  globals.css           design tokens + utilities
components/
  site/                 nav, footer
  mock/workbench.tsx    the desktop-app mockup (compact + full variants)
  ui/
    primitives.tsx      Button, Badge, Card, Node, LiveDot
    diagram.tsx         Down, Split, Layer, Step, DiagramFrame
    section.tsx         Section shell + SectionHead
    reveal.tsx          scroll-in animation wrappers
  sections/
    hero.tsx            hero + trust chips + app mockup
    narrative.tsx       trust bar, big statement, problem
    solution.tsx        perimeter diagram, platform features
    agentic.tsx         agent execution, deliverables
    intelligence.tsx    model routing, multimodal, private knowledge
    security.tsx        sovereignty monitor, desktop app showcase
    enterprise.tsx      use cases, architecture, deployment, final CTA
```

## Page flow

Hero → Trust bar → Statement → Problem → Solution → Platform → Agentic →
Multi-model → Multimodal → Knowledge → Sovereignty → Product showcase →
Use cases → Deliverables → Architecture → Deployment → CTA → Footer

## Editing copy

All copy lives in plain arrays at the top of each section file
(`PROBLEMS`, `FEATURES`, `USE_CASES`, `COUNTERS`, `STACK`, …) — change the data,
not the JSX.

## Notes

- The **Sovereignty Monitor** numbers are illustrative marketing figures. If the
  desktop app exposes real telemetry, wire it in rather than hardcoding zeros.
- Third-party components (llama-swap, vLLM, Docling, Qdrant, Mem0) are credited
  under "Powered by open-source infrastructure" — never presented as in-house.
- Brand is kept generic on purpose; no customer name appears as the product brand.
