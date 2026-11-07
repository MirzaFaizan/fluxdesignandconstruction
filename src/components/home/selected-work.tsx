import { Still } from "@/components/media/still";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { selectedProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export async function SelectedWork({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");

  return (
    <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="nav-link text-foreground/70">{t("workEyebrow")}</h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
            {t("workIntro")}
          </p>
        </div>
        <Link
          href="/work"
          className="nav-link text-foreground/80 transition-colors duration-150 hover:text-foreground"
        >
          {t("allWork")}
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-px bg-border md:grid-cols-2">
        {selectedProjects.map((project, index) => (
          <Link
            key={project.slug}
            href="/work"
            className={cn(
              "group relative bg-background focus-visible:z-10",
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
                  <span className="min-w-0 flex-1 text-end">{project.caption[locale]}</span>
                </span>
              }
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
