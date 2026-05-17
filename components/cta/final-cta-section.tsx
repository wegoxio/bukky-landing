"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type FinalCtaLabels = {
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  note: string;
};

type FinalCtaSectionProps = {
  lang: string;
  labels: FinalCtaLabels;
};

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

export function FinalCtaSection({ lang, labels }: FinalCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="get-started"
      ref={sectionRef}
      className="relative overflow-hidden pt-8 pb-20 sm:pt-12 sm:pb-28"
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <article
          className="relative overflow-hidden rounded-[20px] border border-[#9759EF]/36 bg-[linear-gradient(160deg,rgba(42,36,57,0.95)_0%,rgba(34,30,49,0.95)_46%,rgba(24,22,35,0.98)_100%)] px-5 py-12 text-center shadow-[0_26px_58px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.05)] sm:rounded-[24px] sm:px-8 sm:py-14 lg:px-10 lg:py-18"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0,0,0) scale(1)"
              : "translate3d(0,30px,0) scale(0.985)",
            filter: isVisible ? "blur(0px)" : "blur(8px)",
            transition:
              "opacity 780ms cubic-bezier(0.22,1,0.36,1), transform 780ms cubic-bezier(0.22,1,0.36,1), filter 780ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_72%_at_30%_30%,rgba(151,89,239,0.25)_0%,rgba(151,89,239,0)_70%),radial-gradient(45%_62%_at_68%_64%,rgba(255,230,51,0.12)_0%,rgba(255,230,51,0)_76%)]" />
          <div className="relative mx-auto max-w-[760px]">
            <h2 className="text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[60px]">
              {labels.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[650px] text-[15px] leading-relaxed text-white/56 sm:mt-5 sm:text-lg lg:text-[20px]">
              {labels.description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <Link
                href={`/${lang}#get-started`}
                className="final-cta-button final-cta-button-primary group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFE633] px-5 py-2.5 text-[15px] font-semibold text-[#1E1E1E] sm:w-auto sm:px-6 sm:py-3 sm:text-base"
              >
                <span>{labels.primaryCta}</span>
                <ArrowRightIcon />
              </Link>
              <Link
                href={`/${lang}#contact`}
                className="final-cta-button final-cta-button-secondary inline-flex w-full items-center justify-center rounded-xl border border-[#9759EF] bg-[rgba(151,89,239,0.08)] px-5 py-2.5 text-[15px] font-medium text-white/90 hover:border-[#b98bff] hover:bg-[rgba(151,89,239,0.16)] hover:text-white sm:w-auto sm:px-8 sm:py-3 sm:text-base"
              >
                {labels.secondaryCta}
              </Link>
            </div>

            <p className="mt-7 text-xs text-white/34 sm:mt-8 sm:text-sm">{labels.note}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
