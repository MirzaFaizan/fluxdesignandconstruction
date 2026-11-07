import { Still } from "@/components/media/still";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { designSitePairs } from "@/lib/projects";
import { getTranslations } from "next-intl/server";

export async function DesignToSite({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");

  return (
    <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="nav-link text-foreground/70">{t("proofEyebrow")}</h2>
        <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("proofIntro")}
        </p>
      </div>
      <div className="mt-12 flex flex-col gap-12">
        {designSitePairs.map((pair) => (
          <article key={pair.id} className="reveal">
            <p dir="ltr" className="nav-link mb-4 text-foreground/70">
              {pair.society}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Still
                src={pair.cgi}
                alt={pair.cgiCaption[locale]}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3] bg-background"
                caption={
                  <span className="flex flex-col gap-1">
                    <span>{t("labelDesign")}</span>
                    <span className="text-foreground/80">{t("cgiNote")}</span>
                  </span>
                }
              />
              <Still
                src={pair.site}
                alt={pair.siteCaption[locale]}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3] bg-background"
                caption={
                  <span className="flex flex-col gap-1">
                    <span>{t("labelSite")}</span>
                    <span className="text-foreground/80">{t("siteNote")}</span>
                  </span>
                }
              />
            </div>
          </article>
        ))}
      </div>
      <Link
        href="/build"
        className="nav-link mt-10 inline-flex text-foreground/80 transition-colors duration-150 hover:text-foreground"
      >
        {t("seeConstruction")}
      </Link>
    </section>
  );
}
