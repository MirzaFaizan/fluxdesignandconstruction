import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_ORIGIN } from "@/lib/contact";
import { workProjects } from "@/lib/projects";

const STATIC_PATHS = [
  "/",
  "/work",
  "/houses",
  "/sketch",
  "/interiors",
  "/commercial",
  "/build",
  "/approvals",
  "/studio",
  "/faq",
  "/contact",
  "/privacy",
] as const;

function abs(locale: Locale, href: string) {
  return `${SITE_ORIGIN}${getPathname({ locale, href })}`;
}

function languages(href: string) {
  return {
    en: abs("en", href),
    ur: abs("ur", href),
    "x-default": abs("en", href),
  };
}

function entriesFor(href: string): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: abs(locale, href),
    alternates: { languages: languages(href) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PATHS.flatMap((href) => entriesFor(href)),
    ...workProjects.flatMap((project) => entriesFor(`/work/${project.slug}`)),
  ];
}
