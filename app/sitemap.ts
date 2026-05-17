import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "es" ? 1 : 0.8,
    alternates: {
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
      },
    },
  }));
}
