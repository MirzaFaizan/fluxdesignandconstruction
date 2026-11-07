import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { PageIntro } from "@/components/content/page-intro";
import { StickyWhatsApp } from "@/components/home/sticky-whatsapp";
import { Link } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";
import { ctaPrimary, ctaSecondary } from "@/lib/cta";
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
  const t = await getTranslations({ locale, namespace: "Approvals" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/approvals", locale),
  };
}

const AUTHORITIES = [
  { place: "authCdaPlace", body: "authCdaBody" },
  { place: "authRdaPlace", body: "authRdaBody" },
  { place: "authCantPlace", body: "authCantBody" },
  { place: "authDhaPlace", body: "authDhaBody" },
  { place: "authSocPlace", body: "authSocBody" },
] as const;

const BRING = ["bring1", "bring2", "bring3", "bring4", "bring5", "bring6"] as const;

export default async function ApprovalsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Approvals");
  const nav = await getTranslations("Nav");

  return (
    <>
      <main id="content">
        <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <PageIntro kicker={t("kicker")} title={t("title")} lede={t("lede")} />

          <section className="mt-16 border-t border-border pt-16">
            <h2 className="font-display text-3xl text-pretty sm:text-4xl">
              {t("authorityTitle")}
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
              {AUTHORITIES.map((item) => (
                <li key={item.place} className="border-s border-border ps-5">
                  <h3 className="font-display text-2xl text-pretty sm:text-3xl">
                    {t(item.place)}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/85 sm:text-base">
                    {t(item.body)}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16 border-t border-border pt-16">
            <h2 className="font-display text-3xl text-pretty sm:text-4xl">
              {t("weDoTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
              {t("weDoBody")}
            </p>
          </section>

          <section className="mt-16 border-t border-border pt-16">
            <h2 className="font-display text-3xl text-pretty sm:text-4xl">
              {t("bringTitle")}
            </h2>
            <ol className="mt-8 max-w-2xl space-y-4">
              {BRING.map((key, index) => (
                <li key={key} className="flex gap-4 text-base leading-relaxed text-foreground/85">
                  <span dir="ltr" className="nav-link shrink-0 text-foreground/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-pretty">{t(key)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-base">
              {t("packNote")}
            </p>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
              {t("close")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <WhatsAppCta
                intent="approvals"
                className={ctaPrimary}
                ariaLabel={nav("whatsappAria")}
              >
                {t("cta")}
              </WhatsAppCta>
              <Link href="/contact" className={ctaSecondary}>
                {t("contactLink")}
              </Link>
              <Link href="/studio" className={ctaSecondary}>
                {t("studioLink")}
              </Link>
            </div>
          </section>
        </article>
      </main>
      <StickyWhatsApp />
    </>
  );
}
