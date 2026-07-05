# A hotel landing page project

A Vite + vanilla JS static multi-page site converted from the .dc.html design export, in your project root:

***Scaffold***
zahid_inn/
├── package.json, vite.config.js, .gitignore
├── index.html              # root: redirects to /en/ or /ru/ by browser language
├── en/  index.html rooms.html contacts.html
├── ru/  index.html rooms.html contacts.html
└── src/
    ├── styles/  base.css home.css rooms.css contacts.css
    └── js/      main.js nav.js offer-popup.js entry-home.js entry-rooms.js entry-contacts.js

Each page is now plain static HTML — the {{ }} template bindings and the x-dc/DCLogic runtime from the export are gone, replaced by tiny vanilla JS (nav.js for the mobile menu, offer-popup.js for the delayed offer popup).

CSS is split into a shared base.css plus one file per page type instead of being duplicated in every file.

External links (booking page, Telegram, tel/mailto, Yandex map embed) carried over unchanged.