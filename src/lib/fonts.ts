import { IBM_Plex_Sans, Noto_Naskh_Arabic, Noto_Nastaliq_Urdu } from "next/font/google";

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
  preload: true,
});

export const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-naskh",
  preload: false,
  adjustFontFallback: false,
});

export const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-nastaliq",
  preload: false,
  adjustFontFallback: false,
});
