import { notFound } from "next/navigation";

import { FeaturesSection } from "@/components/features/features-section";
import { FinalCtaSection } from "@/components/cta/final-cta-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { HeroHighlightsStrip } from "@/components/hero/hero-highlights-strip";
import { HeroSection } from "@/components/hero/hero-section";
import { IndustryUseCasesSection } from "@/components/industries/industry-use-cases-section";
import { SiteNavbar } from "@/components/navigation/site-navbar";
import { QuickSetupSection } from "@/components/process/quick-setup-section";
import { StructuredData } from "@/components/seo/structured-data";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { OperationsWorkflowSection } from "@/components/workflow/operations-workflow-section";
import { isValidLocale } from "@/lib/i18n";
import { getLocalizedRoute } from "@/lib/routes";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

import { getDictionary } from "./dictionaries";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${getLocalizedRoute(lang, "home")}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteConfig.name,
        url: siteUrl,
        logo: `${siteUrl}/bukky_logo_completo.svg`,
        sameAs: [
          "https://www.instagram.com/bukky.wegox?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteConfig.name,
        url: siteUrl,
        inLanguage: lang,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: dictionary.seo.description,
        url: pageUrl,
        featureList: dictionary.features.items.map((item) => item.title),
        offers: {
          "@type": "Offer",
          price: "20",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}${getLocalizedRoute(lang, "pricing")}`,
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <SiteNavbar lang={lang} labels={dictionary.navbar} />

      <main className="flex-1">
        <HeroSection lang={lang} labels={dictionary.home} />
        <HeroHighlightsStrip labels={dictionary.home.highlights} />
        <FeaturesSection labels={dictionary.features} />
        <IndustryUseCasesSection labels={dictionary.industries} />
        <QuickSetupSection labels={dictionary.quickSetup} />
        <OperationsWorkflowSection labels={dictionary.operationsWorkflow} />
        <TestimonialsSection labels={dictionary.testimonials} />
        <FinalCtaSection lang={lang} labels={dictionary.finalCta} />
      </main>
      <SiteFooter labels={dictionary.footer} />
    </>
  );
}
