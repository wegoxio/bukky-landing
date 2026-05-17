import Link from "next/link";

type ActionButtonProps = {
  href: string;
  label: string;
  variant: "primary" | "secondary";
};

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.167 10H15.833M15.833 10L10 4.167M15.833 10L10 15.833"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ActionButton({ href, label, variant }: ActionButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[#FFE633] text-[#1E1E1E] hover:brightness-[1.03]"
      : "border border-[#9759EF] bg-[rgba(151,89,239,0.08)] text-white hover:bg-[rgba(151,89,239,0.16)]";

  return (
    <Link
      href={href}
      className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[15px] font-semibold transition-all duration-300 sm:w-auto sm:px-6 sm:py-3 sm:text-base ${styles}`}
    >
      <span>{label}</span>
      <ArrowRightIcon />
    </Link>
  );
}
