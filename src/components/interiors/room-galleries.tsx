import { Still } from "@/components/media/still";
import type { Locale } from "@/i18n/routing";
import {
  bathStills,
  kitchenStills,
  loungeStills,
  type InteriorStill,
} from "@/lib/interiors";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function RoomGrid({
  stills,
  locale,
}: {
  stills: InteriorStill[];
  locale: Locale;
}) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
      {stills.map((item, index) => (
        <Still
          key={item.id}
          src={item.image}
          alt={item.alt[locale]}
          sizes={
            item.layout === "full"
              ? "100vw"
              : "(min-width: 768px) 50vw, 100vw"
          }
          className={cn(
            "aspect-[16/9] bg-background",
            item.layout === "full" && "md:col-span-2"
          )}
          caption={
            <span className="flex items-baseline justify-between gap-4">
              <span dir="ltr" className="tabular-nums text-foreground/80">
                {padIndex(index)}
              </span>
              <span className="min-w-0 flex-1 text-end">{item.caption[locale]}</span>
            </span>
          }
        />
      ))}
    </div>
  );
}

export async function RoomGalleries({ locale }: { locale: Locale }) {
  const t = await getTranslations("Interiors");

  return (
    <>
      <section
        id="kitchens"
        className="reveal scroll-mt-16 border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <h2 className="font-display max-w-3xl text-3xl sm:text-4xl">
          {t("kitchensTitle")}
        </h2>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("kitchensBody")}
        </p>
        <RoomGrid stills={kitchenStills} locale={locale} />
      </section>
      <section
        id="tv-lounges"
        className="reveal scroll-mt-16 border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <h2 className="font-display max-w-3xl text-3xl sm:text-4xl">
          {t("loungesTitle")}
        </h2>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("loungesBody")}
        </p>
        <RoomGrid stills={loungeStills} locale={locale} />
      </section>
      <section
        id="master-baths"
        className="reveal scroll-mt-16 border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <h2 className="font-display max-w-3xl text-3xl sm:text-4xl">
          {t("bathsTitle")}
        </h2>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("bathsBody")}
        </p>
        <RoomGrid stills={bathStills} locale={locale} />
      </section>
    </>
  );
}
