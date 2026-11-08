import type { Locale } from "@/i18n/routing";
import type { MediaImage } from "./media";
import { launchMedia } from "./launch-media";

export type LocaleText = Record<Locale, string>;

export type CommercialProject = {
  slug: string;
  image: MediaImage;
  layout: "full" | "half";
  caption: LocaleText;
  brief: LocaleText;
  alt: LocaleText;
};

function altFromCaption(caption: LocaleText): LocaleText {
  return {
    en: `${caption.en}. FluX Design and Construction.`,
    ur: `${caption.ur}۔ FluX ڈیزائن اینڈ کنسٹرکشن۔`,
  };
}

function project(
  slug: string,
  image: MediaImage,
  layout: "full" | "half",
  caption: LocaleText,
  brief: LocaleText
): CommercialProject {
  return { slug, image, layout, caption, brief, alt: altFromCaption(caption) };
}

export const commercialHeroCaption = {
  en: "OMODA / JAECOO · showroom · Design · CGI",
  ur: "OMODA / JAECOO · شوروم · ڈیزائن · CGI",
} as const;

export const commercialHeroAlt = altFromCaption(commercialHeroCaption);
export const commercialHeroStill = launchMedia.commercialOmodaJaecoo;

export const commercialProjects: CommercialProject[] = [
  project(
    "omoda-jaecoo",
    launchMedia.commercialOmodaJaecoo,
    "full",
    commercialHeroCaption,
    {
      en: "Car showroom. Brand in the glass, not only on the drawing.",
      ur: "کار شوروم۔ برانڈ شیشے میں، صرف کاغذ پر نہیں۔",
    }
  ),
  project(
    "peshawari-dry-fruits",
    launchMedia.commercialPeshawariDryFruits,
    "half",
    {
      en: "Peshawari Dry Fruits · shop · Design · CGI",
      ur: "Peshawari Dry Fruits · دکان · ڈیزائن · CGI",
    },
    {
      en: "A shop. Counter, display, the room a customer walks.",
      ur: "دکان۔ کاؤنٹر، ڈسپلے، وہ کمرہ جس میں گاہک چلتے ہیں۔",
    }
  ),
  project(
    "landmark-punjab",
    launchMedia.commercialJanhzabOffice,
    "half",
    {
      en: "Landmark Punjab · office · Design · CGI",
      ur: "Landmark Punjab · دفتر · ڈیزائن · CGI",
    },
    {
      en: "An office interior.",
      ur: "دفتر کا انٹیریئر۔",
    }
  ),
  project(
    "gulshan-e-shamal",
    launchMedia.commercialGulshanEShamal,
    "full",
    {
      en: "Gulshan-e-Shamal · mixed-use · 1 kanal · Design · CGI",
      ur: "گلشن شمال · مخلوط استعمال · 1 کنال · ڈیزائن · CGI",
    },
    {
      en: "Mixed-use: residences with café and gym.",
      ur: "مخلوط استعمال: رہائش، کیفے، جم۔",
    }
  ),
  project(
    "college-proposal",
    launchMedia.commercialCollegeProposal,
    "full",
    {
      en: "College · proposal · Design · CGI",
      ur: "کالج · تجویز · ڈیزائن · CGI",
    },
    {
      en: "A proposal. Not a completed campus.",
      ur: "تجویز۔ بن چکا کیمپس نہیں۔",
    }
  ),
];
