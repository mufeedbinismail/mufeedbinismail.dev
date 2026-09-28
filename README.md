# mufeedbinismail.dev

Portfolio site of Mohamed Mufeed — case studies, experience and CVs.

Static [Astro](https://astro.build) site; React only where there is interaction (the case-study drawer and the contact dialog). Hosted on Cloudflare Pages.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # static build into dist/
npm test           # unit tests (Vitest)
npm run test:e2e   # builds, then runs the browser tests (Playwright, local Chrome)
```

Node version is pinned in `.nvmrc`.

## How it works

- **Content** lives in `src/content/`: one Markdown file per case study (schema-checked in `src/content.config.ts`) and plain TypeScript for the rest.
- **Case studies** render twice from the same data: in a drawer on the home page and as standalone pages at `/work/<slug>`. The drawer keeps the URL in sync, so a copied link opens the study being read; without JavaScript the rows are plain links.
- **Durations** ("six years at one ERP company") are computed from start dates at build time; a monthly GitHub Action triggers a rebuild so they stay current.
- **Contact details** never appear in the page source. They are read from `CONTACT_EMAIL` / `CONTACT_PHONE` at build time, shipped XOR-obfuscated, and decoded only when a visitor clicks to reveal one. A build integration fails the build if either value appears anywhere in the output.
- **Link previews** (Open Graph images) are generated at build time with Satori.

## Environment

Copy `.env.example` to `.env` and fill in the contact details. The same two variables are set in the Cloudflare Pages project.
