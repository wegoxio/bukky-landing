"use client";

import { useEffect, useRef, useState } from "react";

type QuickStep = {
  title: string;
  description: string;
};

type QuickSetupLabels = {
  eyebrow: string;
  title: string;
  learnMore: string;
  steps: QuickStep[];
};

type QuickSetupSectionProps = {
  labels: QuickSetupLabels;
};

export function QuickSetupSection({ labels }: QuickSetupSectionProps) {
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/7 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <header
          className="mx-auto max-w-[980px] text-center transition-[opacity,transform,filter] duration-800 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0,0,0)"
              : "translate3d(0,28px,0)",
            filter: isVisible ? "blur(0px)" : "blur(8px)",
          }}
        >
          <p className="text-sm tracking-[0.08em] text-white/42 uppercase">
            {labels.eyebrow}
          </p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[54px]">
            {labels.title}
          </h2>
        </header>

        <div className="relative mt-10 sm:mt-14 lg:mt-16">
          <div
            className={`quick-setup-connectors pointer-events-none absolute inset-x-0 top-0 z-0 ${
              isVisible ? "quick-setup-connectors-visible" : ""
            }`}
          >
            <span
              className="quick-setup-connector quick-setup-connector-1"
              style={{
                left: "calc(16.6667% - 12px)",
                width: "calc(33.3333% + 12px)",
              }}
            />
            <span
              className="quick-setup-connector quick-setup-connector-2"
              style={{ left: "50%", width: "calc(33.3333% + 12px)" }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
            {labels.steps.slice(0, 3).map((step, index) => (
              <article
                key={`${step.title}-${index}`}
                className="group transition-[opacity,transform,filter] duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translate3d(0,0,0) scale(1)"
                    : "translate3d(0,42px,0) scale(0.97)",
                  filter: isVisible ? "blur(0px)" : "blur(6px)",
                  transitionDelay: `${120 + index * 210}ms`,
                }}
              >
                <div className="mb-6 flex justify-center lg:mb-9">
                  <span
                    className={`quick-setup-badge inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] border border-[#9759EF]/45 bg-[rgba(40,28,66,0.96)] text-[34px] font-medium tracking-[0.02em] text-[#FFE633] tabular-nums leading-none transition-[border-color,background-color] duration-300 group-hover:border-[#9759EF]/72 group-hover:bg-[rgba(53,37,86,0.96)] sm:h-16 sm:w-16 sm:rounded-[16px] sm:text-[42px] ${
                      isVisible ? "quick-setup-badge-visible" : ""
                    }`}
                    style={{ animationDelay: `${200 + index * 230}ms` }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-[22px] font-medium leading-[1.14] tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-white sm:text-[28px] lg:text-[34px]">
                  {step.title}
                </h3>
                <p className="mt-3.5 max-w-[560px] text-base leading-relaxed text-white/52 transition-colors duration-300 group-hover:text-white/66 sm:mt-4 sm:text-lg lg:text-xl">
                  {step.description}
                </p>

                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-[#9759EF] transition-colors duration-300 hover:text-[#b98bff] sm:mt-8 sm:text-base lg:text-lg"
                >
                  <span>{labels.learnMore}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

