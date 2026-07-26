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
  return [{ lang: "es" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang !== "es") {
    return {};
  }

  const dictionary = await getDictionary("es");
  const labels = dictionary.pages.features;

  return buildPageMetadata({
    lang: "es",
    path: getLocalizedRoute("es", "features"),
    title: labels.seo.title,
    description: labels.seo.description,
    keywords: labels.seo.keywords,
    languageAlternates: getLocalizedRouteAlternates("features"),
  });
}

export default async function FeaturesPage({ params }: PageProps) {
  const { lang } = await params;

  if (lang !== "es") {
    notFound();
  }

  const dictionary = await getDictionary("es");
  const labels = dictionary.pages.features;
  const pageUrl = `${getSiteUrl()}${getLocalizedRoute("es", "features")}`;

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
      <SiteNavbar lang="es" labels={dictionary.navbar} />
      <main className="flex-1">
        <FeaturesPageContent lang="es" labels={labels} jsonLd={jsonLd} />
        <IndustryUseCasesSection labels={dictionary.industries} />
      </main>
      <SiteFooter labels={dictionary.footer} />
    </>
  );
}
