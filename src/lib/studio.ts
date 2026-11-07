import type { Locale } from "@/i18n/routing";
import { launchMedia } from "./launch-media";

/**
 * Fill the bracketed fields when the real names and numbers exist.
 * Do not invent PCATP / PEC values — empty brackets are honest.
 */
export const studioArchitect = {
  prefix: "Ar.",
  name: "[Name]",
  register: "PCATP",
  number: "[number]",
  verifyHref: "https://pcatp.org.pk/register.php",
} as const;

export const studioEngineer = {
  prefix: "Engr.",
  name: "[Name]",
  register: "PEC",
  number: "[number]",
  verifyHref: "https://my.pec.org.pk/verification",
} as const;

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
