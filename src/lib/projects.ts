import type { Locale } from "@/i18n/routing";
import type { StaticImageData } from "next/image";
import { launchMedia } from "./launch-media";

export type LocaleText = Record<Locale, string>;

export type ProjectFlag = "design" | "built";

export type SelectedProject = {
  slug: string;
  image: StaticImageData;
  layout: "full" | "half";
  flags: ProjectFlag[];
  caption: LocaleText;
  alt: LocaleText;
};

export type DesignSitePair = {
  id: string;
  society: string;
  cgi: StaticImageData;
  site: StaticImageData;
  cgiCaption: LocaleText;
  siteCaption: LocaleText;
};

function altFromCaption(caption: LocaleText): LocaleText {
  return {
    en: `${caption.en}. FluX Design and Construction.`,
    ur: `${caption.ur}۔ FluX ڈیزائن اینڈ کنسٹرکشن۔`,
  };
}

const pgshf586aCaption = {
  en: "PGSHF · house · Design · Built",
  ur: "PGSHF · گھر · ڈیزائن · تعمیر",
} as const;

const zahidCaption = {
  en: "PGSHF · 5 marla · Design",
  ur: "PGSHF · 5 مرلہ · ڈیزائن",
} as const;

const iqbalCaption = {
  en: "PGSHF · 1 kanal · Design",
  ur: "PGSHF · 1 کنال · ڈیزائن",
} as const;

export const selectedProjects: SelectedProject[] = [
  {
    slug: "pgshf-586a",
    image: launchMedia.khursheed586a,
    layout: "full",
    flags: ["design", "built"],
    caption: pgshf586aCaption,
    alt: altFromCaption(pgshf586aCaption),
  },
  {
    slug: "pgshf-zahid-5-marla",
    image: launchMedia.zahid5Marla,
    layout: "half",
    flags: ["design"],
    caption: zahidCaption,
    alt: altFromCaption(zahidCaption),
  },
  {
    slug: "pgshf-iqbal-1-kanal",
    image: launchMedia.iqbalPgshf,
    layout: "half",
    flags: ["design"],
    caption: iqbalCaption,
    alt: altFromCaption(iqbalCaption),
  },
];

export const designSitePairs: DesignSitePair[] = [
  {
    id: "352c",
    society: "PGSHF",
    cgi: launchMedia.proof352cCgi,
    site: launchMedia.proof352cSite,
    cgiCaption: {
      en: "PGSHF · 352-C · CGI",
      ur: "PGSHF · 352-C · CGI",
    },
    siteCaption: {
      en: "PGSHF · 352-C · Site",
      ur: "PGSHF · 352-C · سائٹ",
    },
  },
  {
    id: "629d",
    society: "PGSHF",
    cgi: launchMedia.proof629dCgi,
    site: launchMedia.proof629dSite,
    cgiCaption: {
      en: "PGSHF · 629-D · CGI",
      ur: "PGSHF · 629-D · CGI",
    },
    siteCaption: {
      en: "PGSHF · 629-D · Site",
      ur: "PGSHF · 629-D · سائٹ",
    },
  },
  {
    id: "586a",
    society: "PGSHF",
    cgi: launchMedia.khursheed586a,
    site: launchMedia.proof586aSite,
    cgiCaption: {
      en: "PGSHF · 586-A · CGI",
      ur: "PGSHF · 586-A · CGI",
    },
    siteCaption: {
      en: "PGSHF · 586-A · Site",
      ur: "PGSHF · 586-A · سائٹ",
    },
  },
];

export const heroCaption = {
  en: "Courtyard at dusk · house",
  ur: "شام کے وقت صحن · گھر",
} as const;

export const heroAlt = altFromCaption(heroCaption);
