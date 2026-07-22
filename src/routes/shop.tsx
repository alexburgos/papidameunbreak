import { useEffect, useRef, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { PageHeader } from "#/components/PageHeader";
import { ProductCard } from "#/components/ProductCard";
import { ShopProviders } from "#/components/ShopProviders";
import { fetchProduct, isShopifyConfigured, type Product } from "#/lib/shopify";
import { useLocale } from "#/lib/locale";
import shopCss from "./shop.css?url";

// TODO: remove once the storefront is live — routes /shop to the
// Shopify email-subscription landing page in the meantime.
const SHOPIFY_COMING_SOON_URL = "https://r060tt-cr.myshopify.com/password";

export const Route = createFileRoute("/shop")({
  beforeLoad: () => {
    throw redirect({ href: SHOPIFY_COMING_SOON_URL });
  },
  head: () => ({
    meta: [
      { title: "shop — papidameunbreak" },
      { name: "description", content: "papidameunbreak shop" },
    ],
    links: [{ rel: "stylesheet", href: shopCss }],
  }),
  loader: () => (isShopifyConfigured() ? fetchProduct("ES", "EN") : null),
  component: ShopPage,
});

function ShopPage() {
  const initialProduct = Route.useLoaderData();
  const { locale } = useLocale();
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const skippedFirst = useRef(false);

  useEffect(() => {
    if (!isShopifyConfigured()) return;
    if (!skippedFirst.current) {
      skippedFirst.current = true;
      if (locale.country === "ES") return;
    }
    let cancelled = false;
    fetchProduct(locale.country, locale.language).then((p) => {
      if (!cancelled) setProduct(p);
    });
    return () => {
      cancelled = true;
    };
  }, [locale.country, locale.language]);

  return (
    <ShopProviders>
      <main className="page">
        <PageHeader showShopControls />
        <div className="product-grid">
          {product ? (
            <ProductCard product={product} />
          ) : (
            <p className="shop-unavailable">
              the shop isn't set up yet — check back soon.
            </p>
          )}
        </div>
      </main>
    </ShopProviders>
  );
}
