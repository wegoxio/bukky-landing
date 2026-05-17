"use client";

import { useEffect, useRef, useState } from "react";

type HighlightItem = {
  title: string;
  subtitle: string;
};

type HeroHighlightsLabels = {
  items: HighlightItem[];
  eyebrow: string;
  statement: string;
};

type HeroHighlightsStripProps = {
  labels: HeroHighlightsLabels;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export function HeroHighlightsStrip({ labels }: HeroHighlightsStripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let rafId: number | null = null;

    const updateProgress = () => {
      const element = sectionRef.current;

      if (!element) {
        rafId = null;
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.92;
      const end = -rect.height * 0.3;
      const raw = (start - rect.top) / (start - end);
      const nextProgress = clamp(raw, 0, 1);

      setProgress((prev) =>
        Math.abs(prev - nextProgress) > 0.008 ? nextProgress : prev,
      );

      rafId = null;
    };

    const requestProgressUpdate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    requestProgressUpdate();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
    };
  }, []);

  const sectionReveal = easeOutCubic(progress);
  const eyebrowReveal = clamp((sectionReveal - 0.24) / 0.72, 0, 1);
  const statementReveal = clamp((sectionReveal - 0.34) / 0.66, 0, 1);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/10 py-14 sm:py-18 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(180deg,rgba(23,23,26,0.1)_0%,rgba(23,23,26,0)_32%,rgba(23,23,26,0)_100%)]" />

      <div className="relative mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-8 border-t border-white/9 pt-10 text-center sm:grid-cols-3 sm:gap-6 sm:pt-14">
          {labels.items.map((item, index) => {
            const itemReveal = easeOutCubic(
              clamp((sectionReveal - index * 0.13) / 0.72, 0, 1),
            );

            return (
              <div
                key={`${item.title}-${index}`}
                className="transition-[opacity,transform] duration-500 ease-out"
                style={{
                  opacity: 0.22 + itemReveal * 0.78,
                  transform: `translate3d(0, ${(1 - itemReveal) * 28}px, 0)`,
                }}
              >
                <p className="text-[36px] font-medium leading-tight tracking-[-0.02em] text-white sm:text-[46px] lg:text-[56px]">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[18px] leading-tight text-white/48 sm:mt-2 sm:text-[23px] lg:text-[31px]">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center sm:mt-14">
          <p
            className="text-xs tracking-[0.08em] text-white uppercase transition-[opacity,transform] duration-500 ease-out sm:text-sm"
            style={{
              opacity: 0.18 + eyebrowReveal * 0.54,
              transform: `translate3d(0, ${(1 - eyebrowReveal) * 14}px, 0)`,
            }}
          >
            {labels.eyebrow}
          </p>
          <p
            className="mx-auto mt-4 max-w-[940px] text-[26px] leading-[1.3] text-white transition-[opacity,transform] duration-500 ease-out sm:text-[34px] lg:text-[43px]"
            style={{
              opacity: 0.2 + statementReveal * 0.7,
              transform: `translate3d(0, ${(1 - statementReveal) * 18}px, 0)`,
            }}
          >
            {labels.statement}
          </p>
        </div>
      </div>
    </section>
  );
}
