# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm install       # install deps
npm run dev       # start Vite dev server
npm run build     # build all 6 pages into dist/
npm run preview   # preview the dist/ build locally
```

There is no test suite or linter configured in this project.

## Architecture

This is a static, multi-page (no client-side routing) hotel landing site built with Vite's multi-page-app mode — there is no SPA framework and no client-side JS state beyond two small DOM-manipulation modules.

**Locale structure**: content is duplicated per language rather than driven by a shared i18n/templating layer. `en/` and `ru/` each contain their own `index.html`, `rooms.html`, `contacts.html` with the full page markup inlined (not includes/partials). Editing copy means editing the same content in both trees — there is no single source of truth to update once and propagate. The root `index.html` is a tiny script that redirects to `/en/` or `/ru/` based on `navigator.language`. The RU pages are mostly untranslated (marked with a visible "RU translation pending" banner) except for the neighborhood section on the RU landing page — do not translate copy on your own initiative; treat the pending banners as intentional until asked to translate.

**CSS layering**: `src/styles/base.css` holds everything shared across all pages (CSS vars, header/nav/mobile-menu, buttons, footer, `.page-hero`, `.ph` placeholder styling). Each page type has its own additional stylesheet (`home.css`, `rooms.css`, `contacts.css`) for styles unique to that page. When adding a new shared visual pattern, put it in `base.css`; page-specific layout goes in that page's own file. There's no CSS-in-JS or scoping — everything is global class names, so avoid name collisions across the page CSS files.

**JS entry points**: each HTML page loads one `src/js/entry-*.js` (`entry-home.js`, `entry-rooms.js`, `entry-contacts.js`), which imports that page's CSS and `main.js`. `main.js` always wires up `nav.js` (mobile nav overlay) and `offer-popup.js` (delayed promo popup, home page only — it's a no-op if the popup markup isn't present on the page). New page-level JS behavior should follow this pattern: create `entry-<page>.js` importing the page CSS + shared `main.js`, rather than adding conditionals inside `main.js`.

**Image placeholders**: photo/gallery slots are intentionally styled placeholder `<div class="ph">` elements with descriptive text (e.g. "hero photo — courtyard entrance"), not `<img>` tags — real photos haven't been added yet. When replacing a placeholder, match it against its descriptive label to pick the right image.

**Origin**: this codebase was hand-converted from a Claude-exported design bundle (`.dc.html` files using a custom `x-dc`/`DCLogic` runtime with `{{ }}` template bindings). That export is not part of this build — the `{{ }}` bindings were replaced with plain DOM wiring in the JS modules described above.

## Deployment

Deployment is git-push-based via cPanel's Git Version Control feature, **not** CI/CD:

- `dist/` is committed to git (intentionally **not** gitignored) because the production host has no reliable Node runtime — the build happens locally/in dev, and `.cpanel.yml` just copies the pre-built `dist/*` into the live document root on push. Always run `npm run build` and include the updated `dist/` in the same commit before pushing to the `zahid-inn` remote.
- Two git remotes exist: `origin` (GitHub, default push target for `main`) and `zahid-inn` (the cPanel repo at `ssh://zahidinn@zahid-inn.uz:30151/home/zahidinn/repositories/zahid_inn`). Deploying requires an explicit `git push zahid-inn main` — a plain `git push` only updates GitHub.
- `.cpanel.yml`'s `DEPLOYPATH` currently points at a `dev` staging subdomain path (`/home/zahidinn/public_html/dev`), not the live production docroot. Check this value before assuming a push goes live — flipping it to the production path is a deliberate cutover step, not the default state.
