import { Link } from "@/i18n/navigation";
import {
  BEHANCE_URL,
  INSTAGRAM_URL,
  STUDIO_EMAIL,
  isPhoneLive,
  phoneDisplay,
  telHref,
} from "@/lib/contact";
import { isLocale } from "@/i18n/routing";
import { footerNav } from "@/lib/nav";
import { whatsappUrl } from "@/lib/whatsapp";
import { getLocale, getTranslations } from "next-intl/server";
import { HeaderPrimary } from "./header-primary";
import { LanguageSwitcher } from "./language-switcher";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const display = phoneDisplay();
  const callHref = telHref();
  const waHref = whatsappUrl(locale, "generic");

  return (
    <footer className="mt-auto border-t border-border">
      <div className="flex flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-sm">
          <p dir="auto" className="text-sm font-medium tracking-[0.04em]">
            {t("studio")}
          </p>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/80">
            {t("tagline")}
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-sm leading-relaxed text-foreground/80">
            {isPhoneLive() && display && callHref ? (
              <li>
                <a href={callHref} dir="ltr" className="hover:text-foreground">
                  {display}
                </a>
              </li>
            ) : null}
            {waHref ? (
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  {nav("whatsapp")}
                </a>
              </li>
            ) : null}
            <li>
              <a
                dir="ltr"
                href={`mailto:${STUDIO_EMAIL}`}
                className="hover:text-foreground"
              >
                {STUDIO_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                {t("instagram")}
              </a>
            </li>
            <li>
              <a
                href={BEHANCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="hover:text-foreground"
              >
                {t("behance")}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-5 text-foreground/70">{t("legal")}</p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-16">
          <HeaderPrimary>
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
          </HeaderPrimary>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
