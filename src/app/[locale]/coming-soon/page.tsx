import { ComingSoonHero } from "@/components/coming-soon/coming-soon-hero";
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
  const t = await getTranslations({ locale, namespace: "ComingSoon" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    robots: { index: false, follow: true },
    alternates: languageAlternates("/coming-soon", locale),
  };
}

export default async function ComingSoonPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <main id="content">
      <ComingSoonHero />
    </main>
  );
}
