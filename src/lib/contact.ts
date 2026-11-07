import { isWhatsAppLive, WHATSAPP_NUMBER } from "@/lib/whatsapp";

/** Public trading name. Matches the domain until a registered legal name exists. */
export const PUBLIC_NAME = "FluX Design and Construction";
export const DOMAIN = "fluxdesignandconstruction.com";
export const CITIES = "Islamabad / Rawalpindi";

/**
 * Named person, office, hours, email, legal name, map pin.
 * Empty until Faizan supplies them — never paint a blank as live.
 */
export const CONTACT_NAME = "";
export const OFFICE_ADDRESS = "";
export const OFFICE_HOURS_PKT = "";
export const STUDIO_EMAIL = "";
export const LEGAL_COMPANY_NAME = "";

/** Twin-cities view. Not an office pin. */
export const MAP_VIEW = {
  longitude: 73.0479,
  latitude: 33.6844,
  zoom: 10,
} as const;

export const MAP_PIN: { longitude: number; latitude: number } | null = null;

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
    return `+${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 8)} ${n.slice(8)}`;
  }
  return `+${n}`;
}
