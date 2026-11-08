import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { Picture } from "@/components/media/picture";
import { Link } from "@/i18n/navigation";
import { ctaPrimary, ctaSecondary } from "@/lib/cta";
import { interiorsHero } from "@/lib/interiors";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function InteriorsHero({ locale }: { locale: Locale }) {
  const t = await getTranslations("Interiors");
  const nav = await getTranslations("Nav");
  const urdu = locale === "ur";

  return (
    <section className="relative isolate min-h-[calc(100svh-3.5rem)] border-b border-border md:min-h-[calc(100svh-4rem)]">
      <div className="absolute inset-0 overflow-hidden">
        <Picture
          image={interiorsHero.image}
          alt={interiorsHero.alt[locale]}
          sizes="100vw"
          priority
          className="object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-background/45" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[min(28rem,58%)] bg-gradient-to-t from-background/80 to-transparent"
        />
      </div>
      <div className="relative z-10 flex min-h-[calc(100svh-3.5rem)] flex-col justify-end md:min-h-[calc(100svh-4rem)]">
        <div className="min-w-0 w-full px-4 pb-20 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">
          <p className="hero-caption text-xs leading-6 text-foreground/90 sm:text-sm sm:leading-7">
            {interiorsHero.caption[locale]}
          </p>
          <h1
            className={
              urdu
                ? "interiors-h1 font-display mt-5 w-full max-w-full break-words text-foreground sm:max-w-5xl"
                : "font-display mt-5 w-full max-w-5xl text-2xl leading-tight text-foreground sm:text-4xl md:text-5xl"
            }
          >
            <span className="block">{t("h1Line1")}</span>
            <span className="block">{t("h1Line2")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            {t("lede")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <WhatsAppCta
              intent="interior"
              className={ctaPrimary}
              ariaLabel={nav("whatsappAria")}
            >
              {t("ask")}
            </WhatsAppCta>
            <Link href="/houses" className={ctaSecondary}>
              {nav("houses")}
            </Link>
          </div>
          <nav
            aria-label={t("kicker")}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
          >
            <a
              href="#kitchens"
              className="nav-link text-foreground/80 transition-colors duration-150 hover:text-foreground"
            >
              {t("kitchensTitle")}
            </a>
            <a
              href="#tv-lounges"
              className="nav-link text-foreground/80 transition-colors duration-150 hover:text-foreground"
            >
              {t("loungesTitle")}
            </a>
            <a
              href="#master-baths"
              className="nav-link text-foreground/80 transition-colors duration-150 hover:text-foreground"
            >
              {t("bathsTitle")}
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
