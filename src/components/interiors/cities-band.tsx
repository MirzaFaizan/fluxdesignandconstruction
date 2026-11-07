import { getTranslations } from "next-intl/server";

export async function CitiesBand() {
  const t = await getTranslations("Interiors");

  return (
    <section className="reveal border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h2 className="font-display max-w-3xl text-3xl sm:text-4xl">
        {t("citiesTitle")}
      </h2>
      <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
        {t("citiesBody")}
      </p>
    </section>
  );
}
