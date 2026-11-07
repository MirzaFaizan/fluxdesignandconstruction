import type { Locale } from "@/i18n/routing";

/**
 * Same number as voice, `wa.me` form without `+` or a leading `0`.
 * Empty until the real number exists — never paint a fake live chat.
 */
export const WHATSAPP_NUMBER = "";

export type WhatsAppIntent =
  | "generic"
  | "house"
  | "interior"
  | "grey"
  | "turnkey"
  | "commercial"
  | "abroad"
  | "freeLook";

export function isWhatsAppLive() {
  return WHATSAPP_NUMBER.length > 0;
}

export const WHATSAPP_PREFILLS: Record<
  Locale,
  Record<WhatsAppIntent, string>
> = {
  en: {
    generic:
      "Salaam, I am interested in a project with FluX. Plot size: (e.g. 10 marla). Society: (e.g. Gulberg Greens). I am writing from (city).",
    house:
      "Salaam, I am interested in a 10 marla house (architecture + build) in Gulberg Greens. I am writing from (city).",
    interior:
      "Salaam, I am interested in interior design (kitchen / TV lounge / bath). Society or city: (e.g. Park View). I am writing from (city).",
    grey: "Salaam, I am interested in grey structure. Plot size: (e.g. 10 marla). Society: (e.g. DHA III). I am writing from (city).",
    turnkey:
      "Salaam, I am interested in turnkey (design + build). Plot size: (e.g. 10 marla). Society: (e.g. Gulberg Greens). I am writing from (city).",
    commercial:
      "Salaam, I am interested in a commercial project (showroom / shop / office / mixed-use). Plot or address: . I am writing from (city).",
    abroad:
      "Salaam, I live abroad and own a plot in Pakistan. City I am writing from: (e.g. Dubai). Plot size: (e.g. 10 marla). Society: . I would like an evening call.",
    freeLook:
      "Salaam, I would like a free first look at a plot / drawings. Plot size: (e.g. 10 marla). Society: . I am writing from (city).",
  },
  ur: {
    generic:
      "السلام علیکم، FluX کے ساتھ ایک منصوبے کے بارے میں بات کرنی ہے۔ پلاٹ کا سائز: (جیسے 10 مرلہ)۔ سوسائٹی: (جیسے گلبرگ گرینز)۔ میں (شہر) سے لکھ رہا/رہی ہوں۔",
    house:
      "السلام علیکم، گلبرگ گرینز میں 10 مرلہ گھر (ڈیزائن اور تعمیر) کے بارے میں بات کرنی ہے۔ میں (شہر) سے لکھ رہا/رہی ہوں۔",
    interior:
      "السلام علیکم، انٹیریئر ڈیزائن (کچن / ٹی وی لاؤنج / باتھ) کے بارے میں بات کرنی ہے۔ سوسائٹی یا شہر: (جیسے پارک ویو)۔ میں (شہر) سے لکھ رہا/رہی ہوں۔",
    grey: "السلام علیکم، گرے سٹرکچر کے بارے میں بات کرنی ہے۔ پلاٹ کا سائز: (جیسے 10 مرلہ)۔ سوسائٹی: (جیسے DHA III)۔ میں (شہر) سے لکھ رہا/رہی ہوں۔",
    turnkey:
      "السلام علیکم، ٹرن کی (ڈیزائن اور تعمیر) کے بارے میں بات کرنی ہے۔ پلاٹ کا سائز: (جیسے 10 مرلہ)۔ سوسائٹی: (جیسے گلبرگ گرینز)۔ میں (شہر) سے لکھ رہا/رہی ہوں۔",
    commercial:
      "السلام علیکم، ایک کمرشل منصوبے (شوروم / دکان / دفتر / مخلوط استعمال) کے بارے میں بات کرنی ہے۔ پلاٹ یا پتہ: ۔ میں (شہر) سے لکھ رہا/رہی ہوں۔",
    abroad:
      "السلام علیکم، ہم بیرون ملک رہتے ہیں اور پاکستان میں پلاٹ ہے۔ میں (شہر، جیسے دبئی) سے لکھ رہا/رہی ہوں۔ پلاٹ کا سائز: (جیسے 10 مرلہ)۔ سوسائٹی: ۔ شام کی کال چاہیے۔",
    freeLook:
      "السلام علیکم، پلاٹ / نقشوں پر مفت پہلی نظر درکار ہے۔ پلاٹ کا سائز: (جیسے 10 مرلہ)۔ سوسائٹی: ۔ میں (شہر) سے لکھ رہا/رہی ہوں۔",
  },
};

export function whatsappUrl(
  locale: Locale,
  intent: WhatsAppIntent = "generic"
): string | null {
  if (!isWhatsAppLive()) return null;
  const text = WHATSAPP_PREFILLS[locale][intent];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
