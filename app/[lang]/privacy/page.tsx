import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/footer/site-footer";
import { SiteNavbar } from "@/components/navigation/site-navbar";
import { LegalPageContent } from "@/components/pages/legal-page";
import { buildPageMetadata } from "@/lib/metadata";
import { getLocalizedRoute, getLocalizedRouteAlternates } from "@/lib/routes";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

import { getDictionary } from "../dictionaries";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang !== "en") {
    return {};
  }

  const dictionary = await getDictionary("en");
  const labels = dictionary.pages.privacy;

  return buildPageMetadata({
    lang: "en",
    path: getLocalizedRoute("en", "privacy"),
    title: labels.seo.title,
    description: labels.seo.description,
    keywords: labels.seo.keywords,
    languageAlternates: getLocalizedRouteAlternates("privacy"),
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;

  if (lang !== "en") {
    notFound();
  }

  const dictionary = await getDictionary("en");
  const labels = dictionary.pages.privacy;
  const pageUrl = `${getSiteUrl()}${getLocalizedRoute("en", "privacy")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: labels.seo.title,
    description: labels.seo.description,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
      logo: `${getSiteUrl()}/bukky_logo_completo.svg`,
    },
  };

  return (
    <>
      <SiteNavbar lang="en" labels={dictionary.navbar} />
      <main className="flex-1">
        <LegalPageContent lang="en" labels={labels} jsonLd={jsonLd} />
      </main>
      <SiteFooter labels={dictionary.footer} />
    </>
  );
}
