# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page Portuguese-language (pt-BR) sales/landing page for a 21-day weight-loss program targeting Brazilian women. Built as a plain static site — no framework, no build step, no package manager (`node_modules`/`package.json` do not exist and shouldn't be introduced). Everything is served as-is: `index.html` plus `css/*.css` and `js/*.js` loaded directly via `<link>`/`<script>` tags.

## Running locally

There is no build or install step. Serve the directory root with any static file server and open `index.html`, e.g.:

```
python -m http.server 8123
```

(This matches `.claude/launch.json`, which defines a `static-server` launch config on port 8123 for the same command.)

There are no lint or test commands — none are configured in this repo.

## Deployment

The GitHub repo is connected to Vercel via its GitHub integration. Pushing/merging to `main` triggers an automatic production deploy; every branch/PR gets its own Vercel preview deployment (posted as a bot comment on the PR). There is no `vercel.json` — deploy config is whatever Vercel infers for a static site.

## Architecture

### Single-page structure

`index.html` is one long page made of stacked `<section>` blocks, each with its own HTML comment header (e.g. `<!-- REELS -->`) and its own CSS file. Current order top to bottom: offer bar → Stories → Hero → Oferta (pricing/checkout card) → photo carousel → Reels → Comparativo → pricing card (`pricing-section`) → Benefícios/Como Funciona/Resultados tabs (`benefits-section`, `id="comofunciona"`) → weekly strategy carousel (`strategy-section`) → trust/guarantee card (`trust-section`) → FAQ (`faq-section`). When adding a new section, follow the same pattern: a commented block in `index.html`, a same-named CSS file in `css/`, and (if interactive) a same-named JS file in `js/`.

### CSS

One stylesheet per feature/section (`stories.css`, `reels.css`, `compare.css`, `pricing-card.css`, `benefits-tabs.css`, `strategy.css`, `trust-card.css`, `faq.css`, `photo-carousel.css`), all linked in `<head>`. `style.css` holds the shared base (reset, `.page` wrapper, hero, oferta card) and is loaded first. There's no CSS build/scoping — class names are the only thing preventing collisions, so keep new section classes prefixed distinctly (e.g. `.strategy-*`, `.faq-*`).

### JavaScript

Each interactive feature is a small, self-contained script, mostly written as a class that takes a data array and renders itself:

- `stories.js` (`class Stories`) + `stories-data.js` (`STORIES_DATA`) — Instagram-style story viewer.
- `reels.js` (`class Reels`) + `reels-data.js` (`REELS_DATA`) — vertical video feed (Instagram Reels clone) with like/comment/repost/save, an `IntersectionObserver` that autoplays/pauses videos as they scroll into view, and a comments bottom-sheet with a purely-visual "post a comment" form (nothing is persisted).
- `benefits-tabs.js`, `strategy-carousel.js`, `faq.js` — small standalone widgets (tab switcher, autoplaying/looping carousel, accordion), each with its own `DOMContentLoaded` listener.
- `app.js` — the glue file: sets the checkout link href, instantiates `Stories`/`Reels`, and owns the shared offer countdown, the "live visitor count" fake ticker, and the responsive hero headline swap.

All scripts are loaded as plain `<script src>` tags (no modules, no bundler) in a fixed order at the end of `<body>`, data files before the classes that consume them, and `app.js` last since it wires everything together on `DOMContentLoaded`.

### Site-wide conventions

- **`.js-checkout-link`** — apply this class to any element that should link to checkout. `app.js` sets `href` on every matching element from a single `CHECKOUT_URL` constant, so all buy buttons across the page (oferta card, reels-adjacent CTAs, pricing card, trust card, FAQ) stay in sync from one place.
- **`.js-countdown`** — apply this class to any element that should mirror the site's single offer countdown. `app.js` updates every matching element's `textContent` each second from one shared `countdown` variable.

Reuse these two classes for any new CTA/timer instead of wiring up a new one-off.

### Data-driven content and assets

`STORIES_DATA`/`REELS_DATA` reference image/video files under `assets/stories/perfilN/` and `assets/reels/perfilN/`; the photo carousel reads a single wide strip image from `assets/carousel/`. Real media (photos/videos) is uploaded manually by the non-technical site owner through the GitHub web UI, not generated or committed by Claude. When scaffolding a new content slot before the real asset exists, follow the established pattern: create the expected folder/filename and drop a `LEIA-ME.txt` in it stating exactly which filename(s) are expected there.
