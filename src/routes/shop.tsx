import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "#/components/PageHeader";
import { fetchProducts } from "#/lib/medusa";
import type { Product } from "#/lib/medusa";
import shopCss from "./shop.css?url";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "shop — papidameunbreak" },
      { name: "description", content: "papidameunbreak shop" },
    ],
    links: [{ rel: "stylesheet", href: shopCss }],
  }),
  loader: () => fetchProducts(),
  component: ShopPage,
});

function ShopPage() {
  const products = Route.useLoaderData();

  return (
    <main className="page">
      <PageHeader />
      {/*<h1 className="shop-title">shop</h1>
      {products.length === 0 ? (
        <p className="shop-empty">no products yet — check back soon.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}*/}
      <p>Big things coming...</p>
    </main>
  );
}

// function ProductCard({ product }: { product: Product }) {
//   return (
//     <article className="product-card">
//       {product.thumbnail ? (
//         <img src={product.thumbnail} alt={product.title} loading="lazy" />
//       ) : (
//         <div className="product-card-placeholder" aria-hidden="true">
//           no image
//         </div>
//       )}
//       <h2>{product.title}</h2>
//       <p className="price">{product.price}</p>
//       <a
//         href={`/shop/${product.handle}`}
//         className="buy-btn"
//         aria-label={`Buy ${product.title}`}
//       >
//         buy
//       </a>
//     </article>
//   );
// }
