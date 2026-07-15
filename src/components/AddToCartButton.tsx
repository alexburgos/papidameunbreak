import { useCart } from "@shopify/hydrogen-react";
import type { Product } from "#/lib/shopify";

export function AddToCartButton({ product }: { product: Product }) {
  const { linesAdd, status } = useCart();
  const adding = status === "updating";

  return (
    <button
      className="buy-btn"
      disabled={adding}
      onClick={() => linesAdd([{ merchandiseId: product.variantId, quantity: 1 }])}
    >
      {adding ? "adding…" : "buy"}
    </button>
  );
}
