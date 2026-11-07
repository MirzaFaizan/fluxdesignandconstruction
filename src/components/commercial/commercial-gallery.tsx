import { Still } from "@/components/media/still";
import type { Locale } from "@/i18n/routing";
import { commercialProjects } from "@/lib/commercial";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export async function CommercialGallery({ locale }: { locale: Locale }) {
  const t = await getTranslations("Commercial");

  return (
    <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="nav-link text-foreground/70">{t("galleryEyebrow")}</h2>
        <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("galleryIntro")}
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {commercialProjects.map((project, index) => (
          <article
            key={project.slug}
            className={cn(
              "reveal bg-background",
              project.layout === "full" && "md:col-span-2"
            )}
          >
            <Still
              src={project.image}
              alt={project.alt[locale]}
              sizes={
                project.layout === "full"
                  ? "100vw"
                  : "(min-width: 768px) 50vw, 100vw"
              }
              className={cn(
                "aspect-[16/10]",
                project.layout === "full" && "md:aspect-[16/7]"
              )}
              caption={
                <span className="flex items-baseline justify-between gap-4">
                  <span dir="ltr" className="tabular-nums text-foreground/80">
                    {padIndex(index)}
                  </span>
                  <span className="min-w-0 flex-1 text-end">
                    {project.caption[locale]}
                  </span>
                </span>
              }
            />
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-base sm:leading-7">
              {project.brief[locale]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
