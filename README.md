# Karavan Sarai — Hotel Landing Page

A Vite + vanilla JS static multi-page site, converted from a Claude design export (`.dc.html` files) into plain HTML/CSS/JS.

## Project Structure

```
zahid_inn/
├── package.json, vite.config.js, .gitignore
├── index.html              # root: redirects to /en/ or /ru/ by browser language
├── en/                      # index.html, rooms.html, contacts.html
├── ru/                      # index.html, rooms.html, contacts.html
└── src/
    ├── styles/              # base.css, home.css, rooms.css, contacts.css
    └── js/                  # main.js, nav.js, offer-popup.js, entry-*.js
```

## What Changed From the Export

- Each page is now plain static HTML — the `{{ }}` template bindings and the `x-dc` / `DCLogic` runtime from the export are gone, replaced by tiny vanilla JS modules:
  - `nav.js` — mobile menu open/close
  - `offer-popup.js` — delayed offer popup
- CSS is split into a shared `base.css` plus one file per page type, instead of being duplicated in every file.
- External links (booking page, Telegram, tel/mailto, Yandex map embed) carried over unchanged.

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```

Outputs a static site to `dist/`, ready to deploy anywhere.
