import { StickyWhatsApp } from "@/components/home/sticky-whatsapp";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { StudioView } from "@/components/studio/studio-view";
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
  const t = await getTranslations({ locale, namespace: "Studio" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/studio", locale),
  };
}

export default async function StudioPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <LocalBusinessJsonLd />
      <main id="content" className="pb-16 md:pb-0">
        <StudioView locale={locale} />
      </main>
      <StickyWhatsApp />
    </>
  );
}
