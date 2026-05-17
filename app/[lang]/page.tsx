import { notFound } from "next/navigation";

import { FeaturesSection } from "@/components/features/features-section";
import { FinalCtaSection } from "@/components/cta/final-cta-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { HeroHighlightsStrip } from "@/components/hero/hero-highlights-strip";
import { HeroSection } from "@/components/hero/hero-section";
import { SiteNavbar } from "@/components/navigation/site-navbar";
import { QuickSetupSection } from "@/components/process/quick-setup-section";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { OperationsWorkflowSection } from "@/components/workflow/operations-workflow-section";
import { isValidLocale } from "@/lib/i18n";

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

  return (
    <>
      <SiteNavbar lang={lang} labels={dictionary.navbar} />

      <main className="flex-1">
        <HeroSection lang={lang} labels={dictionary.home} />
        <HeroHighlightsStrip labels={dictionary.home.highlights} />
        <FeaturesSection labels={dictionary.features} />
        <QuickSetupSection labels={dictionary.quickSetup} />
        <OperationsWorkflowSection labels={dictionary.operationsWorkflow} />
        <TestimonialsSection labels={dictionary.testimonials} />
        <FinalCtaSection lang={lang} labels={dictionary.finalCta} />
      </main>
      <SiteFooter labels={dictionary.footer} />
    </>
  );
}
