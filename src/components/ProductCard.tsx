import { Money } from "@shopify/hydrogen-react";
import { AddToCartButton } from "#/components/AddToCartButton";
import type { Product } from "#/lib/shopify";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      {product.image ? (
        <img src={product.image.url} alt={product.image.altText ?? product.title} />
      ) : (
        <div className="product-card-placeholder" aria-hidden="true">
          no image
        </div>
      )}
      <h2>{product.title.toLowerCase()}</h2>
      <p className="price">
        <Money data={product.price} />
      </p>
      <AddToCartButton product={product} />
    </article>
  );
}
