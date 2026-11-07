import { StickyWhatsApp } from "@/components/home/sticky-whatsapp";
import { WorkIndex } from "@/components/work/work-index";
import { isLocale, routing } from "@/i18n/routing";
import { languageAlternates } from "@/lib/metadata";
import { workProjects } from "@/lib/projects";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Work" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/work", locale),
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Work");
  const nav = await getTranslations("Nav");

  return (
    <>
      <main id="content" className="pb-16 md:pb-0">
        <article className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="font-display max-w-3xl text-4xl sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
            {t("lede")}
          </p>
          <div className="mt-12">
            <WorkIndex
              cards={workProjects.map((project, index) => ({
                slug: project.slug,
                layout: project.layout,
                index,
                typology: project.typology,
                plotSize: project.plotSize,
                style: project.style,
                fromDesignToSite: project.fromDesignToSite,
                image: project.hero,
                caption: project.caption[locale],
                alt: project.alt[locale],
              }))}
              copy={{
                filters: t("filters"),
                filterAll: t("filterAll"),
                filterHouses: t("filterHouses"),
                filterInteriors: t("filterInteriors"),
                filterCommercial: t("filterCommercial"),
                filterLandscape: t("filterLandscape"),
                filterDesignToSite: t("filterDesignToSite"),
                filterPlot: t("filterPlot"),
                filter5Marla: t("filter5Marla"),
                filter10Marla: t("filter10Marla"),
                filter1Kanal: t("filter1Kanal"),
                filterOther: t("filterOther"),
                filterStyle: t("filterStyle"),
                filterModern: t("filterModern"),
                filterClassical: t("filterClassical"),
                empty: t("empty"),
                whatsapp: nav("whatsapp"),
                whatsappAria: nav("whatsappAria"),
              }}
            />
          </div>
        </article>
      </main>
      <StickyWhatsApp />
    </>
  );
}
