import type { Locale } from "@/i18n/routing";
import type { StaticImageData } from "next/image";
import khursheed586a from "../../web-media/launch/heroes/hero-khursheed-586a-dusk.webp";
import proof352cCgi from "../../web-media/launch/proof/proof-352c-cgi.webp";
import proof352cSite from "../../web-media/launch/proof/proof-352c-site.webp";
import proof586aSite from "../../web-media/launch/proof/proof-586a-site.webp";
import proof629dCgi from "../../web-media/launch/proof/proof-629d-cgi.webp";
import proof629dSite from "../../web-media/launch/proof/proof-629d-site.webp";
import proof644aCgi from "../../web-media/launch/proof/proof-644a-cgi.webp";
import proof644aSite from "../../web-media/launch/proof/proof-644a-site.webp";
import proofDhaIiiPour from "../../web-media/launch/proof/proof-dha-iii-pour.webp";
import proofGulbergGreenSite from "../../web-media/launch/proof/proof-gulberg-green-site.webp";
import proofIftikharCgi from "../../web-media/launch/proof/proof-iftikhar-cgi.webp";
import proofIftikharSite from "../../web-media/launch/proof/proof-iftikhar-site.webp";

export type LocaleText = Record<Locale, string>;

export type BuildComparePair = {
  id: string;
  plot: string;
  cgi: StaticImageData;
  site: StaticImageData;
  caption: LocaleText;
  cgiAlt: LocaleText;
  siteAlt: LocaleText;
  cgiPosition?: string;
  sitePosition?: string;
};

export type BuildSiteStill = {
  id: string;
  image: StaticImageData;
  caption: LocaleText;
  alt: LocaleText;
};

function cgiAlt(en: string, ur: string): LocaleText {
  return {
    en: `${en}. CGI - a render, not a photograph. FluX Design and Construction.`,
    ur: `${ur}۔ CGI - رینڈر ہے، تصویر نہیں۔ FluX ڈیزائن اینڈ کنسٹرکشن۔`,
  };
}

function siteAlt(en: string, ur: string): LocaleText {
  return {
    en: `${en}. Site photograph. FluX Design and Construction.`,
    ur: `${ur}۔ سائٹ کی تصویر۔ FluX ڈیزائن اینڈ کنسٹرکشن۔`,
  };
}

export const buildComparePairs: BuildComparePair[] = [
  {
    id: "352c",
    plot: "PGSHF · 352-C",
    cgi: proof352cCgi,
    site: proof352cSite,
    caption: {
      en: "PGSHF · 352-C",
      ur: "PGSHF · 352-C",
    },
    cgiAlt: cgiAlt("Plot 352-C, PGSHF", "پلاٹ 352-C، PGSHF"),
    siteAlt: siteAlt(
      "Plot 352-C, PGSHF, Adyala Road - grey structure",
      "پلاٹ 352-C، PGSHF، اڈیالہ روڈ - گرے سٹرکچر",
    ),
  },
  {
    id: "629d",
    plot: "PGSHF · 629-D",
    cgi: proof629dCgi,
    site: proof629dSite,
    caption: {
      en: "PGSHF · 629-D",
      ur: "PGSHF · 629-D",
    },
    cgiAlt: cgiAlt("Plot 629-D, PGSHF", "پلاٹ 629-D، PGSHF"),
    siteAlt: siteAlt("Plot 629-D, PGSHF - brickwork", "پلاٹ 629-D، PGSHF - اینٹوں کا کام"),
    sitePosition: "center 42%",
  },
  {
    id: "586a",
    plot: "PGSHF · 586-A",
    cgi: khursheed586a,
    site: proof586aSite,
    caption: {
      en: "PGSHF · 586-A",
      ur: "PGSHF · 586-A",
    },
    cgiAlt: cgiAlt("Plot 586-A, PGSHF", "پلاٹ 586-A، PGSHF"),
    siteAlt: siteAlt("Plot 586-A, PGSHF - on site", "پلاٹ 586-A، PGSHF - سائٹ پر"),
  },
  {
    id: "iftikhar",
    plot: "PGSHF · Iftikhar",
    cgi: proofIftikharCgi,
    site: proofIftikharSite,
    caption: {
      en: "PGSHF · Iftikhar",
      ur: "PGSHF · افتخار",
    },
    cgiAlt: cgiAlt("Iftikhar house, PGSHF", "افتخار ہاؤس، PGSHF"),
    siteAlt: siteAlt(
      "Iftikhar house, PGSHF - grey structure",
      "افتخار ہاؤس، PGSHF - گرے سٹرکچر",
    ),
    sitePosition: "center 58%",
  },
  {
    id: "644a",
    plot: "PGSHF · 644-A",
    cgi: proof644aCgi,
    site: proof644aSite,
    caption: {
      en: "PGSHF · 644-A",
      ur: "PGSHF · 644-A",
    },
    cgiAlt: cgiAlt("Plot 644-A, PGSHF", "پلاٹ 644-A، PGSHF"),
    siteAlt: siteAlt("Plot 644-A, PGSHF - foundations", "پلاٹ 644-A، PGSHF - بنیاد"),
    sitePosition: "center 28%",
  },
];

export const buildSiteStills: BuildSiteStill[] = [
  {
    id: "dha-iii",
    image: proofDhaIiiPour,
    caption: {
      en: "DHA III · Plot 3 Sector A · Site",
      ur: "DHA III · پلاٹ 3 سیکٹر A · سائٹ",
    },
    alt: siteAlt(
      "DHA III, Plot 3 Sector A - pouring",
      "DHA III، پلاٹ 3 سیکٹر A - کنکریٹ",
    ),
  },
  {
    id: "gulberg-green",
    image: proofGulbergGreenSite,
    caption: {
      en: "Gulberg Green · Site",
      ur: "گلبرگ گرین · سائٹ",
    },
    alt: siteAlt("Gulberg Green - under construction", "گلبرگ گرین - زیر تعمیر"),
  },
];
