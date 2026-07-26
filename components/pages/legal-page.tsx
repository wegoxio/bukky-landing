import Link from "next/link";

import { StructuredData, type JsonLd } from "@/components/seo/structured-data";
import type { Locale } from "@/lib/i18n";
import { getLocalizedRoute } from "@/lib/routes";

export type LegalPageLabels = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
  contactCta: {
    title: string;
    description: string;
    label: string;
  };
};

type LegalPageContentProps = {
  lang: Locale;
  labels: LegalPageLabels;
  jsonLd: JsonLd;
};

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path
        d="M4.167 10H15.833M15.833 10L10 4.167M15.833 10L10 15.833"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LegalPageContent({
  lang,
  labels,
  jsonLd,
}: LegalPageContentProps) {
  return (
    <>
      <StructuredData data={jsonLd} />

      <section className="relative overflow-hidden border-b border-white/7 pt-30 pb-14 sm:pt-34 sm:pb-18 lg:pt-38">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(44%_58%_at_20%_22%,rgba(151,89,239,0.22)_0%,rgba(151,89,239,0)_72%),radial-gradient(38%_52%_at_82%_28%,rgba(255,230,51,0.1)_0%,rgba(255,230,51,0)_76%),linear-gradient(180deg,#1E1E1E_0%,#17171A_100%)]" />

        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
          <p className="hero-enter hero-enter-delay-1 text-sm tracking-[0.1em] text-white/42 uppercase">
            {labels.eyebrow}
          </p>
          <h1 className="hero-enter hero-enter-delay-2 mt-5 max-w-[860px] text-[38px] font-semibold leading-[1.06] tracking-tight text-white sm:text-[52px] lg:text-[68px]">
            {labels.title}
          </h1>
          <div className="hero-enter hero-enter-delay-3 mt-6 grid gap-5 lg:grid-cols-[minmax(0,0.86fr)_auto] lg:items-end">
            <p className="max-w-[760px] text-[15px] leading-relaxed text-white/58 sm:text-lg">
              {labels.description}
            </p>
            <p className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-medium text-white/46">
              {labels.updated}
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(42%_60%_at_72%_42%,rgba(151,89,239,0.1)_0%,rgba(151,89,239,0)_74%)]" />
        <div className="mx-auto grid w-full max-w-[1120px] gap-6 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4">
            {labels.sections.map((section) => (
              <article
                key={section.title}
                className="premium-surface rounded-[18px] border border-white/10 bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6"
              >
                <h2 className="text-[22px] font-medium leading-tight text-white sm:text-[26px]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/56 sm:text-[15px]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-[20px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.018)_100%)] p-5 shadow-[0_20px_52px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6 lg:sticky lg:top-28">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#FFE633] uppercase">
              Bukky
            </p>
            <h2 className="mt-3 text-[24px] font-semibold leading-tight text-white">
              {labels.contactCta.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/54">
              {labels.contactCta.description}
            </p>
            <Link
              href={getLocalizedRoute(lang, "contact")}
              className="final-cta-button final-cta-button-primary group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFE633] px-5 py-3 text-sm font-semibold text-[#1E1E1E]"
            >
              <span>{labels.contactCta.label}</span>
              <ArrowRightIcon />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
