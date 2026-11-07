import { ClosingBand } from "@/components/home/closing-band";
import { DesignToSite } from "@/components/home/design-to-site";
import { HomeHero } from "@/components/home/home-hero";
import { ProcessStepper } from "@/components/home/process-stepper";
import { SelectedWork } from "@/components/home/selected-work";
import { ServiceChips } from "@/components/home/service-chips";
import { StickyWhatsApp } from "@/components/home/sticky-whatsapp";
import { isLocale, routing } from "@/i18n/routing";
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
  const t = await getTranslations({ locale, namespace: "Home" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/", locale),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <main id="content" className="pb-24 md:pb-0">
        <HomeHero locale={locale} />
        <SelectedWork locale={locale} />
        <DesignToSite locale={locale} />
        <ProcessStepper />
        <ServiceChips />
        <ClosingBand />
      </main>
      <StickyWhatsApp />
    </>
  );
}
