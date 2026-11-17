# mufeedbinismail.dev

Portfolio site of Mohamed Mufeed — products, work, experience and CVs.

Static [Astro](https://astro.build) site; React only where there is interaction (the write-up drawer and the contact dialog). Hosted on Cloudflare Pages.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # static build into dist/
npm test           # unit tests (Vitest)
npm run test:e2e   # builds, then runs the browser tests (Playwright, local Chrome)
```

Node version is pinned in `.nvmrc`.

## How it works

- **Content** lives in `src/content/`: one Markdown file per write-up (schema-checked in `src/content.config.ts`) and plain TypeScript for the rest.
- **Write-ups** open in a drawer over the home page. Clicking any write-up link opens it in place, with the address bar on `/work/<slug>`; visiting `/work/<slug>` directly shows the home page with that drawer already open, rendered open in the HTML so it reads without JavaScript. Prev / Next / Close are real links. The work list in `src/content/work.ts` names write-ups by slug and takes their title, year and summary from the write-up, so the two never disagree.
- **CVs** in `public/cv/` are rendered from Markdown in the separate CV repo (`~/Repos/CV/V10`, `node render.mjs --publish`). Only the ones listed in `src/content/profile.ts` are linked from the page; the rest are there to send.
- **Durations** ("7 years") are computed from start dates at build time; a monthly GitHub Action triggers a rebuild so they stay current.
- **Contact details** never appear in the page source. They are read from `CONTACT_EMAIL` / `CONTACT_PHONE` at build time, shipped XOR-obfuscated, and decoded only when a visitor clicks to reveal one. A build integration fails the build if either value appears anywhere in the output.
- **Link previews** (Open Graph images) are generated at build time with Satori.

## Environment

Copy `.env.example` to `.env` and fill in the contact details. The same two variables are set in the Cloudflare Pages project.
