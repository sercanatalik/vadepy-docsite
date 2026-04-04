# vadepy.dev

Documentation website for [Vade](https://github.com/sercanatalik/vade) -- a production-grade Python library for fixed income quantitative analytics, built on a Rust core via PyO3 bindings.
**Documentation website:** [vadepy.dev](https://vadepy.dev)



## Tech Stack

- **Next.js 16** with static export
- **Fumadocs** for MDX-powered documentation
- **Tailwind CSS 4** for styling
- **Three.js** + postprocessing for homepage WebGL effects
- **Orama** for full-text search
- **Radix UI** primitives with shadcn-style components

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Project Structure

```
app/
  (home)/page.tsx          Landing page with hero, features, CTA
  docs/[[...slug]]/        Documentation pages (catch-all route)
  api/search/              Static search endpoint (Orama)
  og/docs/[...slug]/       Dynamic Open Graph image generation

content/docs/              MDX documentation source
  getting-started/         Installation, architecture, type system
  guides/
    rates/                 Curve building, pricing, risk, caps & floors
    credit/                Bonds, callable bonds, CDS, fitted curves
    fx/                    FX forwards, cross-currency, NDFs
    financing/             Repo, securities lending (planned)
  api/                     API reference

components/
  hero-section.tsx         Animated hero with TrueFocus + PixelBlast
  pixel-blast.tsx          THREE.js liquid particle effect
  codeblock.tsx            Syntax highlighting with copy & tabs
  search.tsx               Orama search dialog
  ui/                      Radix UI primitive wrappers

lib/
  source.ts                Fumadocs content source loader
  layout.shared.tsx        Shared layout config (nav, links)
  shared.ts                App constants (name, git config, routes)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build static site to `out/` |
| `npm run start` | Serve built site with `serve` |
| `npm run types:check` | Run fumadocs typegen + tsc |

## Documentation Content

The site covers Vade's core modules:

- **Rates** -- SOFR/OIS curve calibration, bootstrap & parametric methods, swap pricing, risk analytics, caps & floors
- **Credit** -- Bond analytics, callable bonds, credit curves & CDS, fitted curves, spread analytics
- **FX** -- FX rates & forwards, cross-currency swaps, non-deliverable instruments
- **Getting Started** -- Installation, Rust/Python architecture, autodiff type system
- **API Reference** -- Calendar, autodiff, curves, instruments, solver, FX, context, cashflows
