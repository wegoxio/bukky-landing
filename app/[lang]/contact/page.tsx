import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/footer/site-footer";
import { SiteNavbar } from "@/components/navigation/site-navbar";
import { ContactPageContent } from "@/components/pages/marketing-pages";
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
  const labels = dictionary.pages.contact;

  return buildPageMetadata({
    lang: "en",
    path: getLocalizedRoute("en", "contact"),
    title: labels.seo.title,
    description: labels.seo.description,
    keywords: labels.seo.keywords,
    languageAlternates: getLocalizedRouteAlternates("contact"),
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;

  if (lang !== "en") {
    notFound();
  }

  const dictionary = await getDictionary("en");
  const labels = dictionary.pages.contact;
  const pageUrl = `${getSiteUrl()}${getLocalizedRoute("en", "contact")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: labels.seo.title,
    description: labels.seo.description,
    url: pageUrl,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
      sameAs: [
        "https://www.instagram.com/bukky.wegox?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      ],
    },
  };

  return (
    <>
      <SiteNavbar lang="en" labels={dictionary.navbar} />
      <main className="flex-1">
        <ContactPageContent lang="en" labels={labels} jsonLd={jsonLd} />
      </main>
      <SiteFooter labels={dictionary.footer} />
    </>
  );
}
