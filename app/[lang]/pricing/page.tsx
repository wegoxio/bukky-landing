import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/footer/site-footer";
import { SiteNavbar } from "@/components/navigation/site-navbar";
import { PricingPageContent } from "@/components/pages/marketing-pages";
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
  const labels = dictionary.pages.pricing;

  return buildPageMetadata({
    lang: "en",
    path: getLocalizedRoute("en", "pricing"),
    title: labels.seo.title,
    description: labels.seo.description,
    keywords: labels.seo.keywords,
    languageAlternates: getLocalizedRouteAlternates("pricing"),
  });
}

export default async function PricingPage({ params }: PageProps) {
  const { lang } = await params;

  if (lang !== "en") {
    notFound();
  }

  const dictionary = await getDictionary("en");
  const labels = dictionary.pages.pricing;
  const pageUrl = `${getSiteUrl()}${getLocalizedRoute("en", "pricing")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: labels.seo.description,
        url: pageUrl,
        offers: {
          "@type": "Offer",
          price: "20",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: pageUrl,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: labels.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <SiteNavbar lang="en" labels={dictionary.navbar} />
      <main className="flex-1">
        <PricingPageContent lang="en" labels={labels} jsonLd={jsonLd} />
      </main>
      <SiteFooter labels={dictionary.footer} />
    </>
  );
}
