import Link from "next/link";

import {
  ContactForm,
  type ContactFormLabels,
} from "@/components/contact/contact-form";
import {
  MouseGlowArticle,
  MouseGlowLink,
  PricingFaq,
  UpcomingRoadmap,
} from "@/components/pages/interactive-page-elements";
import { StructuredData, type JsonLd } from "@/components/seo/structured-data";
import type { Locale } from "@/lib/i18n";
import { getLocalizedRoute } from "@/lib/routes";

type SeoLabels = {
  title: string;
  description: string;
  keywords: string[];
};

type MetricItem = {
  value: string;
  label: string;
};

type FeaturePillar = {
  title: string;
  description: string;
  icon: string;
  points: string[];
};

type FeaturesPageLabels = {
  seo: SeoLabels;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  metrics: MetricItem[];
  pillars: FeaturePillar[];
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    steps: string[];
  };
};

type PricingPageLabels = {
  seo: SeoLabels;
  eyebrow: string;
  title: string;
  description: string;
  plan: {
    eyebrow: string;
    name: string;
    price: string;
    period: string;
    description: string;
    cta: string;
    note: string;
    includedTitle: string;
    features: string[];
  };
  included: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  upcoming: {
    eyebrow: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
};

type ContactPageLabels = {
  seo: SeoLabels;
  eyebrow: string;
  title: string;
  description: string;
  channelsTitle: string;
  channels: Array<{
    label: string;
    description: string;
    href: string;
    icon: string;
  }>;
  brief: {
    title: string;
    items: string[];
  };
  response: {
    title: string;
    items: string[];
  };
  form: ContactFormLabels;
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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="m4.5 10.3 3.4 3.4 7.6-8.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PageIcon({ name }: { name: string }) {
  if (name === "calendar") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3.5v4M16 3.5v4M4.5 10h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7.5v5l3.4 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "users" || name === "team") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M8.8 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM15.8 10.2a2.7 2.7 0 1 0 0-5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3.7 19.2c.7-3.1 2.6-5 5.1-5s4.4 1.9 5.1 5M14.8 14.4c2.2.3 3.7 1.9 4.3 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "bell") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M18 10.2a6 6 0 0 0-12 0c0 4-1.6 5.3-2.2 6.1-.3.4 0 .9.5.9h15.4c.5 0 .8-.5.5-.9-.6-.8-2.2-2.1-2.2-6.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.8 20a2.4 2.4 0 0 0 4.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M4 19h16M7 16V9M12 16V5M17 16v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M20 11.8a8 8 0 0 1-11.9 7L4 20l1.3-3.8A8 8 0 1 1 20 11.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8.8c.1-.2.3-.3.6-.3h.4c.2 0 .4.2.5.5l.6 1.5a.8.8 0 0 1-.2.8l-.5.6c.6 1.2 1.5 2.1 2.7 2.7l.6-.5a.8.8 0 0 1 .8-.2l1.5.6c.3.1.5.3.5.5v.4c0 .3-.1.5-.3.6-.5.4-1.3.6-2 .4-2.9-.8-5.2-3.1-6-6-.2-.7 0-1.5.4-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.6" cy="6.4" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4.5 7.5 7.5 5.7 7.5-5.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M13 3 5 13h6l-1 8 9-12h-6l1-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="final-cta-button final-cta-button-primary group inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFE633] px-5 py-2.5 text-[15px] font-semibold text-[#1E1E1E] sm:px-6 sm:py-3 sm:text-base"
    >
      <span>{children}</span>
      <ArrowRightIcon />
    </Link>
  );
}

function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="final-cta-button final-cta-button-secondary inline-flex items-center justify-center rounded-xl border border-white/14 bg-white/[0.035] px-5 py-2.5 text-[15px] font-semibold text-white/82 hover:border-[#9759EF]/48 hover:bg-white/[0.06] hover:text-white sm:px-6 sm:py-3 sm:text-base"
    >
      {children}
    </Link>
  );
}

