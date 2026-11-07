import type { Locale } from "@/i18n/routing";
import type { StaticImageData } from "next/image";
import parkViewKitchen from "../../web-media/launch/interiors/interior-park-view-kitchen.webp";
import mansehraKitchen from "../../web-media/launch/interiors/interior-mansehra-kitchen.webp";
import luxuryKitchen from "../../web-media/launch/interiors/interior-luxury-kitchen.webp";
import attockTvWall from "../../web-media/launch/interiors/interior-attock-tv-wall.webp";
import parkViewLounge from "../../web-media/launch/interiors/interior-park-view-drawing.webp";
import mansehraLounge from "../../web-media/launch/interiors/interior-mansehra-lounge.webp";
import masterBath from "../../web-media/launch/interiors/interior-bath-g.webp";

export type LocaleText = Record<Locale, string>;

export type InteriorStill = {
  id: string;
  image: StaticImageData;
  layout: "full" | "half";
  caption: LocaleText;
  alt: LocaleText;
};

function altFromCaption(caption: LocaleText): LocaleText {
  return {
    en: `${caption.en}. FluX Design and Construction.`,
    ur: `${caption.ur}۔ FluX ڈیزائن اینڈ کنسٹرکشن۔`,
  };
}

function still(
  id: string,
  image: StaticImageData,
  layout: InteriorStill["layout"],
  caption: LocaleText
): InteriorStill {
  return { id, image, layout, caption, alt: altFromCaption(caption) };
}

const parkViewKitchenCaption = {
  en: "Park View City · kitchen · Interior",
  ur: "پارک ویو سٹی · کچن · انٹیریئر",
} as const;

export const interiorsHero = {
  image: parkViewKitchen,
  caption: parkViewKitchenCaption,
  alt: altFromCaption(parkViewKitchenCaption),
};

export const kitchenStills: InteriorStill[] = [
  still("mansehra-kitchen", mansehraKitchen, "half", {
    en: "Mansehra · kitchen · Interior",
    ur: "مانسہرہ · کچن · انٹیریئر",
  }),
  still("kitchen", luxuryKitchen, "half", {
    en: "Kitchen · Interior",
    ur: "کچن · انٹیریئر",
  }),
];

export const loungeStills: InteriorStill[] = [
  still("attock-tv-lounge", attockTvWall, "full", {
    en: "Attock · TV lounge · Interior",
    ur: "اٹک · ٹی وی لاؤنج · انٹیریئر",
  }),
  still("park-view-lounge", parkViewLounge, "half", {
    en: "Park View City · lounge · Interior",
    ur: "پارک ویو سٹی · لاؤنج · انٹیریئر",
  }),
  still("mansehra-lounge", mansehraLounge, "half", {
    en: "Mansehra · lounge · Interior",
    ur: "مانسہرہ · لاؤنج · انٹیریئر",
  }),
];

export const bathStills: InteriorStill[] = [
  still("master-bath", masterBath, "full", {
    en: "Master bath · Interior",
    ur: "ماسٹر باتھ · انٹیریئر",
  }),
];
