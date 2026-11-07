import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { PageIntro } from "@/components/content/page-intro";
import { StickyWhatsApp } from "@/components/home/sticky-whatsapp";
import { Link } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";
import { ctaPrimary } from "@/lib/cta";
import { faqItems, faqLinkLabel } from "@/lib/faq";
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
  const t = await getTranslations({ locale, namespace: "Faq" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/faq", locale),
  };
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Faq");
  const nav = await getTranslations("Nav");
  const footer = await getTranslations("Footer");

  const labelFor = (href: (typeof faqItems)[number]["links"][number]) => {
    const key = faqLinkLabel[href];
    if (key === "approvals" || key === "sketch") return footer(key);
    return nav(key);
  };

  return (
    <>
      <main id="content">
        <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <PageIntro kicker={t("kicker")} title={t("title")} lede={t("lede")} />

          <div className="mt-16 space-y-16 border-t border-border pt-16">
            {faqItems.map((item) => (
              <section key={item.id} id={item.id} className="scroll-mt-28">
                <h2 className="font-display text-3xl text-pretty sm:text-4xl">
                  {t(item.q)}
                </h2>
                <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
                  {t(item.a1)}
                </p>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
                  {t(item.a2)}
                </p>
                <p className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {item.links.map((href) => (
                    <Link
                      key={href}
                      href={href}
                      className="nav-link text-foreground/70 hover:text-foreground"
                    >
                      {labelFor(href)}
                    </Link>
                  ))}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-border pt-16">
            <WhatsAppCta
              intent="generic"
              className={ctaPrimary}
              ariaLabel={nav("whatsappAria")}
            >
              {nav("whatsapp")}
            </WhatsAppCta>
          </div>
        </article>
      </main>
      <StickyWhatsApp />
    </>
  );
}
