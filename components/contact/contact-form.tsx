"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { MouseGlowArticle } from "@/components/pages/interactive-page-elements";
import type { Locale } from "@/lib/i18n";

type SelectOption = {
  label: string;
  value: string;
};

export type ContactFormLabels = {
  eyebrow: string;
  badge: string;
  title: string;
  description: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  errorTitle: string;
  errorMessage: string;
  validationTitle: string;
  validationMessage: string;
  privacyNote: string;
  fields: {
    name: string;
    businessName: string;
    email: string;
    phone: string;
    businessType: string;
    teamSize: string;
    message: string;
  };
  placeholders: {
    name: string;
    businessName: string;
    email: string;
    phone: string;
    message: string;
  };
  businessTypeOptions: SelectOption[];
  teamSizeOptions: SelectOption[];
  errors: {
    name: string;
    businessName: string;
    email: string;
    businessType: string;
    message: string;
  };
};

type ContactFormProps = {
  labels: ContactFormLabels;
  locale: Locale;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputBaseClass =
  "min-h-12 w-full rounded-[14px] border bg-black/18 px-4 text-[15px] text-white outline-none transition-[border-color,background-color,box-shadow] placeholder:text-white/28 focus:bg-black/24 focus:shadow-[0_0_0_4px_rgba(151,89,239,0.12)]";

function fieldClass(hasError: boolean) {
  return `${inputBaseClass} ${
    hasError
      ? "border-[#ff6b6b]/55 focus:border-[#ff6b6b]/70"
      : "border-white/10 focus:border-[#9759EF]/62"
  }`;
}

function isFieldWithError(
  errors: Record<string, string>,
  field: keyof ContactFormLabels["fields"],
) {
  return Boolean(errors[field]);
}

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateContactForm(
  formData: FormData,
  labels: ContactFormLabels,
) {
  const errors: Record<string, string> = {};

  if (readFormValue(formData, "name").length < 2) {
    errors.name = labels.errors.name;
  }

  if (readFormValue(formData, "businessName").length < 2) {
    errors.businessName = labels.errors.businessName;
  }

  if (!isValidEmail(readFormValue(formData, "email"))) {
    errors.email = labels.errors.email;
  }

  if (readFormValue(formData, "businessType").length < 2) {
    errors.businessType = labels.errors.businessType;
  }

  if (readFormValue(formData, "message").length < 12) {
    errors.message = labels.errors.message;
  }

  return errors;
}

function normalizeServerErrors(
  errors: Record<string, string> | undefined,
  labels: ContactFormLabels,
) {
  if (!errors) {
    return { form: "submit_failed" };
  }

  return Object.fromEntries(
    Object.entries(errors).map(([key, value]) => [
      key,
      key in labels.errors
        ? labels.errors[key as keyof ContactFormLabels["errors"]]
        : value,
    ]),
  );
}

function FieldError({ children }: { children?: string }) {
  if (!children) {
    return null;
  }

  return (
    <span
      role="alert"
      className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ff6b6b]/24 bg-[#ff6b6b]/10 px-2.5 py-1 text-xs font-semibold leading-relaxed text-[#ff9b9b] shadow-[0_8px_22px_rgba(255,107,107,0.08)]"
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b6b]"
      />
      <span>{children}</span>
    </span>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`h-4 w-4 transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactSelect({
  name,
  label,
  options,
  placeholder,
  value,
  onChange,
  hasError,
  errorMessage,
}: {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
  errorMessage?: string;
}) {
  const listboxId = useId();
  const selectedOption = options.find((option) => option.label === value);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative grid gap-2 text-sm font-medium text-white/72">
      <span>{label}</span>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((current) => !current)}
        className={`${fieldClass(
          hasError,
        )} flex items-center justify-between gap-3 text-left`}
      >
        <span className={selectedOption ? "text-white" : "text-white/36"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-[border-color,background-color,color] ${
            isOpen
              ? "border-[#9759EF]/54 bg-[#9759EF]/18 text-white"
              : "border-white/10 bg-black/16 text-white/48"
          }`}
        >
          <ChevronIcon isOpen={isOpen} />
        </span>
      </button>

      <div
        id={listboxId}
        role="listbox"
        className={`absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[236px] overflow-y-auto rounded-[16px] border border-[#9759EF]/28 bg-[#0D0C12] p-1.5 shadow-[0_24px_64px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.07)] transition-[opacity,transform,visibility] duration-200 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {options.map((option) => {
          const isSelected = option.label === value;

          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                onChange(option.label);
                setIsOpen(false);
              }}
              className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-[background-color,color] ${
                isSelected
                  ? "bg-[#9759EF]/22 text-white"
                  : "text-white/72 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span>{option.label}</span>
              {isSelected ? (
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFE633]" />
              ) : null}
            </button>
          );
        })}
      </div>
      <FieldError>{errorMessage}</FieldError>
    </div>
  );
}

export function ContactForm({ labels, locale }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [businessType, setBusinessType] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "submitting") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const validationErrors = validateContactForm(formData, labels);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          businessName: formData.get("businessName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          businessType: formData.get("businessType"),
          teamSize: formData.get("teamSize"),
          message: formData.get("message"),
          company: formData.get("company"),
          locale,
          sourceUrl: window.location.href,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; errors?: Record<string, string> }
        | null;

      if (!response.ok || result?.ok === false) {
        setFieldErrors(normalizeServerErrors(result?.errors, labels));
        setSubmitState("error");
        return;
      }

      formRef.current?.reset();
      setBusinessType("");
      setTeamSize("");
      setSubmitState("success");
    } catch {
      setFieldErrors({ form: "network_error" });
      setSubmitState("error");
    }
  };

  const isSubmitting = submitState === "submitting";
  const statusIsVisible = submitState === "success" || submitState === "error";
  const statusIsSuccess = submitState === "success";
  const hasFieldErrors = Object.keys(fieldErrors).some((key) => key !== "form");
  const clearFieldError = (field: keyof ContactFormLabels["fields"]) => {
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  return (
    <MouseGlowArticle className="feature-card group rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.018)_52%,rgba(0,0,0,0.08)_100%)] p-5 shadow-[0_28px_72px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.06)] transition-[transform,border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[0_30px_80px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6 lg:p-7">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="relative z-10"
      >
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm tracking-[0.1em] text-white/42 uppercase">
              {labels.eyebrow}
            </p>
            <h2 className="mt-3 text-[30px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[40px]">
              {labels.title}
            </h2>
            <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-white/52">
              {labels.description}
            </p>
          </div>
          <span className="inline-flex w-fit shrink-0 rounded-full border border-[#FFE633]/24 bg-[#FFE633]/10 px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-[#FFE633] uppercase">
            {labels.badge}
          </span>
        </div>

        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-white/72">
            <span>{labels.fields.name}</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={isFieldWithError(fieldErrors, "name")}
              onChange={() => clearFieldError("name")}
              placeholder={labels.placeholders.name}
              className={fieldClass(isFieldWithError(fieldErrors, "name"))}
            />
            <FieldError>{fieldErrors.name}</FieldError>
          </label>

          <label className="grid gap-2 text-sm font-medium text-white/72">
            <span>{labels.fields.businessName}</span>
            <input
              name="businessName"
              type="text"
              autoComplete="organization"
              required
              aria-invalid={isFieldWithError(fieldErrors, "businessName")}
              onChange={() => clearFieldError("businessName")}
              placeholder={labels.placeholders.businessName}
              className={fieldClass(
                isFieldWithError(fieldErrors, "businessName"),
              )}
            />
            <FieldError>{fieldErrors.businessName}</FieldError>
          </label>

          <label className="grid gap-2 text-sm font-medium text-white/72">
            <span>{labels.fields.email}</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={isFieldWithError(fieldErrors, "email")}
              onChange={() => clearFieldError("email")}
              placeholder={labels.placeholders.email}
              className={fieldClass(isFieldWithError(fieldErrors, "email"))}
            />
            <FieldError>{fieldErrors.email}</FieldError>
          </label>

          <label className="grid gap-2 text-sm font-medium text-white/72">
            <span>{labels.fields.phone}</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              onChange={() => clearFieldError("phone")}
              placeholder={labels.placeholders.phone}
              className={fieldClass(isFieldWithError(fieldErrors, "phone"))}
            />
          </label>

          <ContactSelect
            name="businessType"
            label={labels.fields.businessType}
            placeholder={labels.fields.businessType}
            options={labels.businessTypeOptions}
            value={businessType}
            onChange={(nextValue) => {
              setBusinessType(nextValue);
              clearFieldError("businessType");
            }}
            hasError={isFieldWithError(fieldErrors, "businessType")}
            errorMessage={fieldErrors.businessType}
          />

          <ContactSelect
            name="teamSize"
            label={labels.fields.teamSize}
            placeholder={labels.fields.teamSize}
            options={labels.teamSizeOptions}
            value={teamSize}
            onChange={(nextValue) => {
              setTeamSize(nextValue);
              clearFieldError("teamSize");
            }}
            hasError={isFieldWithError(fieldErrors, "teamSize")}
            errorMessage={fieldErrors.teamSize}
          />
        </div>

        <label className="mt-4 grid gap-2 text-sm font-medium text-white/72">
          <span>{labels.fields.message}</span>
          <textarea
            name="message"
            required
            minLength={12}
            rows={6}
            aria-invalid={isFieldWithError(fieldErrors, "message")}
            onChange={() => clearFieldError("message")}
            placeholder={labels.placeholders.message}
            className={`${fieldClass(
              isFieldWithError(fieldErrors, "message"),
            )} min-h-[150px] resize-y py-3 leading-relaxed`}
          />
          <FieldError>{fieldErrors.message}</FieldError>
        </label>

        {statusIsVisible ? (
          <div
            role="status"
            className={`mt-5 rounded-[16px] border p-4 ${
              statusIsSuccess
                ? "border-[#48E5A0]/28 bg-[#48E5A0]/8"
                : "border-[#ff6b6b]/28 bg-[#ff6b6b]/8"
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                statusIsSuccess ? "text-[#48E5A0]" : "text-[#ff9b9b]"
              }`}
            >
              {statusIsSuccess
                ? labels.successTitle
                : hasFieldErrors
                  ? labels.validationTitle
                  : labels.errorTitle}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/54">
              {statusIsSuccess
                ? labels.successMessage
                : hasFieldErrors
                  ? labels.validationMessage
                  : labels.errorMessage}
            </p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[440px] text-xs leading-relaxed text-white/34">
            {labels.privacyNote}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="final-cta-button final-cta-button-primary inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FFE633] px-6 text-[15px] font-semibold text-[#1E1E1E] disabled:pointer-events-none disabled:opacity-58"
          >
            {isSubmitting ? labels.submitting : labels.submit}
          </button>
        </div>
      </form>
    </MouseGlowArticle>
  );
}
