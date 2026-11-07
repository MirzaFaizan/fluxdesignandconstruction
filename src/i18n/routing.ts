import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // URL is the source of truth. Do not geo-force Urdu from Accept-Language.
  localeDetection: false,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
  alternateLinks: true,
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export function htmlDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ur" ? "rtl" : "ltr";
}
