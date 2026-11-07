import { CallCta } from "@/components/chrome/call-cta";
import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { ContactForm } from "@/components/contact/contact-form";
import { OfficeMap } from "@/components/contact/office-map";
import { PageIntro } from "@/components/content/page-intro";
import { StickyWhatsApp } from "@/components/home/sticky-whatsapp";
import { isLocale, routing } from "@/i18n/routing";
import { ctaPrimary } from "@/lib/cta";
import {
  BEHANCE_URL,
  CITIES,
  hasOfficeAddress,
  hasOfficeHours,
  INSTAGRAM_URL,
  OFFICE_ADDRESS,
  OFFICE_HOURS_PKT,
  STUDIO_EMAIL,
  isPhoneLive,
  phoneDisplay,
  telHref,
} from "@/lib/contact";
import { studioPeople } from "@/lib/studio";
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
  const nav = await getTranslations("Nav");
  const footer = await getTranslations("Footer");
  const display = phoneDisplay();
  const callHref = telHref();

  const mapCaption = hasOfficeAddress()
    ? OFFICE_ADDRESS
    : t("mapCaption");

  return (
    <>
      <main id="content">
        <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <PageIntro kicker={t("kicker")} title={t("title")} lede={t("lede")} />

          <dl className="mt-10 max-w-xl space-y-5 text-sm leading-relaxed text-foreground/85 sm:text-base">
            <div>
              <dt className="nav-link text-foreground/70">{t("personLabel")}</dt>
              <dd className="mt-2 space-y-1">
                {studioPeople.map((person) => (
                  <p key={person.key} dir="ltr">
                    {person.prefix} {person.name}
                  </p>
                ))}
              </dd>
            </div>
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
            {isPhoneLive() && display && callHref ? (
              <div>
                <dt className="nav-link text-foreground/70">{t("phoneLabel")}</dt>
                <dd className="mt-1" dir="ltr">
                  <a href={callHref} className="hover:underline">
                    {display}
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="sr-only">Email</dt>
              <dd>
                <a
                  dir="ltr"
                  href={`mailto:${STUDIO_EMAIL}`}
                  className="hover:underline"
                >
                  {STUDIO_EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">{footer("instagram")}</dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {footer("instagram")}
                </a>
                <a
                  href={BEHANCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="hover:underline"
                >
                  {footer("behance")}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <WhatsAppCta
              intent="generic"
              className={ctaPrimary}
              ariaLabel={nav("whatsappAria")}
            >
              {nav("whatsapp")}
            </WhatsAppCta>
            <CallCta className={ctaPrimary} ariaLabel={t("callAria")}>
              {t("call")}
            </CallCta>
          </div>

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
