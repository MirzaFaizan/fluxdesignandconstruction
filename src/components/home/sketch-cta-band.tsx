import { Link } from "@/i18n/navigation";
import { ctaSecondary } from "@/lib/cta";
import { getTranslations } from "next-intl/server";

export async function SketchCtaBand() {
  const t = await getTranslations("Home");

  return (
    <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="nav-link text-foreground/70">{t("sketchEyebrow")}</h2>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("sketchIntro")}
        </p>
      </div>
      <div className="mt-10">
        <Link href="/sketch" className={ctaSecondary}>
          {t("sketchCta")}
        </Link>
      </div>
    </section>
  );
}
