"use client";

import { Still } from "@/components/media/still";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { WhatsAppCta } from "@/components/chrome/whatsapp-cta";
import { Link } from "@/i18n/navigation";
import type { HouseStyle, PlotSize, WorkTypology } from "@/lib/projects";
import { workTransitionName } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";
import { ViewTransition } from "react";
import { useMemo, useState } from "react";

export type WorkIndexCard = {
  slug: string;
  layout: "full" | "half";
  index: number;
  typology: WorkTypology;
  plotSize: PlotSize | null;
  style: HouseStyle | null;
  fromDesignToSite: boolean;
  image: StaticImageData;
  caption: string;
  alt: string;
};

export type WorkIndexCopy = {
  filters: string;
  filterAll: string;
  filterHouses: string;
  filterInteriors: string;
  filterCommercial: string;
  filterLandscape: string;
  filterDesignToSite: string;
  filterPlot: string;
  filter5Marla: string;
  filter10Marla: string;
  filter1Kanal: string;
  filterOther: string;
  filterStyle: string;
  filterModern: string;
  filterClassical: string;
  empty: string;
  whatsapp: string;
  whatsappAria: string;
};

type Category =
  | "all"
  | "houses"
  | "interiors"
  | "commercial"
  | "landscape"
  | "design-to-site";

const chipClass =
  "h-9 rounded-none border border-border bg-transparent px-3 text-sm font-medium text-foreground hover:bg-foreground hover:text-background focus-visible:ring-0 aria-pressed:bg-foreground aria-pressed:text-background data-[pressed]:bg-foreground data-[pressed]:text-background data-[state=on]:bg-foreground data-[state=on]:text-background";

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function matchesCategory(card: WorkIndexCard, category: Category) {
  if (category === "all") return true;
  if (category === "houses") return card.typology === "house";
  if (category === "interiors") return card.typology === "interior";
  if (category === "commercial") return card.typology === "commercial";
  if (category === "landscape") return card.typology === "landscape";
  return card.fromDesignToSite;
}

function plotIsValid(
  cards: WorkIndexCard[],
  category: Category,
  plot: PlotSize
) {
  if (category === "interiors" || category === "landscape") return false;
  return cards.some(
    (card) => matchesCategory(card, category) && card.plotSize === plot
  );
}

function styleIsValid(
  cards: WorkIndexCard[],
  category: Category,
  style: HouseStyle
) {
  return cards.some(
    (card) => matchesCategory(card, category) && card.style === style
  );
}

