import { Link } from "@/i18n/navigation";
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
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: { absolute: t("titleDefault") },
    description: t("description"),
    alternates: languageAlternates("/", locale),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const nav = await getTranslations("Nav");

  return (
    <main id="content">
      <section className="relative min-h-[78dvh] border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[color-mix(in_srgb,var(--background)_88%,black)]"
        />
        <div className="relative flex min-h-[78dvh] items-end">
          <div className="w-full px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
            <p className="nav-link text-foreground/80">{t("kicker")}</p>
            <h1 className="font-display mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-[3.5rem]">
              {t("h1")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">
              {t("sub")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href="/work"
                className="inline-flex min-h-11 items-center border border-border px-5 text-sm text-foreground transition-colors duration-150 hover:bg-foreground hover:text-background"
              >
                {t("viewWork")}
              </Link>
              <Link
                href="/contact"
                className="nav-link text-foreground/80 hover:text-foreground"
              >
                {nav("whatsapp")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
