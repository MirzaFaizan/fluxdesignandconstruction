"use client";

import dynamic from "next/dynamic";
import type { CgiSiteSliderProps } from "@/components/media/cgi-site-slider-compare";

const CgiSiteSliderCompare = dynamic(
  () =>
    import("@/components/media/cgi-site-slider-compare").then(
      (mod) => mod.CgiSiteSliderCompare
    ),
  { ssr: false }
);

export function CgiSiteSlider(props: CgiSiteSliderProps) {
  return <CgiSiteSliderCompare {...props} />;
}
