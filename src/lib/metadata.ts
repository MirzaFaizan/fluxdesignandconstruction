import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";

type AppPath =
  | "/"
  | "/coming-soon"
  | "/work"
  | "/houses"
  | "/interiors"
  | "/commercial"
  | "/build"
  | "/approvals"
  | "/studio"
  | "/contact"
  | "/privacy";

export function languageAlternates(
  href: AppPath,
  locale: Locale
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {
    "x-default": getPathname({ locale: "en", href }),
  };

  for (const loc of routing.locales) {
    languages[loc] = getPathname({ locale: loc, href });
  }

  return {
    canonical: getPathname({ locale, href }),
    languages,
  };
}

export function projectLanguageAlternates(
  slug: string,
  locale: Locale
): NonNullable<Metadata["alternates"]> {
  const en = `/work/${slug}`;
  const ur = `/ur/work/${slug}`;
  return {
    canonical: locale === "ur" ? ur : en,
    languages: {
      "x-default": en,
      en,
      ur,
    },
  };
}
