import { createStorefrontClient } from '@shopify/hydrogen-react';
import type {
  CountryCode,
  CurrencyCode,
  LanguageCode,
} from '@shopify/hydrogen-react/storefront-api-types';

export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: { url: string; altText: string | null } | null;
  variantId: string;
  price: { amount: string; currencyCode: CurrencyCode };
}

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_API_VERSION || '2026-04';
const PRODUCT_HANDLE = import.meta.env.VITE_SHOPIFY_PRODUCT_HANDLE || 'hat';

export const shopifyConfig = {
  storeDomain: STORE_DOMAIN,
  storefrontToken: STOREFRONT_TOKEN,
  apiVersion: API_VERSION,
};

export function isShopifyConfigured(): boolean {
  return Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);
}

const PRODUCT_QUERY = `
  query ShopHatProduct($handle: String!, $country: CountryCode!, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      description
      handle
      featuredImage {
        url
        altText
      }
      variants(first: 1) {
        nodes {
          id
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export async function fetchProduct(
  country: CountryCode,
  language: LanguageCode,
): Promise<Product> {
  const client = createStorefrontClient({
    storeDomain: STORE_DOMAIN,
    publicStorefrontToken: STOREFRONT_TOKEN,
    storefrontApiVersion: API_VERSION,
  });

  const res = await fetch(client.getStorefrontApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...client.getPublicTokenHeaders(),
    },
    body: JSON.stringify({
      query: PRODUCT_QUERY,
      variables: { handle: PRODUCT_HANDLE, country, language },
    }),
  });

  const json = await res.json();
  if (json.errors || !json.data?.product) {
    throw new Error('Failed to fetch product from Shopify');
  }

  const product = json.data.product;
  const variant = product.variants.nodes[0];

  return {
    id: product.id,
    title: product.title,
    description: product.description ?? '',
    handle: product.handle,
    image: product.featuredImage,
    variantId: variant.id,
    price: {
      amount: variant.price.amount,
      currencyCode: variant.price.currencyCode,
    },
  };
}
