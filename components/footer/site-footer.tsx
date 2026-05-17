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

type FooterSocialLink = {
  label: string;
  href: string;
  icon: string;
};

type FooterLabels = {
  description: string;
  socialLinks: FooterSocialLink[];
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

  if (name === "github") {
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
        <path d="M9 18.2c-3.6 1.1-3.6-2.2-5-2.8M14 20v-2.8a2.4 2.4 0 0 0-.7-1.8c2.7-.3 5.5-1.3 5.5-5.9a4.5 4.5 0 0 0-1.2-3.1 4.1 4.1 0 0 0-.1-3s-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C6.3 3.1 5.3 3.4 5.3 3.4a4.1 4.1 0 0 0-.1 3A4.5 4.5 0 0 0 4 9.5c0 4.6 2.8 5.6 5.5 5.9a2.4 2.4 0 0 0-.7 1.8V20" />
      </svg>
    );
  }

  if (name === "linkedin") {
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
        <path d="M16 8a5 5 0 0 1 5 5v6h-4v-6a1 1 0 0 0-2 0v6h-4v-11h4v1.6A4.4 4.4 0 0 1 16 8Z" />
        <path d="M7 9H3v10h4V9ZM5 5.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Z" />
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
      className="relative overflow-hidden border-t border-white/7 pt-18 pb-10 sm:pt-24 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_18%_38%,rgba(151,89,239,0.16)_0%,rgba(151,89,239,0)_72%),radial-gradient(45%_65%_at_82%_62%,rgba(255,230,51,0.08)_0%,rgba(255,230,51,0)_78%)]" />

      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div
          className="grid gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,0.82fr))] lg:gap-10"
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
            <p className="max-w-[440px] text-[18px] leading-relaxed text-white/54 sm:text-[26px] sm:leading-[1.32] lg:text-[34px] lg:leading-[1.28]">
              {labels.description}
            </p>

            <ul className="mt-6 flex items-center gap-2.5 sm:mt-8 sm:gap-3">
              {labels.socialLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="group inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#9759EF]/42 bg-[rgba(151,89,239,0.08)] text-[#D6B8FF] transition-[transform,border-color,color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#9759EF]/72 hover:bg-[rgba(151,89,239,0.16)] hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.34)] sm:h-10 sm:w-10"
                  >
                    <FooterIcon name={item.icon} />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 sm:mt-10">
              <Image
                src="/bukky_logo_completo.svg"
                alt="Bukky"
                width={305}
                height={72}
                className="h-auto w-[180px] sm:w-[230px] lg:w-[305px]"
              />
            </div>

            <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/42 sm:mt-5 sm:gap-x-5 sm:text-sm">
              {labels.legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-white/78"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {labels.columns.map((column, index) => (
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
              <h3 className="text-[15px] font-medium text-white/88 sm:text-base">{column.title}</h3>

              <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                {column.links.map((link) => {
                  const external = isExternalLink(link.href);

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="group inline-flex items-center gap-2.5 text-sm leading-relaxed text-white/42 transition-colors duration-200 hover:text-white/78 sm:text-[15px]"
                      >
                        {link.icon ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-white/12 bg-white/[0.02] text-white/64 transition-colors duration-200 group-hover:text-white">
                            <FooterIcon name={link.icon} />
                          </span>
                        ) : null}
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 h-px bg-white/8" />

        <div
          className="mt-8 flex flex-col gap-3 text-sm text-white/34 sm:flex-row sm:items-center sm:justify-between"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0,0,0)"
              : "translate3d(0,12px,0)",
            transition:
              "opacity 680ms cubic-bezier(0.22,1,0.36,1) 280ms, transform 680ms cubic-bezier(0.22,1,0.36,1) 280ms",
          }}
        >
          <p>{labels.copyright}</p>
          <p>{labels.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
