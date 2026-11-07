import { LogoMark } from "@/components/brand/logo-mark";
import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { Link } from "@/i18n/navigation";
import { primaryNav } from "@/lib/nav";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 overflow-x-clip border-b border-border bg-background">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
      >
        {t("skip")}
      </a>
      <div className="flex h-14 min-w-0 items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-foreground"
          aria-label="FluX Design and Construction"
          dir="ltr"
        >
          <LogoMark className="size-8 sm:size-9" />
          <span
            dir="ltr"
            className="hidden font-medium tracking-[0.22em] uppercase text-[0.7rem] min-[400px]:inline sm:text-[0.75rem]"
          >
            FluX
          </span>
        </Link>
        <LanguageSwitcher />
        <nav
          aria-label={t("primary")}
          className="ms-auto hidden items-center gap-6 md:flex lg:gap-8"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-foreground/80 transition-colors duration-150 hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <WhatsAppCta
          intent="generic"
          ariaLabel={t("whatsappAria")}
          className="nav-link hidden text-foreground/80 transition-colors duration-150 hover:text-foreground md:ms-8 md:inline lg:ms-10"
        >
          {t("whatsapp")}
        </WhatsAppCta>
        <div className="ms-auto md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
