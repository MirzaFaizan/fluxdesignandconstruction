import { Picture } from "@/components/media/picture";
import { Link } from "@/i18n/navigation";
import { launchMedia } from "@/lib/launch-media";
import { getLocale, getTranslations } from "next-intl/server";

function UrduHeading({ text }: { text: string }) {
  const lines = text.split(/(?<=۔)\s+/).filter(Boolean);

  return (
    <h1 className="coming-soon-h1 font-display mt-4 max-w-4xl text-4xl leading-[2.4] sm:text-5xl sm:leading-[2.4] lg:text-[3.5rem] lg:leading-[2.4]">
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h1>
  );
}

export async function ComingSoonHero() {
  const locale = await getLocale();
  const t = await getTranslations("ComingSoon");

  return (
    <section className="relative isolate min-h-[calc(100dvh-3.5rem)] border-b border-border sm:min-h-[calc(100dvh-4rem)]">
      <div className="absolute inset-0 overflow-hidden">
        <Picture
          image={launchMedia.khursheed586a}
          alt={t("heroAlt")}
          sizes="100vw"
          priority
          className="object-[center_38%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--background)_48%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[min(36rem,72%)] bg-gradient-to-t from-background via-background/80 to-transparent"
      />
      <div className="relative z-10 flex min-h-[calc(100dvh-3.5rem)] items-end sm:min-h-[calc(100dvh-4rem)]">
        <div className="coming-soon-copy w-full px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <p className="nav-link text-foreground">{t("kicker")}</p>
          {locale === "ur" ? (
            <UrduHeading text={t("h1")} />
          ) : (
            <h1 className="font-display mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-[3.5rem]">
              {t("h1")}
            </h1>
          )}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            {t("sub")}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/85">
            {t("note")}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center border border-border px-5 text-sm text-foreground transition-colors duration-150 hover:bg-foreground hover:text-background"
            >
              {t("contactCta")}
            </Link>
          </div>
          <p className="hero-caption mt-10 text-xs text-foreground/85">{t("caption")}</p>
        </div>
      </div>
    </section>
  );
}
