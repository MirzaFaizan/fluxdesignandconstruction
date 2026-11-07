"use client";

import { MAP_PIN, MAP_VIEW } from "@/lib/contact";
import { useEffect, useRef, useState } from "react";

type OfficeMapProps = {
  caption: string;
  label: string;
};

const OSM_STYLE = {
  version: 8 as const,
  name: "osm-charcoal",
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: { "background-color": "#2b3642" },
    },
    { id: "osm", type: "raster" as const, source: "osm" },
  ],
};

export function OfficeMap({ caption, label }: OfficeMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "240px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !ref.current) return;

    let cancelled = false;
    let map: import("maplibre-gl").Map | undefined;

    async function mount() {
      const maplibre = await import("maplibre-gl");
      await import("maplibre-gl/dist/maplibre-gl.css");
      if (cancelled || !ref.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const instance = new maplibre.Map({
        container: ref.current,
        style: OSM_STYLE,
        center: [MAP_VIEW.longitude, MAP_VIEW.latitude],
        zoom: MAP_VIEW.zoom,
        attributionControl: { compact: true },
        fadeDuration: reduceMotion ? 0 : 300,
        cooperativeGestures: true,
      });
      map = instance;

      instance.addControl(
        new maplibre.NavigationControl({
          showCompass: false,
          visualizePitch: false,
        }),
        "bottom-right"
      );

      if (MAP_PIN) {
        new maplibre.Marker({ color: "#5d6d80" })
          .setLngLat([MAP_PIN.longitude, MAP_PIN.latitude])
          .addTo(instance);
      }
    }

    void mount();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [inView]);

  return (
    <figure className="w-full">
      <div
        ref={ref}
        dir="ltr"
        role="img"
        aria-label={label}
        className="office-map aspect-[16/9] w-full border border-border bg-background"
      />
      <figcaption className="mt-3 text-sm leading-relaxed text-foreground/80">
        {caption}
      </figcaption>
    </figure>
  );
}
