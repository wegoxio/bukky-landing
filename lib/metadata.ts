import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { getSiteAssetUrl, getSiteUrl, siteConfig } from "@/lib/site-config";

type PageMetadataInput = {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  languageAlternates: Record<Locale, string>;
};

const openGraphLocaleMap: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
};

export function buildPageMetadata({
  lang,
  path,
  title,
  description,
  keywords,
  languageAlternates,
}: PageMetadataInput): Metadata {
  const metadataTitle = `${siteConfig.name} | ${title}`;
  const ogImageUrl = getSiteAssetUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: metadataTitle,
    description,
    keywords,
    applicationName: siteConfig.name,
    category: "software",
    alternates: {
      canonical: path,
      languages: {
        ...languageAlternates,
        "x-default": languageAlternates.es,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: path,
      title: metadataTitle,
      description,
      locale: openGraphLocaleMap[lang],
      alternateLocale: locales
        .filter((locale) => locale !== lang)
        .map((locale) => openGraphLocaleMap[locale]),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description,
      creator: siteConfig.twitterHandle,
      images: [ogImageUrl],
    },
  };
}
