import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { Link } from "@/i18n/navigation";
import { ctaPrimary, ctaSecondary } from "@/lib/cta";
import { heroStill } from "@/lib/launch-media";
import { heroAlt, heroCaption } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function HomeHero({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");
  const nav = await getTranslations("Nav");

  return (
    <section className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-x-clip border-b border-border md:min-h-[calc(100svh-4rem)]">
      <Image
        src={heroStill}
        alt={heroAlt[locale]}
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background/45"
      />
      <div className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-end md:min-h-[calc(100svh-4rem)]">
        <div className="min-w-0 w-full px-4 pb-20 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">
          <p className="text-xs leading-6 text-foreground/90 sm:text-sm sm:leading-7">
            {heroCaption[locale]}
          </p>
          <h1 className="font-display mt-5 w-full max-w-5xl text-2xl leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block">{t("h1Line1")}</span>
            <span className="block">{t("h1Line2")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            {t("sub")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/work" className={ctaPrimary}>
              {t("viewWork")}
            </Link>
            <WhatsAppCta
              intent="generic"
              className={ctaSecondary}
              ariaLabel={nav("whatsappAria")}
            >
              {nav("whatsapp")}
            </WhatsAppCta>
          </div>
        </div>
      </div>
    </section>
  );
}
