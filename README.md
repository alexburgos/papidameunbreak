# papidameunbreak

Brand site for papidameunbreak. Built with TanStack Start.

## Stack

- **[TanStack Start](https://tanstack.com/start)** — full-stack React framework with SSR
- **[TanStack Router](https://tanstack.com/router)** — file-based routing with type-safe navigation
- **[React 19](https://react.dev)** — UI
- **[TypeScript](https://www.typescriptlang.org)** — strict mode
- **[Medusa.js v2](https://medusajs.com)** — headless ecommerce (falls back to mock data if not configured)
- **Vanilla CSS** — per-route and per-component stylesheets

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env` and fill in the values to connect a live Medusa backend. Without them the shop page runs on mock data.

```bash
cp .env.example .env
```

```
VITE_MEDUSA_BACKEND_URL=http://localhost:9000
VITE_MEDUSA_PUBLISHABLE_KEY=pk_...
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start dev server at localhost:3000 |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm generate-routes` | Regenerate `routeTree.gen.ts` manually |

## Project structure

```
src/
├── routes/          # File-based routes — each file is a page
│   ├── __root.tsx   # Document shell (html, head, body)
│   ├── index.tsx    # / — home
│   ├── shop.tsx     # /shop — product listing
│   └── about.tsx    # /about
├── components/      # Shared UI components
├── lib/
│   └── medusa.ts    # Medusa SDK client + mock data fallback
├── styles/
│   └── global.css   # Reset, base styles, font-face
└── router.tsx       # Router instance
```

Route-specific CSS lives next to its route file (e.g. `shop.css` alongside `shop.tsx`). The `routeTree.gen.ts` file is auto-generated — do not edit it by hand.
