import type { Locale } from "@/lib/i18n";

export type MarketingRoute =
  | "home"
  | "features"
  | "pricing"
  | "contact"
  | "privacy"
  | "terms";

const localizedSegments: Record<MarketingRoute, Record<Locale, string>> = {
  home: {
    es: "",
    en: "",
  },
  features: {
    es: "funciones",
    en: "features",
  },
  pricing: {
    es: "precios",
    en: "pricing",
  },
  contact: {
    es: "contacto",
    en: "contact",
  },
  privacy: {
    es: "privacidad",
    en: "privacy",
  },
  terms: {
    es: "terminos",
    en: "terms",
  },
};

export function getLocalizedRoute(
  lang: Locale,
  route: MarketingRoute,
): string {
  const segment = localizedSegments[route][lang];

  return segment ? `/${lang}/${segment}` : `/${lang}`;
}

export function getHomeSectionRoute(lang: Locale, sectionId: string): string {
  return `/${lang}#${sectionId}`;
}

export function getLocalizedRouteAlternates(
  route: MarketingRoute,
): Record<Locale, string> {
  return {
    es: getLocalizedRoute("es", route),
    en: getLocalizedRoute("en", route),
  };
}

export function getTranslatedMarketingPath(
  pathname: string,
  nextLang: Locale,
): string {
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  for (const route of Object.keys(localizedSegments) as MarketingRoute[]) {
    for (const lang of Object.keys(localizedSegments[route]) as Locale[]) {
      if (normalizedPathname === getLocalizedRoute(lang, route)) {
        return getLocalizedRoute(nextLang, route);
      }
    }
  }

  return getLocalizedRoute(nextLang, "home");
}
