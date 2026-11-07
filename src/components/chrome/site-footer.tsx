import { Link } from "@/i18n/navigation";
import { footerNav } from "@/lib/nav";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "./language-switcher";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-border">
      <div className="flex flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-sm">
          <p dir="ltr" className="text-sm tracking-[0.16em] uppercase">
            {t("studio")}
          </p>
          <p className="mt-3 text-sm text-foreground/80">{t("cities")}</p>
          <p className="mt-2 text-sm text-foreground/80">{t("tagline")}</p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-16">
          <nav aria-label={t("secondary")} className="flex flex-col gap-3">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-foreground/80 hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
