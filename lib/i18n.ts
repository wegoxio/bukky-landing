export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

const localesSet = new Set<Locale>(locales);

export function isValidLocale(locale: string): locale is Locale {
  return localesSet.has(locale as Locale);
}
