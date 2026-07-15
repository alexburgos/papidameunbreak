import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "#/components/PageHeader";
import { ProductCard } from "#/components/ProductCard";
import { fetchProduct } from "#/lib/shopify";
import { useLocale } from "#/lib/locale";
import shopCss from "./shop.css?url";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "shop — papidameunbreak" },
      { name: "description", content: "papidameunbreak shop" },
    ],
    links: [{ rel: "stylesheet", href: shopCss }],
  }),
  loader: () => fetchProduct("ES", "EN"),
  component: ShopPage,
});

function ShopPage() {
  const initialProduct = Route.useLoaderData();
  const { locale } = useLocale();
  const [product, setProduct] = useState(initialProduct);
  const skippedFirst = useRef(false);

  useEffect(() => {
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
    <main className="page">
      <PageHeader />
      <div className="product-grid">
        <ProductCard product={product} />
      </div>
    </main>
  );
}
