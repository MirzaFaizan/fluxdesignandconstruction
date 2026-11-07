import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { CaseStudyMedia } from "@/components/work/case-study-media";
import { Link } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";
import { ctaPrimary } from "@/lib/cta";
import { projectLanguageAlternates } from "@/lib/metadata";
import { getWorkProject, workProjects } from "@/lib/projects";
import {
  projectWhatsAppPrefill,
} from "@/lib/whatsapp";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    workProjects.map((project) => ({ locale, slug: project.slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getWorkProject(slug);
  if (!project) return {};
  return {
    title: { absolute: `${project.title[locale]} | FluX` },
    description: project.metaDescription[locale],
    alternates: projectLanguageAlternates(slug, locale),
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const project = getWorkProject(slug);
  if (!project) notFound();

  const t = await getTranslations("Project");
  const home = await getTranslations("Home");
  const nav = await getTranslations("Nav");
  const prefill = projectWhatsAppPrefill(locale, project.like[locale]);

  return (
    <>
      <main id="content" className="pb-16 md:pb-0">
        <article className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="nav-link text-foreground/70">
            <Link
              href="/work"
              className="transition-colors duration-150 hover:text-foreground"
            >
              {t("kicker")}
            </Link>
          </p>
          <h1 className="font-display mt-5 max-w-3xl text-4xl sm:text-5xl">
            {project.title[locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/80 sm:text-base">
            {project.caption[locale]}
          </p>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
            {project.brief[locale]}
          </p>

          <div className="mt-12">
            <CaseStudyMedia
              slug={project.slug}
              items={project.gallery.map((item) => ({
                src: item.src,
                alt: item.alt[locale],
                caption: item.caption[locale],
                kind: item.kind,
              }))}
              compare={
                project.compare
                  ? {
                      cgi: project.compare.cgi,
                      site: project.compare.site,
                      cgiAlt: project.compare.cgiCaption[locale],
                      siteAlt: project.compare.siteCaption[locale],
                    }
                  : undefined
              }
              copy={{
                galleryIntro: t("galleryIntro"),
                label3d: t("label3d"),
                labelElevation: t("labelElevation"),
                labelDesign: t("labelDesign"),
                labelSite: t("labelSite"),
                cgiNote: t("cgiNote"),
                compareIntro: t("compareIntro"),
                compareAria: t("compareAria"),
                lightboxClose: t("lightboxClose"),
                lightboxNext: t("lightboxNext"),
                lightboxPrev: t("lightboxPrev"),
              }}
            />
          </div>

          {project.map ? (
            <p className="mt-16 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
              {t("mapPrefix")} {project.map[locale]}
            </p>
          ) : null}

          <section className="mt-16 max-w-2xl">
            <p className="text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
              {t("closing")}
            </p>
            <WhatsAppCta
              text={prefill}
              ariaLabel={nav("whatsappAria")}
              className={`${ctaPrimary} mt-8`}
            >
              {t("askProject")}
            </WhatsAppCta>
          </section>
        </article>
      </main>
      <WhatsAppCta
        text={prefill}
        ariaLabel={nav("whatsappAria")}
        className="fixed end-4 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 min-h-11 border border-border bg-background/90 px-3 text-sm text-foreground shadow-none transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-offset-3 active:scale-[0.96] md:hidden"
      >
        {home("stickyLabel")}
      </WhatsAppCta>
    </>
  );
}
