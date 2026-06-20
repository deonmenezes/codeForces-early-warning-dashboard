# codeForces-early-warning-dashboard

A Next.js dashboard application providing early-warning monitoring, likely for tracking Codeforces competitive programming metrics or contest alerts.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Package Manager**: npm (package-lock.json present; yarn.lock also exists)

## Setup

```bash
cd commonwealthearly
npm install
```

## Build / Run / Test

```bash
cd commonwealthearly

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Project Structure

```
commonwealthearly/          # Main Next.js application
  app/
    layout.tsx              # Root layout
    page.tsx                # Dashboard home page
    globals.css             # Global styles
    ui/                     # Page-level UI sections
    components/             # Page-specific components
  components/               # Shared reusable components
  next.config.ts            # Next.js configuration
  tailwind.config.js        # Tailwind CSS configuration
  tsconfig.json             # TypeScript configuration
  public/                   # Static assets
```

## Architecture & Key Files

- `commonwealthearly/app/page.tsx` — main dashboard entry point
- `commonwealthearly/app/layout.tsx` — root layout with global styles and fonts
- `commonwealthearly/components/` — shared UI components used across pages
- `commonwealthearly/app/ui/` — page-specific UI sections

## Conventions & Notes for Agents

- The actual source lives inside the `commonwealthearly/` subdirectory, not the repo root.
- Uses the Next.js **App Router**; all routes are under `commonwealthearly/app/`.
- Tailwind CSS is the sole styling mechanism; avoid inline styles or CSS modules.
- No environment variables are documented; add a `.env.local` inside `commonwealthearly/` if API keys (e.g. Codeforces API) are needed.
