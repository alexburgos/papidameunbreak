import type { ReactNode } from "react";
import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";
import { shopifyConfig, isShopifyConfigured } from "#/lib/shopify";

export function ShopProviders({ children }: { children: ReactNode }) {
  if (!isShopifyConfigured()) return <>{children}</>;

  return (
    <ShopifyProvider
      storeDomain={shopifyConfig.storeDomain}
      storefrontToken={shopifyConfig.storefrontToken}
      storefrontApiVersion={shopifyConfig.apiVersion}
      countryIsoCode="ES"
      languageIsoCode="EN"
    >
      <CartProvider>{children}</CartProvider>
    </ShopifyProvider>
  );
}
