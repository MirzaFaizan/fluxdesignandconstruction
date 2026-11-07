import { HousesClose } from "@/components/houses/houses-close";
import { HousesGallery } from "@/components/houses/houses-gallery";
import { HousesHero } from "@/components/houses/houses-hero";
import { HousesSticky } from "@/components/houses/houses-sticky";
import { PlotSizeSection } from "@/components/houses/plot-size-section";
import { isLocale, routing } from "@/i18n/routing";
import { kanal1Stills, marla10Stills, marla5Stills } from "@/lib/houses";
import { languageAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Houses" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/houses", locale),
  };
}

export default async function HousesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Houses");
  const nav = await getTranslations("Nav");

  return (
    <>
      <main id="content">
        <HousesHero locale={locale} />
        <PlotSizeSection
          locale={locale}
          title={t("plot5Title")}
          body={t("plot5Body")}
          stills={marla5Stills}
          cta={t("plot5Cta")}
          intent="house5Marla"
          ariaLabel={nav("whatsappAria")}
        />
        <PlotSizeSection
          locale={locale}
          title={t("plot10Title")}
          body={t("plot10Body")}
          stills={marla10Stills}
          cta={t("plot10Cta")}
          intent="house"
          ariaLabel={nav("whatsappAria")}
        />
        <PlotSizeSection
          locale={locale}
          title={t("plot1Title")}
          body={t("plot1Body")}
          stills={kanal1Stills}
          cta={t("plot1Cta")}
          intent="house1Kanal"
          ariaLabel={nav("whatsappAria")}
        />
        <PlotSizeSection
          locale={locale}
          title={t("otherTitle")}
          body={t("otherBody")}
          stills={[]}
          cta={t("otherCta")}
          intent="houseOther"
          ariaLabel={nav("whatsappAria")}
        />
        <PlotSizeSection
          locale={locale}
          title={t("whereTitle")}
          body={t("whereBody")}
          stills={[]}
        />
        <HousesGallery locale={locale} />
        <HousesClose />
      </main>
      <HousesSticky />
    </>
  );
}
