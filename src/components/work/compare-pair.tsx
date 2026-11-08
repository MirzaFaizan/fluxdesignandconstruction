"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { Picture } from "@/components/media/picture";
import type { MediaImage } from "@/lib/media";

export function ComparePair({
  cgi,
  site,
  cgiAlt,
  siteAlt,
  labelDesign,
  labelSite,
  cgiNote,
  ariaLabel,
}: {
  cgi: MediaImage;
  site: MediaImage;
  cgiAlt: string;
  siteAlt: string;
  labelDesign: string;
  labelSite: string;
  cgiNote: string;
  ariaLabel: string;
}) {
  return (
    <div className="relative" dir="ltr">
      <ReactCompareSlider
        aria-label={ariaLabel}
        onlyHandleDraggable
        itemOne={
          <div className="relative h-full w-full">
            <Picture image={cgi} alt={cgiAlt} sizes="100vw" className="static block" />
            <span className="pointer-events-none absolute inset-inline-0 bottom-0 bg-background/90 px-4 py-3 text-start text-xs leading-6 text-foreground sm:text-sm sm:leading-7">
              <span className="block">{labelDesign}</span>
              <span className="block text-foreground/80">{cgiNote}</span>
            </span>
          </div>
        }
        itemTwo={
          <div className="relative h-full w-full">
            <Picture image={site} alt={siteAlt} sizes="100vw" className="static block" />
            <span className="pointer-events-none absolute inset-inline-0 bottom-0 bg-background/90 px-4 py-3 text-end text-xs leading-6 text-foreground sm:text-sm sm:leading-7">
              <span className="block">{labelSite}</span>
            </span>
          </div>
        }
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              borderColor: "#5d6d80",
              background: "#2b3642",
              boxShadow: "none",
              color: "#ffffff",
              borderRadius: 0,
            }}
            linesStyle={{
              background: "#5d6d80",
              width: 1,
            }}
          />
        }
        className="aspect-[16/10] bg-background"
        style={{ width: "100%" }}
      />
    </div>
  );
}
