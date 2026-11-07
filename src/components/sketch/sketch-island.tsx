"use client";

import type { HouseSketchProps } from "@/components/sketch/house-sketch";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const HouseSketch = dynamic(
  () =>
    import("@/components/sketch/house-sketch").then((mod) => mod.HouseSketch),
  {
    ssr: false,
    loading: () => <SketchLoading />,
  }
);

function SketchLoading() {
  const t = useTranslations("Sketch");
  return (
    <div
      className="mt-12 flex h-[min(70vh,720px)] min-h-[420px] items-center justify-center border border-border"
      aria-busy="true"
    >
      <p className="text-sm text-foreground/75">{t("loading")}</p>
    </div>
  );
}

export function SketchIsland(props: HouseSketchProps) {
  return <HouseSketch {...props} />;
}
