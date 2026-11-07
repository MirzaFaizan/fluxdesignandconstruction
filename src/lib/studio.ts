import type { Locale } from "@/i18n/routing";
import { launchMedia } from "./launch-media";

export const studioPeople = [
  {
    key: "adnan",
    index: "01",
    prefix: "Ar.",
    name: "Adnan Ejaz",
    role: "adnanRole",
  },
  {
    key: "umair",
    index: "02",
    prefix: "Ar.",
    name: "Umair Ejaz",
    role: "umairRole",
  },
] as const;

export const studioStill = {
  image: launchMedia.proofIftikharSite,
  caption: {
    en: "PGSHF · Site",
    ur: "PGSHF · سائٹ",
  },
  alt: {
    en: "PGSHF. Site photograph. FluX Design and Construction.",
    ur: "PGSHF۔ سائٹ کی تصویر۔ FluX ڈیزائن اینڈ کنسٹرکشن۔",
  },
} as const satisfies {
  image: typeof launchMedia.proofIftikharSite;
  caption: Record<Locale, string>;
  alt: Record<Locale, string>;
};
