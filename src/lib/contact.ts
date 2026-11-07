import { isWhatsAppLive, WHATSAPP_NUMBER } from "@/lib/whatsapp";

/** Public trading name. Matches the domain until a registered legal name exists. */
export const PUBLIC_NAME = "FluX Design and Construction";
export const DOMAIN = "fluxdesignandconstruction.com";
export const SITE_ORIGIN = `https://${DOMAIN}`;
export const CITIES = "Islamabad / Rawalpindi";

/**
 * Named person, office, hours, email, legal name, map pin.
 * Empty until Faizan supplies them — never paint a blank as live.
 */
export const CONTACT_NAME = "Ar. Adnan Ejaz and Engr. Umair Ejaz";
/** Google Maps pin (Faizan, Nov 2026): 1 Adiyala Rd, Rawalpindi. */
export const OFFICE_ADDRESS = "1 Adiyala Rd, Rawalpindi, Pakistan";
/** GBP hours, every day. Display as a Latin island; pages append (PKT). */
export const OFFICE_HOURS_PKT = "9:00–21:00 daily";
export const STUDIO_EMAIL = "info@fluxconsultancy.com";
export const LEGAL_COMPANY_NAME = "";
export const INSTAGRAM_URL =
  "https://www.instagram.com/fluxdesignandconstruction/";
export const BEHANCE_URL = "https://www.behance.net/fluXdesignstudio";
export const MAPS_PLACE_URL =
  "https://www.google.com/maps/place/FluX+Design+and+Construction/@33.5178127,73.0472449,17z";

export const MAP_PIN = {
  latitude: 33.5178127,
  longitude: 73.0472449,
} as const;

export const MAP_VIEW = {
  longitude: MAP_PIN.longitude,
  latitude: MAP_PIN.latitude,
  zoom: 16,
} as const;

export function hasContactName() {
  return CONTACT_NAME.length > 0;
}

export function hasOfficeAddress() {
  return OFFICE_ADDRESS.length > 0;
}

export function hasOfficeHours() {
  return OFFICE_HOURS_PKT.length > 0;
}

export function hasEmail() {
  return STUDIO_EMAIL.length > 0;
}

export function hasLegalName() {
  return LEGAL_COMPANY_NAME.length > 0;
}

export function hasMapPin() {
  return MAP_PIN !== null;
}

export function isPhoneLive() {
  return isWhatsAppLive();
}

export function telHref(): string | null {
  if (!isWhatsAppLive()) return null;
  return `tel:+${WHATSAPP_NUMBER}`;
}

/** Latin display form of the same number as WhatsApp. */
export function phoneDisplay(): string {
  if (!isWhatsAppLive()) return "";
  const n = WHATSAPP_NUMBER;
  if (n.startsWith("92") && n.length >= 12) {
    return `+${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}`;
  }
  return `+${n}`;
}
