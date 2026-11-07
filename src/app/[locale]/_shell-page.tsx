import { RouteShell } from "@/components/chrome/route-shell";
import { isLocale, routing } from "@/i18n/routing";
import { languageAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Namespace =
  | "Work"
  | "Houses"
  | "Interiors"
  | "Commercial"
  | "Build"
  | "Approvals"
  | "Studio"
  | "Contact"
  | "Privacy";

type AppPath =
  | "/work"
  | "/houses"
  | "/interiors"
  | "/commercial"
  | "/build"
  | "/approvals"
  | "/studio"
  | "/contact"
  | "/privacy";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateShellStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function createShellMetadata(namespace: Namespace, href: AppPath) {
  return async function generateMetadata({
    params,
  }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    const t = await getTranslations({ locale, namespace });
    const meta = await getTranslations({ locale, namespace: "Meta" });
    return {
      title: t("title"),
      description: t("lede"),
      applicationName: meta("siteName"),
      alternates: languageAlternates(href, locale),
    };
  };
}

export function createShellPage(namespace: Namespace) {
  return async function ShellPage({ params }: PageProps) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    setRequestLocale(locale);
    const t = await getTranslations(namespace);

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
  };
}
