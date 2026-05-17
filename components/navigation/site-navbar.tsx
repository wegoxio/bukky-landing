"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";

type NavbarLabels = {
  features: string;
  integrations: string;
  customers: string;
  pricing: string;
  signIn: string;
  getStarted: string;
  langEs: string;
  langEn: string;
};

type SiteNavbarProps = {
  lang: Locale;
  labels: NavbarLabels;
};

export function SiteNavbar({ lang, labels }: SiteNavbarProps) {
  const router = useRouter();
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
    setActiveLang(lang);
    setIsSwitchingLang(false);
    setIsMobileMenuOpen(false);
  }, [lang]);

  const switchLanguage = (nextLang: Locale) => {
    if (nextLang === activeLang || isSwitchingLang) {
      return;
    }

    setActiveLang(nextLang);
    setIsSwitchingLang(true);
    setIsMobileMenuOpen(false);

    const hash = window.location.hash ?? "";
    const targetPath = `/${nextLang}${hash}`;
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
      { href: `/${lang}#features`, label: labels.features },
      { href: `/${lang}#integrations`, label: labels.integrations },
      { href: `/${lang}#customers`, label: labels.customers },
      { href: `/${lang}#pricing`, label: labels.pricing },
    ],
    [
      lang,
      labels.customers,
      labels.features,
      labels.integrations,
      labels.pricing,
    ],
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 sm:px-4 ${
        isScrolled ? "pt-2.5 sm:pt-3" : "pt-4 sm:pt-6"
      }`}
    >
      <div className="mx-auto max-w-[1120px]">
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
                aria-label="Cambiar idioma a español"
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
                aria-label="Switch language to English"
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
              href={`/${lang}#signin`}
              className="hidden text-sm font-medium text-white/85 transition-colors hover:text-white md:inline-block"
            >
              {labels.signIn}
            </Link>

            <Link
              href={`/${lang}#get-started`}
              className="hidden rounded-xl bg-[#FFE633] px-4 py-2 text-sm font-semibold text-[#1E1E1E] transition-transform hover:-translate-y-0.5 sm:inline-flex md:px-5"
            >
              {labels.getStarted}
            </Link>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
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
              ? "pointer-events-auto mt-2 max-h-[360px] opacity-100"
              : "pointer-events-none mt-0 max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-white/10 bg-[rgba(10,10,16,0.9)] p-4 backdrop-blur-xl shadow-[0_14px_34px_rgba(0,0,0,0.34)]">
            <ul className="space-y-1.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-white/78 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href={`/${lang}#signin`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-white/14 px-3 py-2 text-sm font-medium text-white/86"
              >
                {labels.signIn}
              </Link>
              <Link
                href={`/${lang}#get-started`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-[#FFE633] px-3 py-2 text-sm font-semibold text-[#1E1E1E]"
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
