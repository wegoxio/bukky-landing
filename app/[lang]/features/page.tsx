import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/footer/site-footer";
import { IndustryUseCasesSection } from "@/components/industries/industry-use-cases-section";
import { SiteNavbar } from "@/components/navigation/site-navbar";
import { FeaturesPageContent } from "@/components/pages/marketing-pages";
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
  const labels = dictionary.pages.features;

  return buildPageMetadata({
    lang: "en",
    path: getLocalizedRoute("en", "features"),
    title: labels.seo.title,
    description: labels.seo.description,
    keywords: labels.seo.keywords,
    languageAlternates: getLocalizedRouteAlternates("features"),
  });
}

export default async function FeaturesPage({ params }: PageProps) {
  const { lang } = await params;

  if (lang !== "en") {
    notFound();
  }

  const dictionary = await getDictionary("en");
  const labels = dictionary.pages.features;
  const pageUrl = `${getSiteUrl()}${getLocalizedRoute("en", "features")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: labels.seo.title,
    description: labels.seo.description,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
    about: labels.pillars.map((pillar) => pillar.title),
  };

  return (
    <>
      <SiteNavbar lang="en" labels={dictionary.navbar} />
      <main className="flex-1">
        <FeaturesPageContent lang="en" labels={labels} jsonLd={jsonLd} />
        <IndustryUseCasesSection labels={dictionary.industries} />
      </main>
      <SiteFooter labels={dictionary.footer} />
    </>
  );
}
