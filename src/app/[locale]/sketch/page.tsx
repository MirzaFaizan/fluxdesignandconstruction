import { PageIntro } from "@/components/content/page-intro";
import { SketchIsland } from "@/components/sketch/sketch-island";
import { Link } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";
import { kanal1Stills, marla10Stills, marla5Stills } from "@/lib/houses";
import { languageAlternates } from "@/lib/metadata";
import type { SimilarSketchProject } from "@/lib/sketch";
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
  const t = await getTranslations({ locale, namespace: "Sketch" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: languageAlternates("/sketch", locale),
  };
}

function similarFrom(
  still: (typeof marla5Stills)[number],
  locale: "en" | "ur"
): SimilarSketchProject {
  return {
    src: still.image.src,
    caption: still.caption[locale],
    width: still.image.width,
    height: still.image.height,
  };
}

export default async function SketchPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Sketch");
  const similar = {
    "5marla": similarFrom(marla5Stills[0], locale),
    "10marla": similarFrom(marla10Stills[0], locale),
    "1kanal": similarFrom(kanal1Stills[0], locale),
  };

  return (
    <main id="content">
      <article className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <PageIntro kicker={t("kicker")} title={t("title")} lede={t("lede")} />
        <p className="mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-base">
          {t("disclaimer")}{" "}
          <Link href="/approvals" className="underline">
            {t("approvalsLink")}
          </Link>
          .
        </p>
        <SketchIsland locale={locale} similar={similar} />
      </article>
    </main>
  );
}
