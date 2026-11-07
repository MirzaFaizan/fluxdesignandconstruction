import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { Still } from "@/components/media/still";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ctaChip } from "@/lib/cta";
import type { HouseStill } from "@/lib/houses";
import type { WhatsAppIntent } from "@/lib/whatsapp";

type PlotSizeSectionProps = {
  locale: Locale;
  title: string;
  body: string;
  stills: HouseStill[];
  cta?: string;
  intent?: WhatsAppIntent;
  ariaLabel?: string;
  sketchCta?: string;
};

export function PlotSizeSection({
  locale,
  title,
  body,
  stills,
  cta,
  intent,
  ariaLabel,
  sketchCta,
}: PlotSizeSectionProps) {
  return (
    <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h2 className="font-display text-3xl text-pretty sm:text-4xl">{title}</h2>
      <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
        {body}
      </p>
      {stills.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {stills.map((item) => (
            <Link key={item.id} href="/work" className="group relative bg-background">
              <Still
                src={item.image}
                alt={item.alt[locale]}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[16/10]"
                caption={item.caption[locale]}
              />
            </Link>
          ))}
        </div>
      ) : null}
      {(cta && intent) || sketchCta ? (
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {cta && intent ? (
            <WhatsAppCta
              intent={intent}
              className={ctaChip}
              ariaLabel={ariaLabel}
            >
              {cta}
            </WhatsAppCta>
          ) : null}
          {sketchCta ? (
            <Link href="/sketch" className={ctaChip}>
              {sketchCta}
            </Link>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
