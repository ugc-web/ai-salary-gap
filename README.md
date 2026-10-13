# AI Salary Gap Calculator

Compares published salary benchmarks for Indian professionals with AI-skilled benchmarks. It recommends three AI skills and a six-week roadmap, and produces a shareable result card.

## Setup

```bash
export PATH=~/.local/node-v20.18.0-darwin-arm64/bin:$PATH   # or any Node >= 18.17
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
npm test                     # engine/comparison unit tests
npm run build && npm start   # production build
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key. If unset, analytics is disabled. |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host, e.g. `https://eu.i.posthog.com` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in share links and the OG card |

## Data and methodology

- Sources are listed in `lib/data/sources.ts`, and benchmarks are in `lib/data/benchmarks.ts`. Each figure is taken from the published report as-is.
- A **gap** is calculated only when the role's benchmark and the AI benchmark come from the same report, experience bracket and geography (`lib/compare.ts`). Other roles get a market benchmark only, or "insufficient data".
- National AI-premium figures (Naukri) are shown as percentages only. They are never converted into a role-specific number.
- City is collected for context only. The sources are national, so no city adjustment is made.
- The calculator at `/start` asks one question per screen (`components/quiz/`): work area, role, experience, city, optional CTC.
- CTC stays in `sessionStorage`. It never goes in URLs, analytics or the share card.

### Updating data

1. Download the new report and transcribe its tables into `benchmarks.ts`. Check every figure against the rendered PDF page, not extracted text.
2. Update `published`, `url` and `lastVerified` in `sources.ts`.
3. Review the role mappings in `roles.ts` (`segment`, `confidence`, `aiComparable`).
4. Run `npm test` and `npm run build`.

## Deploy (Vercel)

Import the repository in Vercel (framework preset: Next.js), add the env vars above, then deploy. `/api/og` runs on the Node runtime and reads its fonts from `app/api/og/fonts/`.
