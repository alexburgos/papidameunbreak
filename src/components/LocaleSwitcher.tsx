import { useLocale, LOCALE_OPTIONS } from "#/lib/locale";
import type { CountryCode } from "@shopify/hydrogen-react/storefront-api-types";

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <select
      className="locale-switcher"
      aria-label="Shopping region"
      value={locale.country}
      onChange={(e) => setLocale(e.target.value as CountryCode)}
    >
      {LOCALE_OPTIONS.map((option) => (
        <option key={option.country} value={option.country}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
