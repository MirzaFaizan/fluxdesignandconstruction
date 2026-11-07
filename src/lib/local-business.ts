import {
  BEHANCE_URL,
  INSTAGRAM_URL,
  MAP_PIN,
  MAPS_PLACE_URL,
  PUBLIC_NAME,
  SITE_ORIGIN,
  STUDIO_EMAIL,
  hasMapPin,
  hasOfficeAddress,
  hasOfficeHours,
  isPhoneLive,
  phoneDisplay,
} from "@/lib/contact";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

/** One graph. Facts match footer / Contact / Studio. No licences, no ratings. */
export function localBusinessJsonLd() {
  const telephone = isPhoneLive() ? phoneDisplay() : undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "GeneralContractor"],
    "@id": `${SITE_ORIGIN}/#studio`,
    name: PUBLIC_NAME,
    url: SITE_ORIGIN,
    email: STUDIO_EMAIL,
    ...(telephone ? { telephone } : {}),
    ...(hasOfficeAddress()
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: "1 Adiyala Rd",
            addressLocality: "Rawalpindi",
            addressRegion: "Punjab",
            addressCountry: "PK",
          },
        }
      : {}),
    ...(hasMapPin()
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: MAP_PIN.latitude,
            longitude: MAP_PIN.longitude,
          },
          hasMap: MAPS_PLACE_URL,
        }
      : {}),
    ...(hasOfficeHours()
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [...DAYS],
            opens: "09:00",
            closes: "21:00",
          },
        }
      : {}),
    areaServed: [
      { "@type": "City", name: "Islamabad" },
      { "@type": "City", name: "Rawalpindi" },
    ],
    knowsLanguage: ["en", "ur"],
    image: [
      `${SITE_ORIGIN}/favicon-512.png`,
      `${SITE_ORIGIN}/media/heroes/hero-khursheed-586a-dusk.webp`,
    ],
    logo: `${SITE_ORIGIN}/favicon-512.png`,
    sameAs: [INSTAGRAM_URL, BEHANCE_URL, MAPS_PLACE_URL],
  };
}
