import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import {
  getLocalizedRoute,
  getLocalizedRouteAlternates,
  type MarketingRoute,
} from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date("2026-07-26");
  const routes: Array<{
    route: MarketingRoute;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { route: "home", changeFrequency: "weekly", priority: 1 },
    { route: "features", changeFrequency: "monthly", priority: 0.86 },
    { route: "pricing", changeFrequency: "monthly", priority: 0.84 },
    { route: "contact", changeFrequency: "monthly", priority: 0.72 },
    { route: "privacy", changeFrequency: "yearly", priority: 0.42 },
    { route: "terms", changeFrequency: "yearly", priority: 0.42 },
  ];

  return routes.flatMap(({ route, changeFrequency, priority }) => {
    const alternates = getLocalizedRouteAlternates(route);

    return locales.map((locale) => ({
      url: `${siteUrl}${getLocalizedRoute(locale, route)}`,
      lastModified,
      changeFrequency,
      priority: locale === "es" ? priority : Math.max(priority - 0.08, 0.3),
      alternates: {
        languages: {
          es: `${siteUrl}${alternates.es}`,
          en: `${siteUrl}${alternates.en}`,
        },
      },
    }));
  });
}
