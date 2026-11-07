"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  return (
    <nav
      aria-label={t("languageAria")}
      className={cn("flex items-baseline gap-2 text-[0.6875rem] tracking-[0.14em]", className)}
    >
      <Link
        href={pathname}
        locale="en"
        hrefLang="en"
        className={cn(
          "uppercase transition-opacity duration-150",
          locale === "en" ? "text-foreground" : "text-foreground/55 hover:text-foreground"
        )}
        aria-current={locale === "en" ? "page" : undefined}
      >
        EN
      </Link>
      <span aria-hidden="true" className="text-border">
        |
      </span>
      <Link
        href={pathname}
        locale="ur"
        hrefLang="ur"
        className={cn(
          "font-[family-name:var(--font-naskh)] tracking-normal transition-opacity duration-150",
          locale === "ur" ? "text-foreground" : "text-foreground/55 hover:text-foreground"
        )}
        aria-current={locale === "ur" ? "page" : undefined}
        lang="ur"
      >
        اردو
      </Link>
    </nav>
  );
}
