"use client";

import { useEffect, useRef, useState } from "react";

type WorkflowTrigger = {
  label: string;
  title: string;
  url: string;
  status: string;
  icon: string;
};

type WorkflowAction = {
  label: string;
  title: string;
  subtitle: string;
  latency: string;
  icon: string;
};

type WorkflowStats = {
  title: string;
  totalRunsLabel: string;
  totalRunsValue: string;
  successRateLabel: string;
  successRateValue: string;
};

type WorkflowRecentItem = {
  time: string;
  status: string;
  tone: string;
};

type WorkflowRecent = {
  title: string;
  items: WorkflowRecentItem[];
};

type OperationsWorkflowLabels = {
  title: string;
  description: string;
  windowTitle: string;
  trigger: WorkflowTrigger;
  actions: WorkflowAction[];
  stats: WorkflowStats;
  recent: WorkflowRecent;
};

type OperationsWorkflowSectionProps = {
  labels: OperationsWorkflowLabels;
};

type WorkflowRow = {
  label: string;
  title: string;
  subtitle: string;
  icon: string;
  badge?: string;
  meta?: string;
};

function toneClassByStatus(tone: string) {
  if (tone === "warning") {
    return "border-[#9759EF]/45 bg-[rgba(151,89,239,0.17)] text-[#BD91FF]";
  }

  return "border-[#FFE633]/35 bg-[rgba(255,230,51,0.16)] text-[#FFE633]";
}

function WorkflowStepIcon({ icon }: { icon: string }) {
  if (icon === "availability") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" />
        <path d="M7.5 2.8v3.3M16.5 2.8v3.3M3.5 9h17M8.5 13l2.4 2.4 4.6-4.8" />
      </svg>
    );
  }

  if (icon === "reminder") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.8 9.3a5.2 5.2 0 1 1 10.4 0v3.4l1.8 2.6v1.2H5v-1.2l1.8-2.6V9.3Z" />
        <path d="M9.8 18.2a2.2 2.2 0 0 0 4.4 0" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 6.2h14M8.4 3v3.2M15.6 3v3.2M5 10.6h14M7 20.5h10a2 2 0 0 0 2-2V6.2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12.3a2 2 0 0 0 2 2Z" />
      <path d="M9 14h6M9 17h4" />
    </svg>
  );
}

function rowIconWrapClass(index: number) {
  if (index === 1) {
    return "bg-[rgba(255,230,51,0.92)] text-[#161616]";
  }

  if (index === 2) {
    return "bg-[linear-gradient(135deg,#9759EF_0%,#FFE633_100%)] text-[#161616]";
  }

  return "bg-[rgba(151,89,239,0.95)] text-white";
}

