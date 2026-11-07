import { RouteShell } from "@/components/chrome/route-shell";
import { isLocale } from "@/i18n/routing";
import { languageAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return [] as { locale: string; slug: string }[];
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Project" });
  return {
    title: t("title"),
    description: t("lede"),
    alternates: languageAlternates("/work", locale),
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Project");

  return (
    <main id="content">
      <RouteShell
        kicker={t("kicker")}
        title={t("title")}
        lede={t("lede")}
        photoLabel={t("photoPlane")}
      />
    </main>
  );
}
