import { Still } from "@/components/media/still";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { housesGalleryStills } from "@/lib/houses";
import { getTranslations } from "next-intl/server";

export async function HousesGallery({ locale }: { locale: Locale }) {
  const t = await getTranslations("Houses");

  return (
    <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="nav-link text-foreground/70">{t("galleryEyebrow")}</h2>
        <p className="mt-5 text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("galleryIntro")}
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4">
        {housesGalleryStills.map((item) => (
          <Link key={item.id} href="/work" className="group relative bg-background">
            <Still
              src={item.image}
              alt={item.alt[locale]}
              sizes="100vw"
              className="aspect-[16/10] md:aspect-[16/7]"
              caption={item.caption[locale]}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