export function OperationsWorkflowSection({
  labels,
}: OperationsWorkflowSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const workflowRows: WorkflowRow[] = [
    {
      label: labels.trigger.label,
      title: labels.trigger.title,
      subtitle: labels.trigger.url,
      icon: labels.trigger.icon,
      badge: labels.trigger.status,
    },
    ...labels.actions.slice(0, 2).map((action) => ({
      label: action.label,
      title: action.title,
      subtitle: action.subtitle,
      icon: action.icon,
      meta: action.latency,
    })),
  ];

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
      { threshold: 0.22, rootMargin: "0px 0px -10% 0px" },
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
          <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[34px] lg:text-[38px]">
            {labels.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[900px] text-[13px] leading-relaxed text-white/45 sm:text-sm lg:text-base">
            {labels.description}
          </p>
        </header>

        <article
          className={`workflow-shell mt-10 overflow-hidden rounded-[20px] border border-[#9759EF]/28 bg-[linear-gradient(160deg,rgba(30,30,35,0.95)_0%,rgba(22,22,30,0.95)_42%,rgba(16,16,24,0.95)_100%)] shadow-[0_26px_84px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] transition-[opacity,transform,filter] duration-[900ms] ease-out sm:mt-12 sm:rounded-[22px] lg:mt-14 ${
            isVisible ? "workflow-shell-visible" : ""
          }`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translate3d(0,0,0) scale(1)"
              : "translate3d(0,40px,0) scale(0.985)",
            filter: isVisible ? "blur(0px)" : "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f86c6c] sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffe633] sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#45d282] sm:h-3 sm:w-3" />
            </div>
            <p className="text-xs font-medium leading-none tracking-[0.01em] text-white/42 sm:text-sm">
              {labels.windowTitle}
            </p>
          </div>

          <div className="h-px bg-white/8" />

          <div className="relative grid gap-4 p-4 sm:gap-5 sm:p-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:p-7">
            <div className="relative z-10 space-y-4 sm:space-y-5">
              {workflowRows.map((row, index) => (
                <div
                  key={`${row.title}-${index}`}
                  className="relative space-y-4 sm:space-y-5"
                >
                  <section
                    className="relative rounded-[14px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.026)_58%,rgba(255,255,255,0.014)_100%)] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[opacity,transform,filter] duration-700 ease-out sm:rounded-[16px] sm:px-5 sm:py-4"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translate3d(0,0,0)"
                        : "translate3d(-34px,0,0)",
                      filter: isVisible ? "blur(0px)" : "blur(8px)",
                      transitionDelay: `${260 + index * 160}ms`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-xs leading-none text-white/44 sm:text-sm">
                        {row.label}
                      </p>
                      {row.badge ? (
                        <span className="workflow-live-pill inline-flex items-center rounded-full border border-[#FFE633]/40 bg-[rgba(255,230,51,0.2)] px-2.5 py-1 text-xs font-medium text-[#FFE633] sm:px-3 sm:text-sm">
                          {row.badge}
                        </span>
                      ) : (
                        <p className="text-xs leading-none text-white/34 sm:text-sm">
                          {row.meta}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] sm:h-10 sm:w-10 ${rowIconWrapClass(index)}`}
                      >
                        <WorkflowStepIcon icon={row.icon} />
                      </span>
                      <div className="min-w-0 max-w-[96%]">
                        <p className="text-[17px] font-medium leading-[1.15] tracking-[-0.02em] text-white sm:text-[19px] lg:text-[22px]">
                          {row.title}
                        </p>
                        <p className="mt-1.5 text-[11px] leading-relaxed text-white/36 sm:mt-2 sm:text-sm">
                          {row.subtitle}
                        </p>
                      </div>
                    </div>

                    {index < 2 && (
                      <span
                        className={`workflow-step-bridge ${
                          isVisible ? "workflow-step-bridge-active" : ""
                        }`}
                        style={{ animationDelay: `${980 + index * 220}ms` }}
                      />
                    )}
                  </section>

                  {index < workflowRows.length - 1 && (
                    <div className="flex justify-center">
                      <span
                        className={`workflow-row-connector ${
                          isVisible ? "workflow-row-connector-active" : ""
                        }`}
                        style={{ animationDelay: `${840 + index * 240}ms` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="relative z-10 space-y-4 sm:space-y-5">
              <section
                className="rounded-[16px] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[opacity,transform,filter] duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translate3d(0,0,0)"
                    : "translate3d(34px,0,0)",
                  filter: isVisible ? "blur(0px)" : "blur(8px)",
                  transitionDelay: "520ms",
                }}
              >
                <p className="text-base leading-none text-white/58 sm:text-lg lg:text-xl">
                  {labels.stats.title}
                </p>

                <div className="mt-5">
                  <div className="mb-1 flex items-center justify-between text-xs text-white/34 sm:text-sm">
                    <span>{labels.stats.totalRunsLabel}</span>
                    <span>{labels.stats.totalRunsValue}</span>
                  </div>
                  <div className="workflow-progress-track h-2 w-full rounded-full bg-white/12">
                    <span
                      className="workflow-progress-fill workflow-progress-gradient"
                      style={{
                        width: "82%",
                        transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                        transitionDelay: "740ms",
                      }}
                    >
                      <span className="workflow-progress-sheen" />
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-1 flex items-center justify-between text-xs text-white/34 sm:text-sm">
                    <span>{labels.stats.successRateLabel}</span>
                    <span>{labels.stats.successRateValue}</span>
                  </div>
                  <div className="workflow-progress-track h-2 w-full rounded-full bg-white/12">
                    <span
                      className="workflow-progress-fill workflow-progress-yellow"
                      style={{
                        width: "96%",
                        transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                        transitionDelay: "860ms",
                      }}
                    >
                      <span className="workflow-progress-sheen" />
                    </span>
                  </div>
                </div>
              </section>

              <section
                className="rounded-[16px] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[opacity,transform,filter] duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translate3d(0,0,0)"
                    : "translate3d(34px,0,0)",
                  filter: isVisible ? "blur(0px)" : "blur(8px)",
                  transitionDelay: "650ms",
                }}
              >
                <p className="text-base leading-none text-white/58 sm:text-lg lg:text-xl">
                  {labels.recent.title}
                </p>

                <ul className="mt-4 space-y-3.5">
                  {labels.recent.items.slice(0, 4).map((item, index) => (
                    <li
                      key={`${item.time}-${index}`}
                      className="flex items-start justify-between gap-3 text-xs sm:text-sm"
                    >
                      <span className="flex-1 leading-relaxed text-white/38">
                        {item.time}
                      </span>
                      <span
                        className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-xs font-medium tracking-[0.01em] ${toneClassByStatus(
                          item.tone,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
