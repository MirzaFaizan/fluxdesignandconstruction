import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ctaPrimary, ctaSecondary } from "@/lib/cta";
import {
  commercialHeroAlt,
  commercialHeroCaption,
  commercialHeroStill,
} from "@/lib/commercial";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function CommercialHero({ locale }: { locale: Locale }) {
  const t = await getTranslations("Commercial");
  const nav = await getTranslations("Nav");

  return (
    <section className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-x-clip border-b border-border md:min-h-[calc(100svh-4rem)]">
      <Image
        src={commercialHeroStill}
        alt={commercialHeroAlt[locale]}
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-background/45" />
      <div className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-end md:min-h-[calc(100svh-4rem)]">
        <div className="min-w-0 w-full px-4 pb-20 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">
          <p className="hero-caption text-xs leading-6 text-foreground/90 sm:text-sm sm:leading-7">
            {commercialHeroCaption[locale]}
          </p>
          <p className="nav-link mt-6 text-foreground/80">{t("kicker")}</p>
          <h1 className="font-display mt-5 w-full max-w-5xl text-2xl leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block">{t("h1Line1")}</span>
            <span className="block">{t("h1Line2")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            {t("lede")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <WhatsAppCta
              intent="commercial"
              className={ctaPrimary}
              ariaLabel={nav("whatsappAria")}
            >
              {t("enquire")}
            </WhatsAppCta>
            <Link href="/work" className={ctaSecondary}>
              {t("viewWork")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
