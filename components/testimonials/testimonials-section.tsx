"use client";

import { useEffect, useRef, useState } from "react";

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  avatarTone: string;
  rating: number;
};

type TestimonialsLabels = {
  eyebrow: string;
  title: string;
  items: TestimonialItem[];
};

type TestimonialsSectionProps = {
  labels: TestimonialsLabels;
};

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-[#FFE633]"
    >
      <path d="m12 2.7 2.85 5.77 6.37.93-4.61 4.49 1.09 6.34L12 17.28 6.3 20.23l1.1-6.34L2.78 9.4l6.37-.93L12 2.7Z" />
    </svg>
  );
}

function avatarToneClass(tone: string) {
  if (tone === "yellow") {
    return "bg-[#FFE633]";
  }

  if (tone === "gradient") {
    return "bg-[linear-gradient(135deg,#9759EF_0%,#FFE633_100%)]";
  }

  return "bg-[#9759EF]";
}

export function TestimonialsSection({ labels }: TestimonialsSectionProps) {
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
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="customers"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/7 pt-20 pb-12 sm:pt-24 sm:pb-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_62%_at_21%_30%,rgba(151,89,239,0.12)_0%,rgba(151,89,239,0)_78%),radial-gradient(40%_60%_at_82%_42%,rgba(255,230,51,0.06)_0%,rgba(255,230,51,0)_78%)]" />

      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <header
          className="text-center transition-[opacity,transform,filter] duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0,0,0)"
              : "translate3d(0,24px,0)",
            filter: isVisible ? "blur(0px)" : "blur(6px)",
          }}
        >
          <p className="text-sm tracking-[0.08em] text-white/42 uppercase">
            {labels.eyebrow}
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[58px]">
            {labels.title}
          </h2>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {labels.items.slice(0, 3).map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="testimonial-card group rounded-[18px] border border-white/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.016)_56%,rgba(255,255,255,0.008)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/18 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_34px_rgba(0,0,0,0.28)] sm:p-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? undefined
                  : "translate3d(0,28px,0)",
                filter: isVisible ? undefined : "blur(5px)",
                transitionDelay: `${120 + index * 100}ms`,
              }}
            >
              <div className="flex items-center gap-1.5" aria-label={`${item.rating} stars`}>
                {Array.from({ length: Math.max(1, Math.min(5, item.rating)) }).map(
                  (_, starIndex) => (
                    <StarIcon key={starIndex} />
                  ),
                )}
              </div>

              <p className="mt-4 min-h-[98px] text-[15px] leading-relaxed text-white/72 sm:mt-5 sm:min-h-[104px] sm:text-[17px]">
                {item.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 sm:mt-7">
                <span
                  aria-hidden="true"
                  className={`h-9 w-9 rounded-full sm:h-10 sm:w-10 ${avatarToneClass(item.avatarTone)}`}
                />
                <div>
                  <p className="text-[17px] leading-tight text-white/92 sm:text-[20px]">{item.name}</p>
                  <p className="mt-1 text-xs leading-tight text-white/34 sm:text-sm">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
