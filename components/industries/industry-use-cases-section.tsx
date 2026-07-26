import { MouseGlowArticle } from "@/components/pages/interactive-page-elements";

export type IndustryUseCasesLabels = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
};

type IndustryUseCasesSectionProps = {
  labels: IndustryUseCasesLabels;
};

function IndustryIcon({ name }: { name: string }) {
  if (name === "psychology") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 4.2a4.8 4.8 0 0 0-4.8 4.8c0 2.5 1.8 4.3 3.3 5.4v3.4h3v-3.4c1.5-1.1 3.3-2.9 3.3-5.4A4.8 4.8 0 0 0 12 4.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.2 19.8h5.6M8.4 9.2h7.2M12 6.8v5.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "barbershop") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M7.4 5.8 18.2 18.6M18.2 5.8 7.4 18.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="6.4" cy="5.3" r="2.1" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="6.4" cy="18.7" r="2.1" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "clinic") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "wellness") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 19c4.4-2.2 6.8-5.1 6.8-8.6A4.2 4.2 0 0 0 12 7.1a4.2 4.2 0 0 0-6.8 3.3c0 3.5 2.4 6.4 6.8 8.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7.1V4.5M9.5 5.8 12 4.5l2.5 1.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3.5v4M16 3.5v4M4.5 10h15M8.2 14h3.2M8.2 17h5.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IndustryUseCasesSection({
  labels,
}: IndustryUseCasesSectionProps) {
  return (
    <section
      id="industries"
      className="relative overflow-hidden border-y border-white/7 py-18 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(48%_62%_at_18%_34%,rgba(151,89,239,0.16)_0%,rgba(151,89,239,0)_74%),radial-gradient(42%_58%_at_78%_42%,rgba(255,230,51,0.09)_0%,rgba(255,230,51,0)_78%)]" />

      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <p className="text-sm tracking-[0.1em] text-white/42 uppercase">
              {labels.eyebrow}
            </p>
            <h2 className="mt-4 max-w-[660px] text-[32px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[46px] lg:text-[56px]">
              {labels.title}
            </h2>
          </div>
          <p className="max-w-[620px] text-[15px] leading-relaxed text-white/56 sm:text-lg lg:justify-self-end">
            {labels.description}
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {labels.items.map((item) => (
            <MouseGlowArticle
              key={item.title}
              className="feature-card group rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.036)_0%,rgba(255,255,255,0.016)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[transform,border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_52px_rgba(0,0,0,0.3)] sm:p-6"
            >
              <span className="feature-icon inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#9759EF_0%,#FFE633_100%)] text-[#171717] shadow-[0_14px_26px_rgba(0,0,0,0.28)]">
                <IndustryIcon name={item.icon} />
              </span>
              <h3 className="mt-5 text-[22px] font-medium leading-tight text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/56">
                {item.description}
              </p>
            </MouseGlowArticle>
          ))}
        </div>
      </div>
    </section>
  );
}
