import type { Locale } from "@/i18n/routing";
import type { MediaImage } from "./media";
import { launchMedia } from "./launch-media";

export type LocaleText = Record<Locale, string>;

export type InteriorStill = {
  id: string;
  image: MediaImage;
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
  image: MediaImage,
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
  image: launchMedia.interiorParkViewKitchen,
  caption: parkViewKitchenCaption,
  alt: altFromCaption(parkViewKitchenCaption),
};

export const kitchenStills: InteriorStill[] = [
  still("mansehra-kitchen", launchMedia.interiorMansehraKitchen, "half", {
    en: "Mansehra · kitchen · Interior",
    ur: "مانسہرہ · کچن · انٹیریئر",
  }),
  still("kitchen", launchMedia.interiorLuxuryKitchen, "half", {
    en: "Kitchen · Interior",
    ur: "کچن · انٹیریئر",
  }),
];

export const loungeStills: InteriorStill[] = [
  still("attock-tv-lounge", launchMedia.interiorAttockTvWall, "full", {
    en: "Attock · TV lounge · Interior",
    ur: "اٹک · ٹی وی لاؤنج · انٹیریئر",
  }),
  still("park-view-lounge", launchMedia.interiorParkViewDrawing, "half", {
    en: "Park View City · lounge · Interior",
    ur: "پارک ویو سٹی · لاؤنج · انٹیریئر",
  }),
  still("mansehra-lounge", launchMedia.interiorMansehraLounge, "half", {
    en: "Mansehra · lounge · Interior",
    ur: "مانسہرہ · لاؤنج · انٹیریئر",
  }),
];

export const bathStills: InteriorStill[] = [
  still("master-bath", launchMedia.interiorBathG, "full", {
    en: "Master bath · Interior",
    ur: "ماسٹر باتھ · انٹیریئر",
  }),
];