export function FeaturesPageContent({
  lang,
  labels,
  jsonLd,
}: {
  lang: Locale;
  labels: FeaturesPageLabels;
  jsonLd: JsonLd;
}) {
  return (
    <>
      <StructuredData data={jsonLd} />

      <section className="relative overflow-hidden border-b border-white/7 pt-30 pb-16 sm:pt-34 sm:pb-20 lg:pt-38">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_18%_20%,rgba(151,89,239,0.22)_0%,rgba(151,89,239,0)_72%),radial-gradient(42%_58%_at_82%_22%,rgba(255,230,51,0.1)_0%,rgba(255,230,51,0)_76%),linear-gradient(180deg,#1E1E1E_0%,#17171A_100%)]" />

        <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(330px,0.72fr)]">
          <div>
            <p className="hero-enter hero-enter-delay-1 text-sm tracking-[0.08em] text-white/42 uppercase">
              {labels.eyebrow}
            </p>
            <h1 className="hero-enter hero-enter-delay-2 mt-5 max-w-[760px] text-[38px] font-semibold leading-[1.06] tracking-tight text-white sm:text-[52px] lg:text-[68px]">
              {labels.title}
            </h1>
            <p className="hero-enter hero-enter-delay-3 mt-5 max-w-[660px] text-[15px] leading-relaxed text-white/58 sm:text-lg">
              {labels.description}
            </p>

            <div className="hero-enter hero-enter-delay-4 mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <PrimaryLink href={getLocalizedRoute(lang, "contact")}>{labels.primaryCta}</PrimaryLink>
              <SecondaryLink href={getLocalizedRoute(lang, "pricing")}>{labels.secondaryCta}</SecondaryLink>
            </div>
          </div>

          <aside className="premium-surface hero-enter hero-enter-right rounded-[22px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.022)_55%,rgba(255,255,255,0.012)_100%)] p-5 shadow-[0_24px_54px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
              <span className="text-sm text-white/48">Bukky OS</span>
              <span className="rounded-full border border-[#FFE633]/28 bg-[#FFE633]/10 px-3 py-1 text-xs font-medium text-[#FFE633]">
                Live
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {labels.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[14px] border border-white/8 bg-black/14 p-4"
                >
                  <p className="text-[28px] font-semibold leading-none text-white">{metric.value}</p>
                  <p className="mt-2 text-sm text-white/46">{metric.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden py-18 sm:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {labels.pillars.map((item, index) => (
              <MouseGlowArticle
                key={item.title}
                className="feature-card group rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.018)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[transform,border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_52px_rgba(0,0,0,0.32)] sm:p-6"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className="feature-icon inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#9759EF_0%,#FFE633_100%)] text-[#171717] shadow-[0_14px_26px_rgba(0,0,0,0.28)]">
                  <PageIcon name={item.icon} />
                </span>
                <h2 className="mt-5 text-[23px] font-medium leading-tight text-white">{item.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/54">{item.description}</p>
                <ul className="mt-5 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-white/58">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFE633]/12 text-[#FFE633]">
                        <CheckIcon />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </MouseGlowArticle>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/7 py-18 sm:py-22">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(46%_70%_at_50%_30%,rgba(51,200,255,0.08)_0%,rgba(51,200,255,0)_76%)]" />
        <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 sm:px-6 lg:grid-cols-[0.92fr_1fr] lg:items-center">
          <div>
            <p className="text-sm tracking-[0.08em] text-white/42 uppercase">{labels.workflow.eyebrow}</p>
            <h2 className="mt-4 max-w-[620px] text-[32px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[44px]">
              {labels.workflow.title}
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-white/54 sm:text-lg">
              {labels.workflow.description}
            </p>
          </div>

          <ol className="grid gap-3">
            {labels.workflow.steps.map((step, index) => (
              <li
                key={step}
                className="premium-surface flex items-center gap-4 rounded-[16px] border border-white/10 bg-white/[0.025] p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#9759EF] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-white/68">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

export function PricingPageContent({
  lang,
  labels,
  jsonLd,
}: {
  lang: Locale;
  labels: PricingPageLabels;
  jsonLd: JsonLd;
}) {
  return (
    <>
      <StructuredData data={jsonLd} />

      <section className="relative overflow-hidden border-b border-white/7 pt-30 pb-16 sm:pt-34 sm:pb-20 lg:pt-38">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(48%_58%_at_18%_24%,rgba(151,89,239,0.24)_0%,rgba(151,89,239,0)_74%),radial-gradient(42%_60%_at_80%_28%,rgba(255,230,51,0.12)_0%,rgba(255,230,51,0)_76%),linear-gradient(180deg,#1E1E1E_0%,#17171A_100%)]" />

        <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.78fr)]">
          <div>
            <p className="hero-enter hero-enter-delay-1 text-sm tracking-[0.08em] text-white/42 uppercase">
              {labels.eyebrow}
            </p>
            <h1 className="hero-enter hero-enter-delay-2 mt-5 max-w-[760px] text-[38px] font-semibold leading-[1.06] tracking-tight text-white sm:text-[52px] lg:text-[68px]">
              {labels.title}
            </h1>
            <p className="hero-enter hero-enter-delay-3 mt-5 max-w-[640px] text-[15px] leading-relaxed text-white/58 sm:text-lg">
              {labels.description}
            </p>
          </div>

          <article className="pricing-plan-card hero-enter hero-enter-right rounded-[24px] p-5 shadow-[0_28px_64px_rgba(0,0,0,0.38)] sm:p-6">
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.12em] text-[#FFE633] uppercase">
                {labels.plan.eyebrow}
              </p>
              <h2 className="mt-3 text-[30px] font-semibold leading-tight text-white sm:text-[36px]">
                {labels.plan.name}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/56">{labels.plan.description}</p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-[58px] font-semibold leading-none tracking-tight text-white sm:text-[68px]">
                  {labels.plan.price}
                </span>
                <span className="pb-2 text-base text-white/46">{labels.plan.period}</span>
              </div>

              <ul className="mt-6 grid gap-3">
                {labels.plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-white/68">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFE633]/12 text-[#FFE633]">
                      <CheckIcon />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <PrimaryLink href={getLocalizedRoute(lang, "contact")}>{labels.plan.cta}</PrimaryLink>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/38">{labels.plan.note}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden py-18 sm:py-24">
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
          <h2 className="max-w-[680px] text-[32px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[44px]">
            {labels.included.title}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {labels.included.items.map((item, index) => (
              <MouseGlowArticle
                key={item.title}
                className="feature-card group rounded-[18px] border border-white/10 bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[transform,border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_52px_rgba(0,0,0,0.3)] sm:p-6"
                style={{ animationDelay: `${index * 65}ms` }}
              >
                <span className="feature-icon inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE633] text-[#171717]">
                  <CheckIcon />
                </span>
                <h3 className="mt-5 text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/52">{item.description}</p>
              </MouseGlowArticle>
            ))}
          </div>
        </div>
      </section>

      <UpcomingRoadmap labels={labels.upcoming} />

      <PricingFaq labels={labels.faq} />
    </>
  );
}

export function ContactPageContent({
  lang,
  labels,
  jsonLd,
}: {
  lang: Locale;
  labels: ContactPageLabels;
  jsonLd: JsonLd;
}) {
  return (
    <>
      <StructuredData data={jsonLd} />

      <section className="relative overflow-hidden border-b border-white/7 pt-30 pb-16 sm:pt-34 sm:pb-20 lg:pt-38">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(44%_58%_at_20%_22%,rgba(151,89,239,0.24)_0%,rgba(151,89,239,0)_72%),radial-gradient(42%_58%_at_80%_34%,rgba(255,230,51,0.1)_0%,rgba(255,230,51,0)_76%),linear-gradient(180deg,#1E1E1E_0%,#17171A_100%)]" />

        <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.78fr)] lg:items-center">
          <div>
            <p className="hero-enter hero-enter-delay-1 text-sm tracking-[0.08em] text-white/42 uppercase">
              {labels.eyebrow}
            </p>
            <h1 className="hero-enter hero-enter-delay-2 mt-5 max-w-[760px] text-[38px] font-semibold leading-[1.06] tracking-tight text-white sm:text-[52px] lg:text-[68px]">
              {labels.title}
            </h1>
            <p className="hero-enter hero-enter-delay-3 mt-5 max-w-[660px] text-[15px] leading-relaxed text-white/58 sm:text-lg">
              {labels.description}
            </p>
          </div>

          <aside className="premium-surface hero-enter hero-enter-right rounded-[22px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.022)_100%)] p-5 shadow-[0_24px_54px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6">
            <h2 className="text-xl font-medium text-white">{labels.channelsTitle}</h2>
            <div className="mt-5 grid gap-3">
              {labels.channels.map((channel) => {
                const external = channel.href.startsWith("http") || channel.href.startsWith("mailto:");

                return (
                  <MouseGlowLink
                    key={channel.label}
                    href={channel.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="feature-card group flex items-center gap-4 rounded-[16px] border border-white/10 bg-black/12 p-4 transition-[transform,border-color,background-color,box-shadow] duration-500 hover:border-[#9759EF]/48 hover:bg-white/[0.04] hover:shadow-[0_18px_42px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9759EF]/16 text-[#D6B8FF] transition-colors group-hover:text-white">
                      <PageIcon name={channel.icon} />
                    </span>
                    <span>
                      <span className="block text-base font-medium text-white">{channel.label}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-white/48">{channel.description}</span>
                      </span>
                  </MouseGlowLink>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section
        id="contact-form"
        className="relative overflow-hidden border-b border-white/7 py-18 sm:py-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(42%_62%_at_20%_35%,rgba(151,89,239,0.14)_0%,rgba(151,89,239,0)_74%),radial-gradient(40%_58%_at_82%_54%,rgba(255,230,51,0.08)_0%,rgba(255,230,51,0)_78%)]" />
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
          <ContactForm labels={labels.form} locale={lang} />
        </div>
      </section>

      <section className="relative overflow-hidden py-18 sm:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] gap-5 px-5 sm:px-6 lg:grid-cols-2">
          {[labels.brief, labels.response].map((block) => (
            <MouseGlowArticle
              key={block.title}
              className="feature-card group rounded-[20px] border border-white/10 bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[transform,border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_52px_rgba(0,0,0,0.3)] sm:p-6 lg:p-7"
            >
              <h2 className="text-[26px] font-semibold leading-tight text-white sm:text-[32px]">{block.title}</h2>
              <ul className="mt-6 grid gap-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/58">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFE633]/12 text-[#FFE633]">
                      <CheckIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </MouseGlowArticle>
          ))}
        </div>
      </section>
    </>
  );
}
