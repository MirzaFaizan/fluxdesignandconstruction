import { CommercialClose } from "@/components/commercial/commercial-close";
import { CommercialGallery } from "@/components/commercial/commercial-gallery";
import { CommercialHero } from "@/components/commercial/commercial-hero";
import { CommercialSticky } from "@/components/commercial/commercial-sticky";
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
  const t = await getTranslations({ locale, namespace: "Commercial" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/commercial", locale),
  };
}

export default async function CommercialPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <main id="content" className="pb-16 md:pb-0">
        <CommercialHero locale={locale} />
        <CommercialGallery locale={locale} />
        <CommercialClose />
      </main>
      <CommercialSticky />
    </>
  );
}
