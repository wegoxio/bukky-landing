"use client";

import { useEffect, useRef, useState } from "react";

type DashboardLabels = {
  title: string;
  activeWorkflows: string;
  executions: string;
  successRate: string;
};

type HeroDashboardCardProps = {
  labels: DashboardLabels;
};

function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

function useCountUp(target: number, duration: number, start: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      const rafId = window.requestAnimationFrame(() => setValue(0));

      return () => window.cancelAnimationFrame(rafId);
    }

    let rafId = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(target * eased);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    rafId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(rafId);
  }, [duration, start, target]);

  return value;
}

export function HeroDashboardCard({ labels }: HeroDashboardCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isProgressComplete, setIsProgressComplete] = useState(false);

  useEffect(() => {
    const node = cardRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let rafId = 0;
    let resetRafId = 0;
    let startTime: number | null = null;
    const duration = 1500;
    const target = 76;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setProgressWidth(target * eased);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setProgressWidth(target);
        setIsProgressComplete(true);
      }
    };

    resetRafId = window.requestAnimationFrame(() => {
      setProgressWidth(0);
      setIsProgressComplete(false);
      rafId = window.requestAnimationFrame(step);
    });

    return () => {
      window.cancelAnimationFrame(resetRafId);
      window.cancelAnimationFrame(rafId);
    };
  }, [isInView]);

  const activeWorkflowsValue = useCountUp(127, 1300, isInView);
  const executionsValue = useCountUp(43.2, 1450, isInView);
  const successRateValue = useCountUp(99.4, 1650, isInView);

  return (
    <div
      ref={cardRef}
      className="hero-enter-right relative mx-auto w-full max-w-[505px]"
    >
      <div className="hero-dashboard-float relative">
        <div className="hero-dashboard-glow pointer-events-none absolute -inset-4 rounded-[28px]" />

        <div className="hero-dashboard-shell relative z-[1] min-h-[286px] rounded-3xl border border-white/12 bg-[linear-gradient(145deg,#2f323b_0%,#272a33_52%,#1f222a_100%)] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:min-h-[318px] sm:p-7">
          <div className="mb-5 flex items-center justify-between sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ED6A6A] sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFE633] sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#37CC7A] sm:h-3 sm:w-3" />
            </div>
            <span className="text-xs text-white/42 sm:text-sm">{labels.title}</span>
          </div>

          <div className="rounded-2xl border border-white/7 bg-[rgba(0,0,0,0.24)] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-base text-white/72 sm:text-xl">{labels.activeWorkflows}</p>
              <p className="text-[32px] font-medium text-white sm:text-[40px]">
                {Math.round(activeWorkflowsValue)}
              </p>
            </div>
            <div
              className={`hero-progress-track mt-5 h-2 rounded-full bg-white/12 sm:mt-6 sm:h-2.5 ${
                isProgressComplete ? "hero-progress-complete" : ""
              }`}
            >
              <div
                className="hero-progress-line h-full rounded-full bg-[linear-gradient(90deg,#9759EF_0%,#FFE633_100%)]"
                style={{ width: `${progressWidth}%` }}
              />
              <span aria-hidden="true" className="hero-progress-sheen" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-2xl border border-white/7 bg-[rgba(0,0,0,0.24)] p-3.5 sm:p-4">
              <p className="text-xs text-white/42 sm:text-sm">{labels.executions}</p>
              <p className="mt-1 text-[28px] font-medium text-white sm:text-[36px]">
                {executionsValue.toFixed(1)}K
              </p>
              <p className="mt-1 text-lg font-medium text-[#FFE633] sm:text-xl">+12.3%</p>
            </div>
            <div className="rounded-2xl border border-white/7 bg-[rgba(0,0,0,0.24)] p-3.5 sm:p-4">
              <p className="text-xs text-white/42 sm:text-sm">{labels.successRate}</p>
              <p className="mt-1 text-[28px] font-medium text-white sm:text-[36px]">
                {successRateValue.toFixed(1)}%
              </p>
              <p className="mt-1 text-lg font-medium text-[#FFE633] sm:text-xl">+0.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
