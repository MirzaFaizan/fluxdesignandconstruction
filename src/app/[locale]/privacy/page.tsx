import { PageIntro } from "@/components/content/page-intro";
import { Link } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";
import {
  CITIES,
  DOMAIN,
  hasEmail,
  hasLegalName,
  hasOfficeAddress,
  LEGAL_COMPANY_NAME,
  OFFICE_ADDRESS,
  PUBLIC_NAME,
  STUDIO_EMAIL,
} from "@/lib/contact";
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
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/privacy", locale),
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Privacy");
  const whoReady = hasLegalName() && hasOfficeAddress();

  return (
    <main id="content">
      <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <PageIntro kicker={t("kicker")} title={t("title")} lede={t("lede")} />

        <section className="mt-16 max-w-2xl border-t border-border pt-16">
          <h2 className="font-display text-3xl text-pretty sm:text-4xl">
            {t("whoTitle")}
          </h2>
          {whoReady ? (
            <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85">
              {t("whoBody", {
                domain: DOMAIN,
                legal: LEGAL_COMPANY_NAME,
                publicName: PUBLIC_NAME,
                address: OFFICE_ADDRESS,
              })}
            </p>
          ) : (
            <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85">
              {t("whoFallback", {
                publicName: PUBLIC_NAME,
                cities: CITIES,
                address: hasOfficeAddress() ? OFFICE_ADDRESS : CITIES,
              })}
            </p>
          )}
        </section>

        <section className="mt-16 max-w-2xl border-t border-border pt-16">
          <h2 className="font-display text-3xl text-pretty sm:text-4xl">
            {t("collectTitle")}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85">
            {t("collectBody")}
          </p>
        </section>

        <section className="mt-16 max-w-2xl border-t border-border pt-16">
          <h2 className="font-display text-3xl text-pretty sm:text-4xl">
            {t("useTitle")}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85">
            {t("useBody")}
          </p>
        </section>

        <section className="mt-16 max-w-2xl border-t border-border pt-16">
          <h2 className="font-display text-3xl text-pretty sm:text-4xl">
            {t("longTitle")}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85">
            {t("longBody")}
          </p>
        </section>

        <section className="mt-16 max-w-2xl border-t border-border pt-16">
          <h2 className="font-display text-3xl text-pretty sm:text-4xl">
            {t("sketchTitle")}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85">
            {t("sketchBody")}
          </p>
        </section>

        <section className="mt-16 max-w-2xl border-t border-border pt-16">
          <h2 className="font-display text-3xl text-pretty sm:text-4xl">
            {t("contactTitle")}
          </h2>
          {hasEmail() ? (
            <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85">
              {t("contactLine")}{" "}
              <a dir="ltr" href={`mailto:${STUDIO_EMAIL}`} className="underline">
                {STUDIO_EMAIL}
              </a>
              .
            </p>
          ) : (
            <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85">
              {t("contactFallback")}{" "}
              <Link href="/contact" className="underline">
                {t("contactLink")}
              </Link>
              .
            </p>
          )}
        </section>
      </article>
    </main>
  );
}
