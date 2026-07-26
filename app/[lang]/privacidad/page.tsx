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
  return [{ lang: "es" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (lang !== "es") {
    return {};
  }

  const dictionary = await getDictionary("es");
  const labels = dictionary.pages.privacy;

  return buildPageMetadata({
    lang: "es",
    path: getLocalizedRoute("es", "privacy"),
    title: labels.seo.title,
    description: labels.seo.description,
    keywords: labels.seo.keywords,
    languageAlternates: getLocalizedRouteAlternates("privacy"),
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;

  if (lang !== "es") {
    notFound();
  }

  const dictionary = await getDictionary("es");
  const labels = dictionary.pages.privacy;
  const pageUrl = `${getSiteUrl()}${getLocalizedRoute("es", "privacy")}`;

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
      <SiteNavbar lang="es" labels={dictionary.navbar} />
      <main className="flex-1">
        <LegalPageContent lang="es" labels={labels} jsonLd={jsonLd} />
      </main>
      <SiteFooter labels={dictionary.footer} />
    </>
  );
}
