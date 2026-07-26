import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { defaultLocale, isValidLocale, locales, type Locale } from "@/lib/i18n";
import { getSiteAssetUrl, getSiteUrl, siteConfig } from "@/lib/site-config";

import { getDictionary } from "./dictionaries";
import "../globals.css";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>;

const openGraphLocaleMap: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  const dictionary = await getDictionary(lang);
  const metadataTitle = `${siteConfig.name} | ${dictionary.seo.title}`;
  const metadataDescription = dictionary.seo.description;
  const ogImageUrl = getSiteAssetUrl(siteConfig.ogImage);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: metadataTitle,
    description: metadataDescription,
    keywords: dictionary.seo.keywords,
    applicationName: siteConfig.name,
    category: "software",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": `/${defaultLocale}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: `/${lang}`,
      title: metadataTitle,
      description: metadataDescription,
      locale: openGraphLocaleMap[lang],
      alternateLocale: locales
        .filter((locale) => locale !== lang)
        .map((locale) => openGraphLocaleMap[locale]),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: dictionary.seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: metadataDescription,
      creator: siteConfig.twitterHandle,
      images: [ogImageUrl],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
