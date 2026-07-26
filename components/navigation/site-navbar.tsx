"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import {
  getHomeSectionRoute,
  getLocalizedRoute,
  getTranslatedMarketingPath,
} from "@/lib/routes";

type NavbarLabels = {
  features: string;
  customers: string;
  pricing: string;
  contact: string;
  getStarted: string;
  langEs: string;
  langEn: string;
  openMenu: string;
  closeMenu: string;
  switchToSpanish: string;
  switchToEnglish: string;
};

type SiteNavbarProps = {
  lang: Locale;
  labels: NavbarLabels;
};

export function SiteNavbar({ lang, labels }: SiteNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLang, setActiveLang] = useState<Locale>(lang);
  const [isSwitchingLang, setIsSwitchingLang] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setActiveLang(lang);
      setIsSwitchingLang(false);
      setIsMobileMenuOpen(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lang]);

  const switchLanguage = (nextLang: Locale) => {
    if (nextLang === activeLang || isSwitchingLang) {
      return;
    }

    setActiveLang(nextLang);
    setIsSwitchingLang(true);
    setIsMobileMenuOpen(false);

    const hash = window.location.hash ?? "";
    const targetPath = `${getTranslatedMarketingPath(pathname, nextLang)}${hash}`;
    const navigate = () => router.push(targetPath);

    const maybeDocument = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (typeof maybeDocument.startViewTransition === "function") {
      window.setTimeout(() => {
        maybeDocument.startViewTransition?.(navigate);
      }, 120);
      return;
    }

    window.setTimeout(navigate, 120);
  };

  const navItems = useMemo(
    () => [
      { href: getLocalizedRoute(lang, "features"), label: labels.features },
      { href: getHomeSectionRoute(lang, "customers"), label: labels.customers },
      { href: getLocalizedRoute(lang, "pricing"), label: labels.pricing },
      { href: getLocalizedRoute(lang, "contact"), label: labels.contact },
    ],
    [
      lang,
      labels.contact,
      labels.customers,
      labels.features,
      labels.pricing,
    ],
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 sm:px-4 ${
        isScrolled ? "pt-2.5 sm:pt-3" : "pt-4 sm:pt-6"
      }`}
    >
      <button
        type="button"
        aria-label={labels.closeMenu}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-0 bg-[#050507]/78 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <nav
          className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition-all duration-500 sm:rounded-2xl sm:px-4 sm:py-3 md:px-6 ${
            isScrolled
              ? "border-white/12 bg-[rgba(15,15,18,0.82)] backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href={`/${lang}`} className="shrink-0">
            <Image
              src="/bukky_logo_completo.svg"
              alt="Bukky"
              width={170}
              height={40}
              className="h-auto w-[136px] sm:w-[152px] lg:w-[170px]"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative grid w-[72px] grid-cols-2 items-center rounded-full border border-white/15 bg-white/[0.04] p-1">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-1 left-1 top-1 w-8 rounded-full bg-[#9759EF] transition-transform duration-300 ease-out ${
                  activeLang === "en" ? "translate-x-8" : "translate-x-0"
                }`}
              />
              <button
                type="button"
                onClick={() => switchLanguage("es")}
                aria-label={labels.switchToSpanish}
                className={`relative z-10 rounded-full py-1 text-[11px] font-semibold transition-colors ${
                  activeLang === "es"
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {labels.langEs}
              </button>
              <button
                type="button"
                onClick={() => switchLanguage("en")}
                aria-label={labels.switchToEnglish}
                className={`relative z-10 rounded-full py-1 text-[11px] font-semibold transition-colors ${
                  activeLang === "en"
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {labels.langEn}
              </button>
            </div>

            <Link
              href={getLocalizedRoute(lang, "contact")}
              className="hidden rounded-xl bg-[#FFE633] px-4 py-2 text-sm font-semibold text-[#1E1E1E] transition-transform hover:-translate-y-0.5 sm:inline-flex md:px-5"
            >
              {labels.getStarted}
            </Link>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? labels.closeMenu : labels.openMenu}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/[0.03] text-white/82 transition-colors hover:text-white md:hidden"
            >
              {isMobileMenuOpen ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        <div
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-out md:hidden ${
            isMobileMenuOpen
              ? "pointer-events-auto mt-2 max-h-[430px] translate-y-0 opacity-100"
              : "pointer-events-none mt-0 max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          <div className="rounded-[20px] border border-white/12 bg-[#07070C] p-2.5 shadow-[0_22px_62px_rgba(0,0,0,0.56),inset_0_1px_0_rgba(255,255,255,0.06)]">
            <ul className="grid gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex min-h-11 items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/76 transition-[background-color,color] hover:bg-white/[0.055] hover:text-white"
                  >
                    <span>{item.label}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4 text-white/28 transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-[#FFE633]"
                    >
                      <path
                        d="M4.167 10H15.833M15.833 10L10 4.167M15.833 10L10 15.833"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-2 border-t border-white/8 pt-2">
              <Link
                href={getLocalizedRoute(lang, "contact")}
                onClick={() => setIsMobileMenuOpen(false)}
                className="final-cta-button final-cta-button-primary inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#FFE633] px-4 text-sm font-semibold text-[#1E1E1E]"
              >
                {labels.getStarted}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
