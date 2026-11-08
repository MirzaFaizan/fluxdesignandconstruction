import type { Locale } from "@/i18n/routing";
import type { MediaImage } from "./media";
import { launchMedia } from "./launch-media";

export type LocaleText = Record<Locale, string>;

export type HouseStill = {
  id: string;
  image: MediaImage;
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
  caption: LocaleText
): HouseStill {
  return { id, image, caption, alt: altFromCaption(caption) };
}

export const housesHeroCaption = {
  en: "PGSHF · 1 kanal · house",
  ur: "PGSHF · 1 کنال · گھر",
} as const;

export const housesHeroAlt = altFromCaption(housesHeroCaption);
export const housesHeroStill = launchMedia.iqbalPgshf;

export const marla5Stills: HouseStill[] = [
  still("zahid-5-marla", launchMedia.zahid5Marla, {
    en: "PGSHF · 5 marla · Design",
    ur: "PGSHF · 5 مرلہ · ڈیزائن",
  }),
  still("i16-5-marla", launchMedia.i165Marla, {
    en: "I-16 Islamabad · 5 marla · Design",
    ur: "I-16 اسلام آباد · 5 مرلہ · ڈیزائن",
  }),
];

export const marla10Stills: HouseStill[] = [
  still("khurram-10-marla", launchMedia.khurram10Marla, {
    en: "10 marla · house · Design",
    ur: "10 مرلہ · گھر · ڈیزائن",
  }),
  still("ahsan-aftab-10-marla", launchMedia.ahsanAftab10Marla, {
    en: "10 marla · classical · Design",
    ur: "10 مرلہ · کلاسیکی · ڈیزائن",
  }),
];

export const kanal1Stills: HouseStill[] = [
  still("iqbal-1-kanal", launchMedia.iqbalPgshf, {
    en: "PGSHF · 1 kanal · Design",
    ur: "PGSHF · 1 کنال · ڈیزائن",
  }),
  still("annexy-1-kanal", launchMedia.annexy1Kanal, {
    en: "Mandi Bahauddin · 1 kanal · Design",
    ur: "منڈی بہاؤالدین · 1 کنال · ڈیزائن",
  }),
];

export const housesGalleryStills: HouseStill[] = [
  still("khursheed-586a", launchMedia.khursheed586a, {
    en: "PGSHF · house · CGI",
    ur: "PGSHF · گھر · CGI",
  }),
];
