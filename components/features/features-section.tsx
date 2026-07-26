"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type FeatureItem = {
  title: string;
  description: string;
};

type FeaturesLabels = {
  eyebrow: string;
  title: string;
  description: string;
  items: FeatureItem[];
};

type FeaturesSectionProps = {
  labels: FeaturesLabels;
};

const iconToneClasses = [
  "bg-[#FFE633] text-[#171717]",
  "bg-[#9759EF] text-white",
  "bg-[linear-gradient(135deg,#9759EF_0%,#FFE633_100%)] text-[#171717]",
  "bg-[linear-gradient(135deg,#FFE633_0%,#9759EF_100%)] text-[#171717]",
  "bg-[#9759EF] text-white",
  "bg-[#FFE633] text-[#171717]",
] as const;

function FeatureIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 3 5 13h6l-1 8 9-12h-6l1-6Z" />
        </svg>
      );
    case 1:
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="4.5" height="4.5" rx="1" />
          <path d="M10.5 7h3M15.8 8v5.5M10.5 10.5l3 3" />
        </svg>
      );
    case 2:
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 8a3 3 0 1 0 0 8M15 8a3 3 0 1 1 0 8" />
          <path d="M9 8V6M15 8V6M9 16v2M15 16v2M12 9v6M8 12h8" />
        </svg>
      );
    case 3:
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="8" width="18" height="12" rx="2.5" />
          <path d="M8 8V6a4 4 0 0 1 8 0v2" />
        </svg>
      );
    case 4:
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 7l-2 10" />
        </svg>
      );
    default:
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20h16M7 17V9M12 17V5M17 17v-7" />
        </svg>
      );
  }
}

export function FeaturesSection({ labels }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleCardPointerMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--feature-cursor-x", `${x}px`);
    card.style.setProperty("--feature-cursor-y", `${y}px`);
  };

  const handleCardPointerLeave = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--feature-cursor-x", "50%");
    card.style.setProperty("--feature-cursor-y", "50%");
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rafId = window.requestAnimationFrame(() => setIsVisible(true));

      return () => window.cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.22, rootMargin: "0px 0px -12% 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div
          className="mx-auto max-w-[940px] text-center transition-[opacity,transform,filter] duration-800 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0,0,0) scale(1)"
              : "translate3d(0,30px,0) scale(0.985)",
            filter: isVisible ? "blur(0px)" : "blur(8px)",
          }}
        >
          <p className="text-sm tracking-[0.08em] text-white/42 uppercase">
            {labels.eyebrow}
          </p>
          <h2 className="mt-5 text-[34px] font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[66px]">
            {labels.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[860px] text-[15px] leading-relaxed text-white/44 sm:mt-5 sm:text-lg">
            {labels.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:mt-14 lg:gap-6">
          {labels.items.slice(0, 6).map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="feature-card group rounded-[18px] border border-white/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.018)_45%,rgba(255,255,255,0.01)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[opacity,transform,border-color,box-shadow] duration-700 ease-out hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_52px_rgba(0,0,0,0.32)] sm:rounded-[20px] sm:p-6 lg:p-7"
              onMouseMove={handleCardPointerMove}
              onMouseLeave={handleCardPointerLeave}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? undefined
                  : `translate3d(0,${36 + (index % 3) * 4}px,0) scale(0.985)`,
                filter: isVisible ? undefined : "blur(6px)",
                transitionDelay: `${120 + index * 95}ms`,
              }}
            >
              <span
                className={`feature-icon inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-[0_12px_26px_rgba(0,0,0,0.25)] sm:h-11 sm:w-11 ${
                  iconToneClasses[index] ?? iconToneClasses[0]
                }`}
              >
                <FeatureIcon index={index} />
              </span>

              <h3 className="mt-5 text-[22px] font-medium leading-[1.14] tracking-[-0.02em] text-white sm:mt-6 sm:text-[26px] lg:text-[30px]">
                {item.title}
              </h3>
              <p className="mt-3.5 text-base leading-relaxed text-white/52 sm:mt-4 sm:text-lg">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
