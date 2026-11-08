import type { Locale } from "@/i18n/routing";
import type { MediaImage } from "./media";
import { launchMedia } from "./launch-media";

export type LocaleText = Record<Locale, string>;

export type ProjectFlag = "design" | "built";

export type WorkFlag = ProjectFlag | "interior" | "commercial";

export type WorkTypology = "house" | "interior" | "commercial" | "landscape";

export type PlotSize = "5-marla" | "10-marla" | "1-kanal" | "other";

export type HouseStyle = "modern" | "classical";

export type GalleryKind =
  | "cgi"
  | "site"
  | "interior"
  | "3d"
  | "elevation"
  | "landscape";

export type GalleryItem = {
  src: MediaImage;
  kind: GalleryKind;
  caption: LocaleText;
  alt: LocaleText;
};

export type SelectedProject = {
  slug: string;
  image: MediaImage;
  layout: "full" | "half";
  flags: ProjectFlag[];
  caption: LocaleText;
  alt: LocaleText;
};

export type DesignSitePair = {
  id: string;
  society: string;
  cgi: MediaImage;
  site: MediaImage;
  cgiCaption: LocaleText;
  siteCaption: LocaleText;
};

export type WorkProject = {
  slug: string;
  typology: WorkTypology;
  plotSize: PlotSize | null;
  style: HouseStyle | null;
  fromDesignToSite: boolean;
  layout: "full" | "half";
  flags: WorkFlag[];
  title: LocaleText;
  caption: LocaleText;
  alt: LocaleText;
  brief: LocaleText;
  like: LocaleText;
  metaDescription: LocaleText;
  hero: MediaImage;
  gallery: GalleryItem[];
  compare?: {
    cgi: MediaImage;
    site: MediaImage;
    cgiCaption: LocaleText;
    siteCaption: LocaleText;
  };
  map?: LocaleText;
};

function altFromCaption(caption: LocaleText): LocaleText {
  return {
    en: `${caption.en}. FluX Design and Construction.`,
    ur: `${caption.ur}۔ FluX ڈیزائن اینڈ کنسٹرکشن۔`,
  };
}

