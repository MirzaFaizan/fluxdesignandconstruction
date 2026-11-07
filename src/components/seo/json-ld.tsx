import { localBusinessJsonLd } from "@/lib/local-business";

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessJsonLd()),
      }}
    />
  );
}
