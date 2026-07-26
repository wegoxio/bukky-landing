"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type FooterLink = {
  label: string;
  href: string;
  icon?: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type FooterLabels = {
  description: string;
  columns: FooterColumn[];
  legalLinks: FooterLink[];
  copyright: string;
  tagline: string;
};

type SiteFooterProps = {
  labels: FooterLabels;
};

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function FooterIcon({ name }: { name: string }) {
  if (name === "instagram") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.6" cy="6.4" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 11.8a8 8 0 0 1-11.9 7L4 20l1.3-3.8A8 8 0 1 1 20 11.8Z" />
        <path d="M9 8.8c.1-.2.3-.3.6-.3h.4c.2 0 .4.2.5.5l.6 1.5a.8.8 0 0 1-.2.8l-.5.6c.6 1.2 1.5 2.1 2.7 2.7l.6-.5a.8.8 0 0 1 .8-.2l1.5.6c.3.1.5.3.5.5v.4c0 .3-.1.5-.3.6-.5.4-1.3.6-2 .4-2.9-.8-5.2-3.1-6-6-.2-.7 0-1.5.4-2Z" />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4.5 7.5 7.5 5.7 7.5-5.7" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SiteFooter({ labels }: SiteFooterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/7 pt-12 pb-8 sm:pt-14 sm:pb-9 lg:pt-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(42%_70%_at_18%_38%,rgba(151,89,239,0.13)_0%,rgba(151,89,239,0)_72%),radial-gradient(34%_60%_at_82%_62%,rgba(255,230,51,0.06)_0%,rgba(255,230,51,0)_78%)]" />

      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div
          className="grid gap-8 sm:gap-10 md:grid-cols-[minmax(0,1.45fr)_minmax(150px,0.5fr)_minmax(190px,0.62fr)] md:items-start lg:gap-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0,0,0)"
              : "translate3d(0,28px,0)",
            filter: isVisible ? "blur(0px)" : "blur(6px)",
            transition:
              "opacity 760ms cubic-bezier(0.22,1,0.36,1), transform 760ms cubic-bezier(0.22,1,0.36,1), filter 760ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div>
            <Image
              src="/bukky_logo_completo.svg"
              alt="Bukky"
              width={214}
              height={50}
              className="h-auto w-[160px] sm:w-[190px] lg:w-[214px]"
            />

            <p className="mt-5 max-w-[390px] text-sm leading-relaxed text-white/52 sm:text-[15px]">
              {labels.description}
            </p>
          </div>

          {labels.columns.map((column, index) => {
            const isIconOnlyColumn = column.links.every((link) => link.icon);

            return (
              <div
                key={column.title}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translate3d(0,0,0)"
                    : "translate3d(0,18px,0)",
                  transition:
                    "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: `${220 + index * 100}ms`,
                }}
              >
                <h3 className="text-sm font-medium text-white/88 sm:text-[15px]">{column.title}</h3>

                <ul className={isIconOnlyColumn ? "mt-4 flex items-center gap-2.5" : "mt-4 space-y-3"}>
                  {column.links.map((link) => {
                    const external = isExternalLink(link.href);

                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noreferrer" : undefined}
                          aria-label={isIconOnlyColumn ? link.label : undefined}
                          className={
                            isIconOnlyColumn
                              ? "group inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.025] text-white/62 transition-[transform,border-color,color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#9759EF]/60 hover:bg-[rgba(151,89,239,0.12)] hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.32)]"
                              : "group inline-flex items-center gap-2.5 text-sm leading-relaxed text-white/46 transition-colors duration-200 hover:text-white/82"
                          }
                        >
                          {link.icon ? (
                            <FooterIcon name={link.icon} />
                          ) : null}
                          <span className={isIconOnlyColumn ? "sr-only" : undefined}>{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-9 h-px bg-white/8 sm:mt-10" />

        <div
          className="mt-5 flex flex-col gap-3 text-xs text-white/36 sm:flex-row sm:items-center sm:justify-between sm:text-sm"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0,0,0)"
              : "translate3d(0,12px,0)",
            transition:
              "opacity 680ms cubic-bezier(0.22,1,0.36,1) 280ms, transform 680ms cubic-bezier(0.22,1,0.36,1) 280ms",
          }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>{labels.copyright}</p>
            {labels.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-white/78"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p>{labels.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
