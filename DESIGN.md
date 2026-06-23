# Okami Maturity · Design System Notes

> Source of truth: Marcos-provided package `Okami Maturity Landing Page.zip` imported on 2026-06-23.
>
> This document exists so future Okami landing/docs work starts from the correct visual contract instead of drifting back to `os.okamiops.com` or ad-hoc CSS.

## Intent

Okami Maturity is the public surface for the Okami SAMM/AppSec maturity product. The site must feel like **Okami + Okami Agent**, not like the previous Okami OS cockpit clone.

The design language is:

- dark technical/cyber surface;
- strong Okami blueprint grid background;
- Space Grotesk for voice/headings/body;
- JetBrains Mono for machine labels, commands, metadata and section markers;
- square, hairline-bordered components;
- contained neon glow, never gamer neon;
- cyan/magenta/orange accent rhythm;
- real Okami Maturity logo assets from the supplied package.

## Canonical source files

The imported package provided these primary artifacts:

| File | Role |
|---|---|
| `Okami Maturity.dc.html` | Home/landing source used for `/` |
| `Docs.dc.html` | Documentation source used for `/docs/` |
| `okami.css` | Portable Okami token/component foundation |
| `okami-patterns.css` | Page-level Okami patterns and higher-order components |
| `support.js` | Runtime for the `.dc.html` component/template format |
| `samm-questions.js` | SAMM 90-question docs explorer data/runtime |
| `assets/` | Product screenshots, PDF screenshots and logo assets |
| `uploads/` | Marcos-provided/reference screenshots and transparent logo variants |
| `fonts/` | Self-hosted Space Grotesk + JetBrains Mono |

## Active repo mapping

| Source package path | Repo path |
|---|---|
| `Okami Maturity.dc.html` | `index.html` |
| `Docs.dc.html` | `docs/index.html` |
| `okami.css` | `public/okami.css` |
| `okami-patterns.css` | `public/okami-patterns.css` |
| `support.js` | `public/support.js` |
| `samm-questions.js` | `public/samm-questions.js` |
| `assets/*` | `public/assets/*` |
| `uploads/*` | `public/uploads/*` |
| `fonts/*` | `public/fonts/*` |

During import, references must be normalized for the deployed site:

- support runtime: `/support.js`;
- DS CSS: `/okami.css` and `/okami-patterns.css`;
- assets: `/assets/...`;
- uploads: `/uploads/...`;
- fonts: `/fonts/...`;
- home route: `/`;
- docs route: `/docs/`.

## Visual tokens

The token contract comes from `public/okami.css`:

| Token family | Values / use |
|---|---|
| Surfaces | `--ok-bg-0`, `--ok-bg-1`, `--ok-bg-2`, `--ok-bg-3` near-black layers |
| Lines | `--ok-line`, `--ok-line-soft` 1px hairlines and dashed dividers |
| Grid | `--ok-grid` at 64px, masked as blueprint atmosphere |
| Text | `--ok-fg`, `--ok-fg-soft`, `--ok-fg-mute`, `--ok-fg-dim` |
| Accents | `--ok-orange`, `--ok-cyan`, `--ok-magenta` |
| Semantics | `--ok-success`, `--ok-warning`, `--ok-danger` |
| Type | `--ok-display` = Space Grotesk, `--ok-mono` = JetBrains Mono |
| Glow | `--ok-glow` default around `0.5–0.55` |

## Background contract

The grid is not optional decoration; it is a brand marker.

Required background layers:

1. base near-black `--ok-bg-0`;
2. low-opacity radial accent glows;
3. fixed 64px grid using `--ok-grid`;
4. subtle CRT scanline overlay.

Do not replace this with a flat gradient, SaaS blob background, or OS cockpit-only treatment.

## Logo contract

Use the real Okami Maturity logo assets from the package:

- landing header: `public/assets/okami-maturity-dark.png` or `public/uploads/okami-maturity-logo-light-transparent.png` according to contrast;
- docs header: same family, sized conservatively;
- favicon/open graph can use the dark/light variants from `public/assets/`.

When Marcos sends more than one logo variant, the implementation owner must confirm the exact variant before shipping. The prior failure was using the wrong logo despite multiple variants being provided.

## Page structure

### Home `/`

Home uses the `mat-*` component family:

- `.mat-page` root surface;
- sticky `.mat-nav`;
- hero with headline, anti-telemetry line, CTA group, command line and badges;
- scorecard/radar preview panel;
- stats strip;
- sections for SAMM model, workflow, PDF report, AI/MCP/ACP, deployment/self-host, consulting and final CTA;
- floating GitHub/top controls.

### Docs `/docs/`

Docs uses the `docs-*` component family:

- sticky `.docs-top` bar;
- desktop sidebar `.docs-side`;
- main document `.docs-main`;
- optional right `.docs-toc`;
- route cards, code blocks, callouts, tables and question explorer;
- mobile hides the desktop sidebar and starts directly on content.

## Internationalization

PT and EN are first-class. Do not ship partial translation.

Required checks:

- PT/EN toggle works on `/`;
- PT/EN toggle works on `/docs/`;
- SAMM question explorer shows the 90-question content correctly;
- no unresolved `{{ ... }}` template marker in visible body text;
- no debug placeholders in production.

## QA checklist before merge

A PR is not ready until all items pass:

- [ ] `npm run build` passes.
- [ ] `/` renders from `index.html` with no console errors.
- [ ] `/docs/` renders from `docs/index.html` with no console errors.
- [ ] Desktop screenshot for `/` at 1280px.
- [ ] Desktop screenshot for `/docs/` at 1280px.
- [ ] Mobile screenshot for `/` at 390px.
- [ ] Mobile screenshot for `/docs/` at 390px.
- [ ] Desktop and mobile scroll reach deep content on `/docs/`.
- [ ] No horizontal overflow on header/nav/docs grid.
- [ ] Correct Okami Maturity logo variant is visible.
- [ ] Background grid is visible and not broken.
- [ ] No `OKAMI OS`, `Pixel Office`, or wrong-reference copy remains.
- [ ] Public links point to the intended project/repo (`okami-SAMM` for product, `okami-maturity-lp` for this landing repo only when explicitly needed).

## Known import adaptation

The Marcos package is `.dc.html` based and uses `support.js`. Vite can deploy it as static HTML as long as:

- files live in `public/` when referenced by absolute `/...` paths;
- root page and docs page normalize cross-links to `/` and `/docs/`;
- custom template markers remain inside the runtime-managed page and are not visibly leaked;
- malformed initial SVG template attributes are avoided or replaced with static preview assets before shipping.

For this import, the radar SVG template in the home was replaced with a static scorecard preview image to avoid browser console errors from placeholder SVG attributes during initial parse.

## Ownership and gates

- Diana/N0 owns implementation and future visual changes.
- Artemis/N1 owns visual/runtime/i18n gate.
- Astride/N2 owns brief, source-of-truth discipline, PR/deploy follow-through and process documentation.
- Morgana/N0 owns durable process mirroring in GitHub/SiYuan when a new design pattern becomes canonical.

## Failure modes to avoid

- Copying `os.okamiops.com` when Marcos asked for `okamiagent.com` as the fallback reference.
- Treating build/grep as visual approval.
- Shipping the wrong logo variant.
- Letting docs scroll or sidebar sync break mobile/desktop navigation.
- Shipping partial PT-BR coverage for SAMM questions.
- Leaving DESIGN.md outdated after the code becomes the canonical reference.
