# Sangam — Marketing Site

Public marketing website for **Sangam**, an on-premise agentic AI workbench for
confidential industrial workflows.

*Sangam* means confluence — models, knowledge and tools meeting in one place.
The logomark is three streams merging into one, which is also what the model
orchestrator does with a task. Note the split in the copy: **Sangam** is the
brand, *sovereignty* is the property it claims — keep using both.

> This repo is the **website only**. It explains the product, builds trust and
> collects demo requests. The actual product is a **desktop application** that runs
> inside the customer's own infrastructure — no confidential document is ever
> uploaded to this site, including through the demo form.

## Stack

| Layer      | Choice                             |
| ---------- | ---------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack) |
| UI         | React 19 + TypeScript              |
| Styling    | Tailwind CSS v4 (`@theme` tokens)  |
| Motion     | `motion` (Framer Motion 13)        |
| Scrolling  | Lenis smooth scroll                |
| Icons      | lucide-react                       |

Every route is statically prerendered.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Routes

The site is deliberately **multi-page** — the home page sells the idea and sends
people onward; each subject gets its own page rather than one endless scroll.

| Route           | Purpose                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| `/`             | Hero, statement, three pillars, product moment, teasers, CTA             |
| `/platform`     | Agentic execution, model routing, multimodal, private knowledge, outputs |
| `/solutions`    | The problem, six industrial use cases, target sectors                    |
| `/security`     | The boundary, sovereignty monitor, security controls                     |
| `/architecture` | Layered system diagram, design principles, tech stack, deployment modes  |
| `/demo`         | Demo request form and what happens next                                  |

## Design system

Tokens live in [`app/globals.css`](app/globals.css) under `@theme`. The look is
light, quiet and typography-led — *not* dark cyberpunk, because the audience is
refineries, PSUs and regulated industry.

| Token             | Value     | Use                          |
| ----------------- | --------- | ---------------------------- |
| `--color-paper`   | `#fcfbf9` | page background              |
| `--color-surface` | `#ffffff` | elevated panels              |
| `--color-veil`    | `#f5f3ef` | recessed bands, diagram beds |
| `--color-ink`     | `#111113` | headings, inverted slabs     |
| `--color-body`    | `#56565c` | body copy                    |
| `--color-muted`   | `#8a8a92` | meta text                    |
| `--color-line`    | `#eae7e1` | hairlines                    |
| `--color-accent`  | `#2338cc` | one accent, used sparingly   |
| `--color-signal`  | `#15a05c` | live / verified states       |

Three rules the whole design leans on:

1. **Elevation over borders.** Panels use `--shadow-e1/e2/e3` with a faint ring,
   not 1px outlines everywhere.
2. **Light weight at large sizes.** `.display` is weight 400 with `-0.038em`
   tracking; heavy headlines read cheap at this scale.
3. **Three text steps only** — `ink` / `body` / `muted`. No fourth grey.

Utilities: `.display`, `.display-sm`, `.label`, `.measure`, `.grid-paper`,
`.card-hover`, `.link-underline`.

Type: **Inter** for everything, **JetBrains Mono** only for labels, counters and
file names.

## Structure

```
app/
  layout.tsx              fonts, metadata, nav + footer shell
  globals.css             design tokens + utilities
  page.tsx                home
  platform/page.tsx
  solutions/page.tsx
  security/page.tsx
  architecture/page.tsx
  demo/page.tsx
components/
  site/                   nav (active route state), footer
  mock/
    workbench.tsx         desktop-app mockup, runs as a looping demo
    monitor.tsx           sovereignty monitor panel
  ui/
    primitives.tsx        Button, TextLink, Label, Pill, LiveDot, Panel
    diagram.tsx           Node, Down, Split, Layer, DiagramFrame
    section.tsx           Section, SectionHead, PageHero
    reveal.tsx            scroll-in animation wrappers
  sections/
    hero.tsx              home hero
    home.tsx              trust strip, statement, pillars, teasers
    platform.tsx          agentic, model routing, multimodal, knowledge, outputs
    solutions.tsx         problem, use cases, sectors
    security.tsx          boundary, monitor, controls
    architecture.tsx      layers, principles, stack, deployment
    demo-form.tsx         demo request form (client)
    cta.tsx               shared dark CTA band
```

## Editing copy

All copy lives in plain arrays at the top of each section file (`PILLARS`,
`USE_CASES`, `CONTROLS`, `STACK`, `PRINCIPLES`, …) — change the data, not the JSX.

## The hero flourish

`components/photos/flourish-alpha.png` is generated, not hand-made. The supplied
clipart had its checkerboard **painted into the pixels** — the PNG carries no
`tRNS` chunk and no alpha channel — so recolouring it in CSS turned the whole
square white. It was pre-processed once:

1. alpha derived from luminance (anything at/above 200 becomes transparent, so
   anti-aliased edges stay soft)
2. cropped to the artwork's bounding box, 348x348 down to 308x106, which removes
   the dead canvas that was pushing the kicker down the fold

The art stays dark on transparent and the page inverts it to white in CSS, so
the same file still works on a light background. To swap in different artwork,
run the same two steps rather than dropping the raw file in.

Licence: the source came from a stock clipart site — confirm commercial use is
allowed before this goes public.

## Social card

`app/opengraph-image.png` and `app/twitter-image.png` are generated by
[`scripts/generate-og.py`](scripts/generate-og.py) — Next picks them up by
filename, so nothing references them in code. Re-run after changing the headline
or the palette:

```bash
python scripts/generate-og.py
```

It redraws the hero on a 1200x630 card: saffron above, periwinkle at the
shoulders, a paper scrim keeping the headline on near-white. Georgia stands in
for Instrument Serif, which is a webfont and not available to a rasteriser; at
card size the only difference is slightly less stroke contrast.

Alt text lives beside each image in the matching `.alt.txt` file.

## Site URL

`metadataBase` in [`app/layout.tsx`](app/layout.tsx) resolves at build time:

1. `NEXT_PUBLIC_SITE_URL` — set this in the project settings once there is a
   custom domain
2. `VERCEL_PROJECT_PRODUCTION_URL` — the stable production domain
3. `VERCEL_URL` — the per-deployment preview URL
4. `http://localhost:3000`

Nothing needs changing to deploy. A wrong value here is invisible on the page
and only shows up as broken link previews, which is why it is not hardcoded.

## Before going live

- **Wire the demo form.** [`components/sections/demo-form.tsx`](components/sections/demo-form.tsx)
  currently fakes the submit; point it at a form service, CRM or `/api` route.
  Keep the no-attachments rule — confidential files belong in the desktop app.
- **Sovereignty Monitor numbers are illustrative.** If the desktop app exposes
  real telemetry, feed it in rather than hardcoding zeros.
- Third-party components (llama-swap, vLLM, Docling, Qdrant, Mem0) are credited
  under "Powered by open-source infrastructure" — never presented as in-house.
- Branding stays generic on purpose; no customer name appears as the product brand.
- The word "sovereign"/"sovereignty" is used as a descriptor throughout (Sovereignty
  Monitor, "sovereignty you can verify"). That is deliberate — don't rename those
  to Sangam.