function still(
  src: MediaImage,
  kind: GalleryKind,
  caption: LocaleText
): GalleryItem {
  return { src, kind, caption, alt: altFromCaption(caption) };
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

export const workProjects: WorkProject[] = [
  {
    slug: "pgshf-586a",
    typology: "house",
    plotSize: "other",
    style: "modern",
    fromDesignToSite: true,
    layout: "full",
    flags: ["design", "built"],
    title: { en: "PGSHF house", ur: "PGSHF گھر" },
    caption: pgshf586aCaption,
    alt: altFromCaption(pgshf586aCaption),
    brief: {
      en: "A house in PGSHF. Drawn here, and built on site.",
      ur: "PGSHF میں گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔",
    },
    like: {
      en: "PGSHF · house",
      ur: "PGSHF · گھر",
    },
    metaDescription: {
      en: "A house in PGSHF. Drawn here, and built on site. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "PGSHF میں گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.khursheed586a,
    gallery: [
      still(launchMedia.khursheed586a, "cgi", {
        en: "PGSHF · house · CGI",
        ur: "PGSHF · گھر · CGI",
      }),
      still(launchMedia.proof586aSite, "site", {
        en: "PGSHF · house · Site",
        ur: "PGSHF · گھر · سائٹ",
      }),
    ],
    compare: {
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
    map: { en: "PGSHF, Rawalpindi", ur: "PGSHF، راولپنڈی" },
  },
  {
    slug: "pgshf-zahid-5-marla",
    typology: "house",
    plotSize: "5-marla",
    style: "modern",
    fromDesignToSite: false,
    layout: "half",
    flags: ["design"],
    title: { en: "PGSHF 5 marla house", ur: "PGSHF 5 مرلہ گھر" },
    caption: zahidCaption,
    alt: altFromCaption(zahidCaption),
    brief: {
      en: "A 5 marla house in PGSHF. Architecture - ask if construction was ours.",
      ur: "PGSHF میں 5 مرلہ گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔",
    },
    like: {
      en: "PGSHF · 5 marla · house",
      ur: "PGSHF · 5 مرلہ · گھر",
    },
    metaDescription: {
      en: "A 5 marla house in PGSHF. Architecture - ask if construction was ours. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "PGSHF میں 5 مرلہ گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.zahid5Marla,
    gallery: [
      still(launchMedia.zahid5Marla, "elevation", {
        en: "PGSHF · 5 marla · house · 3D",
        ur: "PGSHF · 5 مرلہ · گھر · 3D",
      }),
    ],
    map: { en: "PGSHF, Rawalpindi", ur: "PGSHF، راولپنڈی" },
  },
  {
    slug: "pgshf-iqbal-1-kanal",
    typology: "house",
    plotSize: "1-kanal",
    style: "modern",
    fromDesignToSite: false,
    layout: "half",
    flags: ["design"],
    title: { en: "PGSHF 1 kanal house", ur: "PGSHF 1 کنال گھر" },
    caption: iqbalCaption,
    alt: altFromCaption(iqbalCaption),
    brief: {
      en: "A 1 kanal house in PGSHF. Architecture - ask if construction was ours.",
      ur: "PGSHF میں 1 کنال گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔",
    },
    like: {
      en: "PGSHF · 1 kanal · house",
      ur: "PGSHF · 1 کنال · گھر",
    },
    metaDescription: {
      en: "A 1 kanal house in PGSHF. Architecture - ask if construction was ours. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "PGSHF میں 1 کنال گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.iqbalPgshf,
    gallery: [
      still(launchMedia.iqbalPgshf, "elevation", {
        en: "PGSHF · 1 kanal · house · 3D",
        ur: "PGSHF · 1 کنال · گھر · 3D",
      }),
    ],
    map: { en: "PGSHF, Rawalpindi", ur: "PGSHF، راولپنڈی" },
  },
  {
    slug: "i16-5-marla",
    typology: "house",
    plotSize: "5-marla",
    style: "modern",
    fromDesignToSite: false,
    layout: "half",
    flags: ["design"],
    title: { en: "I-16 5 marla house", ur: "I-16 5 مرلہ گھر" },
    caption: {
      en: "I-16 Islamabad · 5 marla · Design",
      ur: "I-16 اسلام آباد · 5 مرلہ · ڈیزائن",
    },
    alt: altFromCaption({
      en: "I-16 Islamabad · 5 marla · Design",
      ur: "I-16 اسلام آباد · 5 مرلہ · ڈیزائن",
    }),
    brief: {
      en: "A 5 marla house in I-16, Islamabad. Architecture - ask if construction was ours.",
      ur: "اسلام آباد کے I-16 میں 5 مرلہ گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔",
    },
    like: {
      en: "I-16 Islamabad · 5 marla · house",
      ur: "I-16 اسلام آباد · 5 مرلہ · گھر",
    },
    metaDescription: {
      en: "A 5 marla house in I-16, Islamabad. Architecture - ask if construction was ours. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "اسلام آباد کے I-16 میں 5 مرلہ گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.i16FiveMarla,
    gallery: [
      still(launchMedia.i16FiveMarla, "elevation", {
        en: "I-16 Islamabad · 5 marla · house · 3D",
        ur: "I-16 اسلام آباد · 5 مرلہ · گھر · 3D",
      }),
    ],
    map: { en: "I-16, Islamabad", ur: "I-16، اسلام آباد" },
  },
  {
    slug: "mandi-bahauddin-1-kanal",
    typology: "house",
    plotSize: "1-kanal",
    style: "classical",
    fromDesignToSite: false,
    layout: "half",
    flags: ["design"],
    title: {
      en: "Mandi Bahauddin 1 kanal house",
      ur: "منڈی بہاؤالدین 1 کنال گھر",
    },
    caption: {
      en: "Mandi Bahauddin · 1 kanal · Design",
      ur: "منڈی بہاؤالدین · 1 کنال · ڈیزائن",
    },
    alt: altFromCaption({
      en: "Mandi Bahauddin · 1 kanal · Design",
      ur: "منڈی بہاؤالدین · 1 کنال · ڈیزائن",
    }),
    brief: {
      en: "A 1 kanal house in Mandi Bahauddin. Architecture - ask if construction was ours.",
      ur: "منڈی بہاؤالدین میں 1 کنال گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔",
    },
    like: {
      en: "Mandi Bahauddin · 1 kanal · house",
      ur: "منڈی بہاؤالدین · 1 کنال · گھر",
    },
    metaDescription: {
      en: "A 1 kanal house in Mandi Bahauddin. Architecture - ask if construction was ours. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "منڈی بہاؤالدین میں 1 کنال گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.annexy1Kanal,
    gallery: [
      still(launchMedia.annexy1Kanal, "elevation", {
        en: "Mandi Bahauddin · 1 kanal · house · 3D",
        ur: "منڈی بہاؤالدین · 1 کنال · گھر · 3D",
      }),
    ],
    map: { en: "Mandi Bahauddin", ur: "منڈی بہاؤالدین" },
  },
  {
    slug: "ahsan-aftab-10-marla",
    typology: "house",
    plotSize: "10-marla",
    style: "classical",
    fromDesignToSite: false,
    layout: "full",
    flags: ["design"],
    title: { en: "10 marla house", ur: "10 مرلہ گھر" },
    caption: {
      en: "10 marla · house · Design",
      ur: "10 مرلہ · گھر · ڈیزائن",
    },
    alt: altFromCaption({
      en: "10 marla · house · Design",
      ur: "10 مرلہ · گھر · ڈیزائن",
    }),
    brief: {
      en: "A 10 marla house. Architecture - ask if construction was ours.",
      ur: "10 مرلہ گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔",
    },
    like: {
      en: "10 marla · house",
      ur: "10 مرلہ · گھر",
    },
    metaDescription: {
      en: "A 10 marla house. Architecture - ask if construction was ours. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "10 مرلہ گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.ahsanAftab10Marla,
    gallery: [
      still(launchMedia.ahsanAftab10Marla, "elevation", {
        en: "10 marla · house · 3D",
        ur: "10 مرلہ · گھر · 3D",
      }),
    ],
  },
  {
    slug: "khurram-10-marla",
    typology: "house",
    plotSize: "10-marla",
    style: "modern",
    fromDesignToSite: false,
    layout: "half",
    flags: ["design"],
    title: { en: "10 marla house", ur: "10 مرلہ گھر" },
    caption: {
      en: "10 marla · house · Design",
      ur: "10 مرلہ · گھر · ڈیزائن",
    },
    alt: altFromCaption({
      en: "10 marla · house · Design",
      ur: "10 مرلہ · گھر · ڈیزائن",
    }),
    brief: {
      en: "A 10 marla house. Architecture - ask if construction was ours.",
      ur: "10 مرلہ گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔",
    },
    like: {
      en: "10 marla · house",
      ur: "10 مرلہ · گھر",
    },
    metaDescription: {
      en: "A 10 marla house. Architecture - ask if construction was ours. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "10 مرلہ گھر۔ آرکیٹیکچر - تعمیر ہماری تھی یا نہیں، پوچھ لیں۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.khurram10Marla,
    gallery: [
      still(launchMedia.khurram10Marla, "elevation", {
        en: "10 marla · house · 3D",
        ur: "10 مرلہ · گھر · 3D",
      }),
    ],
  },
  {
    slug: "pgshf-352c",
    typology: "house",
    plotSize: "other",
    style: "modern",
    fromDesignToSite: true,
    layout: "half",
    flags: ["design", "built"],
    title: { en: "PGSHF house", ur: "PGSHF گھر" },
    caption: {
      en: "PGSHF · house · Design · Built",
      ur: "PGSHF · گھر · ڈیزائن · تعمیر",
    },
    alt: altFromCaption({
      en: "PGSHF · house · Design · Built",
      ur: "PGSHF · گھر · ڈیزائن · تعمیر",
    }),
    brief: {
      en: "A house in PGSHF. Drawn here, and built on site.",
      ur: "PGSHF میں گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔",
    },
    like: {
      en: "PGSHF · house",
      ur: "PGSHF · گھر",
    },
    metaDescription: {
      en: "A house in PGSHF. Drawn here, and built on site. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "PGSHF میں گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.proof352cCgi,
    gallery: [
      still(launchMedia.proof352cCgi, "cgi", {
        en: "PGSHF · house · CGI",
        ur: "PGSHF · گھر · CGI",
      }),
      still(launchMedia.proof352cSite, "site", {
        en: "PGSHF · house · Site",
        ur: "PGSHF · گھر · سائٹ",
      }),
    ],
    compare: {
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
    map: { en: "PGSHF, Rawalpindi", ur: "PGSHF، راولپنڈی" },
  },
  {
    slug: "pgshf-629d",
    typology: "house",
    plotSize: "other",
    style: "modern",
    fromDesignToSite: true,
    layout: "full",
    flags: ["design", "built"],
    title: { en: "PGSHF house", ur: "PGSHF گھر" },
    caption: {
      en: "PGSHF · house · Design · Built",
      ur: "PGSHF · گھر · ڈیزائن · تعمیر",
    },
    alt: altFromCaption({
      en: "PGSHF · house · Design · Built",
      ur: "PGSHF · گھر · ڈیزائن · تعمیر",
    }),
    brief: {
      en: "A house in PGSHF. Drawn here, and built on site.",
      ur: "PGSHF میں گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔",
    },
    like: {
      en: "PGSHF · house",
      ur: "PGSHF · گھر",
    },
    metaDescription: {
      en: "A house in PGSHF. Drawn here, and built on site. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "PGSHF میں گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.proof629dCgi,
    gallery: [
      still(launchMedia.proof629dCgi, "cgi", {
        en: "PGSHF · house · CGI",
        ur: "PGSHF · گھر · CGI",
      }),
      still(launchMedia.proof629dSite, "site", {
        en: "PGSHF · house · Site",
        ur: "PGSHF · گھر · سائٹ",
      }),
    ],
    compare: {
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
    map: { en: "PGSHF, Rawalpindi", ur: "PGSHF، راولپنڈی" },
  },
  {
    slug: "pgshf-iftikhar",
    typology: "house",
    plotSize: "other",
    style: "modern",
    fromDesignToSite: true,
    layout: "half",
    flags: ["design", "built"],
    title: { en: "PGSHF house", ur: "PGSHF گھر" },
    caption: {
      en: "PGSHF · house · Design · Built",
      ur: "PGSHF · گھر · ڈیزائن · تعمیر",
    },
    alt: altFromCaption({
      en: "PGSHF · house · Design · Built",
      ur: "PGSHF · گھر · ڈیزائن · تعمیر",
    }),
    brief: {
      en: "A house in PGSHF. Drawn here, and built on site.",
      ur: "PGSHF میں گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔",
    },
    like: {
      en: "PGSHF · house",
      ur: "PGSHF · گھر",
    },
    metaDescription: {
      en: "A house in PGSHF. Drawn here, and built on site. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "PGSHF میں گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.proofIftikharCgi,
    gallery: [
      still(launchMedia.proofIftikharCgi, "cgi", {
        en: "PGSHF · house · CGI",
        ur: "PGSHF · گھر · CGI",
      }),
      still(launchMedia.proofIftikharSite, "site", {
        en: "PGSHF · house · Site",
        ur: "PGSHF · گھر · سائٹ",
      }),
    ],
    compare: {
      cgi: launchMedia.proofIftikharCgi,
      site: launchMedia.proofIftikharSite,
      cgiCaption: {
        en: "PGSHF · CGI",
        ur: "PGSHF · CGI",
      },
      siteCaption: {
        en: "PGSHF · Site",
        ur: "PGSHF · سائٹ",
      },
    },
    map: { en: "PGSHF, Rawalpindi", ur: "PGSHF، راولپنڈی" },
  },
  {
    slug: "pgshf-644a",
    typology: "house",
    plotSize: "1-kanal",
    style: "classical",
    fromDesignToSite: true,
    layout: "half",
    flags: ["design", "built"],
    title: { en: "PGSHF 1 kanal house", ur: "PGSHF 1 کنال گھر" },
    caption: {
      en: "PGSHF · 1 kanal · Design · Built",
      ur: "PGSHF · 1 کنال · ڈیزائن · تعمیر",
    },
    alt: altFromCaption({
      en: "PGSHF · 1 kanal · Design · Built",
      ur: "PGSHF · 1 کنال · ڈیزائن · تعمیر",
    }),
    brief: {
      en: "A 1 kanal house in PGSHF. Drawn here, and built on site.",
      ur: "PGSHF میں 1 کنال گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔",
    },
    like: {
      en: "PGSHF · 1 kanal · house",
      ur: "PGSHF · 1 کنال · گھر",
    },
    metaDescription: {
      en: "A 1 kanal house in PGSHF. Drawn here, and built on site. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "PGSHF میں 1 کنال گھر۔ یہاں نقشہ، سائٹ پر تعمیر۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.proof644aCgi,
    gallery: [
      still(launchMedia.proof644aCgi, "cgi", {
        en: "PGSHF · 1 kanal · CGI",
        ur: "PGSHF · 1 کنال · CGI",
      }),
      still(launchMedia.proof644aSite, "site", {
        en: "PGSHF · 1 kanal · Site",
        ur: "PGSHF · 1 کنال · سائٹ",
      }),
    ],
    compare: {
      cgi: launchMedia.proof644aCgi,
      site: launchMedia.proof644aSite,
      cgiCaption: {
        en: "PGSHF · 644-A · CGI",
        ur: "PGSHF · 644-A · CGI",
      },
      siteCaption: {
        en: "PGSHF · 644-A · Site",
        ur: "PGSHF · 644-A · سائٹ",
      },
    },
    map: { en: "PGSHF, Rawalpindi", ur: "PGSHF، راولپنڈی" },
  },
  {
    slug: "gulberg-greens",
    typology: "house",
    plotSize: "other",
    style: null,
    fromDesignToSite: false,
    layout: "half",
    flags: ["built"],
    title: { en: "Gulberg Greens house", ur: "گلبرگ گرینز گھر" },
    caption: {
      en: "Gulberg Greens · house · Built",
      ur: "گلبرگ گرینز · گھر · تعمیر",
    },
    alt: altFromCaption({
      en: "Gulberg Greens · house · Built",
      ur: "گلبرگ گرینز · گھر · تعمیر",
    }),
    brief: {
      en: "A house in Gulberg Greens. Built on site.",
      ur: "گلبرگ گرینز میں گھر۔ سائٹ پر تعمیر۔",
    },
    like: {
      en: "Gulberg Greens · house",
      ur: "گلبرگ گرینز · گھر",
    },
    metaDescription: {
      en: "A house in Gulberg Greens. Built on site. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "گلبرگ گرینز میں گھر۔ سائٹ پر تعمیر۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.proofGulbergGreenSite,
    gallery: [
      still(launchMedia.proofGulbergGreenSite, "site", {
        en: "Gulberg Greens · house · Site",
        ur: "گلبرگ گرینز · گھر · سائٹ",
      }),
    ],
    map: { en: "Gulberg Greens, Islamabad", ur: "گلبرگ گرینز، اسلام آباد" },
  },
  {
    slug: "dha-phase-iii",
    typology: "house",
    plotSize: "other",
    style: null,
    fromDesignToSite: false,
    layout: "half",
    flags: ["built"],
    title: { en: "DHA Phase III house", ur: "DHA فیز III گھر" },
    caption: {
      en: "DHA Phase III · house · Built",
      ur: "DHA فیز III · گھر · تعمیر",
    },
    alt: altFromCaption({
      en: "DHA Phase III · house · Built",
      ur: "DHA فیز III · گھر · تعمیر",
    }),
    brief: {
      en: "A house in DHA Phase III. Built on site.",
      ur: "DHA فیز III میں گھر۔ سائٹ پر تعمیر۔",
    },
    like: {
      en: "DHA Phase III · house",
      ur: "DHA فیز III · گھر",
    },
    metaDescription: {
      en: "A house in DHA Phase III. Built on site. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "DHA فیز III میں گھر۔ سائٹ پر تعمیر۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.proofDhaIiiPour,
    gallery: [
      still(launchMedia.proofDhaIiiPour, "site", {
        en: "DHA Phase III · house · Site",
        ur: "DHA فیز III · گھر · سائٹ",
      }),
    ],
    map: { en: "DHA Phase III, Islamabad", ur: "DHA فیز III، اسلام آباد" },
  },
  {
    slug: "park-view-city",
    typology: "interior",
    plotSize: null,
    style: null,
    fromDesignToSite: false,
    layout: "full",
    flags: ["interior"],
    title: {
      en: "Park View City kitchen and lounge",
      ur: "پارک ویو سٹی کچن اور لاؤنج",
    },
    caption: {
      en: "Park View City · kitchen and lounge · Interior",
      ur: "پارک ویو سٹی · کچن اور لاؤنج · انٹیریئر",
    },
    alt: altFromCaption({
      en: "Park View City · kitchen and lounge · Interior",
      ur: "پارک ویو سٹی · کچن اور لاؤنج · انٹیریئر",
    }),
    brief: {
      en: "Kitchen and lounge in Park View City.",
      ur: "پارک ویو سٹی میں کچن اور لاؤنج۔",
    },
    like: {
      en: "Park View City · kitchen and lounge",
      ur: "پارک ویو سٹی · کچن اور لاؤنج",
    },
    metaDescription: {
      en: "Kitchen and lounge in Park View City. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "پارک ویو سٹی میں کچن اور لاؤنج۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.interiorParkViewKitchen,
    gallery: [
      still(launchMedia.interiorParkViewKitchen, "interior", {
        en: "Park View City · kitchen · Interior",
        ur: "پارک ویو سٹی · کچن · انٹیریئر",
      }),
      still(launchMedia.interiorParkViewDrawing, "interior", {
        en: "Park View City · lounge · Interior",
        ur: "پارک ویو سٹی · لاؤنج · انٹیریئر",
      }),
    ],
    map: { en: "Park View City, Islamabad", ur: "پارک ویو سٹی، اسلام آباد" },
  },
  {
    slug: "attock-tv-lounge",
    typology: "interior",
    plotSize: null,
    style: null,
    fromDesignToSite: false,
    layout: "half",
    flags: ["interior"],
    title: { en: "Attock TV lounge", ur: "اٹک ٹی وی لاؤنج" },
    caption: {
      en: "Attock · TV lounge · Interior",
      ur: "اٹک · ٹی وی لاؤنج · انٹیریئر",
    },
    alt: altFromCaption({
      en: "Attock · TV lounge · Interior",
      ur: "اٹک · ٹی وی لاؤنج · انٹیریئر",
    }),
    brief: {
      en: "TV lounge in Attock.",
      ur: "اٹک میں ٹی وی لاؤنج۔",
    },
    like: {
      en: "Attock · TV lounge",
      ur: "اٹک · ٹی وی لاؤنج",
    },
    metaDescription: {
      en: "TV lounge in Attock. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "اٹک میں ٹی وی لاؤنج۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.interiorAttockTvWall,
    gallery: [
      still(launchMedia.interiorAttockTvWall, "interior", {
        en: "Attock · TV lounge · Interior",
        ur: "اٹک · ٹی وی لاؤنج · انٹیریئر",
      }),
      still(launchMedia.interiorAttockDrawing, "interior", {
        en: "Attock · drawing room · Interior",
        ur: "اٹک · ڈرائنگ روم · انٹیریئر",
      }),
    ],
    map: { en: "Attock", ur: "اٹک" },
  },
  {
    slug: "mansehra-interiors",
    typology: "interior",
    plotSize: null,
    style: null,
    fromDesignToSite: false,
    layout: "half",
    flags: ["interior"],
    title: { en: "Mansehra house interiors", ur: "مانسہرہ گھر کا انٹیریئر" },
    caption: {
      en: "Mansehra · house interiors · Interior",
      ur: "مانسہرہ · گھر کا انٹیریئر · انٹیریئر",
    },
    alt: altFromCaption({
      en: "Mansehra · house interiors · Interior",
      ur: "مانسہرہ · گھر کا انٹیریئر · انٹیریئر",
    }),
    brief: {
      en: "House interiors in Mansehra.",
      ur: "مانسہرہ میں گھر کا انٹیریئر۔",
    },
    like: {
      en: "Mansehra · house interiors",
      ur: "مانسہرہ · گھر کا انٹیریئر",
    },
    metaDescription: {
      en: "House interiors in Mansehra. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "مانسہرہ میں گھر کا انٹیریئر۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.interiorMansehraKitchen,
    gallery: [
      still(launchMedia.interiorMansehraKitchen, "interior", {
        en: "Mansehra · kitchen · Interior",
        ur: "مانسہرہ · کچن · انٹیریئر",
      }),
      still(launchMedia.interiorMansehraLounge, "interior", {
        en: "Mansehra · lounge · Interior",
        ur: "مانسہرہ · لاؤنج · انٹیریئر",
      }),
    ],
    map: { en: "Mansehra", ur: "مانسہرہ" },
  },
  {
    slug: "omoda-jaecoo",
    typology: "commercial",
    plotSize: null,
    style: null,
    fromDesignToSite: false,
    layout: "full",
    flags: ["commercial", "design"],
    title: { en: "OMODA / JAECOO showroom", ur: "OMODA / JAECOO شوروم" },
    caption: {
      en: "OMODA / JAECOO · showroom · Commercial",
      ur: "OMODA / JAECOO · شوروم · کمرشل",
    },
    alt: altFromCaption({
      en: "OMODA / JAECOO · showroom · Commercial",
      ur: "OMODA / JAECOO · شوروم · کمرشل",
    }),
    brief: {
      en: "Showroom for OMODA / JAECOO.",
      ur: "OMODA / JAECOO کے لیے شوروم۔",
    },
    like: {
      en: "OMODA / JAECOO · showroom",
      ur: "OMODA / JAECOO · شوروم",
    },
    metaDescription: {
      en: "Showroom for OMODA / JAECOO. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "OMODA / JAECOO کے لیے شوروم۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.commercialOmodaJaecoo,
    gallery: [
      still(launchMedia.commercialOmodaJaecoo, "3d", {
        en: "OMODA / JAECOO · showroom · 3D",
        ur: "OMODA / JAECOO · شوروم · 3D",
      }),
    ],
  },
  {
    slug: "peshawari-dry-fruits",
    typology: "commercial",
    plotSize: null,
    style: null,
    fromDesignToSite: false,
    layout: "half",
    flags: ["commercial", "design"],
    title: { en: "Peshawari Dry Fruits shop", ur: "پشاوری ڈرائی فروٹس دکان" },
    caption: {
      en: "Peshawari Dry Fruits · shop · Commercial",
      ur: "پشاوری ڈرائی فروٹس · دکان · کمرشل",
    },
    alt: altFromCaption({
      en: "Peshawari Dry Fruits · shop · Commercial",
      ur: "پشاوری ڈرائی فروٹس · دکان · کمرشل",
    }),
    brief: {
      en: "A shop for Peshawari Dry Fruits.",
      ur: "پشاوری ڈرائی فروٹس کے لیے دکان۔",
    },
    like: {
      en: "Peshawari Dry Fruits · shop",
      ur: "پشاوری ڈرائی فروٹس · دکان",
    },
    metaDescription: {
      en: "A shop for Peshawari Dry Fruits. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "پشاوری ڈرائی فروٹس کے لیے دکان۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.commercialPeshawariDryFruits,
    gallery: [
      still(launchMedia.commercialPeshawariDryFruits, "3d", {
        en: "Peshawari Dry Fruits · shop · 3D",
        ur: "پشاوری ڈرائی فروٹس · دکان · 3D",
      }),
    ],
  },
  {
    slug: "janhzab-office",
    typology: "commercial",
    plotSize: null,
    style: null,
    fromDesignToSite: false,
    layout: "half",
    flags: ["commercial", "design"],
    title: { en: "Janhzab office", ur: "Janhzab دفتر" },
    caption: {
      en: "Janhzab · office · Commercial",
      ur: "Janhzab · دفتر · کمرشل",
    },
    alt: altFromCaption({
      en: "Janhzab · office · Commercial",
      ur: "Janhzab · دفتر · کمرشل",
    }),
    brief: {
      en: "An office interior for Janhzab.",
      ur: "Janhzab کے لیے دفتر کا انٹیریئر۔",
    },
    like: {
      en: "Janhzab · office",
      ur: "Janhzab · دفتر",
    },
    metaDescription: {
      en: "An office interior for Janhzab. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "Janhzab کے لیے دفتر کا انٹیریئر۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.commercialJanhzabOffice,
    gallery: [
      still(launchMedia.commercialJanhzabOffice, "interior", {
        en: "Janhzab · office · Interior",
        ur: "Janhzab · دفتر · انٹیریئر",
      }),
    ],
  },
  {
    slug: "gulshan-e-shamal",
    typology: "commercial",
    plotSize: "1-kanal",
    style: null,
    fromDesignToSite: false,
    layout: "full",
    flags: ["commercial", "design"],
    title: {
      en: "Gulshan-e-Shamal mixed-use",
      ur: "گلشن شمال مخلوط استعمال",
    },
    caption: {
      en: "Gulshan-e-Shamal · mixed-use · Commercial",
      ur: "گلشن شمال · مخلوط استعمال · کمرشل",
    },
    alt: altFromCaption({
      en: "Gulshan-e-Shamal · mixed-use · Commercial",
      ur: "گلشن شمال · مخلوط استعمال · کمرشل",
    }),
    brief: {
      en: "Mixed-use for Gulshan-e-Shamal.",
      ur: "گلشن شمال کے لیے مخلوط استعمال۔",
    },
    like: {
      en: "Gulshan-e-Shamal · mixed-use",
      ur: "گلشن شمال · مخلوط استعمال",
    },
    metaDescription: {
      en: "Mixed-use for Gulshan-e-Shamal. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "گلشن شمال کے لیے مخلوط استعمال۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.commercialGulshanEShamal,
    gallery: [
      still(launchMedia.commercialGulshanEShamal, "3d", {
        en: "Gulshan-e-Shamal · mixed-use · 3D",
        ur: "گلشن شمال · مخلوط استعمال · 3D",
      }),
    ],
  },
  {
    slug: "mr-waseem",
    typology: "landscape",
    plotSize: null,
    style: null,
    fromDesignToSite: false,
    layout: "full",
    flags: ["design"],
    title: { en: "Mr Waseem garden", ur: "جناب وسیم باغ" },
    caption: {
      en: "Mr Waseem · garden · one landscape project",
      ur: "جناب وسیم · باغ · ایک لینڈسکیپ منصوبہ",
    },
    alt: altFromCaption({
      en: "Mr Waseem · garden · one landscape project",
      ur: "جناب وسیم · باغ · ایک لینڈسکیپ منصوبہ",
    }),
    brief: {
      en: "Garden and house for Mr Waseem. One landscape project, not a landscape department.",
      ur: "جناب وسیم کے گھر کا باغ۔ ایک لینڈسکیپ منصوبہ، لینڈسکیپ کا شعبہ نہیں۔",
    },
    like: {
      en: "Mr Waseem · garden",
      ur: "جناب وسیم · باغ",
    },
    metaDescription: {
      en: "Garden and house for Mr Waseem. One landscape project, not a landscape department. Islamabad / Rawalpindi studio. WhatsApp to ask about this project.",
      ur: "جناب وسیم کے گھر کا باغ۔ ایک لینڈسکیپ منصوبہ، لینڈسکیپ کا شعبہ نہیں۔ اسلام آباد / راولپنڈی سٹوڈیو۔ اس منصوبے کے لیے واٹس ایپ کریں۔",
    },
    hero: launchMedia.landscapeWaseemGarden,
    gallery: [
      still(launchMedia.landscapeWaseemGarden, "landscape", {
        en: "Mr Waseem · garden · one landscape project",
        ur: "جناب وسیم · باغ · ایک لینڈسکیپ منصوبہ",
      }),
      still(launchMedia.landscapeWaseemFountain, "landscape", {
        en: "Mr Waseem · fountain · one landscape project",
        ur: "جناب وسیم · فوارہ · ایک لینڈسکیپ منصوبہ",
      }),
    ],
  },
];

const SELECTED_SLUGS = [
  "pgshf-586a",
  "pgshf-zahid-5-marla",
  "pgshf-iqbal-1-kanal",
] as const;

export const selectedProjects: SelectedProject[] = SELECTED_SLUGS.map((slug) => {
  const project = workProjects.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`Missing selected work project: ${slug}`);
  }
  return {
    slug: project.slug,
    image: project.hero,
    layout: project.layout,
    flags: project.flags.filter(
      (flag): flag is ProjectFlag => flag === "design" || flag === "built"
    ),
    caption: project.caption,
    alt: project.alt,
  };
});

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

export function getWorkProject(slug: string) {
  return workProjects.find((project) => project.slug === slug);
}

export function workTransitionName(slug: string) {
  return `work-${slug}`;
}
