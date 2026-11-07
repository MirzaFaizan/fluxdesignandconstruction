import { ContactForm } from "@/components/contact/contact-form";
import { OfficeMap } from "@/components/contact/office-map";
import { PageIntro } from "@/components/content/page-intro";
import { StickyWhatsApp } from "@/components/home/sticky-whatsapp";
import { isLocale, routing } from "@/i18n/routing";
import {
  CONTACT_NAME,
  CITIES,
  hasContactName,
  hasOfficeAddress,
  hasOfficeHours,
  hasEmail,
  OFFICE_ADDRESS,
  OFFICE_HOURS_PKT,
  STUDIO_EMAIL,
  isPhoneLive,
  phoneDisplay,
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
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/contact", locale),
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Contact");
  const display = phoneDisplay();

  const mapCaption = hasOfficeAddress()
    ? OFFICE_ADDRESS
    : t("mapCaption");

  return (
    <>
      <main id="content">
        <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <PageIntro kicker={t("kicker")} title={t("title")} lede={t("lede")} />

          <dl className="mt-10 max-w-xl space-y-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
            {hasContactName() ? (
              <div>
                <dt className="sr-only">{t("personLabel")}</dt>
                <dd>{t("nameAnswers", { name: CONTACT_NAME })}</dd>
              </div>
            ) : null}
            {hasOfficeAddress() ? (
              <div>
                <dt className="nav-link text-foreground/70">{t("officeLabel")}</dt>
                <dd className="mt-1">{OFFICE_ADDRESS}</dd>
              </div>
            ) : null}
            {hasOfficeHours() ? (
              <div>
                <dt className="nav-link text-foreground/70">{t("hoursLabel")}</dt>
                <dd className="mt-1" dir="ltr">
                  {OFFICE_HOURS_PKT} (PKT)
                </dd>
              </div>
            ) : null}
            {isPhoneLive() && display ? (
              <div>
                <dt className="nav-link text-foreground/70">{t("phoneLabel")}</dt>
                <dd className="mt-1" dir="ltr">
                  {display}
                </dd>
              </div>
            ) : null}
            {hasEmail() ? (
              <div>
                <dt className="sr-only">Email</dt>
                <dd className="mt-1">
                  <a dir="ltr" href={`mailto:${STUDIO_EMAIL}`} className="underline">
                    {STUDIO_EMAIL}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>

          <section className="mt-16 border-t border-border pt-16">
            <h2 className="font-display text-3xl text-pretty sm:text-4xl">
              {t("overseasTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
              {t("overseasBody")}
            </p>
          </section>

          <section className="mt-16 border-t border-border pt-16">
            <ContactForm locale={locale} />
          </section>

          <section className="mt-16 border-t border-border pt-16">
            <h2 className="nav-link text-foreground/70">{t("mapEyebrow")}</h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-foreground/85">
              {CITIES}
            </p>
            <div className="mt-8">
              <OfficeMap caption={mapCaption} label={t("mapLabel")} />
            </div>
          </section>
        </article>
      </main>
      <StickyWhatsApp />
    </>
  );
}
