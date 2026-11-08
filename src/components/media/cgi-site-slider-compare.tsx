"use client";

import { ReactCompareSliderCssVars } from "react-compare-slider/consts";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { Picture } from "@/components/media/picture";
import type { MediaImage } from "@/lib/media";
import type { CSSProperties } from "react";

// /build sliders are capped at (100svh - 11rem) * 1.6 wide; 100vw is a safe upper bound.
const SLIDER_SIZES = "100vw";

export type CgiSiteSliderProps = {
  cgi: MediaImage;
  site: MediaImage;
  cgiAlt: string;
  siteAlt: string;
  designLabel: string;
  siteLabel: string;
  cgiLabel: string;
  cgiNote: string;
  siteNote: string;
  ariaLabel: string;
  cgiPosition?: string;
  sitePosition?: string;
  priority?: boolean;
};

export function CgiSiteSliderCompare({
  cgi,
  site,
  cgiAlt,
  siteAlt,
  designLabel,
  siteLabel,
  cgiLabel,
  cgiNote,
  siteNote,
  ariaLabel,
  cgiPosition = "center",
  sitePosition = "center",
  priority = false,
}: CgiSiteSliderProps) {
  return (
    <div dir="ltr" className="absolute inset-0">
      <ReactCompareSlider
        className="h-full w-full"
        itemOne={
          <Picture
            image={cgi}
            alt={cgiAlt}
            sizes={SLIDER_SIZES}
            priority={priority}
            className="static block"
            style={{ objectPosition: cgiPosition }}
          />
        }
        itemTwo={
          <Picture
            image={site}
            alt={siteAlt}
            sizes={SLIDER_SIZES}
            priority={priority}
            className="static block"
            style={{ objectPosition: sitePosition }}
          />
        }
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              backgroundColor: "#2b3642",
              border: "1px solid #5d6d80",
              borderRadius: 2,
              boxShadow: "none",
              backdropFilter: "none",
              width: "2rem",
              height: "2rem",
            }}
            linesStyle={{
              width: 1,
              outline: "1px solid #5d6d80",
              boxShadow: "none",
              backgroundColor: "#5d6d80",
            }}
          />
        }
        style={
          {
            [ReactCompareSliderCssVars.handleColor]: "#5d6d80",
          } as CSSProperties
        }
        aria-label={ariaLabel}
      />
      <p className="pointer-events-none absolute start-0 bottom-0 z-[1] max-w-[9rem] bg-background/90 px-4 py-3 text-xs leading-6 text-foreground sm:max-w-[11rem] sm:px-5 sm:text-sm sm:leading-7">
        <span className="nav-link block">{designLabel}</span>
        <span dir="ltr" className="mt-1 block font-sans text-foreground/80">
          {cgiLabel}
        </span>
        <span className="sr-only">{cgiNote}</span>
      </p>
      <p className="pointer-events-none absolute end-0 bottom-0 z-[1] max-w-[9rem] bg-background/90 px-4 py-3 text-end text-xs leading-6 text-foreground sm:max-w-[11rem] sm:px-5 sm:text-sm sm:leading-7">
        <span className="nav-link block">{siteLabel}</span>
        <span className="sr-only">{siteNote}</span>
      </p>
    </div>
  );
}
