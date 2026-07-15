# papidameunbreak

Brand site for papidameunbreak. Built with TanStack Start.

## Stack

- **[TanStack Start](https://tanstack.com/start)** — full-stack React framework with SSR
- **[TanStack Router](https://tanstack.com/router)** — file-based routing with type-safe navigation
- **[React 19](https://react.dev)** — UI
- **[TypeScript](https://www.typescriptlang.org)** — strict mode
- **[Shopify Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api) + [hydrogen-react](https://shopify.dev/docs/api/hydrogen-react)** — headless ecommerce, cart, and multi-currency pricing
- **Vanilla CSS** — per-route and per-component stylesheets

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env` and fill in the values to connect a live Shopify store. All four are required for the shop page to work.

```bash
cp .env.example .env
```

```
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=shpat_...   # Storefront API public access token
VITE_SHOPIFY_STOREFRONT_API_VERSION=2026-04
VITE_SHOPIFY_PRODUCT_HANDLE=hat           # handle of the product to feature on /shop
```

Multi-currency pricing (EU/UK/US) requires enabling those markets/currencies in the Shopify admin under Settings → Markets — the app can't configure that for you.

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
│   ├── shopify.ts   # Shopify Storefront API client
│   └── locale.tsx   # Locale/currency context (EU, UK, US)
├── styles/
│   └── global.css   # Reset, base styles, font-face
└── router.tsx       # Router instance
```

Route-specific CSS lives next to its route file (e.g. `shop.css` alongside `shop.tsx`). The `routeTree.gen.ts` file is auto-generated — do not edit it by hand.
