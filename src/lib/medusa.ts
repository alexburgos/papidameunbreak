interface MedusaProduct {
  id: string;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  handle?: string | null;
  variants?: Array<{
    id: string;
    calculated_price?: {
      calculated_amount: number;
      currency_code: string;
    } | null;
  }>;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  price: string;
  handle: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "mock-1",
    title: "Dad Hat — Black",
    description: '"papidameunbreak" embroidered dad hat. Unstructured, adjustable strap.',
    thumbnail: null,
    price: "$35.00",
    handle: "dad-hat-black",
  },
  {
    id: "mock-2",
    title: "Dad Hat — Cream",
    description: '"papidameunbreak" embroidered dad hat. Unstructured, adjustable strap.',
    thumbnail: null,
    price: "$35.00",
    handle: "dad-hat-cream",
  },
  {
    id: "mock-3",
    title: "Dad Hat — Washed Blue",
    description: '"papidameunbreak" embroidered dad hat. Unstructured, adjustable strap.',
    thumbnail: null,
    price: "$35.00",
    handle: "dad-hat-washed-blue",
  },
];

function formatAmount(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

export async function fetchProducts(): Promise<Product[]> {
  const backendUrl = import.meta.env.VITE_MEDUSA_BACKEND_URL;

  if (!backendUrl) {
    return MOCK_PRODUCTS;
  }

  const { default: Medusa } = await import("@medusajs/js-sdk");

  const sdk = new Medusa({
    baseUrl: backendUrl,
    publishableKey: import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "",
  });

  const result = await sdk.store.product.list({ limit: 24 });
  const products = result.products as unknown as MedusaProduct[];

  return products.map((p) => {
    const variant = p.variants?.[0];
    const priceData = variant?.calculated_price;

    const price =
      priceData?.calculated_amount != null
        ? formatAmount(priceData.calculated_amount, priceData.currency_code)
        : "Price on request";

    return {
      id: p.id,
      title: p.title,
      description: p.description ?? "",
      thumbnail: p.thumbnail ?? null,
      price,
      handle: p.handle ?? p.id,
    };
  });
}
