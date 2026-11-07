import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/contact";

const allowAll = { allow: "/" as const };

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...allowAll },
      { userAgent: "Googlebot", ...allowAll },
      { userAgent: "Bingbot", ...allowAll },
      { userAgent: "OAI-SearchBot", ...allowAll },
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Claude-SearchBot", ...allowAll },
      { userAgent: "Claude-User", ...allowAll },
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "Google-Extended", ...allowAll },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
