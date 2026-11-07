import { StickyWhatsApp } from "@/components/home/sticky-whatsapp";
import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { CgiSiteSlider } from "@/components/media/cgi-site-slider";
import { Still } from "@/components/media/still";
import { isLocale, routing } from "@/i18n/routing";
import { buildComparePairs, buildSiteStills } from "@/lib/build";
import { ctaChip, ctaPrimary } from "@/lib/cta";
import { languageAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const STEPS = [
  { n: "01", title: "greyTitle", line: "greyLine" },
  { n: "02", title: "finishTitle", line: "finishLine" },
  { n: "03", title: "turnkeyTitle", line: "turnkeyLine" },
  { n: "04", title: "reportTitle", line: "reportLine" },
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Build" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/build", locale),
  };
}

export default async function BuildPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Build");
  const nav = await getTranslations("Nav");

  return (
    <>
      <main id="content" className="pb-16 md:pb-0">
        <header className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="nav-link text-foreground/70">{t("kicker")}</p>
          <h1 className="font-display mt-5 max-w-3xl text-4xl sm:text-5xl">{t("title")}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            {t("lede")}
          </p>
        </header>

        <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
            {STEPS.map((step) => (
              <li key={step.n} className="reveal border-s border-border ps-5 md:border-s-0 md:ps-0">
                <p dir="ltr" className="nav-link text-foreground/70">
                  {step.n}
                </p>
                <h2 className="font-display mt-4 text-2xl sm:text-3xl">{t(step.title)}</h2>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/85 sm:text-base">
                  {t(step.line)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="nav-link text-foreground/70">{t("pairsEyebrow")}</h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
              {t("pairsIntro")}
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-12">
            {buildComparePairs.map((pair, index) => (
              <article key={pair.id} className="reveal">
                <p dir="ltr" className="nav-link mb-4 text-foreground/70">
                  {pair.caption[locale]}
                </p>
                <div className="relative mx-auto aspect-[16/10] w-full max-h-[calc(100svh-11rem)] max-w-[min(100%,calc((100svh-11rem)*1.6))] bg-background">
                  <CgiSiteSlider
                    cgi={pair.cgi}
                    site={pair.site}
                    cgiAlt={pair.cgiAlt[locale]}
                    siteAlt={pair.siteAlt[locale]}
                    designLabel={t("labelDesign")}
                    siteLabel={t("labelSite")}
                    cgiLabel={t("cgiLabel")}
                    cgiNote={t("cgiNote")}
                    siteNote={t("siteNote")}
                    ariaLabel={t("compareAria", { plot: pair.plot })}
                    cgiPosition={pair.cgiPosition}
                    sitePosition={pair.sitePosition}
                    priority={index === 0}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="nav-link text-foreground/70">{t("sitesEyebrow")}</h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
              {t("sitesIntro")}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {buildSiteStills.map((still) => (
              <Still
                key={still.id}
                src={still.image}
                alt={still.alt[locale]}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-square bg-background"
                caption={
                  <span className="flex flex-col gap-1">
                    <span dir="ltr">{still.caption[locale]}</span>
                    <span className="text-foreground/80">{t("siteNote")}</span>
                  </span>
                }
              />
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
            {t("reply")}
          </p>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
            {t("freeLook")}
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            <li>
              <WhatsAppCta
                intent="grey"
                className={ctaChip}
                ariaLabel={nav("whatsappAria")}
              >
                {t("chipGrey")}
              </WhatsAppCta>
            </li>
            <li>
              <WhatsAppCta
                intent="turnkey"
                className={ctaPrimary}
                ariaLabel={nav("whatsappAria")}
              >
                {t("chipTurnkey")}
              </WhatsAppCta>
            </li>
          </ul>
        </section>
      </main>
      <StickyWhatsApp />
    </>
  );
}
