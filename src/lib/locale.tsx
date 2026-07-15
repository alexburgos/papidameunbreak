import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CountryCode, LanguageCode } from "@shopify/hydrogen-react/storefront-api-types";

export interface LocaleOption {
  country: CountryCode;
  language: LanguageCode;
  label: string;
}

export const LOCALE_OPTIONS: LocaleOption[] = [
  { country: "ES", language: "EN", label: "Spain / EU (EUR)" },
  { country: "GB", language: "EN", label: "United Kingdom (GBP)" },
  { country: "US", language: "EN", label: "United States (USD)" },
];

const DEFAULT_LOCALE = LOCALE_OPTIONS[0];
const STORAGE_KEY = "papidameunbreak:locale";

interface LocaleContextValue {
  locale: LocaleOption;
  setLocale: (country: CountryCode) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const match = LOCALE_OPTIONS.find((option) => option.country === saved);
    if (match) setLocaleState(match);
  }, []);

  const setLocale = (country: CountryCode) => {
    const option = LOCALE_OPTIONS.find((o) => o.country === country);
    if (!option) return;
    setLocaleState(option);
    localStorage.setItem(STORAGE_KEY, country);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
