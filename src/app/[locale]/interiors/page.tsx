import { CitiesBand } from "@/components/interiors/cities-band";
import { InteriorsClose } from "@/components/interiors/interiors-close";
import { InteriorsHero } from "@/components/interiors/interiors-hero";
import { InteriorsSticky } from "@/components/interiors/interiors-sticky";
import { RoomGalleries } from "@/components/interiors/room-galleries";
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
  const t = await getTranslations({ locale, namespace: "Interiors" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/interiors", locale),
  };
}

export default async function InteriorsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <main id="content" className="pb-16 md:pb-0">
        <InteriorsHero locale={locale} />
        <RoomGalleries locale={locale} />
        <CitiesBand />
        <InteriorsClose />
      </main>
      <InteriorsSticky />
    </>
  );
}
