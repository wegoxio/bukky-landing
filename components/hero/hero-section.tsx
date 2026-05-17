import Image from "next/image";

import { ActionButton } from "@/components/ui/action-button";
import type { Locale } from "@/lib/i18n";

import { HeroDashboardCard } from "./hero-dashboard-card";

type HeroLabels = {
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  trustLabel: string;
  dashboard: {
    title: string;
    activeWorkflows: string;
    executions: string;
    successRate: string;
  };
};

type HeroSectionProps = {
  lang: Locale;
  labels: HeroLabels;
};

export function HeroSection({ lang, labels }: HeroSectionProps) {
  const avatars = [
    "/avatars/maria.jpg",
    "/avatars/miguel.jpg",
    "/avatars/angel.webp",
    "/avatars/carlos.webp",
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 sm:pt-34 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_26%_24%,rgba(151,89,239,0.22),transparent_42%),radial-gradient(circle_at_72%_18%,rgba(255,230,51,0.16),transparent_45%),linear-gradient(180deg,#1E1E1E_0%,#17171A_100%)]" />

      <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-10 px-5 sm:gap-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,505px)] lg:gap-10">
        <div className="max-w-[560px]">
          <div className="hero-enter hero-enter-delay-1 inline-flex items-center gap-2 rounded-full border border-white/14 bg-[rgba(255,255,255,0.02)] px-3.5 py-1.5 text-[11px] tracking-[0.02em] text-white/65 sm:px-4 sm:py-2 sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-[#FFE633]" />
            <span>{labels.badge}</span>
          </div>

          <h1 className="hero-enter hero-enter-delay-2 mt-6 text-[36px] font-semibold leading-[1.1] tracking-tight text-white sm:mt-7 sm:text-[48px] lg:text-[61px]">
            {labels.title}
          </h1>

          <p className="hero-enter hero-enter-delay-3 mt-5 max-w-[560px] text-[15px] leading-relaxed text-white/64 sm:mt-7 sm:text-lg lg:text-xl">
            {labels.description}
          </p>

          <div className="hero-enter hero-enter-delay-4 mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
            <ActionButton
              href={`/${lang}#get-started`}
              label={labels.primaryCta}
              variant="primary"
            />
            <ActionButton
              href={`/${lang}#features`}
              label={labels.secondaryCta}
              variant="secondary"
            />
          </div>

          <div className="hero-enter hero-enter-delay-5 mt-8 flex flex-wrap items-center gap-3.5 sm:mt-10 sm:gap-4">
            <div className="flex -space-x-2">
              {avatars.map((avatar, index) => (
                <span
                  key={avatar}
                  className="relative h-7 w-7 overflow-hidden rounded-full border border-[#1E1E1E] sm:h-8 sm:w-8"
                  style={{ zIndex: avatars.length - index }}
                >
                  <Image
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <p className="text-sm text-white/62 sm:text-base">{labels.trustLabel}</p>
          </div>
        </div>

        <HeroDashboardCard labels={labels.dashboard} />
      </div>
    </section>
  );
}
