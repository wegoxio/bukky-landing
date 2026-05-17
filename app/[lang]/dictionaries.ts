import "server-only";

import type { Locale } from "@/lib/i18n";

const dictionaries = {
  es: () =>
    import("./dictionaries/es.json").then((module) => module.default),
  en: () =>
    import("./dictionaries/en.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
