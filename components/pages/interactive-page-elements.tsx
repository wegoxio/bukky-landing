"use client";

import Link from "next/link";
import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

type MouseGlowProps = {
  children: ReactNode;
  className: string;
  style?: CSSProperties;
};

type MouseGlowLinkProps = MouseGlowProps & {
  href: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

type UpcomingLabels = {
  eyebrow: string;
  title: string;
  items: Array<{
    title: string;
    description: string;
  }>;
};

type FaqLabels = {
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

const upcomingIcons = ["team", "support", "location"] as const;

function setCardCursor(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();

  card.style.setProperty("--feature-cursor-x", `${event.clientX - rect.left}px`);
  card.style.setProperty("--feature-cursor-y", `${event.clientY - rect.top}px`);
}

function resetCardCursor(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;

  card.style.setProperty("--feature-cursor-x", "50%");
  card.style.setProperty("--feature-cursor-y", "50%");
}

function UpcomingIcon({ name }: { name: (typeof upcomingIcons)[number] }) {
  if (name === "support") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M5 12a7 7 0 0 1 14 0v3.2a2.8 2.8 0 0 1-2.8 2.8H14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 12v2.5a2 2 0 0 0 2 2h1v-6H7a2 2 0 0 0-2 2ZM19 12v2.5a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 18h3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "location") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="10"
          r="2.2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M8.8 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM15.8 10.2a2.7 2.7 0 1 0 0-5.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M3.7 19.2c.7-3.1 2.6-5 5.1-5s4.4 1.9 5.1 5M14.8 14.4c2.2.3 3.7 1.9 4.3 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`h-5 w-5 transition-transform duration-300 ${
        isOpen ? "rotate-45" : ""
      }`}
    >
      <path
        d="M10 4.5v11M4.5 10h11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MouseGlowArticle({
  children,
  className,
  style,
}: MouseGlowProps) {
  return (
    <article
      className={className}
      onMouseMove={setCardCursor}
      onMouseLeave={resetCardCursor}
      style={style}
    >
      {children}
    </article>
  );
}

export function MouseGlowLink({
  children,
  className,
  href,
  ariaLabel,
  target,
  rel,
}: MouseGlowLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={setCardCursor}
      onMouseLeave={resetCardCursor}
    >
      {children}
    </Link>
  );
}

export function UpcomingRoadmap({ labels }: { labels: UpcomingLabels }) {
  return (
    <section className="relative overflow-hidden border-y border-white/7 py-18 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(42%_58%_at_28%_36%,rgba(72,229,160,0.1)_0%,rgba(72,229,160,0)_74%),radial-gradient(42%_60%_at_72%_50%,rgba(151,89,239,0.12)_0%,rgba(151,89,239,0)_78%)]" />

      <div className="mx-auto w-full max-w-[1120px] px-5 text-center sm:px-6">
        <p className="text-sm tracking-[0.1em] text-white/42 uppercase">
          {labels.eyebrow}
        </p>
        <div className="mx-auto mt-5 max-w-[1020px] text-[48px] font-semibold leading-none tracking-normal text-white/8 sm:text-[82px] lg:text-[112px]">
          {labels.eyebrow}
        </div>
        <h2 className="mx-auto -mt-3 max-w-[820px] text-[30px] font-semibold leading-[1.08] tracking-tight text-white sm:-mt-5 sm:text-[42px] lg:text-[50px]">
          {labels.title}
        </h2>

        <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
          {labels.items.map((item, index) => (
            <MouseGlowArticle
              key={item.title}
              className="feature-card group rounded-[18px] border border-dashed border-white/16 bg-[linear-gradient(145deg,rgba(255,255,255,0.036)_0%,rgba(255,255,255,0.016)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[transform,border-color,box-shadow] duration-500 hover:border-[#48E5A0]/36 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_52px_rgba(0,0,0,0.3)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="feature-icon inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#48E5A0_0%,#FFE633_100%)] text-[#111116] shadow-[0_14px_26px_rgba(0,0,0,0.28)]">
                  <UpcomingIcon
                    name={upcomingIcons[index] ?? upcomingIcons[0]}
                  />
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-white/42 uppercase">
                  {labels.eyebrow}
                </span>
              </div>
              <h3 className="mt-6 text-[22px] font-medium leading-tight text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/52">
                {item.description}
              </p>
            </MouseGlowArticle>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingFaq({ labels }: { labels: FaqLabels }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden py-18 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(42%_58%_at_82%_24%,rgba(255,230,51,0.07)_0%,rgba(255,230,51,0)_75%)]" />
      <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 sm:px-6 lg:grid-cols-[0.42fr_1fr]">
        <div>
          <p className="text-sm tracking-[0.1em] text-white/38 uppercase">
            FAQ
          </p>
          <h2 className="mt-4 text-[34px] font-semibold leading-tight text-white sm:text-[46px]">
            {labels.title}
          </h2>
        </div>

        <div className="grid gap-3">
          {labels.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <MouseGlowArticle
                key={item.question}
                className={`feature-card rounded-[18px] border p-0 transition-[transform,border-color,box-shadow,background-color] duration-500 ${
                  isOpen
                    ? "border-[#9759EF]/55 bg-[linear-gradient(145deg,rgba(151,89,239,0.12)_0%,rgba(255,230,51,0.035)_100%)] shadow-[0_20px_54px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "border-white/10 bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-center justify-between gap-5 rounded-[18px] px-5 py-5 text-left sm:px-6"
                >
                  <span
                    className={`text-[17px] font-medium leading-snug transition-colors duration-300 sm:text-xl ${
                      isOpen ? "text-white" : "text-white/86"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-[border-color,background-color,color,box-shadow] duration-300 ${
                      isOpen
                        ? "border-[#FFE633]/32 bg-[#FFE633] text-[#171717] shadow-[0_12px_28px_rgba(255,230,51,0.18)]"
                        : "border-white/10 bg-black/16 text-white/58 group-hover:border-[#9759EF]/42 group-hover:text-white"
                    }`}
                  >
                    <PlusIcon isOpen={isOpen} />
                  </span>
                </button>

                <div
                  className={`grid px-5 transition-[grid-template-rows,opacity] duration-400 ease-out sm:px-6 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-white/8 pt-0 pb-5 text-sm leading-relaxed text-white/58 sm:pb-6 sm:text-[15px]">
                      <span className="block pt-4">{item.answer}</span>
                    </p>
                  </div>
                </div>
              </MouseGlowArticle>
            );
          })}
        </div>
      </div>
    </section>
  );
}