export function WorkIndex({
  cards,
  copy,
}: {
  cards: WorkIndexCard[];
  copy: WorkIndexCopy;
}) {
  const [category, setCategory] = useState<Category>("all");
  const [plot, setPlot] = useState<PlotSize | "">("");
  const [style, setStyle] = useState<HouseStyle | "">("");

  function selectCategory(next: Category) {
    setCategory(next);
    setPlot((current) =>
      current && plotIsValid(cards, next, current) ? current : ""
    );
    setStyle((current) =>
      current && styleIsValid(cards, next, current) ? current : ""
    );
  }

  const visible = useMemo(
    () =>
      cards.filter((card) => {
        if (!matchesCategory(card, category)) return false;
        if (plot && card.plotSize !== plot) return false;
        if (style && card.style !== style) return false;
        return true;
      }),
    [cards, category, plot, style]
  );

  const plotCopy: Record<PlotSize, string> = {
    "5-marla": copy.filter5Marla,
    "10-marla": copy.filter10Marla,
    "1-kanal": copy.filter1Kanal,
    other: copy.filterOther,
  };
  const styleCopy: Record<HouseStyle, string> = {
    modern: copy.filterModern,
    classical: copy.filterClassical,
  };
  const validPlots = (
    ["5-marla", "10-marla", "1-kanal", "other"] as const
  ).filter((size) => plotIsValid(cards, category, size));
  const validStyles = (["modern", "classical"] as const).filter((item) =>
    styleIsValid(cards, category, item)
  );

  return (
    <div>
      <div className="flex flex-col gap-6">
        <fieldset>
          <legend className="nav-link sr-only">{copy.filters}</legend>
          <ToggleGroup
            value={[category]}
            onValueChange={(value) => {
              const next = (value[0] as Category | undefined) ?? "all";
              selectCategory(next);
            }}
            className="flex w-full flex-wrap gap-2"
            spacing={0}
          >
            <ToggleGroupItem value="all" className={chipClass}>
              {copy.filterAll}
            </ToggleGroupItem>
            <ToggleGroupItem value="houses" className={chipClass}>
              {copy.filterHouses}
            </ToggleGroupItem>
            <ToggleGroupItem value="interiors" className={chipClass}>
              {copy.filterInteriors}
            </ToggleGroupItem>
            <ToggleGroupItem value="commercial" className={chipClass}>
              {copy.filterCommercial}
            </ToggleGroupItem>
            <ToggleGroupItem value="landscape" className={chipClass}>
              {copy.filterLandscape}
            </ToggleGroupItem>
            <ToggleGroupItem value="design-to-site" className={chipClass}>
              {copy.filterDesignToSite}
            </ToggleGroupItem>
          </ToggleGroup>
        </fieldset>

        {validPlots.length > 0 ? (
          <fieldset>
            <legend className="nav-link mb-3 text-foreground/70">
              {copy.filterPlot}
            </legend>
            <ToggleGroup
              value={plot ? [plot] : []}
              onValueChange={(value) => {
                setPlot((value[0] as PlotSize | undefined) ?? "");
              }}
              className="flex w-full flex-wrap gap-2"
              spacing={0}
            >
              {validPlots.map((size) => (
                <ToggleGroupItem key={size} value={size} className={chipClass}>
                  {plotCopy[size]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </fieldset>
        ) : null}

        {validStyles.length > 0 ? (
          <fieldset>
            <legend className="nav-link mb-3 text-foreground/70">
              {copy.filterStyle}
            </legend>
            <ToggleGroup
              value={style ? [style] : []}
              onValueChange={(value) => {
                setStyle((value[0] as HouseStyle | undefined) ?? "");
              }}
              className="flex w-full flex-wrap gap-2"
              spacing={0}
            >
              {validStyles.map((item) => (
                <ToggleGroupItem key={item} value={item} className={chipClass}>
                  {styleCopy[item]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </fieldset>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="mt-12 max-w-xl">
          <p className="text-pretty text-base leading-relaxed text-foreground/85">
            {copy.empty}
          </p>
          <WhatsAppCta
            intent="generic"
            ariaLabel={copy.whatsappAria}
            className="mt-6 inline-flex min-h-11 items-center border border-border px-4 text-sm text-foreground transition-colors duration-150 hover:bg-foreground hover:text-background"
          >
            {copy.whatsapp}
          </WhatsAppCta>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((card, position) => (
            <Link
              key={card.slug}
              href={`/work/${card.slug}`}
              className={cn(
                "group relative bg-background focus-visible:z-10",
                card.layout === "full" && "md:col-span-2"
              )}
            >
              <ViewTransition
                name={workTransitionName(card.slug)}
                default="none"
                share="morph"
              >
                <Still
                  src={card.image}
                  alt={card.alt}
                  priority={position < 2}
                  sizes={
                    card.layout === "full"
                      ? "100vw"
                      : "(min-width: 768px) 50vw, 100vw"
                  }
                  className={cn(
                    "aspect-[16/10]",
                    card.layout === "full" && "md:aspect-[16/7]"
                  )}
                  caption={
                    <span className="flex items-baseline justify-between gap-4">
                      <span dir="ltr" className="tabular-nums text-foreground/80">
                        {padIndex(card.index)}
                      </span>
                      <span className="min-w-0 flex-1 text-end">
                        {card.caption}
                      </span>
                    </span>
                  }
                />
              </ViewTransition>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
