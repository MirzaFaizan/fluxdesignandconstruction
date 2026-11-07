import type { Locale } from "@/i18n/routing";
import type { StaticImageData } from "next/image";
import { launchMedia } from "./launch-media";

export type LocaleText = Record<Locale, string>;

export type ProjectFlag = "design" | "built" | "interior" | "commercial";

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

const parkViewCaption = {
  en: "Park View City · kitchen · Interior",
  ur: "پارک ویو سٹی · کچن · انٹیریئر",
} as const;

const attockCaption = {
  en: "Attock · TV lounge · Interior",
  ur: "اٹک · ٹی وی لاؤنج · انٹیریئر",
} as const;

const omodaCaption = {
  en: "OMODA / JAECOO · showroom · Commercial",
  ur: "OMODA / JAECOO · شوروم · کمرشل",
} as const;

const mansehraCaption = {
  en: "Mansehra · house interiors · Interior",
  ur: "مانسہرہ · گھر کا انٹیریئر · انٹیریئر",
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
    slug: "park-view-kitchen",
    image: launchMedia.parkViewKitchen,
    layout: "half",
    flags: ["interior"],
    caption: parkViewCaption,
    alt: altFromCaption(parkViewCaption),
  },
  {
    slug: "attock-tv-lounge",
    image: launchMedia.attockTvWall,
    layout: "half",
    flags: ["interior"],
    caption: attockCaption,
    alt: altFromCaption(attockCaption),
  },
  {
    slug: "omoda-jaecoo",
    image: launchMedia.omodaJaecoo,
    layout: "full",
    flags: ["commercial"],
    caption: omodaCaption,
    alt: altFromCaption(omodaCaption),
  },
  {
    slug: "mansehra-interiors",
    image: launchMedia.mansehraLounge,
    layout: "half",
    flags: ["interior"],
    caption: mansehraCaption,
    alt: altFromCaption(mansehraCaption),
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
  {
    id: "iftikhar",
    society: "PGSHF",
    cgi: launchMedia.proofIftikharCgi,
    site: launchMedia.proofIftikharSite,
    cgiCaption: {
      en: "PGSHF · Iftikhar house · CGI",
      ur: "PGSHF · افتخار ہاؤس · CGI",
    },
    siteCaption: {
      en: "PGSHF · Iftikhar house · Site",
      ur: "PGSHF · افتخار ہاؤس · سائٹ",
    },
  },
];

export const heroCaption = {
  en: "Courtyard at dusk · house",
  ur: "شام کے وقت صحن · گھر",
} as const;

export const heroAlt = altFromCaption(heroCaption);
